import pemasukanServices from "../services/pemasukan-services.js";
import pengeluaranServices from "../services/pengeluaran-services.js";
import dashboardServices from "../services/dashboard-services.js";
import accountBankServices from "../services/account-bank-services.js";
import donationServices from "../services/donation-services.js";

const addPemasukanCategory = async (req, res) => {
  try {
    const categoryAddResponse = await pemasukanServices.addCategory({ ...req.body, user_id: req.headers.authorization });
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
    const getCategoriesResponse = await pemasukanServices.getCategory({ user_id: req.headers.authorization });
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
    const createIncomeResponse = await pemasukanServices.addIncome({ ...req.body, user_id: req.headers.authorization });
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
    const getIncomeResponse = await pemasukanServices.getIncome({...req.body, user_id: req.headers.authorization });
    return res.status(getIncomeResponse.status).json(getIncomeResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendapatkan daftar pemasukan."
    });
  }
}

const updatePemasukan = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("test");
    const getOutcomeResponse = await pemasukanServices.updateIncome({ id, ...req.body });
    return res.status(getOutcomeResponse.status).json(getOutcomeResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mengubah data pengeluaran."
    });
  }
}

const deletePemasukan = async (req, res) => {
  try {
    const id = req.params.id;
    const getOutcomeResponse = await pemasukanServices.deleteIncome({ id });
    return res.status(getOutcomeResponse.status).json(getOutcomeResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal menghapus data pengeluaran."
    });
  }
}

const addReasonPengeluaran = async (req, res) => {
  try {
    const reasonAddResponse = await pengeluaranServices.addReason({ ...req.body, user_id: req.headers.authorization });
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
    const getPengeluaranReasons = await pengeluaranServices.getReason({ user_id: req.headers.authorization });
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
    const createOutcomeResponse = await pengeluaranServices.addOutcome({ ...req.body, user_id: req.headers.authorization });
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
    const getOutcomeResponse = await pengeluaranServices.getOutcome({ user_id: req.headers.authorization });
    return res.status(getOutcomeResponse.status).json(getOutcomeResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendapatkan daftar pengeluaran."
    });
  }
}

const updatePengeluaran = async (req, res) => {
  try {
    const id = req.params.id;
    const getOutcomeResponse = await pengeluaranServices.updateOutcome({ id, ...req.body });
    return res.status(getOutcomeResponse.status).json(getOutcomeResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mengubah data pengeluaran."
    });
  }
}

const deletePengeluaran = async (req, res) => {
  try {
    const id = req.params.id;
    const getOutcomeResponse = await pengeluaranServices.deleteOutcome({ id });
    return res.status(getOutcomeResponse.status).json(getOutcomeResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal menghapus data pengeluaran."
    });
  }
}

const getReports = async (req, res) => {
  try {
    const getReportResponse = await dashboardServices.report({ user_id: req.headers.authorization });
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
    const getCreateAccountBankResponse = await accountBankServices.createPurpose({ ...req.body, user_id: req.headers.authorization });
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
    const getPurposeAccountBankResponse = await accountBankServices.getPurpose(req.headers.authorization);
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
    const createAccountBankResponse = await accountBankServices.createAccount(req.body, req.files);
    return res.status(createAccountBankResponse.status).json(createAccountBankResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendaftarkan akun bank."
    });
  }
}

const deleteAccountBank = async (req, res) => {
  try {
    const deleteAccountBankResponse = await accountBankServices.deleteAccount(req.params);
    return res.status(deleteAccountBankResponse.status).json(deleteAccountBankResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal menghapus akun bank."
    });
  }
}

const updateAccountBank = async (req, res) => {
  try {
    const updateAccountBankResponse = await accountBankServices.updateAccount({...req.params, ...req.body}, req.files);
    return res.status(updateAccountBankResponse.status).json(updateAccountBankResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mengubah akun bank."
    });
  }
}

const getAccountBank = async (req, res) => {
  try {
    const getAccountBankResponse = await accountBankServices.getAccount(req.headers.authorization);
    return res.status(getAccountBankResponse.status).json(getAccountBankResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendapatkan daftar rekening bank."
    });
  }
}

const updateDonation = async (req, res) => {
  try {
    const changeDonationResponse = await donationServices.changeDonationStatus({
      ...req.params,
      ...req.body
    });
    return res.status(changeDonationResponse.status).json(changeDonationResponse);
  } catch (e) {
    return res.status(500).json({
      message: "Gagal mengubah status donasi."
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
  deleteAccountBank,
  updateAccountBank,
  getAccountBank,
  updateDonation,
  deletePengeluaran,
  updatePengeluaran,
  deletePemasukan,
  updatePemasukan
};