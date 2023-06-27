import passport from "passport";
import {  Strategy as LocalStrategy } from "passport-local";
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
    async ({ body: { userRole } }, dni, userPassword, done) => {
      try {
        const [isValid, _field]: [RowDataPacket[], FieldPacket[]] =
          await pool.query("SELECT dni FROM sign_up WHERE dni = ?", [dni]);

        if (isValid?.length) {
          return done({ message: "Usuario inválido!" });
        }
        const user = authService({ dni, userPassword, userRole });

        await pool.query(
          "INSERT INTO sign_up (id, dni, password, user_role, role_permissions, status, token) VALUES (?)",
          [Object.values(user)]
        );

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
