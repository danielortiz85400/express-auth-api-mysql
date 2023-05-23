import { authToken } from '@/envConfig'
import { createJwt } from '@/utils/creatorJwt'
import { encryptPassword } from '@/utils/hashPassword'
import { UserRow } from '@/interfaces/IAuth'

export const authService = ({
  dni,
  userPassword,
  userRole
}: UserRow): UserRow => {
  const password = encryptPassword(<string>userPassword)
  const { token } = createJwt(dni, authToken.token)
  const permissions = ((roles: Record<string, string>) => roles[userRole])({
    ADMINISTRADOR: '["ADMINISTRADOR", "USUARIO"]',
    MODERADOR: '["ADMINISTRADOR", "USUARIO"]',
    USUARIO: '["USUARIO", "USUARIO"]'
  })

  return {
    id: null,
    dni,
    password,
    userRole,
    permissions,
    status: false,
    token
  }
}
