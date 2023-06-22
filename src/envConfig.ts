import { PoolOptions } from 'mysql2'
import { config } from 'dotenv'
config()

interface DBConfig extends PoolOptions {
  host?: string
  user?: string
  password?: string
  database?: string
  port?: number
}

export const configPoolConnect: DBConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT)

}

// interface Token {
//   token: string
// }
export const authToken = {
  token: process.env.AUTH_TOKEN ?? ''
}

export const configSever = {
  port: 3000
}