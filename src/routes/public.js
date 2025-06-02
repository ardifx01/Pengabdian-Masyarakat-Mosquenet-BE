import express from "express";
import publicController from "../controller/public-controller.js";
import adminController from "../controller/admin-controller.js";
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
publicRouter.get('/provinces/list', publicController.getProvinceList);
publicRouter.get('/cityorregency/list', publicController.getCityOrRegencyList);
publicRouter.get('/subdistrict/list', publicController.getSubdistrictList);
publicRouter.get('/ward/list', publicController.getWardList);

// mosque
publicRouter.get('/mosque/list', publicController.getMosqueList);
publicRouter.get('/mosque/kegiatan/:id', publicController.getKegiatan);
publicRouter.get('/mosque/konten/:id', publicController.getContent);
publicRouter.get('/mosque/user/:id', publicController.getMosqueByJamaah);
publicRouter.get('/mosque/id/:id', publicController.getMosqueById);
publicRouter.get('/mosque/laporan/:id', publicController.getReports);
publicRouter.get('/mosque/donations/:id', publicController.getDonationsList);
publicRouter.get('/mosque/donations/:id/get/:donation_id', publicController.getDonation);

publicRouter.get('/kegiatan/:id', adminController.kegiatanDetail);
publicRouter.get('/content/:id', adminController.getContent);

publicRouter.post(
  '/mosque/donations/:id/post/:donation_id', 
  upload.fields([
    { name: 'image', maxCount: 1 }
  ]),
  publicController.sendDonation
);

publicRouter.post('/critics-suggestion', publicController.receiveCriticsAndSuggestion)

export {
  publicRouter
}
