import express from "express";
import publicController from "../controller/public-controller.js";
import multer from "multer";
import path from "path";

const publicRouter = new express.Router();

const storage = multer.diskStorage({ 
  destination: function (req, file, callback) {
    const fileType = file.mimetype;
    if(fileType.startsWith("image/")) {
      callback(null, path.join('donations/images'));
    }
  },
  filename: function (req, file, callback) {
    const fileName = Date.now() + "-" + Math.round(Math.random() * 1e9) + req.params.donation_id;
    callback(null, fileName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, callback) => {
  const allowedImageTypes = ["image/jpeg", "image/png"];

  if (file.fieldname === "image" && allowedImageTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(
      new Error(
        `Format file tidak didukung: ${file.originalname}. Hanya menerima JPG, JPEG, PNG`
      ),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

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
publicRouter.get('/api/mosque/donations/:id', publicController.getDonationsList);
publicRouter.get('/api/mosque/donations/:id/get/:donation_id', publicController.getDonation);
publicRouter.post(
  '/api/mosque/donations/:id/post/:donation_id', 
  upload.fields([
    { name: 'image', maxCount: 1 }
  ]),
  publicController.sendDonation
);

publicRouter.post('/api/critics-suggestion', publicController.receiveCriticsAndSuggestion)

export {
  publicRouter
}
