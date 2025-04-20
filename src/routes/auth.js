import express from "express";
import authController from "../controller/auth-controller.js";

const authRouter = new express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/verify', authController.verify);

authRouter.post('/forgot/find-email', authController.findEmail);
authRouter.post('/forgot/verify-account', authController.verifyEmail);
authRouter.post('/forgot/reset-password', authController.resetPassword);

authRouter.post('/check', authController.verifyLogin);

export {
  authRouter
}
