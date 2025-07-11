import { prismaClient } from "../application/database.js";
import {validate} from "../validation/validation.js"
import { addReasonSchema, getReasonSchema, addOutcomeSchema, deleteOutcomeSchema, updateOutcomeSchema } from "../validation/pengeluaran-validation.js";
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
      id: true,
      amount: true,
      date: true,
      reason: true,
      aset: true,
      isActivity: true,

    }
  });

  const mosqueConfiguration = await prismaClient.configuration.findFirst({ where: { masjid_id: masjidId }});

  const data = getMosqueOutcome.map(value => ({
    ...((!mosqueConfiguration.is_asset_outcomes_connected && value.aset) || (!mosqueConfiguration.is_activity_outcomes_connected && value.isActivity) ? {} : { ...value })
  })).filter(value => Object.keys(value).length > 0).map((value => {
    const { isActivity, ...data } = value;
    return data
  }));


  return {
    message: "Daftar Pengeluaran berhasil didapatkan!",
    status: 200,
    outcomes: data
  };

}

const updateOutcome = async (request) => {
  request = validate(updateOutcomeSchema, request);
  
  let updateData;
  if(request.reason_id) {
    const reason = await prismaClient.outcomeReason.findFirst({ where: { id: request.reason_id }});
    const update = await prismaClient.outcomes.update({
      where: { id: request.id },
      data: {
        amount: request.amount,
        reason: reason.name
      }
    });
    updateData = update;
  } else {
    const update = await prismaClient.outcomes.update({
      where: { id: request.id },
      data: {
        amount: request.amount,
      }
    });
    updateData = update;
  }

  if(updateData) {
    return {
      message: "Data pengeluaran berhasil diubah!",
      status: 200
    };
  } else {
    return {
      message: "Data pengeluaran gagal diubah!",
      status: 400
    };
  }
}

const deleteOutcome = async (request) => {
  request = validate(deleteOutcomeSchema, request);
  
  const activity = await prismaClient.activityOutcomes.findMany({ where: { outcome_id: request.id }});
  if(activity.length > 0) {
    return {
      message: "Data pengeluaran ini tidak dapat dihapus! Memiliki hubungan dengan data rincian kegiatan.",
      status: 400,
    };
  }
  
  const asset = await prismaClient.assets.findMany({ where: { outcomes_id: request.id }});
  if(asset.length > 0) {
    return {
      message: "Data pengeluaran ini tidak dapat dihapus! Memiliki hubungan dengan data aset.",
      status: 400,
    };
  }

  await prismaClient.outcomes.delete({ where: { id: request.id }});
  return {
    message: "Data pengeluaran berhasil dihapus!",
    status: 200
  };
}

export default {
  addReason,
  getReason,
  addOutcome,
  getOutcome,
  deleteOutcome,
  updateOutcome
}