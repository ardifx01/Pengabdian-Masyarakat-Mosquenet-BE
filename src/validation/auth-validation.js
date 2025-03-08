import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  telp: Joi.string().required(),
  isJamaah: Joi.boolean().required(),
  isAdmin: Joi.boolean().required(),
  mosque_id: Joi.string().required(),
  token: Joi.string().required(),
});

const makeTokenSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  telp: Joi.string().required(),
  password: Joi.string().optional(),
  isJamaah: Joi.boolean().optional(),
  isAdmin: Joi.boolean().optional(),
  mosque_id: Joi.string().optional()
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const verifyAccountSchema = Joi.object({
  token: Joi.string().required()
});

const findEmailSchema = Joi.object({
  email: Joi.string().required()
});

const verifySchema = Joi.object({
  email: Joi.string().required(),
  token: Joi.string().required()
});

export default {
    registerSchema,
    loginSchema,
    makeTokenSchema,
    verifyAccountSchema,
    findEmailSchema,
    verifySchema
};