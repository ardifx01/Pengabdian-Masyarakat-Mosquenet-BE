import Joi from "joi";

const createCriticsSchema = Joi.object({
  message: Joi.string().required()
});


export default {
  createCriticsSchema
}