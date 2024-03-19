import jwt from 'jsonwebtoken'

import { SECRET_KEY } from '../config.js';

const veryToken = (token) => {
  return jwt.verify(token, SECRET_KEY)
}

export default veryToken
