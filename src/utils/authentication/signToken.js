import jwt from 'jsonwebtoken'

const signToken = (data, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, secretKey, { expiresIn: '15m' }, (error, token) => {
      if (error) {
        return reject(error)
      }

      return resolve(token)
    })
  })
}

export default signToken
