import { prismaClient } from "../application/database.js";
import {validate} from "../validation/validation.js"
import { addReasonSchema, getReasonSchema, addOutcomeSchema } from "../validation/pengeluaran-validation.js";
import mosqueServices from "./mosque-services.js";

const addReason = async (request) => {
  request = validate(addReasonSchema, request);

  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId
  }

  const checkReason = await prismaClient.outcomeReason.findMany({
    where: {
      masjid_id: masjidId
    }
  });
  if(checkReason) {
    const findCheckReason = checkReason.find(value => value.name === request.name);
    if(findCheckReason) {
      return {
        message: "Alasan Pengeluaran sudah pernah ditambahkan!",
        status: 400
      };
    }
  }

  const data = await prismaClient.outcomeReason.create({
    data: {
      masjid_id: masjidId,
      name: request.name
    }
  });
  if(data) {
    return {
      message: "Alasan Pengeluaran berhasil ditambahkan!",
      status: 200
    };
  } else {
    return {
      message: "Alasan Pengeluaran gagal ditambahkan",
      status: 400
    };
  }
}

const getReason = async (request) => {
  request = validate(getReasonSchema, request);
  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId
  }
 
  const reasons = await prismaClient.outcomeReason.findMany({
    where: {
      masjid_id: masjidId
    },
    select: {
      id: true,
      name: true
    }
  });
  return {
    message: "Categori Pemasukan berhasil didapatkan!",
    status: 200,
    reasons: reasons
  };
}

const addOutcome = async (request) => {
  request = validate(addOutcomeSchema, request);

  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId
  }

  const { reasons } = await getReason({user_id: request.user_id});

  const addMosqueOutcomes = await prismaClient.outcomes.create({
    data: {
      masjid_id: masjidId,  
      reason: reasons.find(value => value.id === request.reason_id).name,
      amount: request.amount,
      date: new Date().toISOString()
    }
  });

  if(addMosqueOutcomes) {
    return {
      message: "Pengeluaran berhasil terdata",
      status: 200
    }
  } else {
    return {
      message: "Pengeluaran gagal didata. Coba lagi",
      status: 500
    }
  }
}

const getOutcome = async (request) => {
  request = validate(getReasonSchema, request);
  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId
  }
 
  const getMosqueOutcome = await prismaClient.outcomes.findMany({
    where: {
      masjid_id: masjidId
    },
    select: {
      amount: true,
      date: true,
      reason: true
    }
  });

  return {
    message: "Daftar Pemasukan berhasil didapatkan!",
    status: 200,
    outcomes: getMosqueOutcome
  };
}

const report = async (request) => {

}

export default {
  addReason,
  getReason,
  addOutcome,
  getOutcome
}