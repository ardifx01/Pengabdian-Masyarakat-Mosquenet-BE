import asetServices from "../services/aset-services.js";
import dashboardServices from "../services/dashboard-services.js";
import kegiatanServices from "../services/kegiatan-services.js";
import paymentServices from "../services/payment-services.js";

const asetAdd = async (req, res) => {
  try {
    const addAssetResponse = await asetServices.createAset(req.body);
    return res.status(addAssetResponse.status).json(addAssetResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal menambahkan aset."
    })
  }
}

const asetGet = async (req, res) => {
  try {
    const getAssetResponse = await asetServices.getAset(req.body);
    return res.status(getAssetResponse.status).json(getAssetResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendapatkan aset."
    })
  }
}

const asetUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updateAssetResponse = await asetServices.updateAset({...req.body, asset_id: id});
    return res.status(updateAssetResponse.status).json(updateAssetResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mengubah aset."
    })
  }
}

const asetDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAssetResponse = await asetServices.deleteAset({ asset_id: id });
    return res.status(deleteAssetResponse.status).json(deleteAssetResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal menghapus aset."
    })
  }
}

const kegiatanAdd = async (req, res) => {
  try {
    const createKegiatanResponse = await kegiatanServices.createKegiatan(req.body, req.files);
    return res.status(createKegiatanResponse.status).json(createKegiatanResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal menambahkan kegiatan."
    })
  }
}

const kegiatanGet = async (req, res) => {
  try {
    const getActivityResponse = await kegiatanServices.getKegiatan(req.body);
    return res.status(getActivityResponse.status).json(getActivityResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendapatkan kegiatan."
    });
  }
}

const kegiatanDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const detailKegiatanResponse = await kegiatanServices.detailKegiatan({ kegiatan_id: id });
    return res.status(detailKegiatanResponse.status).json(detailKegiatanResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendapatkan detail kegiatan."
    })
  }
}

const kegiatanUpdate = async (req, res) => {
  try {
    const editKegiatanResponse = await kegiatanServices.editKegiatan(req.body, req.files);
    return res.status(editKegiatanResponse.status).json(editKegiatanResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mengubah kegiatan."
    })
  }
}

const kegiatanDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteKegiatanResponse = await kegiatanServices.deleteKegiatan({kegiatan_id: id});
    return res.status(deleteKegiatanResponse.status).json(deleteKegiatanResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal menghapus kegiatan."
    })
  }
}

const getDashboardData = async (req, res) => {
  try {
    const getDashboardResponse = await dashboardServices.getDashboardData(req.body);
    return res.status(getDashboardResponse.status).json(getDashboardResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendapatkan data dashboard."
    })
  }
}

const kasPayment = async (req, res) => {
  try {
    const getPaymentResponse = await paymentServices.createKasPayment(req.body);
    return res.status(getPaymentResponse.status).json(getPaymentResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendapatkan QR Code Pembayaran Kas."
    })
  }
}

const paymentCallback = async (req, res) => {
  try {
    const getCallbackResponse = await paymentServices.paymentCallback(req.body);
    return res.status(getCallbackResponse.status).json(getCallbackResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal memverifikasi pembayaran."
    })
  }
}

const checkKasPayment = async (req, res) => {
  try {
    const getVerifyPaymentResponse = await paymentServices.checkKasPayment(req.params);
    return res.status(getVerifyPaymentResponse.status).json(getVerifyPaymentResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal memverifikasi pembayaran."
    })
  }
}

export default {
  asetAdd,
  asetGet,
  asetUpdate,
  asetDelete,
  kegiatanAdd,
  kegiatanGet,
  kegiatanDetail,
  kegiatanUpdate,
  kegiatanDelete,
  getDashboardData,
  kasPayment,
  paymentCallback,
  checkKasPayment
};