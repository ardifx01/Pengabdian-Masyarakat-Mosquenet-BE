// import animalServices from "../services/animal-services(optional).js";
import asetServices from "../services/aset-services.js";
import contentServices from "../services/content-services.js";
import dashboardServices from "../services/dashboard-services.js";
import kegiatanServices from "../services/kegiatan-services.js";
import paymentServices from "../services/payment-services.js";

const asetAdd = async (req, res) => {
  try {
    const addAssetResponse = await asetServices.createAset({ ...req.body, user_id: req.headers.authorization });
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
    const getAssetResponse = await asetServices.getAset({ user_id: req.headers.authorization });
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
    console.log(req.body);
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
    const createKegiatanResponse = await kegiatanServices.createKegiatan({ ...req.body, user_id: req.headers.authorization }, req.files);
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
    const getActivityResponse = await kegiatanServices.getKegiatan({ user_id: req.headers.authorization });
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
    const editKegiatanResponse = await kegiatanServices.editKegiatan({...req.body, id: req.params.id}, req.files);
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
    const getDashboardResponse = await dashboardServices.getDashboardData({ user_id: req.headers.authorization });
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

const addContent = async (req, res) => {
  try {
    const createContentResponse = await contentServices.createContent({ ...req.body, user_id: req.headers.authorization }, req.files);
    return res.status(createContentResponse.status).json(createContentResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal menambahkan konten."
    })
  }
}

const getContents = async (req, res) => {
  try {
    const getContentsResponse = await contentServices.getContents({ user_id: req.headers.authorization });
    return res.status(getContentsResponse.status).json(getContentsResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendapatkan daftar konten."
    });
  }
}

const getContent = async (req, res) => {
  try {
    const { id } = req.params;
    const getContentResponse = await contentServices.getContent({ content_id: id });
    return res.status(getContentResponse.status).json(getContentResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mendapatkan konten."
    })
  }
}

const updateContent = async (req, res) => {
  try {
    const updateContentResponse = await contentServices.updateContent(req.body, req.files);
    return res.status(updateContentResponse.status).json(updateContentResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal mengubah konten."
    })
  }
}

const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteContentResponse = await contentServices.deleteContent({content_id: id});
    return res.status(deleteContentResponse.status).json(deleteContentResponse);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Gagal menghapus konten."
    })
  }
}

// const addAnimal = async (req, res) => {
//   try {
//     const addAnimalResponse = await animalServices.addAnimal(req.body);
//     return res.status(addAnimalResponse.status).json(addAnimalResponse);
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({
//       message: "Gagal menambahkan hewan kurban."
//     })
//   }
// }

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
  checkKasPayment,
  addContent,
  getContents,
  getContent,
  updateContent,
  deleteContent
  // addAnimal
};