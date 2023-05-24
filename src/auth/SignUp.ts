import passport from 'passport'
import {
  Strategy as LocalStrategy,
} from 'passport-local'
import { pool } from '@/connectBD'
import { authService } from '@/services/authService'

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'dni',
      passwordField: 'userPassword',
      passReqToCallback: true
    },
    ({ body: { userRole } }, dni, userPassword, done): void => {
      (async (): Promise<void> => {
        try {
          const [isValid] = await pool.query(
            'SELECT dni FROM sign_up WHERE dni = ?',
            [dni]
          )

          if ((<any[]>isValid).length > 0) {
            return done({ message: 'Usuario inválido!' })
          }
          const userToRegister = authService({ dni, userPassword, userRole })

          await pool.query(
            'INSERT INTO sign_up (id, dni, password, user_role, role_permissions, status, token) VALUES (?)',
            [Object.values(userToRegister)]
          )

          done(null, userToRegister)
        } catch (error) {
          done(error)
        }
      })().catch((error) => done(error))
    }
  )
)
