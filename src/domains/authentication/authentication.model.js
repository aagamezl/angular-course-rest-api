import { join } from 'node:path'

import { v4 as uuidv4 } from 'uuid';

import config from '../../config.js';
import readJson from '../../utils/readJson.js'
import signToken from '../../utils/authentication/signToken.js'
import writeJson from '../../utils/writeJson.js';

const COLLECTION_PATH = join(config.database.path, 'users.json')

const getRandomAccount = () => {
  const digits = '123456789'; // Digits for generating account number
  let accountNumber = '';

  // First chunk with 4 digits
  for (let i = 0; i < 4; i++) {
    accountNumber += digits[Math.floor(Math.random() * digits.length)];
  }
  accountNumber += ' '; // Add a space after the first chunk

  // Second chunk with 2 digits
  for (let i = 0; i < 2; i++) {
    accountNumber += digits[Math.floor(Math.random() * digits.length)];
  }
  accountNumber += ' '; // Add a space after the second chunk

  // Third chunk with 3 digits
  for (let i = 0; i < 3; i++) {
    accountNumber += digits[Math.floor(Math.random() * digits.length)];
  }
  accountNumber += ' '; // Add a space after the third chunk

  // Fourth chunk with 2 digits
  for (let i = 0; i < 2; i++) {
    accountNumber += digits[Math.floor(Math.random() * digits.length)];
  }

  return accountNumber;
}

const signin = async (email, password) => {
  const users = await readJson(COLLECTION_PATH)

  const user = users.find(item => item.email === email && item.password === password)

  if (!user) {
    return
  }

  const { authentication: { secretKey } } = config

  return signToken({ id: user.id, email }, secretKey)
}

const signup = async (payload) => {
  /** @type {Array} */
  const users = await readJson(COLLECTION_PATH)

  const user = users.find(item => item.email === payload.email )

  if (user) {
    return
  }

  const id = uuidv4()

  users.push({
    id,
    ...payload,
    accounts: [
      getRandomAccount()
    ]
  })

  await writeJson(COLLECTION_PATH, users)

  const { authentication: { secretKey } } = config

  return signToken({ id, email: payload.email }, secretKey)
}

const model = {
  signin,
  signup
}

export default model
