import express from "express";
import adminController from "../controller/admin-controller.js";
import multer from "multer";
import path from 'path';
import { administratorMiddleware } from "../middleware/administrator-middleware.js";

const adminRouter = new express.Router();

adminRouter.use(administratorMiddleware);

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

adminRouter.post('/aset', adminController.asetAdd);
adminRouter.put('/aset/:id', adminController.asetUpdate);
adminRouter.get('/aset', adminController.asetGet);
adminRouter.delete('/aset/:id', adminController.asetDelete);

adminRouter.post(
  '/kegiatan', 
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 }
  ]),
  adminController.kegiatanAdd
);
adminRouter.get('/kegiatan', adminController.kegiatanGet);
adminRouter.delete('/kegiatan/:id', adminController.kegiatanDelete);
// adminRouter.get('/kegiatan/:id', adminController.kegiatanDetail);
adminRouter.put(
  '/kegiatan/:id', 
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 }
  ]),
  adminController.kegiatanUpdate
);

adminRouter.post(
  '/content', 
  upload.fields([
    { name: 'visual_content', maxCount: 1 },
  ]),
  adminController.addContent
);
adminRouter.get('/content', adminController.getContents);
adminRouter.delete('/content/:id', adminController.deleteContent);
// adminRouter.get('/content/:id', adminController.getContent);
adminRouter.put(
  '/content/:id', 
  upload.fields([
    { name: 'visual_content', maxCount: 1 },
  ]),
  adminController.updateContent
);

// adminRouter.post('/monitoring-kurban/animal', adminController.addAnimal);
// adminRouter.post('/monitoring-kurban/sohibul');

adminRouter.get('/dashboard', adminController.getDashboardData);
adminRouter.post('/payment/kas', adminController.kasPayment);
adminRouter.get('/payment/kas/check/:id', adminController.checkKasPayment);

export {
  adminRouter
}
