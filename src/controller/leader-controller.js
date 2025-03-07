import mosqueServices from "../services/mosque-services.js"
import userServices from "../services/user-services.js";

const getJamaahMasjid = async (req, res) => {
  try {
    const jamaah = await mosqueServices.getJamaah(decodeURIComponent(req.params.id));
    return res.status(200).json({
      jamaah: jamaah
    });
  } catch (e) {
    return res.status(500).json({
      message: "Gagal mendapatkan daftar jamaah masjid!"
    });
  }
}

const updateUserRole = async (req, res) => {
  try {
    const user = await userServices.updateUserRole(req.body);
    return res.status(user.status).json({
      message: user.message
    });
  } catch (e) {
    return res.status(500).json({
      message: "Gagal mengubah role admin atau jamaah!"
    });
  }
}

export default {
  getJamaahMasjid,
  updateUserRole
}