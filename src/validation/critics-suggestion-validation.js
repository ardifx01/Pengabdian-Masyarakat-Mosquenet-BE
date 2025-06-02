import Joi from "joi";

const createCriticsSchema = Joi.object({
  message: Joi.string().trim().required()
});


export default {
  createCriticsSchema
}