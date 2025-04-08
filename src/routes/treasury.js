import express from "express";
import treasuryController from "../controller/treasury-controller.js";
import multer from 'multer';
import path from 'path';

const treasuryRouter = new express.Router();

const storage = multer.diskStorage({ 
  destination: function (_req, file, callback) {
    callback(null, path.join('transaction/images'));
  },
  filename: function (_req, file, callback) {
    const fileName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, fileName + path.extname(file.originalname));
  },
});

const fileFilter = (_req, file, callback) => {
  const allowedImageTypes = ["image/jpeg", "image/png"];

  if (file.fieldname === "image" && allowedImageTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(
      new Error(
        `Format file tidak didukung: ${file.originalname}. Hanya menerima JPG/JPEG dan PNG (gambar).`
      ),
      false
    );
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
});

treasuryRouter.post('/api/pemasukan/category/add', treasuryController.addPemasukanCategory);
treasuryRouter.post('/api/pemasukan/category/get', treasuryController.getPemasukanCategory);
treasuryRouter.post('/api/pemasukan/add', treasuryController.addPemasukan);
treasuryRouter.post('/api/pemasukan/get', treasuryController.getPemasukan);

treasuryRouter.put('/api/pemasukan/mosque/:masjid_id/donation/:donation_id', treasuryController.updateDonation);

treasuryRouter.post('/api/pengeluaran/reason/add', treasuryController.addReasonPengeluaran);
treasuryRouter.post('/api/pengeluaran/reason/get', treasuryController.getReasonPengeluaran);
treasuryRouter.post('/api/pengeluaran/add', treasuryController.addPengeluaran);
treasuryRouter.post('/api/pengeluaran/get', treasuryController.getPengeluaran);

treasuryRouter.post('/api/laporan/get', treasuryController.getReports);

treasuryRouter.post(
  '/api/account-bank/create', 
  upload.fields([{ 
    name: 'image', 
    maxCount: 1 
  }]),
  treasuryController.createAccountBank 
);
treasuryRouter.post('/api/account-bank/get', treasuryController.getAccountBank);
treasuryRouter.post('/api/account-bank/purpose/create', treasuryController.createPurposeofAccountBank);
treasuryRouter.post('/api/account-bank/purpose/get', treasuryController.getPurposeofAccountBank);

export {
  treasuryRouter
}
