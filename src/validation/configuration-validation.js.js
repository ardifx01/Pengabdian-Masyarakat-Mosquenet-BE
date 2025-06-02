import Joi from 'joi';

const getConfigurationSchema = Joi.string().required();

const updateConfigurationSchema = Joi.object({
  user_id: Joi.string().required(),
  config: Joi.boolean().required()
});

export {
  getConfigurationSchema,
  updateConfigurationSchema
}