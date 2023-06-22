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
    (_req, dni, userPassword, done) => {
      (async () => {
        try {
          const [user, _filed]: [RowDataPacket[], FieldPacket[]] =
            await pool.query(
              "SELECT id, dni , password, user_role, role_permissions, status FROM sign_up WHERE dni = ?",
              [dni]
            );
          if (
            user.length === 0 ||
            !comparePassword(userPassword, user[0].password)
          ) {
            return done({
              message: "Credenciales inválidas",
            });
          }
          done(null, {
            user: user,
            jwt: createJwt(user[0].id, authToken.token),
          });
        } catch (error) {
          done(error);
        }
      })().catch((error) => done(error));
    }
  )
);
