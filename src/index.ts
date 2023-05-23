import { app } from './app'
import '@/auth/SignUp'
import '@/auth/SignIn'
import './connectBD'

app.listen(3000, () => {
  console.log('server on in port 3000')
})
