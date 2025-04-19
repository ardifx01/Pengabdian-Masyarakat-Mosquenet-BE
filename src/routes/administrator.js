import express from "express";
import adminController from "../controller/admin-controller.js";
import multer from "multer";
import path from 'path';

const adminRouter = new express.Router();

const storage = multer.diskStorage({ 
  destination: function (req, file, callback) {
    const fileType = file.mimetype;
    if(fileType.startsWith("image/")) {
      if(file.fieldname === "visual_content") {
        callback(null, path.join('contents'));
      } else {
        callback(null, path.join('activity/images'));
      }
    } else {
      if(file.fieldname !== "visual_content") {
        callback(null, path.join('activity/documents'));
      }
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

  if (( file.fieldname === "image" || "visual_content" ) && allowedImageTypes.includes(file.mimetype)) {
    callback(null, true);
  } else if (file.fieldname === "document" && allowedDocumentTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    const errorFileMessage = file.fieldname === "image" || "document" 
      ? "Hanya menerima JPG, PNG (gambar) dan PDF, DOCX (dokumen)."
      : "Hanya menerima JPG dan PNG. Format video harap sertakan link video dari youtube";
    callback(
      new Error(
        `Format file tidak didukung: ${file.originalname}. ${errorFileMessage}`
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

adminRouter.post(
  '/api/kegiatan/add', 
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 }
  ]),
  adminController.kegiatanAdd
);
adminRouter.post('/api/kegiatan/get', adminController.kegiatanGet);
adminRouter.post('/api/kegiatan/delete/:id', adminController.kegiatanDelete);
adminRouter.get('/api/kegiatan/detail/:id', adminController.kegiatanDetail);
adminRouter.post(
  '/api/kegiatan/edit', 
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 }
  ]),
  adminController.kegiatanUpdate
);

adminRouter.post(
  '/api/content', 
  upload.fields([
    { name: 'visual_content', maxCount: 1 },
  ]),
  adminController.addContent
);
adminRouter.post('/api/content/get', adminController.getContents);
adminRouter.delete('/api/content/:id', adminController.deleteContent);
adminRouter.get('/api/content/:id', adminController.getContent);
adminRouter.put(
  '/api/content/:id', 
  upload.fields([
    { name: 'visual_content', maxCount: 1 },
  ]),
  adminController.updateContent
);

// adminRouter.post('/api/monitoring-kurban/animal', adminController.addAnimal);
// adminRouter.post('/api/monitoring-kurban/sohibul');

adminRouter.post('/api/dashboard', adminController.getDashboardData);
adminRouter.post('/api/payment/kas', adminController.kasPayment);
adminRouter.get('/api/payment/kas/check/:id', adminController.checkKasPayment);

export {
  adminRouter
}
