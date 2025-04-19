import express from "express";
import multer from 'multer';
import path from 'path';
import secretaryController from "../controller/secretary-controller.js";

const secretaryRouter = new express.Router();

const storage = multer.diskStorage({ 
  destination: function (req, file, callback) {
    console.log(req.path);
    if(req.path.includes('/api/archive/document') && file.mimetype === "application/pdf") {
      callback(null, path.join('archive/documents'));
    } else if (req.path.includes('/api/archive/template') && file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
      callback(null, path.join('archive/templates'));
    }
  },
  filename: function (req, file, callback) {
    const fileName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, fileName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, callback) => {
  const allowedDocumentTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]; 

  if (file.fieldname === "document" && allowedDocumentTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(
      new Error(
        `Format file tidak didukung: ${file.originalname}. Hanya menerima DOCX untuk template atau PDF untuk dokumen.`
      ),
      false
    );
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
});

secretaryRouter.post(
  '/api/archive/template',
  upload.fields([{ 
    name: 'document', 
    maxCount: 1 
  }]),
  secretaryController.createTemplateDocument
);
secretaryRouter.post('/api/archive/templates', secretaryController.getTemplateDocument);
secretaryRouter.put(
  '/api/archive/template/:id',
  upload.fields([{ 
    name: 'document', 
    maxCount: 1 
  }]),
  secretaryController.changeTemplateDocument
);
secretaryRouter.delete('/api/archive/template/:id', secretaryController.deleteTemplateDocument);

secretaryRouter.post(
  '/api/archive/document',
  upload.fields([{ 
    name: 'document', 
    maxCount: 1 
  }]),
  secretaryController.createDocument
);
secretaryRouter.post('/api/archive/documents', secretaryController.getDocuments);
secretaryRouter.put(
  '/api/archive/document/:id',
  upload.fields([{ 
    name: 'document', 
    maxCount: 1 
  }]),
  secretaryController.changeDocument
);
secretaryRouter.delete('/api/archive/document/:id', secretaryController.deleteDocument);


export {
  secretaryRouter
}
