import express from 'express';
import adminController from '../controller/admin-controller.js';

const midtransRouter = new express.Router();

midtransRouter.post('/api/payment/midtrans-callback', adminController.paymentCallback);

export {
  midtransRouter
};