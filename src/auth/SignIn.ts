import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { RowDataPacket, FieldPacket } from "mysql2/promise";
import { pool } from "@/connectBD";
import { comparePassword } from "@/utils/hashPassword";
import { createJwt } from "@/utils/creatorJwt";
import { authToken } from "@/envConfig";

passport.use(
  "signin",
  new LocalStrategy(
    {
      usernameField: "dni",
      passwordField: "userPassword",
      passReqToCallback: true,
    },
    async (_req, dni, userPassword, done) => {
      try {
        const [[user], _filed]: [RowDataPacket[], FieldPacket[]] =
          await pool.query(
            "SELECT id, dni , password, user_role, role_permissions, status FROM sign_up WHERE dni = ?",
            [dni]
          );
        if (!user || !comparePassword(userPassword, user.password)) {
          return done({
            message: "Credenciales inválidas",
          });
        }
        done(null, {
          user: user,
          jwt: createJwt(user.id, authToken.token),
        });
      } catch (error) {
        done(error);
      }
    }
  )
);
