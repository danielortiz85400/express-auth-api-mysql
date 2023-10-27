import { IErrorsJwt, errorsJWT } from "@/interfaces/IErrorsJwt";
import { JsonWebTokenError } from "jsonwebtoken";

export const exceptionPassport = (
  err: null,
  info: JsonWebTokenError | undefined
) => {
  let tokenValidation =
    typeof info === "object"
      ? { ...info }
      : { name: "NoAuthToken", message: "NoAuthToken" };

  // Fix: Token requerido no existe en error de jwt y se crea.
  if (!Object.keys(tokenValidation)?.length)
    tokenValidation = {
      name: "NoAuthToken",
      message: "NoAuthToken",
    };
  const { [<keyof IErrorsJwt>tokenValidation.message]: errorType } = errorsJWT;
  return (
    err ??
    (["NoAuthToken", "JsonWebTokenError"].includes(tokenValidation.name)
      ? (tokenValidation.message = errorType)
      : info)
  );
};
