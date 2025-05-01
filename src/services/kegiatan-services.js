import { prismaClient } from "../application/database.js";
import { createKegiatanSchema, deleteKegiatanSchema, updateKegiatanSchema } from "../validation/kegiatan-validation.js";
import { getCategorySchema } from "../validation/pemasukan-validation.js";
import { validate } from "../validation/validation.js";
import mosqueServices from "./mosque-services.js";
import path from 'path';
import jwt from 'jsonwebtoken'
import fileServices from "./file-services.js";

const createKegiatan = async (requestData, requestFiles) => {
  requestData = validate(createKegiatanSchema, requestData);
  
  const masjidId = await mosqueServices.getMasjidId(requestData.user_id);
  if(masjidId.status) {
    return masjidId;
  }
  
  const documentPath = requestFiles?.document ? path.join('activity/documents', requestFiles.document[0].filename) : "";
  const imagePath = requestFiles?.image ? path.join('activity/images', requestFiles.image[0].filename) : "";

  const date = new Date(requestData.date).toISOString();
  const datePart = date.split('T')[0];
  const dateTime = new Date(`${datePart}T${requestData.time}:00Z`);
  
  const saveKegiatan = await prismaClient.activityInformations.create({
    data: {
      date: dateTime,
      address: requestData.address,
      name: requestData.name,
      description: requestData.description,
      pic: requestData.pic,
      masjid_id: masjidId,
      image: imagePath,
      document: documentPath,
      video_documentation: requestData.video_documentation || ""
    }
  });

  if(saveKegiatan) {
    return {
      message: "Kegiatan Masjid berhasil didata",
      status: 200
    };
  } else {
    return {
      message: "Kegiatan Masjid gagal tersimpan, coba lagi.",
      status: 400
    };
  }
}

const getKegiatan = async (request) => {
  request = validate(getCategorySchema, request);
  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId;
  }

  const kegiatanMasjid = await prismaClient.activityInformations.findMany({
    where: {
      masjid_id: masjidId
    },
    select: {
      id: true,
      name: true,
      date: true,
      pic: true,
      address: true,
      image: true
    }
  });

  if(kegiatanMasjid) {
    return {
      message: "Kegiatan Masjid berhasil didapatkan",
      status: 200,
      activity: kegiatanMasjid
    };
  } else {
    return {
      message: "Kegiatan Masjid gagal didapatkan. Coba lagi",
      status: 400
    };
  }
}

const detailKegiatan = async (request) => {
  request = validate(deleteKegiatanSchema, request);
  const kegiatan = await prismaClient.activityInformations.findFirst({
    where: {
      id: request.kegiatan_id
    }, 
    select: {
      image: true,
      document: true,
      id: true,
      name: true,
      date: true,
      address: true,
      description: true,
      pic: true,
      video_documentation: true
    }
  });
  
  if(kegiatan) {
    const newDate = new Date(kegiatan.date).toISOString().split("T")[0];
    const time = `${new Date(kegiatan.date).getUTCHours().toString().padStart(2, "0")}:${new Date(kegiatan.date).getUTCMinutes().toString().padStart(2, "0")}`;
    const detailKegiatanWithTime = {...kegiatan, time, date: newDate};
    return {
      message: "Kegiatan Masjid berhasil didapatkan",
      status: 200,
      activity: detailKegiatanWithTime
    };
  } else {
    return {
      message: "Kegiatan Masjid gagal didapatkan",
      status: 500
    };
  }

}

const editKegiatan = async (requestData, requestFiles) => {
  requestData = validate(updateKegiatanSchema, requestData);

  const data = await prismaClient.activityInformations.findFirst({
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

  const documentPath = requestFiles?.document ? path.join('activity/documents', requestFiles.document[0].filename) : data.document;
  const imagePath = requestFiles?.image ? path.join('activity/images', requestFiles.image[0].filename) : data.image;

  if(requestFiles.document) {
    const deleteDocument = fileServices.deleteFile(data.document);
    if(deleteDocument.status === 500) return deleteDocument;
  }
  
  if(requestFiles.image) {
    const deleteImage = fileServices.deleteFile(data.image);
    if(deleteImage.status == 500) return deleteImage;
  }

  const date = new Date(requestData.date).toISOString();
  const datePart = date.split('T')[0];
  const dateTime = new Date(`${datePart}T${requestData.time}:00Z`);

  const saveKegiatan = await prismaClient.activityInformations.update({
    where: {
      id: Number(requestData.id)
    },
    data: {
      date: dateTime,
      address: requestData.address,
      name: requestData.name,
      description: requestData.description,
      pic: requestData.pic,
      masjid_id: data.masjid_id,
      image: imagePath,
      document: documentPath,
      video_documentation: requestData.video_documentation || ""
    }
  });

  if(saveKegiatan) {
    return {
      message: "Kegiatan Masjid berhasil diubah",
      status: 200
    };
  } else {
    return {
      message: "Kegiatan Masjid gagal diubah, coba lagi.",
      status: 400
    };
  }
}

const deleteKegiatan = async (request) => {
  request = validate(deleteKegiatanSchema, request);

  const kegiatan = await prismaClient.activityInformations.findFirst({
    where: {
      id: request.kegiatan_id
    }
  });

  const deleteDocument = fileServices.deleteFile(kegiatan.document);
  if(deleteDocument.status === 500) return deleteDocument;

  const deleteImage = fileServices.deleteFile(kegiatan.image);
  if(deleteImage.status == 500) return deleteImage;

  const deleteKegiatanData = await prismaClient.activityInformations.delete({
    where: {
      id: request.kegiatan_id
    }
  });

  if(deleteKegiatanData) {
    return {
      status: 200,
      message: "Berhasil menghapus kegiatan"
    }
  } else {
    return {
      status: 500,
      message: "Gagal menghapus kegiatan"
    }
  }
}

const currentByMasjidId = async (id) => {
  const masjid_id = jwt.verify(id, process.env.SECRET_KEY);
  if(!masjid_id) {
    return {
      message: "Masjid tidak ditemukan",
      status: 400
    };
  }
  
  const kegiatan = await prismaClient.activityInformations.findMany({
    where: {
      masjid_id: Number(masjid_id)
    }
  });
  
  if(kegiatan) {
    return {
      message: "Kegiatan Masjid berhasil didapatkan",
      status: 200,
      activity: kegiatan
    };
  } else {
    return {
      message: "Kegiatan Masjid gagal didapatkan",
      status: 500
    };
  }
}

export default {
  createKegiatan,
  getKegiatan,
  detailKegiatan,
  editKegiatan,
  deleteKegiatan,
  currentByMasjidId
}