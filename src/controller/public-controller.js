import province from "../../Data/province.js";
import cityorregency from "../../Data/cityorregency.js";
import subdistrict from "../../Data/subdistrict.js";
import ward from "../../Data/ward.js";
import mosqueServices from "../services/mosque-services.js";
import kegiatanServices from "../services/kegiatan-services.js";
import criticsSuggestionServices from "../services/critics-suggestion-services.js";
import accountBankServices from "../services/account-bank-services.js";
import contentServices from "../services/content-services.js";

const getProvinceList = (req, res) => {
    try {
        return res.status(200).json({
            province
        });
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
}

const getCityOrRegencyList = (req, res) => {
    try {
        return res.status(200).json({
            cityorregency
        });
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
}
const getSubdistrictList = (req, res) => {
    try {
        return res.status(200).json({
            subdistrict
        });
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
}
const getWardList = (req, res) => {
    try {
        return res.status(200).json({
            ward
        });
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
}

const getMosqueList = async (req, res) => {
    try {
        const mosques = await mosqueServices.getAll();
        return res.status(200).json({
            mosques
        });
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
}

const getMosqueByJamaah = async (req, res) => {
    try {
        const mosque = await mosqueServices.currentByUser(decodeURIComponent(req.params.id));
        return res.status(200).json({
            mosque: mosque
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            message: e.message
        });
    }
}

const getMosqueById = async (req, res) => {
    try {
        const mosque = await mosqueServices.current(req.params.id);
        return res.status(200).json({
            mosque: mosque
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            message: e.message
        });
    }
}

const getKegiatan = async (req, res) => {
  try {
    const mosque = await kegiatanServices.currentByMasjidId(req.params.id);
    return res.status(mosque.status).json(mosque);
  } catch (e) {
      return res.status(400).json({
          message: "Gagal mendapatkan kegiatan"
      });
  }
}

const getContent = async (req, res) => {
  try {
    const mosque = await contentServices.currentByMasjidId(req.params.id);
    return res.status(mosque.status).json(mosque);
  } catch (e) {
      return res.status(400).json({
          message: "Gagal mendapatkan kegiatan"
      });
  }
}

const receiveCriticsAndSuggestion = async (req, res) => {
  try {
    const saveCriticsResponse = await criticsSuggestionServices.create(req.body);
    return res.status(saveCriticsResponse.status).json(saveCriticsResponse);
  } catch (e) {
      return res.status(500).json({
          message: "Kritik dan saran gagal terkirim. Coba lagi"
      });
  }
}

const getDonationsList = async (req, res) => {
  try {
    const getMosqueDonationsResponse = await accountBankServices.getAccountWithHashedMasjidID(req.params.id);
    return res.status(getMosqueDonationsResponse.status).json(getMosqueDonationsResponse);
  } catch (e) {
    return res.status(500).json({
      message: "Daftar donasi gagal terkirim. Coba lagi"
    });
  }
}

const getDonation = async (req, res) => {
  try {
    if(req.params.id && req.params.donation_id) {
      const getMosqueDonationResponse = await accountBankServices.getDetailAccount(req.params.donation_id);
      return res.status(getMosqueDonationResponse.status).json(getMosqueDonationResponse);
    } else {
      throw Error("Akses Illegal!");
    }
  } catch (e) {
    return res.status(500).json({
      message: "Rekening donasi gagal didapatkan. Coba lagi"
    })
  }
}

const sendDonation = async (req, res) => {
  try {
    if(req.params && req.params.id && req.params.donation_id) {
      const sendMosqueDonationResponse = await accountBankServices.saveDonation(
        {
          ...req.body, 
          masjid_id: req.params.id,
          donation_id: req.params.donation_id
        }, 
        req.files
      );
      return res.status(sendMosqueDonationResponse.status).json(sendMosqueDonationResponse);
    } else {
      throw Error("Akses Illegal!");
    }
  } catch (e) {
    return res.status(500).json({
      message: "Rekening donasi gagal dikirim. Coba lagi"
    })
  }
}

export default {
    getProvinceList,
    getCityOrRegencyList,
    getSubdistrictList,
    getWardList,
    getMosqueList,
    getMosqueByJamaah,
    getMosqueById,
    getKegiatan,
    receiveCriticsAndSuggestion,
    getDonationsList,
    getDonation,
    sendDonation,
    getContent
}