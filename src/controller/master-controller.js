import criticsSuggestionServices from "../services/critics-suggestion-services.js";
import mosqueServices from "../services/mosque-services.js";

const getCriticsandSuggestion = async (req, res) => {
  try {
    const criticsAndSuggestionResponse = await criticsSuggestionServices.get();
    return res.status(criticsAndSuggestionResponse.status).json(criticsAndSuggestionResponse);
  } catch (e) {
    return res.status(500).json({
      message: "Gagal mendapatkan daftar kritik yang diberikan!"
    });
  }
}

const getAllMasjid = async (req, res) => {
  try {
    const getAllMasjidResponse = await mosqueServices.getAllWithVerified();
    return res.status(getAllMasjidResponse.status).json({
      mosques: getAllMasjidResponse.responseData
    });
  } catch (e) {
    return res.status(500).json({
      message: "Gagal mendapatkan daftar masjid!"
    });
  }
}

const verifyMasjid = async (req, res) => {
  try {
    const verifyMasjidResponse = await mosqueServices.verifiedMasjid({...req.body, ...req.params});
    return res.status(verifyMasjidResponse.status).json(verifyMasjidResponse);
  } catch (e) {
    return res.status(500).json({
      message: "Gagal memverifikasi masjid!"
    });
  }
}


export default {
  getCriticsandSuggestion,
  getAllMasjid,
  verifyMasjid
}