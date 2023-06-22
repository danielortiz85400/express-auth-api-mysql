import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { RowDataPacket, FieldPacket } from "mysql2/promise";
import { pool } from "@/connectBD";
import { authService } from "@/services/authService";

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "dni",
      passwordField: "userPassword",
      passReqToCallback: true,
    },
    ({ body: { userRole } }, dni, userPassword, done) => {
      (async () => {
        try {
          const [isValid, _field]: [RowDataPacket[], FieldPacket[]] =
            await pool.query("SELECT dni FROM sign_up WHERE dni = ?", [dni]);

          if (isValid.length > 0) {
            return done({ message: "Usuario inválido!" });
          }
          const userToRegister = authService({ dni, userPassword, userRole });

          await pool.query(
            "INSERT INTO sign_up (id, dni, password, user_role, role_permissions, status, token) VALUES (?)",
            [Object.values(userToRegister)]
          );

          done(null, userToRegister);
        } catch (error) {
          done(error);
        }
      })().catch((error) => done(error));
    }
  )
)
