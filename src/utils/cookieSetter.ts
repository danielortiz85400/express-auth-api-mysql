import { Response } from "express";
import { configSever } from "@/envConfig";
import Jwt from "jsonwebtoken";

/**
 * @param {string} id - Id de usuario 
 * @param {Express.Response} res - Objeto response para retornar directamente
 * @returns {Express.Response} - Respuesta cookie.
 */
export const cookieSetter = (id: string | null, res: Response): Response => {
  const setter = Jwt.sign({ id }, configSever.cookie ?? "", {
    algorithm: "HS256",
  });

  return res.cookie("cookieSetter", setter, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    expires: new Date(Date.now() + 1000 * 43200),
  });
};

