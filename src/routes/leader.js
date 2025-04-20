import express from "express";
import leaderController from '../controller/leader-controller.js';
import { leaderMiddleware } from "../middleware/leader-middleware.js";

const leaderRouter = new express.Router();
leaderRouter.use(leaderMiddleware)

leaderRouter.get('/mosque/jamaah/:id', leaderController.getJamaahMasjid);

leaderRouter.post('/user/update/role', leaderController.updateUserRole);

export {
  leaderRouter
}
