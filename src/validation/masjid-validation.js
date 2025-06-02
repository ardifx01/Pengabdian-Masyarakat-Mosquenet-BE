import Joi from "joi";

const createSchema = Joi.object({
  name: Joi.string().max(55).required(),
  location: Joi.string().required(),
  subdistrict_id: Joi.number().required(),
  cityorregency_id: Joi.number().required(),
  province_id: Joi.number().required(),
  ward_id:  Joi.number().required(),
});

const verifiedSchema = Joi.object({
  id: Joi.string().required(),
  verified: Joi.boolean().required()
});


export default {
    createSchema,
    verifiedSchema,
}