import jwt from 'jsonwebtoken'

import { SECRET_KEY } from '../config.js';

const signToken = (data) => {
  // CREA EL JSONWEBTOKEN
  return jwt.sign(
    data,
    SECRET_KEY,
    {
      expiresIn: '15m'
    }
  );
}

export default signToken
