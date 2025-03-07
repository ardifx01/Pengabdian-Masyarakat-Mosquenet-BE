import { prismaClient } from "../application/database.js";
import { addCategorySchema, addIncomeSchema, getCategorySchema } from "../validation/pemasukan-validation.js"
import {validate} from "../validation/validation.js"
import mosqueServices from "./mosque-services.js";

const addCategory = async (request) => {
  request = validate(addCategorySchema, request);

  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId
  }

  const checkCategory = await prismaClient.incomeSources.findMany({
    where: {
      masjid_id: masjidId
    }
  });
  if(checkCategory) {
    const findCheckCategory = checkCategory.find(value => value.name === request.name);
    if(findCheckCategory) {
      return {
        message: "Categori Pemasukan sudah pernah ditambahkan!",
        status: 400
      };
    }
  }

  const data = await prismaClient.incomeSources.create({
    data: {
      masjid_id: masjidId,
      name: request.name
    }
  });
  if(data) {
    return {
      message: "Categori Pemasukan berhasil ditambahkan!",
      status: 200
    };
  } else {
    return {
      message: "Categori Pemasukan gagal ditambahkan",
      status: 400
    };
  }
}

const getCategory = async (request) => {
  request = validate(getCategorySchema, request);
  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId
  }
 
  const categories = await prismaClient.incomeSources.findMany({
    where: {
      masjid_id: masjidId
    },
    select: {
      id: true,
      name: true
    }
  });

  if(categories) {
    return {
      message: "Categori Pemasukan berhasil didapatkan!",
      status: 200,
      categories: categories
    };
  } else {
    return {
      message: "Categori Pemasukan gagal didapatkan!",
      status: 500
    };
  }
}

const addIncome = async (request) => {
  request = validate(addIncomeSchema, request);

  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId
  }

  const addMosqueIncome = await prismaClient.incomes.create({
    data: {
      masjid_id: masjidId,
      source_id: request.source_id,
      amount: request.amount,
      date: new Date().toISOString()
    }
  });

  if(addMosqueIncome) {
    return {
      message: "Pemasukan berhasil ditambahkan",
      status: 200
    }
  } else {
    return {
      message: "Pemasukan gagal ditambahkan. Coba lagi",
      status: 500
    }
  }
}

const getIncome = async (request) => {
  request = validate(getCategorySchema, request);
  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId
  }
 
  const getMosqueIncome = await prismaClient.incomes.findMany({
    where: {
      masjid_id: masjidId
    },
    select: {
      amount: true,
      date: true,
      source: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  const incomes = getMosqueIncome.map(value => ({...value, source: value.source.name, source_id: value.source.id}))

  return {
    message: "Daftar Pemasukan berhasil didapatkan!",
    status: 200,
    incomes: incomes
  };
}

export default {
  addCategory,
  getCategory,
  addIncome,
  getIncome
}