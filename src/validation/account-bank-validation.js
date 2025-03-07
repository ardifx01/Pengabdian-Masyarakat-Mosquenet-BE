import Joi from "joi";

const createPurposeSchema = Joi.object({
  name: Joi.string().required(),
  user_id: Joi.string().required(),
});

const createAccountSchema = Joi.object({
  name: Joi.string().required(),
  bank: Joi.string().required(),
  account: Joi.string().required(),
  alias_name: Joi.string().required(),
  email: Joi.string().required(),
  purpose_id: Joi.number().required()
});

const getPurposeSchema = Joi.string().required()

export default {
  createPurposeSchema,
  createAccountSchema,
  getPurposeSchema
}