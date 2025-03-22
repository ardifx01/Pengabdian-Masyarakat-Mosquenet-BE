import { prismaClient } from "../application/database.js";
import { getCategorySchema } from "../validation/pemasukan-validation.js"
import { validate } from "../validation/validation.js"
import mosqueServices from "./mosque-services.js";

const report = async (request) => {
  request = validate(getCategorySchema, request);
  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId
  }

  const income = await prismaClient.incomes.findMany({
    where: {
      masjid_id: masjidId,
    },
    select: {
      amount: true,
      date: true,
      source: true
    }
  });

  const outcome = await prismaClient.outcomes.findMany({
    where: {
      masjid_id: masjidId
    },
    select: {
      amount: true,
      date: true,
      reason: true
    }
  });

  const reports = income.map(value => {
    const { source, ...rest } = value;
    return {
      ...rest,
      description: source,
      type: "Pemasukan"
    }
  });

  reports.push(...outcome.map(value => {
    const { reason, ...rest } = value;
    return {
      ...rest,
      description: reason,
      type: "Pengeluaran"
    }
  }));

  const results = reports.sort((a, b) => new Date(a.date) - new Date(b.date));
  return {
    message: "Laporan keuangan berhasil diolah!",
    status: 200,
    reports: results
  };
}

const getPemasukanAmount = async (request) => {
  request = validate(getCategorySchema, request);
  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId
  }

  const pemasukan = await prismaClient.incomes.findMany({
    where: {
      masjid_id: masjidId
    }
  });

  const amount = pemasukan.reduce((acc, curr) => {
    acc.amount += curr.amount;
    return acc;
  }, { amount: 0 });
  
  return amount.amount;
}

const getPengeluaranAmount = async (request) => {
  request = validate(getCategorySchema, request);
  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId
  }

  const pengeluaran = await prismaClient.outcomes.findMany({
    where: {
      masjid_id: masjidId
    }
  });

  const { amount } = pengeluaran.reduce((acc, curr) => {
    acc.amount += curr.amount;
    return acc;
  }, { amount: 0 });
  
  return amount;
}

const getAsetCurve = async (request) => {
  request = validate(getCategorySchema, request);
  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId
  }

  const asets = await prismaClient.assets.findMany({
    where: {
      masjid_id: masjidId
    }
  });

  const dataAset = asets.reduce((acc, curr) => {
    const variabelName = curr.name.split(" ").join("_").toLowerCase();
    if(curr.condition === "Baik") {
      if(!acc.baik[variabelName]) {
        acc.baik[variabelName] = 0
      }
      acc.baik[variabelName] += curr.amount;
      acc.baik.total += curr.amount;
    } else if (curr.condition === "Sedang_diperbaiki") {
      if(!acc.sedang_diperbaiki[variabelName]) {
        acc.sedang_diperbaiki[variabelName] = 0
      }
      acc.sedang_diperbaiki[variabelName] += curr.amount;
      acc.sedang_diperbaiki.total += curr.amount
    } else if (curr.condition === "Rusak") {
      if(!acc.rusak[variabelName]) {
        acc.rusak[variabelName] = 0
      }
      acc.rusak[variabelName] += curr.amount;
      acc.rusak.total += curr.amount
    }
    return acc;
  }, { 
    baik: { total: 0 },
    sedang_diperbaiki: { total: 0 },
    rusak: { total: 0 },
  });

  return dataAset;
}

const getDashboardData = async (request) => {
  const reportData = await report(request);
  const pemasukanAmount = await getPemasukanAmount(request);
  const pengeluaranAmount = await getPengeluaranAmount(request);
  const aset = await getAsetCurve(request);

  if(reportData !== undefined && pemasukanAmount !== undefined && pengeluaranAmount !== undefined && aset !== undefined) {
    return {
      status: 200,
      message: "Data dashboard berhasil didapatkan",
      report: reportData.reports,
      pemasukan: pemasukanAmount,
      pengeluaran: pengeluaranAmount,
      aset: aset
    };
  } else {
    return {
      status: 500,
      message: "Data dashboard gagal didapatkan",
    }
  }
}

export default {
  report,
  getDashboardData
};