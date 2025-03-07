import Joi from "joi";

const updateRoleSchema = Joi.object({
  email: Joi.string().required(),
  role: Joi.string().required()
});

export default {
    updateRoleSchema
}