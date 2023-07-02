import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { errorMessages } from "@/services/authErrorMessages";
import { cookieSetter } from "@/utils/cookieSetter";
import { User } from "@/interfaces/IAuth";

export const auth =
  (name: string) =>
  (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate(
      name,
      { session: false },
      (err: null, user: false | User, info?: undefined) => {
        if (err !== null || !user) {
          return res.status(401).json({
            error: {
              status: 401,
              message: errorMessages(err, info),
            },
          });
        }

        // Omite la respuesta jwt cuando el token en válido.
        if (["id", "iat", "exp"].every((keys) => keys in user)) return next();
        cookieSetter(user.user.id, res);
        res.status(200).json({
          success: {
            status: 200,
            message: user,
          },
        });
        next();
      }
    )(req, res, next);
  };
