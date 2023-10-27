import passport, { DoneCallback } from "passport";
import { Strategy as CookieStrategy } from "passport-cookie";
import { FieldPacket, RowDataPacket } from "mysql2/promise";
import { pool } from "@/connectBD";
import { JwtPayload, verify } from "jsonwebtoken";
import { authToken, configSever } from "@/envConfig";
import { createJwt } from "@/utils/creatorJwt";
import { IErrorsCookie, errorsCookie } from "@/interfaces/IErrosCookie";

passport.use(
  new CookieStrategy(
    {
      cookieName: "cookieSetter",
    },
    (cookie: string, done: DoneCallback): void => {
      verify(
        cookie,
        configSever.cookie,
        async (error, decode): Promise<void> => {
          if (error) {
            const { message } = { ...error };
            const { [<keyof IErrorsCookie>message]: errorType } = errorsCookie;
            return done({ cookie: errorType });
          }
          const id = (<JwtPayload>decode).id;
          const [[user], _filed]: [RowDataPacket[], FieldPacket[]] =
            await pool.query(
              "SELECT id, dni , password, user_role, role_permissions, status FROM sign_up WHERE id = ?",
              [id]
            );
          done(null, {
            user: { user, password: undefined },
            jwt: createJwt(id, authToken.token),
          });
        }
      );
    }
  )
);
