import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import authValidation from "../validation/auth-validation.js";
import mosqueServices from "./mosque-services.js";
import bcrypt from 'bcrypt';
import { ResponseError } from "../error/response-error.js";
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from "url";
import nodemailer from 'nodemailer';
import userServices from "./user-services.js";

const sendMail = (subject, email, errorMessage, tempFileName, key, value) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const template = fs.readFileSync(path.join(__dirname, `../email/${tempFileName}`), 'utf8');
  const content = template.replace(key, value);

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mail = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: content
  };

  transporter.sendMail(mail, (error, info) => {
    if (error) {
      throw new ResponseError(404, errorMessage);
    }
  });  
}

const registerToken = async (request) => {
  try {
    request = validate(authValidation.makeTokenSchema, request);
  
    const payload = {
      username: request.name,
      email: request.email,
      telp: request.telp
    };
    
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
    const verificationLink = `${process.env.VERIFICATION_URL}${encodeURIComponent(token)}`;

    sendMail(
      "Verifikasi Akun anda di Mosquenet",
      request.email,
      "Gagal verifikasi akun!",
      "email.html",
      "{{LINK VERIFIKASI EMAIL}}",
      verificationLink
    );
  
    return {
      status: 200,
      token: token,
      ok: true
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: err,
      ok: false
    }
  }
}

const register = async (request) => {
    try {
        request = validate(authValidation.registerSchema, request);
        const mosque_id = await mosqueServices.changeTokenToMasjidId(request.mosque_id)
    
        const admin = await prismaClient.admins.create({
            data: {
                status: request.isAdmin,
                role: 'Pengurus',
            },
            select: {
                id: true,
            }
        });
    
        const master = await prismaClient.masters.create({
            data: { status: false },
            select: { id: true }
        });
    
        const jamaah = await prismaClient.jamaahs.create({
            data: { masjid_id: mosque_id },
            select: { id: true }
        });
        
        const saltPassword = request.password + process.env.HASH_SALT;
        const hashPassword = await bcrypt.hash(saltPassword, Number(process.env.ROUND_SALT));

        await prismaClient.users.create({
            data: {
                name: request.name,
                email: request.email,
                password: hashPassword,
                telp: request.telp,
                admin_id: admin.id,
                master_id: master.id,
                jamaah_id: jamaah.id,
                tokenVerification: request.token
            }
        });
    
        return {
            message: "Registrasi berhasil dilakukan!",
            status: 200
        };
    } catch (err) {
      console.log(err);
        return {
            status: 500,
            message: err,
        }
    }
}

const login = async (request) => {
    request = validate(authValidation.loginSchema, request);

    const user = await prismaClient.users.findFirst({
        where: {
            email: request.email,
        },
    });

    if (!user) {
        throw new ResponseError(404, "User tidak ditemukan, lakukan registrasi!");
    }

    const saltedPassword = request.password + process.env.HASH_SALT;

    const isPasswordValid = await bcrypt.compare(saltedPassword, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(404, "Password yang diberikan salah, coba lagi!");
    }

    if (!user.isVerified) {
      throw new ResponseError(404, "Verifikasi akun anda terlebih dahulu!");
  }

    const admin = await prismaClient.admins.findFirst({
        where: {
            id: user.admin_id
        }
    });

    const master = await prismaClient.masters.findFirst({
        where: {
            id: user.master_id
        }
    });

    const jamaah = await prismaClient.jamaahs.findFirst({
        where: {
            id: user.jamaah_id,
        },
    });

    return {
        admin,
        master, 
        jamaah,
        id: jwt.sign(String(user.id), process.env.SECRET_KEY),
    };
}

const verifyAccount = async (request) => {
  try {
    request = validate(authValidation.verifyAccountSchema, request);

    const user = await prismaClient.users.findFirst({ where: { tokenVerification: request.token } });

    if(user) {
      const payload = {
        username: user.name,
        email: user.email,
        telp: user.telp,
        isAdmin: user.admin_id,
        isMaster: user.master_id,
        isJamaah: user.jamaah_id
      };

      const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });

      await prismaClient.users.update({
        where: {
          id: user.id
        },
        data: {
          isVerified: true,
          tokenVerification: token
        }
      });
      return {
          message: "Verifikasi Akun berhasil dilakukan!",
          status: 200
      };
    } else {
      throw new ResponseError(400, "Token tidak valid.");
    }

  } catch (err) {
    console.log(err);
      return {
          status: 500,
          message: err,
      }
  }
}

const findEmail = async (request) => {
  try {
    request = validate(authValidation.findEmailSchema, request);

    const user = await prismaClient.users.findFirst({ where: { email: request.email } });

    if(user) {

      let token = "";
      for(let i = 1; i <= 6; i++) {
        token += String(Math.round(Math.random() * 9))
      }

      await prismaClient.users.update({
        where: {
          id: user.id
        },
        data: {
          tokenVerification: token
        }
      });

      sendMail(
        "Verifikasi bahwa ini anda",
        request.email,
        "Gagal verifikasi akun",
        'sendResetRequest.html',
        "{{TOKEN}}",
        token
      );

      return {
          message: "Verifikasi Akun berhasil dilakukan!",
          status: 200
      };
    } else {
      throw new ResponseError(400, "Email tidak ditemukan");
    }

  } catch (err) {
    console.log(err);
      return {
          status: 500,
          message: err,
      }
  }
}

const verifyEmail = async (request) => {
  try {
    request = validate(authValidation.verifySchema, request);

    const user = await prismaClient.users.findFirst({ 
      where: { 
        email: request.email, 
        tokenVerification: request.token 
      } 
    });

    if(user) {
      return {
          message: "Verifikasi Akun berhasil dilakukan. Ubah Password akun anda",
          status: 200
      };
    } else {
      throw new ResponseError(400, "Token tidak ditemukan");
    }

  } catch (err) {
    console.log(err);
      return {
          status: 500,
          message: err,
      }
  }
}

const resetPassword = async (request) => {
  try {
    request = validate(authValidation.loginSchema, request);

    const user = await prismaClient.users.findFirst({ 
      where: { 
        email: request.email 
      } 
    });

    if(user) {
      const saltPassword = request.password + process.env.HASH_SALT;
      const hashPassword = await bcrypt.hash(saltPassword, Number(process.env.ROUND_SALT));

      await prismaClient.users.update({
        where: {
          email: request.email
        },
        data: {
          password: hashPassword
        }
      })
      return {
          message: "Reset Password Akun berhasil dilakukan. Silahkan lakukan login ke akun anda",
          status: 200
      };
    } else {
      throw new ResponseError(400, "Reset password gagal dilakukan. Coba lagi");
    }

  } catch (err) {
    console.log(err);
      return {
          status: 500,
          message: err,
      }
  }
}

const verifyLogin = async (request) => {
  request = validate(authValidation.verifyLoginSchema, request);

  const user = await userServices.getUserBasedHashID(request.user_id);
  if (user) {
    return {
      status: 200,
      message: "Pengguna ditemukan!",
      user: {
        admin: {
          status: user.admin.status,
          role: user.admin.role
        },
        master: {
          status: user.master.status
        },
        email: user.email
      }
    }
  } else {
    return {
      status: 500,
      message: "Pengguna tidak ditemukan! Coba lagi",
    }
  }
}


export default {
  registerToken,
  register,
  login,
  verifyAccount,
  findEmail,
  verifyEmail,
  resetPassword,
  verifyLogin
}