import { genSaltSync, hashSync, compareSync } from 'bcrypt'

export const encryptPassword = (password: string): string => hashSync(password.toString(), genSaltSync(10))

export const comparePassword = (password: string, hash: string): boolean => compareSync(password, hash)
