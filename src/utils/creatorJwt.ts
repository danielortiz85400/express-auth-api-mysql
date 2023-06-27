import Jwt from 'jsonwebtoken'

interface Token {
  token: string 
  expiresIn: number
}

/**
 *  Crea un JWT utilizando el identificador de usuario y el serial de autenticación proporcionados.
 * @param {string} id - Identificador de usuario
 * @param {string} key - Serial de autenticación.
 * @returns {Token} - Objeto que contiene el token JWT y la fecha de expiración.
 */
export const createJwt = (id: string | undefined, key: string): Token => {
  const expiresIn = 1000 * 43200
  return { token: Jwt.sign({ id }, key, { expiresIn }), expiresIn }
}
