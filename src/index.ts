import { app } from './app'
import "./initFiles"
import { configSever } from './envConfig'
try {
  app.listen(configSever.port || 3000, () => {
    console.log(`Server listening on port ${configSever.port}`);
  })
} catch (error) {
  console.error('Failed to start the server:', error);
}
