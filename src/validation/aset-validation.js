import Joi from "joi"

const createAsetSchema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().required(),
  user_id: Joi.string().required(),
  price: Joi.number().required(),
  unit: Joi.string().required(),
  condition: Joi.string().valid('Baik', 'Sedang_diperbaiki', 'Rusak').required()
});

const updateAsetSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  amount: Joi.number().required(),
  asset_id: Joi.number().required(),
  unit: Joi.string().required(),
  condition: Joi.string().valid('Baik', 'Sedang_diperbaiki', 'Rusak').required()
});

const deleteAsetSchema = Joi.object({
  asset_id: Joi.number().required(),
})

export {
  createAsetSchema,
  updateAsetSchema,
  deleteAsetSchema
}