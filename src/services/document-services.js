import { validate } from "../validation/validation.js";
import { createDocumentSchema, deleteDocumentSchema, getDocumentSchema, updateDocumentSchema } from "../validation/document-validation.js";
import { prismaClient } from "../application/database.js";
import mosqueServices from "./mosque-services.js";
import path from 'path';
import fs from 'fs/promises';

const createDocument = async (requestData, requestFiles) => {
  requestData = validate(createDocumentSchema, requestData);
  
  const masjidId = await mosqueServices.getMasjidId(requestData.user_id);
  if(masjidId.status) {
    return masjidId;
  }
  
  const documentPath = requestFiles?.document ? path.join('archive/documents', requestFiles.document[0].filename) : "";
  
  const saveDocument = await prismaClient.mosqueArsips.create({
    data: {
      title: requestData.title,
      document: documentPath,
      masjid_id: masjidId
    }
  });

  if(saveDocument) {
    return {
      message: "Dokumen Masjid berhasil disimpan",
      status: 200
    };
  } else {
    return {
      message: "Dokumen Masjid gagal tersimpan, coba lagi.",
      status: 400
    };
  }
}

const getDocuments = async (request) => {
  request = validate(getDocumentSchema, request);
  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId;
  }

  const archive = await prismaClient.mosqueArsips.findMany({
    where: {
      masjid_id: masjidId
    },
    select: {
      document: true,
      id: true,
      title: true,
    }
  });

  if(archive) {
    return {
      message: "Dokumen Masjid berhasil didapatkan",
      status: 200,
      documents: archive
    };
  } else {
    return {
      message: "Dokumen Masjid gagal didapatkan. Coba lagi",
      status: 400
    };
  }
}

const deleteDocumentArchive = async (filename) => {
  try {
    const absolutePath = path.join(process.cwd(), filename);
    await fs.unlink(absolutePath);
    return {
      status: 200,
      message: "Berhasil menghapus file"
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Gagal menghapus file"
    };
  }
}

const editDocument = async (requestData, requestFiles) => {
  requestData = validate(updateDocumentSchema, requestData);

  const data = await prismaClient.mosqueArsips.findFirst({
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

  const documentPath = requestFiles?.document ? path.join('archive/documents', requestFiles.document[0].filename) : data.document;

  if(requestFiles.document) {
    const deleteDocument = deleteDocumentArchive(data.document);
    if(deleteDocument.status === 500) return deleteDocument;
  }

  const saveDocument = await prismaClient.mosqueArsips.update({
    where: {
      id: Number(requestData.id)
    },
    data: {
      title: requestData.title,
      document: documentPath
    }
  });

  if(saveDocument) {
    return {
      message: "Dokumen Masjid berhasil diubah",
      status: 200
    };
  } else {
    return {
      message: "Dokumen Masjid gagal diubah, coba lagi.",
      status: 400
    };
  }
}

const deleteDocument = async (request) => {
  request = validate(deleteDocumentSchema, request);

  const template = await prismaClient.mosqueArsips.findFirst({
    where: {
      id: request.id
    }
  });

  const deleteDocument = deleteDocumentArchive(template.document);
  if(deleteDocument.status === 500) return deleteDocument;

  const deleteDocumentData = await prismaClient.mosqueArsips.delete({
    where: {
      id: request.id
    }
  });

  if(deleteDocumentData) {
    return {
      status: 200,
      message: "Berhasil menghapus dokumen"
    }
  } else {
    return {
      status: 500,
      message: "Gagal menghapus dokumen"
    }
  }
}

export default {
  createDocument,
  getDocuments,
  editDocument,
  deleteDocument
}