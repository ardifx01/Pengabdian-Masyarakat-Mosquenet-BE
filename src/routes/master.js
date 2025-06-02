import express from "express";
import { masterMiddleware } from "../middleware/master-middleware.js";
import masterController from '../controller/master-controller.js';

const masterRouter = new express.Router();
masterRouter.use(masterMiddleware)

masterRouter.get('/critics', masterController.getCriticsandSuggestion);
masterRouter.get('/masjid', masterController.getAllMasjid);
masterRouter.put('/masjid/:id', masterController.verifyMasjid);

export {
  masterRouter
}
