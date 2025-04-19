
import { prismaClient } from "../application/database.js"
import userValidation from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const getAll = async () => {
    const users = await prismaClient.users.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            telp: true,
            admin: true,
            jamaah: true,
            master: true,
        }
    });

    return users;
}

const updateUserRole = async (request) => {
  request = validate(userValidation.updateRoleSchema, request);
  const user = await prismaClient.users.findFirst({
    where: {
      email: request.email,
    },
    select: {
      admin: true
    }
  });
  
  if(!user) {
    return {
      status: 400,
      message: "Email tidak ditemukan"
    };
  }

  const leader = await prismaClient.users.findMany({
    where: {
      admin: {
        role: "Ketua"
      }
    }
  });

  if(leader.length <= 1 && user.admin.role === "Ketua") {
    return {
      status: 400,
      message: "Role Pengguna gagal diubah! Tambahkan satu ketua terlebih dahulu."
    };
  }

  if(
    request.role === "Pengurus" || 
    request.role === "Marbot" || 
    request.role === "Sekretaris" || 
    request.role === "Bendahara" || 
    request.role === "Ketua"
  ) {
    await prismaClient.admins.update({
      where: {
        id: user.admin.id
      },
      data: {
        status: true,
        role: request.role,
      }
    });
  }else if(request.role === "Jamaah") {
    await prismaClient.admins.update({
      where: {
        id: user.admin.id
      },
      data: {
        status: false,
        role: "Pengurus",
      }
    });
  }

  return {
    status: 200,
    message: "Role Pengguna berhasil diubah!"
  };
}

const getUserBasedHashID = async (user_id) => {
  const id = jwt.verify(String(user_id), process.env.SECRET_KEY);
  const user = await prismaClient.users.findFirst({
    where: {
      id: Number(id)
    },
    select: {
      id: true,
      name: true,
      email: true,
      telp: true,
      admin_id: true,
      admin: {
        select: {
          role: true,
          status: true,
        }
      },
      master: {
        select: {
          status: true
        }
      },
      master_id: true,
      jamaah_id: true,
    }
  })
  if(user) return user;
  else return null;
}

export default {
    getAll,
    updateUserRole,
    getUserBasedHashID
}