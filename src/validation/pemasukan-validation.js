import Joi from 'joi';

const addCategorySchema = Joi.object({
  user_id: Joi.string().required(),
  name: Joi.string().trim().required(),
});

const getCategorySchema = Joi.object({
  user_id: Joi.string().required(),
});

const addIncomeSchema = Joi.object({
  amount: Joi.number().required(),
  source_id: Joi.number().required(),
  user_id: Joi.string().required()
});

const updateIncomeSchema = Joi.object({
  amount: Joi.number().required(),
  source_id: Joi.number().optional(),
  id: Joi.number().required()
});

const deleteIncomeSchema = Joi.object({
  id: Joi.number().required(),
});

export {
  addCategorySchema,
  getCategorySchema,
  addIncomeSchema,
  updateIncomeSchema,
  deleteIncomeSchema
}