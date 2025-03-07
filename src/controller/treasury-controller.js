import pemasukanServices from "../services/pemasukan-services.js";
import pengeluaranServices from "../services/pengeluaran-services.js";
import dashboardServices from "../services/dashboard-services.js";
import accountBankServices from "../services/account-bank-services.js";

const addPemasukanCategory = async (req, res) => {
  try {
    const categoryAddResponse = await pemasukanServices.addCategory(req.body);
    return res.status(categoryAddResponse.status).json(categoryAddResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal menambahkan kategori pemasukan."
    })
  }
}

const getPemasukanCategory = async (req, res) => {
  try {
    const getCategoriesResponse = await pemasukanServices.getCategory(req.body);
    return res.status(getCategoriesResponse.status).json(getCategoriesResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendapatkan kategori pemasukan."
    });
  }
}

const addPemasukan = async (req, res) => {
  try {
    const createIncomeResponse = await pemasukanServices.addIncome(req.body);
    return res.status(createIncomeResponse.status).json(createIncomeResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal menambahkan pemasukan! Coba lagi"
    })
  }
}

const getPemasukan = async (req, res) => {
  try {
    const getIncomeResponse = await pemasukanServices.getIncome(req.body);
    return res.status(getIncomeResponse.status).json(getIncomeResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendapatkan daftar pemasukan."
    });
  }
}

const addReasonPengeluaran = async (req, res) => {
  try {
    const reasonAddResponse = await pengeluaranServices.addReason(req.body);
    return res.status(reasonAddResponse.status).json(reasonAddResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal menambahkan alasan pengeluaran."
    })
  }
}

const getReasonPengeluaran = async (req, res) => {
  try {
    const getPengeluaranReasons = await pengeluaranServices.getReason(req.body);
    return res.status(getPengeluaranReasons.status).json(getPengeluaranReasons);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendapatkan alasan pengeluaran."
    });
  }
}

const addPengeluaran = async (req, res) => {
  try {
    const createOutcomeResponse = await pengeluaranServices.addOutcome(req.body);
    return res.status(createOutcomeResponse.status).json(createOutcomeResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendata pengeluaran! Coba lagi"
    })
  }
}

const getPengeluaran = async (req, res) => {
  try {
    const getOutcomeResponse = await pengeluaranServices.getOutcome(req.body);
    return res.status(getOutcomeResponse.status).json(getOutcomeResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendapatkan daftar pengeluaran."
    });
  }
}

const getReports = async (req, res) => {
  try {
    const getReportResponse = await dashboardServices.report(req.body);
    return res.status(getReportResponse.status).json(getReportResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendapatkan laporan keuangan."
    });
  }
}

const createPurposeofAccountBank = async (req, res) => {
  try {
    const getCreateAccountBankResponse = await accountBankServices.createPurpose(req.body);
    return res.status(getCreateAccountBankResponse.status).json(getCreateAccountBankResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal membuat tujuan akun bank."
    });
  }
}

const getPurposeofAccountBank = async (req, res) => {
  try {
    const getPurposeAccountBankResponse = await accountBankServices.getPurpose(req.body.user_id);
    return res.status(getPurposeAccountBankResponse.status).json(getPurposeAccountBankResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendapatkan tujuan akun bank."
    });
  }
}

const createAccountBank = async (req, res) => {
  try {
    console.log(req.body);
    const createAccountBankResponse = await accountBankServices.createAccount(req.body);
    return res.status(createAccountBankResponse.status).json(createAccountBankResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendaftarkan akun bank."
    });
  }
}

const getAccountBank = async (req, res) => {
  try {
    const getAccountBankResponse = await accountBankServices.getAccount(req.body.user_id);
    return res.status(getAccountBankResponse.status).json(getAccountBankResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendapatkan daftar rekening bank."
    });
  }
}

export default {
  addPemasukanCategory,
  getPemasukanCategory,
  addPemasukan,
  getPemasukan,
  addReasonPengeluaran,
  getReasonPengeluaran,
  addPengeluaran,
  getPengeluaran,
  getReports,
  createPurposeofAccountBank,
  getPurposeofAccountBank,
  createAccountBank,
  getAccountBank
};