export interface IErrorsJwt {
  NoAuthToken: string;
  "invalid token": string;
  "jwt malformed": string;
  "jwt signature is required": string;
  "invalid signature": string;
  TokenExpiredError: string;
}

export const errorsJWT: IErrorsJwt = {
  NoAuthToken: "Token requerido",
  "invalid token": "Token inválido.",
  "jwt malformed": "Token malformado.",
  "jwt signature is required": "Firma de token requerida.",
  "invalid signature": "Firma de token inválida.",
  TokenExpiredError: "Token expirado",
};
