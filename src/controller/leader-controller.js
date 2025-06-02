import configurationServices from "../services/configuration-services.js";
import mosqueServices from "../services/mosque-services.js"
import userServices from "../services/user-services.js";

const getJamaahMasjid = async (req, res) => {
  try {
    const jamaah = await mosqueServices.getJamaah(req.headers.authorization);
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

const getConfiguration = async (req, res) => {
  try {
    const getConfigurationResponse = await configurationServices.getMosqueConfiguration(req.headers.authorization);
    return res.status(getConfigurationResponse.status).json(getConfigurationResponse);
  } catch (e) {
    return res.status(500).json({
      message: "Gagal mendapatkan pengaturan sistem! Coba lagi"
    });
  }
}

const updateArticleUsedConfiguration = async (req, res) => {
  try {
    const updateConfigurationResponse = await configurationServices.articleUsedConfiguration({user_id: req.headers.authorization, ...req.body});
    return res.status(updateConfigurationResponse.status).json(updateConfigurationResponse);
  } catch (e) {
    return res.status(500).json({
      message: "Gagal mengubah pengaturan untuk menggunakan atau menonaktifkan fitur! Coba lagi"
    });
  }
}

const updateDonationUsedConfiguration = async (req, res) => {
  try {
    const updateConfigurationResponse = await configurationServices.donationUsedConfiguration({user_id: req.headers.authorization, ...req.body});
    return res.status(updateConfigurationResponse.status).json(updateConfigurationResponse);
  } catch (e) {
    return res.status(500).json({
      message: "Gagal mengubah pengaturan untuk menggunakan atau menonaktifkan fitur! Coba lagi"
    });
  }
}

const updateAssetOutcomeConnected = async (req, res) => {
  try {
    console.log("just data", req.body);
    const updateConfigurationResponse = await configurationServices.connectedAssetOutcomesConfiguration({user_id: req.headers.authorization, ...req.body});
    return res.status(updateConfigurationResponse.status).json(updateConfigurationResponse);
  } catch (e) {
    return res.status(500).json({
      message: "Gagal mengubah pengaturan untuk menggunakan atau menonaktifkan fitur! Coba lagi"
    });
  }
}

const updateActivityOutcomeConnected = async (req, res) => {
  try {
    const updateConfigurationResponse = await configurationServices.connectedActivityOutcomesConfiguration({user_id: req.headers.authorization, ...req.body});
    return res.status(updateConfigurationResponse.status).json(updateConfigurationResponse);
  } catch (e) {
    return res.status(500).json({
      message: "Gagal mengubah pengaturan untuk menggunakan atau menonaktifkan fitur! Coba lagi"
    });
  }
}

const updateTemplateUsedConfiguration = async (req, res) => {
  try {
    const updateConfigurationResponse = await configurationServices.templateUsedConfiguration({user_id: req.headers.authorization, ...req.body});
    return res.status(updateConfigurationResponse.status).json(updateConfigurationResponse);
  } catch (e) {
    return res.status(500).json({
      message: "Gagal mengubah pengaturan untuk menggunakan atau menonaktifkan fitur! Coba lagi"
    });
  }
}

const verifyUser = async (req, res) => {
  try {
    const updateVerifyUserStatus = await userServices.verifyUser(req.body);
    return res.status(updateVerifyUserStatus.status).json(updateVerifyUserStatus);
  } catch (e) {
    return res.status(500).json({
      message: "Gagal memverifikasi masyarakat. Coba lagi!"
    })
  }
}


export default {
  getJamaahMasjid,
  getConfiguration,
  updateUserRole,
  verifyUser,
  updateActivityOutcomeConnected,
  updateAssetOutcomeConnected,
  updateArticleUsedConfiguration,
  updateDonationUsedConfiguration,
  updateTemplateUsedConfiguration
}