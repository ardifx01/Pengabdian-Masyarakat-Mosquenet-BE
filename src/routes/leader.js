import express from "express";
import leaderController from '../controller/leader-controller.js';
import { leaderMiddleware } from "../middleware/leader-middleware.js";

const leaderRouter = new express.Router();
leaderRouter.use(leaderMiddleware)

leaderRouter.get('/mosque/jamaah', leaderController.getJamaahMasjid);
leaderRouter.post('/user/update/role', leaderController.updateUserRole);
leaderRouter.post('/user/verification', leaderController.verifyUser);

leaderRouter.put('/mosque/configuration/activity-with-outcome', leaderController.updateActivityOutcomeConnected);
leaderRouter.put('/mosque/configuration/asset-with-outcome', leaderController.updateAssetOutcomeConnected);
leaderRouter.put('/mosque/configuration/article', leaderController.updateArticleUsedConfiguration);
leaderRouter.put('/mosque/configuration/donation', leaderController.updateDonationUsedConfiguration);
leaderRouter.put('/mosque/configuration/template', leaderController.updateTemplateUsedConfiguration);

export {
  leaderRouter
}
