import Joi from "joi";

const createPurposeSchema = Joi.object({
  name: Joi.string().trim().required(),
  user_id: Joi.string().required(),
});

const createAccountSchema = Joi.object({
  name: Joi.string().required(),
  bank: Joi.string().required(),
  account: Joi.string().optional(),
  alias_name: Joi.string().required(),
  email: Joi.string().required(),
  purpose_id: Joi.number().required(),
});

const getPurposeSchema = Joi.string().required()

const saveDonationSchema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.string().required(),
  donation_id: Joi.string().required(),
  masjid_id: Joi.string().required()
});

const updateAccountSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  bank: Joi.string().required(),
  account: Joi.string().required(),
  alias_name: Joi.string().required(),
  email: Joi.string().required(),
  purpose_id: Joi.number().required()
});

const deleteAccountSchema = Joi.object({
  id: Joi.number().required()
})

export default {
  createPurposeSchema,
  createAccountSchema,
  getPurposeSchema,
  saveDonationSchema,
  updateAccountSchema,
  deleteAccountSchema,
}