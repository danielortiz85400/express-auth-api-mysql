import express from 'express'
import { router } from '@/routes/routes'
import cors from 'cors'

export const app = express()
// Configuración
const middlewares = [
  express.json(),
  cors({
    origin: '*'
  }),
]

middlewares.forEach((middleware) => app.use(middleware))

app.use('/api', router)
