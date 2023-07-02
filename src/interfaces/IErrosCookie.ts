export interface IErrorsCookie {
  "invalid token": string;
  "jwt malformed": string;
  "jwt signature is required": string;
  "invalid signature": string;
  TokenExpiredError: string;
}

export const errorsCookie: IErrorsCookie = {
  "invalid token": "Cookie inválido.",
  "jwt malformed": "Cookie malformado.",
  "jwt signature is required": "Firma de cookie requerida.",
  "invalid signature": "Firma de cookie inválida.",
  TokenExpiredError: "Cookie expirada",
};
