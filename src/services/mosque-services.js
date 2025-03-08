import { prismaClient } from "../application/database.js";
import province from "../../Data/province.js";
import cityorregency from "../../Data/cityorregency.js";
import subdistrict from "../../Data/subdistrict.js";
import ward from "../../Data/ward.js";
import masjidValidation from "../validation/masjid-validation.js";
import { validate } from "../validation/validation.js";
import userServices from "./user-services.js";
import jwt from "jsonwebtoken";

const getAll = async () => {
    const mosques = await prismaClient.masjids.findMany({
        select: {
            id: true,
            name: true, 
            location: true,
            subdistrict_id: true,
            cityorregency_id: true,
            province_id: true,
            ward_id: true,
        }
    });
    
    const responseData = await Promise.all(mosques.map(async (value) => {
        const { ward_id, subdistrict_id, province_id, cityorregency_id, id, ...rest } = value;
        return {
            ...rest,
            id: jwt.sign(String(id), process.env.SECRET_KEY),
            location: `${value.location}, Kel.${ward.find(v => v.id == ward_id).name}, Kec.${subdistrict.find(v => v.id == subdistrict_id).name}, ${cityorregency.find(v => v.id == cityorregency_id).name}, Prov.${province.find(v => v.id == province_id).name}`
        }
    }));

    return responseData;
};

const getMasjidId = async (user_id) => {
  const user = await userServices.getUserBasedHashID(user_id);

  if(!user) {
    return {
      message: "Akses Illegal!",
      status: 400
    };
  }

  const masjid = await prismaClient.users.findFirst({
    where: {
      id: user.id
    },
    select: {
      jamaah: {
        select: {
          masjid_id: true
        }
      }
    }
  });

  return masjid.jamaah.masjid_id;
}

const changeTokenToMasjidId = async (masjid_id) => {
  const id = jwt.verify(masjid_id, process.env.SECRET_KEY);
  return Number(id);
}

const getCrucialMosqueData = async (id) => {
  const user = await userServices.getUserBasedHashID(id);
  const findMosque = await prismaClient.users.findFirst({
      where: {
          id: user.id
      },
      select: {
          jamaah: {
              select: {
                  masjid: true
              }
          }
      }
  })
  const mosquesData = findMosque.jamaah.masjid;
  return mosquesData;
}

const create = async (request) => {
    request = validate(masjidValidation.createSchema, request);

    const mosqueAdd = await prismaClient.masjids.create({
        data: {
            name: request.name,
            location: request.location,
            subdistrict_id: request.subdistrict_id,
            cityorregency_id: request.cityorregency_id,
            province_id: request.province_id,
            ward_id: request.ward_id
        },
        select: {
            id: true
        }
    });

    mosqueAdd.id = jwt.sign(String(mosqueAdd.id), process.env.SECRET_KEY)

    return mosqueAdd;
}

const layoutMosqueData = (mosquesData) => {
    return {
        name: mosquesData.name,
        location: mosquesData.location,
        province: province.find(v => v.id == mosquesData.province_id).name,
        subdistrict: subdistrict.find(v => v.id == mosquesData.subdistrict_id).name,
        cityorregency: cityorregency.find(v => v.id == mosquesData.cityorregency_id).name,
        ward: ward.find(v => v.id == mosquesData.ward_id).name
    };
}

const currentByUser = async (id) => {
  const mosquesData = await getCrucialMosqueData(id);
  const mosque = layoutMosqueData(mosquesData);
  return mosque;
}

const getJamaah = async (id) => {
  const mosquesData = await getCrucialMosqueData(id);
  const jamaahs = await prismaClient.users.findMany({
    where: {
      jamaah: {
        masjid_id: mosquesData.id
      },
      master: {
        status: false
      },
      isVerified: true
    },
    select: {
      name: true,
      email: true,
      admin: {
        select: {
          status: true,
          role: true,
        }
      }
    }
  });
  return jamaahs;
}

const current = async (id) => {
  const masjid_id = jwt.verify(id, process.env.SECRET_KEY);
  if(!masjid_id) {
    return {
      status: 400,
      message: "Akses illegal"
    };
  }

  const findMosque = await prismaClient.masjids.findFirst({
      where: {
          id: Number(masjid_id)
      }
  });
  
  return layoutMosqueData(findMosque);
}

export default {
    getAll,
    create,
    current,
    currentByUser,
    getJamaah,
    getMasjidId,
    changeTokenToMasjidId,
    layoutMosqueData
}