import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { pool } from "@/connectBD";
import { comparePassword } from "@/utils/hashPassword";
import { createJwt } from "@/utils/creatorJwt";
import { authToken } from "@/envConfig";
import { UserRow } from "@/interfaces/IAuth";

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
          const [user] = await pool.query(
            "SELECT id, dni , password, user_role, role_permissions, status FROM sign_up WHERE dni = ?",
            [dni]
          );
          const userRows = <UserRow[]>user;
          if (
            userRows.length === 0 ||
            !comparePassword(userPassword, <string>userRows[0].password)
          ) {
            return done({
              message: "Credenciales inválidas",
            });
          }
          done(null, {
            user:user,
            jwt: createJwt(<string>(<unknown>userRows[0].id), authToken.token),
          });
        } catch (error) {
          done(error, false);
          console.log("algo sucedio");
        }
      })().catch((error) => done(error));
    }
  )
);
