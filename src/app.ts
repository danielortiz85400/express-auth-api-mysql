import express from 'express'
import { router } from '@/routes/routes'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { configSever } from "./envConfig"

export const app = express()
// Configuración
const middlewares = [
  express.json(),
  cookieParser(),
  cors({
    origin:configSever.origin,
    credentials:true,
  }),
]

middlewares.forEach((middleware) => app.use(middleware))

app.use('/api', router)
