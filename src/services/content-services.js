import { prismaClient } from "../application/database.js";
import { createContentSchema, deleteContentSchema, updateContentSchema } from "../validation/content-validation.js";
import { getCategorySchema } from "../validation/pemasukan-validation.js";
import { validate } from "../validation/validation.js";
import mosqueServices from "./mosque-services.js";
import path from 'path';
import fs from 'fs/promises';
import jwt from 'jsonwebtoken'

const createContent = async (requestData, requestFiles) => {
  requestData = validate(createContentSchema, requestData);
  
  const masjidId = await mosqueServices.getMasjidId(requestData.user_id);
  if(masjidId.status) {
    return masjidId;
  }
  
  const contentPath = requestFiles?.visual_content
    ? path.join('contents', requestFiles.visual_content[0].filename) 
    : requestData.visual_content
    ? requestData.visual_content
    : ""
  
  const saveContent = await prismaClient.contents.create({
    data: {
      masjid_id: masjidId,
      title: requestData.title,
      post_date: new Date(),
      contents: requestData.contents,
      visual_content: contentPath
    }
  });

  if(saveContent) {
    return {
      message: "Konten masjid berhasil dikirim",
      status: 200
    };
  } else {
    return {
      message: "Konten masjid gagal dikirim, coba lagi.",
      status: 400
    };
  }
}

const getContents = async (request) => {
  request = validate(getCategorySchema, request);
  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId;
  }

  const contentsMasjid = await prismaClient.contents.findMany({
    where: {
      masjid_id: masjidId
    },
    select: {
      contents: true,
      post_date: true,
      visual_content: true,
      title: true,
      id: true
    }
  });

  if(contentsMasjid) {
    return {
      message: "Konten masjid berhasil didapatkan",
      status: 200,
      contents: contentsMasjid
    };
  } else {
    return {
      message: "Konten masjid gagal didapatkan. Coba lagi",
      status: 400
    };
  }
}

const getContent = async (request) => {
  request = validate(deleteContentSchema, request);
  const content = await prismaClient.contents.findFirst({
    where: {
      id: request.content_id
    },
    select: {
      contents: true, 
      id: true, 
      title: true, 
      post_date: true, 
      visual_content: true
    }
  });
  
  if(content) {
    return {
      message: "Konten masjid berhasil didapatkan",
      status: 200,
      content: content
    };
  } else {
    return {
      message: "Konten masjid gagal didapatkan",
      status: 500
    };
  }

}

const updateContent = async (requestData, requestFiles) => {
  requestData = validate(updateContentSchema, requestData);

  const data = await prismaClient.contents.findFirst({
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

  const visualContentPath = requestFiles?.visual_content 
    ? path.join('contents', requestFiles.visual_content[0].filename) 
    : requestData.visual_content
    ? requestData.visual_content
    : data.document;

  if(
      (
        (requestFiles.visual_content) || 
        (requestData.visual_content && (requestData.visual_content !== data.visual_content))
      ) && !data.visual_content.includes("www")
  ) {
    const deleteContent = deleteContentFile(data.visual_content);
    if(deleteContent.status === 500) return deleteContent;
  }

  const saveContent = await prismaClient.contents.update({
    where: {
      id: Number(requestData.id)
    },
    data: {
      title: requestData.title,
      contents: requestData.contents,
      visual_content: visualContentPath,
    }
  });

  if(saveContent) {
    return {
      message: "Konten masjid berhasil diubah",
      status: 200
    };
  } else {
    return {
      message: "Konten masjid gagal diubah, coba lagi.",
      status: 400
    };
  }
}

const deleteContentFile = async (filename) => {
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

const deleteContent = async (request) => {
  request = validate(deleteContentSchema, request);

  const content = await prismaClient.contents.findFirst({
    where: {
      id: request.content_id
    }
  });

  if(!content.visual_content.includes("www")) {
    const deleteContentFilePath = deleteContentFile(content.visual_content);
    if(deleteContentFilePath.status === 500) return deleteDocument;
  }

  const deleteContentData = await prismaClient.contents.delete({
    where: {
      id: request.content_id
    }
  });

  if(deleteContentData) {
    return {
      status: 200,
      message: "Berhasil menghapus konten"
    }
  } else {
    return {
      status: 500,
      message: "Gagal menghapus konten"
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
  
  const contents = await prismaClient.contents.findMany({
    where: {
      masjid_id: Number(masjid_id)
    },
    select: {
      contents: true,
      post_date: true,
      visual_content: true,
      title: true,
      id: true
    }
  });
  
  if(contents) {
    return {
      message: "Konten Masjid berhasil didapatkan",
      status: 200,
      contents: contents
    };
  } else {
    return {
      message: "Konten Masjid gagal didapatkan",
      status: 500
    };
  }
}

export default {
  createContent,
  getContents,
  getContent,
  updateContent,
  deleteContent,
  currentByMasjidId
}