import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

export const auth =
  (name: string[]) =>
    (req: Request, res: Response, next: NextFunction): void => {
      passport.authenticate(
        name,
        { session: false },
        (err: Error | null, user: boolean, info: boolean) => {
          if (err !== null || !user) {
            return res.status(401).json({
              error: {
                status: 401,
                message: err ?? info
              }
            })
          }
          res.status(200).json({
            success: {
              status: 200,
              message: user
            }
          })
          next()
        }
      )(req, res, next)
    }
