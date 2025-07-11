import express from "express";
import treasuryController from "../controller/treasury-controller.js";
import multer from 'multer';
import path from 'path';
import { treasuryMiddleware } from "../middleware/treasury-middleware.js";

const treasuryRouter = new express.Router();
treasuryRouter.use(treasuryMiddleware)

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

treasuryRouter.post('/pemasukan/category', treasuryController.addPemasukanCategory);
treasuryRouter.get('/pemasukan/category', treasuryController.getPemasukanCategory);
treasuryRouter.post('/pemasukan', treasuryController.addPemasukan);
treasuryRouter.get('/pemasukan', treasuryController.getPemasukan);
treasuryRouter.delete('/pemasukan/:id', treasuryController.deletePemasukan);
treasuryRouter.put('/pemasukan/:id', treasuryController.updatePemasukan);

treasuryRouter.put('/pemasukan/mosque/:masjid_id/donation/:donation_id', treasuryController.updateDonation);

treasuryRouter.post('/pengeluaran/reason', treasuryController.addReasonPengeluaran);
treasuryRouter.get('/pengeluaran/reason', treasuryController.getReasonPengeluaran);
treasuryRouter.post('/pengeluaran', treasuryController.addPengeluaran);
treasuryRouter.get('/pengeluaran', treasuryController.getPengeluaran);
treasuryRouter.delete('/pengeluaran/:id', treasuryController.deletePengeluaran);
treasuryRouter.put('/pengeluaran/:id', treasuryController.updatePengeluaran);

treasuryRouter.get('/laporan', treasuryController.getReports);

treasuryRouter.post(
  '/account-bank', 
  upload.fields([{ 
    name: 'image', 
    maxCount: 1 
  }]),
  treasuryController.createAccountBank 
);
treasuryRouter.delete('/account-bank/:id', treasuryController.deleteAccountBank);
treasuryRouter.put(
  '/account-bank/:id',
  upload.fields([{
    name: 'image',
    maxCount: 1
  }]),
  treasuryController.updateAccountBank
);
treasuryRouter.get('/account-bank', treasuryController.getAccountBank);
treasuryRouter.post('/account-bank/purpose', treasuryController.createPurposeofAccountBank);
treasuryRouter.get('/account-bank/purpose', treasuryController.getPurposeofAccountBank);

export {
  treasuryRouter
}
