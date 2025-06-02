import Joi from "joi";

const updateRoleSchema = Joi.object({
  email: Joi.string().required(),
  role: Joi.string().required()
});

const verifyUserSchema = Joi.object({
  email: Joi.string().required(),
  verify: Joi.boolean().required()
})

export default {
    updateRoleSchema,
    verifyUserSchema
}