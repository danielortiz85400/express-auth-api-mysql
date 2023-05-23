import Joi from "joi";
import { errorValidation } from "./ValErrorMessages";
const { signup } = errorValidation;

export const signupSchema = Joi.object().keys({
  dni: Joi.string().trim().required().messages(signup.dni),

  userPassword: Joi.string()
    .trim()
    .required()
    /**Requiere al menos una letra mayúscula ((?=.*[A-Z])).
          Requiere al menos una letra minúscula ((?=.*[a-z])).
          Requiere al menos un número ((?=.*[0-9])).
          Requiere al menos un caracter especial de la lista !@#$%^&* ((?=.*[!@#$%^&*])).
          Permite una longitud total de 1 a 10 caracteres (.{1,10}).
 */
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{10}$/)
    // string.pattern.base no funciona importado
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
