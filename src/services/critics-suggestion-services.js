import { prismaClient } from "../application/database.js";
import criticsSuggestionValidation from "../validation/critics-suggestion-validation.js"
import { validate } from "../validation/validation.js"

const create = async (request) => {
  request = validate(criticsSuggestionValidation.createCriticsSchema, request);

  const saveCritics = await prismaClient.criticsAndSuggestion.create({
    data: {
      message: request.message
    }
  });

  if(saveCritics) {
    return {
        message: "Kritik dan Saran berhasil diterima. Terima kasih",
        status: 200
    };
  } else {
    return {
      message: "Kritik dan Saran gagal terkirim, coba lagi",
      status: 500
    }
  }
}

const get = async () => {
  const getCritics = await prismaClient.criticsAndSuggestion.findMany();
  if(getCritics) {
    return {
      message: "Kritik dan Saran berhasil didapatkan.",
      status: 200,
      critics: getCritics
    }
  } else {
    return {
      message: "Kritik dan Saran tidak berhasil didapatkan. Coba lagi",
      status: 500
    }
  }
}

export default {
  create,
  get
}