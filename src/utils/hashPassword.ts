import { genSaltSync, hashSync, compareSync } from 'bcrypt'

/**
 * @param {string} password - Contraseña 
 * @returns {string} - Retorna un string con la contraseña encriptada..
 */
export const encryptPassword = (password: string): string => hashSync(password.toString(), genSaltSync(10))


/**
 * Compara una contraseña con un hash encriptado para verificar si coinciden.
 * @param {string} password - Contraseña 
 * @param {string} hash - Hash encriptado a comparar.
 * @returns {boolean} - Retorna `true` si la contraseña coincide con el hash, de lo contrario, retorna `false`.
 */
export const comparePassword = (password: string, hash: string): boolean => compareSync(password, hash)
