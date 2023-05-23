import Joi from 'joi'
 import { errorValidation } from './ValErrorMessages'
const {signIn} = errorValidation

export const signinSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    dni: Joi.string()
      .trim()
      .required()
      .messages(signIn.dni),
      userPassword: Joi.string()
      .trim()
      .required()
      .messages(signIn.userPassword)
  })