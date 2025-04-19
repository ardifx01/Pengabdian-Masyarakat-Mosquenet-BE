import { validate } from "../validation/validation.js";
import { createTemplateSchema, deleteTemplateSchema, getTemplateSchema, updateTemplateSchema } from "../validation/template-document-validation.js";
import { prismaClient } from "../application/database.js";
import mosqueServices from "./mosque-services.js";
import path from 'path';
import fs from 'fs/promises';
import fileServices from "./file-services.js";

const createTemplate = async (requestData, requestFiles) => {
  requestData = validate(createTemplateSchema, requestData);
  
  const masjidId = await mosqueServices.getMasjidId(requestData.user_id);
  if(masjidId.status) {
    return masjidId;
  }
  
  const documentPath = requestFiles?.document ? path.join('archive/templates', requestFiles.document[0].filename) : "";
  
  const saveTemplates = await prismaClient.mosqueLetterTemplate.create({
    data: {
      type: requestData.type,
      document: documentPath,
      masjid_id: masjidId
    }
  });

  if(saveTemplates) {
    return {
      message: "Template Dokumen Masjid berhasil disimpan",
      status: 200
    };
  } else {
    return {
      message: "Template Dokumen Masjid gagal tersimpan, coba lagi.",
      status: 400
    };
  }
}

const getTemplates = async (request) => {
  request = validate(getTemplateSchema, request);
  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId;
  }

  const archiveTemplates = await prismaClient.mosqueLetterTemplate.findMany({
    where: {
      masjid_id: masjidId
    },
    select: {
      document: true,
      id: true,
      type: true,
    }
  });

  if(archiveTemplates) {
    return {
      message: "Template Dokumen Masjid berhasil didapatkan",
      status: 200,
      templates: archiveTemplates
    };
  } else {
    return {
      message: "Template Dokumen Masjid gagal didapatkan. Coba lagi",
      status: 400
    };
  }
}

const editTemplate = async (requestData, requestFiles) => {
  requestData = validate(updateTemplateSchema, requestData);

  const data = await prismaClient.mosqueLetterTemplate.findFirst({
    where: {
      id: Number(requestData.id)
    }
  });

  if(!data) {
    return {
      status: 400,
      message: "Akses illegal"
    };
  }

  const documentPath = requestFiles?.document ? path.join('archive/templates', requestFiles.document[0].filename) : data.document;

  if(requestFiles.document) {
    const deleteDocument = fileServices.deleteFile(data.document);
    if(deleteDocument.status === 500) return deleteDocument;
  }

  const saveTemplate = await prismaClient.mosqueLetterTemplate.update({
    where: {
      id: Number(requestData.id)
    },
    data: {
      type: requestData.type,
      document: documentPath
    }
  });

  if(saveTemplate) {
    return {
      message: "Template Dokumen Masjid berhasil diubah",
      status: 200
    };
  } else {
    return {
      message: "Template Dokumen Masjid gagal diubah, coba lagi.",
      status: 400
    };
  }
}

const deleteTemplate = async (request) => {
  request = validate(deleteTemplateSchema, request);

  const template = await prismaClient.mosqueLetterTemplate.findFirst({
    where: {
      id: request.id
    }
  });

  const deleteDocument = fileServices.deleteFile(template.document);
  if(deleteDocument.status === 500) return deleteDocument;

  const deleteTemplateData = await prismaClient.mosqueLetterTemplate.delete({
    where: {
      id: request.id
    }
  });

  if(deleteTemplateData) {
    return {
      status: 200,
      message: "Berhasil menghapus template dokumen"
    }
  } else {
    return {
      status: 500,
      message: "Gagal menghapus template dokumen"
    }
  }
}

export default {
  createTemplate,
  getTemplates,
  editTemplate,
  deleteTemplate
}