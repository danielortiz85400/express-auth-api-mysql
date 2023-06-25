import express from 'express'
import cors from 'cors'
import { router } from '@/routes/routes'
import { configSever } from "./envConfig"

export const app = express()
// Configuración
const middlewares = [
  express.json(),
  cors({
    origin: configSever.origin
  }),
]

middlewares.forEach((middleware) => app.use(middleware))

app.use('/api', router)
