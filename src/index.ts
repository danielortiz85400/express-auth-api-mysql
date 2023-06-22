import { app } from './app'
import './connectBD'
import '@/auth/AuthJwt'
import '@/auth/SignUp'
import '@/auth/SignIn'

import { configSever } from './envConfig'
try {
  app.listen(configSever.port, () => {
    console.log(`Server listening on port ${configSever.port}`);
  })
} catch (error) {
  throw error
  console.error('Failed to start the server:', error);
}
