import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { errorMessages } from "@/services/authErrorMessages";

export const auth =
  (name: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate(
      name,
      { session: false },
      (err: Error | null, user: false | Express.User, info: any) => {
        if (err !== null || !user) {
          return res.status(401).json({
            error: {
              status: 401,
              message: errorMessages(err, info),
            },
          });
        }
        /* Corrige el error para SignIn: Cannot set headers after they are sent to the client.
          Estaría respondiendo el token(desde AuthJwt) y luego el usuario logeado*/
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
