import Joi from "joi";

const createPaymentSchema = Joi.object({
  user_id: Joi.string().required(),
  amount: Joi.number().required()
});

const checkPaymentSchema = Joi.object({
  id: Joi.string().required(),
});

export default {
    createPaymentSchema,
    checkPaymentSchema
}