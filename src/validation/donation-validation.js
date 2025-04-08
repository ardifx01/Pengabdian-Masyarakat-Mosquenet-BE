import Joi from "joi";

const getDonationSchema = Joi.number().required();

const updateDonationSchema = Joi.object({
  masjid_id: Joi.string().required(),
  donation_id: Joi.string().required(),
  verified: Joi.boolean().required()
});

export {
  getDonationSchema,
  updateDonationSchema
}