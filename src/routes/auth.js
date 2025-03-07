import express from "express";
import authController from "../controller/auth-controller.js";

const authRouter = new express.Router();

authRouter.post('/api/auth/register', authController.register);
authRouter.post('/api/auth/login', authController.login);
authRouter.post('/api/auth/verify', authController.verify);

authRouter.post('/api/auth/forgot/find-email', authController.findEmail);
authRouter.post('/api/auth/forgot/verify-account', authController.verifyEmail);
authRouter.post('/api/auth/forgot/reset-password', authController.resetPassword);

export {
  authRouter
}
