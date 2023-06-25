import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { errorMessages } from "@/services/authErrorMessages";

export const auth =
  (name: string) =>
    (req: Request, res: Response, next: NextFunction): void => {
      passport.authenticate(
        name,
        { session: false },
        (err: null, user: false, info?: undefined) => {
          if (err !== null || !user) {
            return res.status(401).json({
              error: {
                status: 401,
                message: errorMessages(err, info),
              },
            });
          }

          // Permite usar passport-jwt aquí mismo 
          if (["id", "iat", "exp"].every((keys) => keys in user))
            return next();

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
