import Joi from "joi";

const createDocumentSchema = Joi.object({
  title: Joi.string().required(),
  user_id: Joi.string().required(),
});

const getDocumentSchema = Joi.object({
  user_id: Joi.string().required()
});

const updateDocumentSchema = Joi.object({
  title: Joi.string().required(),
  id: Joi.string().required()
});

const deleteDocumentSchema = Joi.object({
  id: Joi.number().required()
});

export {
  createDocumentSchema,
  getDocumentSchema,
  updateDocumentSchema,
  deleteDocumentSchema
}