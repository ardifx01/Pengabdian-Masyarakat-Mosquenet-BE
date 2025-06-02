import Joi from 'joi';

const createKegiatanSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  pic: Joi.string().required(),
  address: Joi.string().required(),
  video_documentation: Joi.string().optional().allow(""),
  date: Joi.date().required(),
  time: Joi.string().required(),
  user_id: Joi.string().required(),
  outcomes: Joi.array().items(
    Joi.object({
      amount: Joi.number().required(),
      reason: Joi.string().required()
    })
  ).optional()
});

const updateKegiatanSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  pic: Joi.string().required(),
  address: Joi.string().required(),
  video_documentation: Joi.string().optional().allow(""),
  date: Joi.date().required(),
  time: Joi.string().required(),
  id: Joi.string().required(),
  outcomes: Joi.array().items(
    Joi.object({
      amount: Joi.number().required(),
      reason: Joi.string().required()
    })
  ).optional()
});

const deleteKegiatanSchema = Joi.object({
  kegiatan_id: Joi.number().required()
});

export {
  createKegiatanSchema,
  deleteKegiatanSchema,
  updateKegiatanSchema
}