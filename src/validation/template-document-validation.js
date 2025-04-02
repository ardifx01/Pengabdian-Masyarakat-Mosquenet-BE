import Joi from "joi";

const createTemplateSchema = Joi.object({
  type: Joi.string().required(),
  user_id: Joi.string().required(),
});

const getTemplateSchema = Joi.object({
  user_id: Joi.string().required()
});

const updateTemplateSchema = Joi.object({
  type: Joi.string().required(),
  id: Joi.string().required()
});

const deleteTemplateSchema = Joi.object({
  id: Joi.number().required()
});

export {
  createTemplateSchema,
  getTemplateSchema,
  updateTemplateSchema,
  deleteTemplateSchema
}