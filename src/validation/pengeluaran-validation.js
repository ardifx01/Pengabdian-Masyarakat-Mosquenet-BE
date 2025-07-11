import Joi from 'joi';

const addReasonSchema = Joi.object({
  user_id: Joi.string().required(),
  name: Joi.string().trim().required(),
});

const getReasonSchema = Joi.object({
  user_id: Joi.string().required(),
});

const addOutcomeSchema = Joi.object({
  amount: Joi.number().required(),
  reason_id: Joi.number().required(),
  user_id: Joi.string().required()
});

const updateOutcomeSchema = Joi.object({
  amount: Joi.number().required(),
  reason_id: Joi.number().optional(),
  id: Joi.number().required()
})

const deleteOutcomeSchema = Joi.object({
  id: Joi.number().required(),
});

export {
  addReasonSchema,
  getReasonSchema,
  addOutcomeSchema,
  updateOutcomeSchema,
  deleteOutcomeSchema
}