// import { createPool, Pool } from 'mysql2/promise'
import { createPool, Pool } from 'mysql2/promise'
import { configPoolConnect } from './envConfig'

export const pool: Pool = createPool(configPoolConnect)

pool
  .getConnection()
  .then((connection) => {
    console.log('BD conectada!')
    connection.release()
  })
  .catch((err) => {
    console.log('Error al obtener la conexión:', err)
  })
