import jwt from 'jsonwebtoken'

const veryToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error)
      }

      return resolve(decoded)
    });
  })
}

export default veryToken
