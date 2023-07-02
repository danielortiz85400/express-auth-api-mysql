import { IErrorsJwt, errorsJWT } from "@/interfaces/IErrorsJwt";
/**
 * Manejador de errores para passport-local/jwt/cookie (Principalmente personaliza mensajes de error para jwt)
 * @param {null } err - Error (<fn>verify)
 * @param { any } info - Error extra (<fn>verify).
 * @returns {void} - Retorna mensaje de error o cambia el por defecto (para jwt).
 */

export function errorMessages(err: null, info: any): void {
  let tokenValidation = typeof info === "object" ? { ...info } : null ?? {};

  if (!Object.keys(tokenValidation)?.length)
    tokenValidation = { name: "NoAuthToken", message: "NoAuthToken" };

  const errorType = ((type): string =>
    type[<keyof IErrorsJwt>tokenValidation?.message])(errorsJWT);

  return (
    err ??
    (["NoAuthToken", "JsonWebTokenError"].includes(tokenValidation.name)
      ? (tokenValidation.message = errorType)
      : info)
  );
}
