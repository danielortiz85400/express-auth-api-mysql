import { PoolOptions } from 'mysql2'
import { Secret } from "jsonwebtoken"
import { config } from 'dotenv'
config()

/* BD -------------------------------------------*/
interface DBConfig extends PoolOptions {
  host: string
  user: string
  password: string
  database: string
  port: number
}
export const configPoolConnect: DBConfig = {
  host: process.env.DB_HOST || "" ,
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "",
  port: Number(process.env.DB_PORT)

}
/*-------------------------------------------*/

// Token
export const authToken = {
  token: process.env.AUTH_TOKEN ?? ''
}

interface Server {
  port: number,
  origin: string
  cookie: Secret
}

// Servidor
export const configSever: Server  = {
  port: Number(process.env.SERVER_PORT) ,
  origin: process.env.ORIGIN || '',
  cookie: process.env.COOKIE || ''
}