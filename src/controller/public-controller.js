import province from "../../Data/province.js";
import cityorregency from "../../Data/cityorregency.js";
import subdistrict from "../../Data/subdistrict.js";
import ward from "../../Data/ward.js";
import mosqueServices from "../services/mosque-services.js";
import kegiatanServices from "../services/kegiatan-services.js";

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

export default {
    getProvinceList,
    getCityOrRegencyList,
    getSubdistrictList,
    getWardList,
    getMosqueList,
    getMosqueByJamaah,
    getMosqueById,
    getKegiatan,
}