import express from "express";
import publicController from "../controller/public-controller.js";

const publicRouter = new express.Router();

// location
publicRouter.get('/api/provinces/list', publicController.getProvinceList);
publicRouter.get('/api/cityorregency/list', publicController.getCityOrRegencyList);
publicRouter.get('/api/subdistrict/list', publicController.getSubdistrictList);
publicRouter.get('/api/ward/list', publicController.getWardList);

// mosque
publicRouter.get('/api/mosque/list', publicController.getMosqueList);
publicRouter.get('/api/mosque/kegiatan/:id', publicController.getKegiatan);
publicRouter.get('/api/mosque/user/:id', publicController.getMosqueByJamaah);
publicRouter.get('/api/mosque/id/:id', publicController.getMosqueById);

publicRouter.post('/api/critics-suggestion', publicController.receiveCriticsAndSuggestion)

export {
  publicRouter
}
