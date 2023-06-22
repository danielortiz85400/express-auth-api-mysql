import Joi from "joi";
import { errorValidation } from "./ValErrorMessages";
const { signup } = errorValidation;

export const signupSchema = Joi.object().keys({
  dni: Joi.string().trim().required().messages(signup.dni),

  userPassword: Joi.string()
    .trim()
    .required()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{10}$/)
    // string.pattern.base it's doesn't work importing
    .messages({
      "string.pattern.base": "Contraseña inválida",
      ...signup.password,
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("userPassword"))
    .trim()
    .required()
    .messages(signup.confirmPassword),

  userRole: Joi.string()
    .trim()
    .required()
    .valid("ADMINISTRADOR", "MODERADOR", "USUARIO")
    .messages(signup.userRole),
});
