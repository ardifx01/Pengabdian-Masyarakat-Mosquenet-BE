import express from "express";
import leaderController from '../controller/leader-controller.js';

const leaderRouter = new express.Router();

leaderRouter.get('/api/mosque/jamaah/:id', leaderController.getJamaahMasjid);

leaderRouter.post('/api/user/update/role', leaderController.updateUserRole);

export {
  leaderRouter
}
