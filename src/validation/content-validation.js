import Joi from 'joi';

const createContentSchema = Joi.object({
  title: Joi.string().required(),
  contents: Joi.string().required(),
  user_id: Joi.string().required(),
  visual_content: Joi.string().optional()
});

const updateContentSchema = Joi.object({
  title: Joi.string().required(),
  contents: Joi.string().required(),
  visual_content: Joi.string().optional(),
  id: Joi.string().required(),
});

const deleteContentSchema = Joi.object({
  content_id: Joi.number().required()
});

export {
  createContentSchema,
  deleteContentSchema,
  updateContentSchema
}