import Jwt from 'jsonwebtoken'

interface Token {
  token: string // Tipo de datos esperado para la propiedad 'token'
  expiresIn: number
}

export const createJwt = (id: string, key: string): Token => {
  const expiresIn = 1000 * 43200
  return { token: Jwt.sign({ id }, key, { expiresIn }), expiresIn }
}
