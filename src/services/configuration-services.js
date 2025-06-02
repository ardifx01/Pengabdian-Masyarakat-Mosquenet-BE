import { prismaClient } from "../application/database.js";
import { getConfigurationSchema, updateConfigurationSchema } from "../validation/configuration-validation.js.js";
import { validate } from "../validation/validation.js";
import mosqueServices from "./mosque-services.js";

const getMosqueConfiguration = async (request) => {
  request = validate(getConfigurationSchema, request);
  
  const masjidId = await mosqueServices.getMasjidId(request)
  if(masjidId.status) {
    return masjidId;
  }

  const configuration = await prismaClient.configuration.findFirst({
    where: { masjid_id: masjidId },
    select: {
      is_article_used: true,
      is_donation_used: true,
      is_template_documents_used: true,
      is_asset_outcomes_connected: true,
      is_activity_outcomes_connected: true,
      id: false,
      masjid_id: false
    }
  });

  if(configuration) {
    return {
      message: "Pengaturan sistem administrasi masjid berhasil didapatkan",
      status: 200,
      configuration: configuration
    };
  } else {
    return {
      message: "Pengaturan sistem administrasi masjid gagal didapatkan., coba lagi.",
      status: 500
    };
  }
}

const articleUsedConfiguration = async (request) => {
  request = validate(updateConfigurationSchema, request);
  
  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId;
  }

  const updateConfiguration = await prismaClient.configuration.update({
    where: { masjid_id: masjidId },
    data: { is_article_used: request.config }
  });

  if(updateConfiguration) {
    return {
      message: "Pengaturan sistem administrasi masjid berhasil diubah",
      status: 200,
    };
  } else {
    return {
      message: "Pengaturan sistem administrasi masjid gagal diubah., coba lagi.",
      status: 500
    };
  }
}

const donationUsedConfiguration = async (request) => {
  request = validate(updateConfigurationSchema, request);
  
  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId;
  }

  const updateConfiguration = await prismaClient.configuration.update({
    where: { masjid_id: masjidId },
    data: { is_donation_used: request.config }
  });

  if(updateConfiguration) {
    return {
      message: "Pengaturan sistem administrasi masjid berhasil diubah",
      status: 200,
    };
  } else {
    return {
      message: "Pengaturan sistem administrasi masjid gagal diubah., coba lagi.",
      status: 500
    };
  }
}

const connectedAssetOutcomesConfiguration = async (request) => {
  request = validate(updateConfigurationSchema, request);
  
  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId;
  }

  const updateConfiguration = await prismaClient.configuration.update({
    where: { masjid_id: masjidId },
    data: { is_asset_outcomes_connected: request.config }
  });

  console.log(updateConfiguration, request.config);

  if(updateConfiguration) {
    return {
      message: "Pengaturan sistem administrasi masjid berhasil diubah",
      status: 200,
    };
  } else {
    return {
      message: "Pengaturan sistem administrasi masjid gagal diubah., coba lagi.",
      status: 500
    };
  }
}

const connectedActivityOutcomesConfiguration = async (request) => {
  request = validate(updateConfigurationSchema, request);
  
  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId;
  }

  const updateConfiguration = await prismaClient.configuration.update({
    where: { masjid_id: masjidId },
    data: { is_activity_outcomes_connected: request.config }
  });

  if(updateConfiguration) {
    return {
      message: "Pengaturan sistem administrasi masjid berhasil diubah",
      status: 200,
    };
  } else {
    return {
      message: "Pengaturan sistem administrasi masjid gagal diubah., coba lagi.",
      status: 500
    };
  }
}

const templateUsedConfiguration = async (request) => {
  request = validate(updateConfigurationSchema, request);
  
  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId;
  }

  const updateConfiguration = await prismaClient.configuration.update({
    where: { masjid_id: masjidId },
    data: { is_template_documents_used: request.config }
  });

  if(updateConfiguration) {
    return {
      message: "Pengaturan sistem administrasi masjid berhasil diubah",
      status: 200,
    };
  } else {
    return {
      message: "Pengaturan sistem administrasi masjid gagal diubah., coba lagi.",
      status: 500
    };
  }
}

export default {
  getMosqueConfiguration,
  articleUsedConfiguration,
  donationUsedConfiguration,
  connectedActivityOutcomesConfiguration,
  connectedAssetOutcomesConfiguration,
  templateUsedConfiguration
}