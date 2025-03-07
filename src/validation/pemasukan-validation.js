import Joi from 'joi';

const addCategorySchema = Joi.object({
  user_id: Joi.string().required(),
  name: Joi.string().required(),
});

const getCategorySchema = Joi.object({
  user_id: Joi.string().required(),
});

const addIncomeSchema = Joi.object({
  amount: Joi.number().required(),
  source_id: Joi.number().required(),
  user_id: Joi.string().required()
});

export {
  addCategorySchema,
  getCategorySchema,
  addIncomeSchema,
}