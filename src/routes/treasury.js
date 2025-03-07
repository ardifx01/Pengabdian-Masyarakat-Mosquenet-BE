import express from "express";
import treasuryController from "../controller/treasury-controller.js";

const treasuryRouter = new express.Router();

treasuryRouter.post('/api/pemasukan/category/add', treasuryController.addPemasukanCategory);
treasuryRouter.post('/api/pemasukan/category/get', treasuryController.getPemasukanCategory);
treasuryRouter.post('/api/pemasukan/add', treasuryController.addPemasukan);
treasuryRouter.post('/api/pemasukan/get', treasuryController.getPemasukan);

treasuryRouter.post('/api/pengeluaran/reason/add', treasuryController.addReasonPengeluaran);
treasuryRouter.post('/api/pengeluaran/reason/get', treasuryController.getReasonPengeluaran);
treasuryRouter.post('/api/pengeluaran/add', treasuryController.addPengeluaran);
treasuryRouter.post('/api/pengeluaran/get', treasuryController.getPengeluaran);

treasuryRouter.post('/api/laporan/get', treasuryController.getReports);

treasuryRouter.post('/api/account-bank/create', treasuryController.createAccountBank);
treasuryRouter.post('/api/account-bank/get', treasuryController.getAccountBank);
treasuryRouter.post('/api/account-bank/purpose/create', treasuryController.createPurposeofAccountBank);
treasuryRouter.post('/api/account-bank/purpose/get', treasuryController.getPurposeofAccountBank);

export {
  treasuryRouter
}
