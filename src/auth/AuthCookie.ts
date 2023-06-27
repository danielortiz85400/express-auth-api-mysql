import passport from "passport";
import { Strategy as CookieStrategy } from "passport-cookie";
import { FieldPacket, RowDataPacket } from "mysql2/promise";
import { authToken, configSever } from "@/envConfig";
import { createJwt } from "@/utils/creatorJwt";
import Jwt from "jsonwebtoken";
import { pool } from "@/connectBD";

type Done = (
  err: null | { cookie: string },
  user?: null | { cookie: string } | Jwt.JwtPayload
) => void;

passport.use(
  new CookieStrategy(
    {
      cookieName: "cookieSetter",

    },
    (cookie: string, done: Done) => {
      Jwt.verify(cookie, configSever.cookie ?? "", async (err, decode) => {
        if (err) {
          const { message } = { ...err };
          console.log(message)
          const errorType = ((type: Record<string, string>) => type[message])({
            "invalid token": "Token inválido.",
            "jwt malformed": "Token malformado.",
            "jwt signature is required": "Firma de token requerida.",
            "invalid signature": "Firma de token inválida.",
            "TokenExpiredError": "Cookie expirada"
          });
          return done({ cookie: errorType });
        }
        const UserID = (<Jwt.JwtPayload>decode).id;
        const [[user], _filed]: [RowDataPacket[], FieldPacket[]] =
          await pool.query(
            "SELECT id, dni , password, user_role, role_permissions, status FROM sign_up WHERE id = ?",
            [UserID]
          );
        console.log(user);
        done(null, {
          user: user,
          jwt: createJwt(UserID, authToken.token),
        });
      });
    }
  )
);
