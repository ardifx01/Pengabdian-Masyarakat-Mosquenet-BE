
import { prismaClient } from "../application/database.js"
import userValidation from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from 'bcrypt';

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
      email: request.email
    }
  });

  if(!user) {
    return {
      status: 400,
      message: "Email tidak ditemukan"
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
        id: user.admin_id
      },
      data: {
        status: true,
        role: request.role,
      }
    });
  }else if(request.role === "Jamaah") {
    await prismaClient.admins.update({
      where: {
        id: user.admin_id
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
  const users = await getAll();
  const findUser = await Promise.all(
      users.map(async (value) => ({
          id: value.id,
          match: bcrypt.compare(String(value.id), user_id)
      }))
  );
  const user = findUser.find((value) => value.match);
  if(user) return user;
  else return null;
}

export default {
    getAll,
    updateUserRole,
    getUserBasedHashID
}