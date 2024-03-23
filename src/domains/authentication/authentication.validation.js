import { REQUEST_SEGMENTS } from '../../utils/index.js'
import { SignIn, SignUp } from './authentication.schema.js'

const validations = {
  // POST /authentication/signin
  signin: {
    [REQUEST_SEGMENTS.BODY]: SignIn
  },
  // POST /authentication/signup
  signup: {
    [REQUEST_SEGMENTS.BODY]: SignUp
  }
}

export default validations
