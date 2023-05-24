import { app } from './app'
import './connectBD'
import '@/auth/AuthJwt'
import '@/auth/SignUp'
import '@/auth/SignIn'

app.listen(3000, () => {
  console.log('server on in port 3000')
})
