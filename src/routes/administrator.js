import express from "express";
import adminController from "../controller/admin-controller.js";
import multer from "multer";
import path from 'path';

const adminRouter = new express.Router();

const storage = multer.diskStorage({ 
  destination: function (req, file, callback) {
    const fileType = file.mimetype;
    if(fileType.startsWith("image/")) {
      callback(null, path.join('activity/images'));
    } else {
      callback(null, path.join('activity/documents'));
    }
  },
  filename: function (req, file, callback) {
    const fileName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, fileName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, callback) => {
  const allowedImageTypes = ["image/jpeg", "image/png"];
  const allowedDocumentTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
  ]; 

  if (file.fieldname === "image" && allowedImageTypes.includes(file.mimetype)) {
    callback(null, true);
  } else if (file.fieldname === "document" && allowedDocumentTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(
      new Error(
        `Format file tidak didukung: ${file.originalname}. Hanya menerima JPG, PNG (gambar) dan PDF, DOCX (dokumen).`
      ),
      false
    );
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
});

adminRouter.post('/api/aset/add', adminController.asetAdd);
adminRouter.post('/api/aset/edit/:id', adminController.asetUpdate);
adminRouter.post('/api/aset/get', adminController.asetGet);
adminRouter.post('/api/aset/delete/:id', adminController.asetDelete);

adminRouter.post('/api/kegiatan/add', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'document', maxCount: 1 }]),
  adminController.kegiatanAdd
);
adminRouter.post('/api/kegiatan/get', adminController.kegiatanGet);
adminRouter.post('/api/kegiatan/delete/:id', adminController.kegiatanDelete);
adminRouter.get('/api/kegiatan/detail/:id', adminController.kegiatanDetail);
adminRouter.post('/api/kegiatan/edit', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'document', maxCount: 1 }]),
  adminController.kegiatanUpdate
);

adminRouter.post('/api/dashboard', adminController.getDashboardData);
adminRouter.post('/api/payment/kas', adminController.kasPayment);
adminRouter.get('/api/payment/kas/check/:id', adminController.checkKasPayment);

export {
  adminRouter
}
