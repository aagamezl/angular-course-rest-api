import { join } from 'node:path'

import { v4 as uuidv4 } from 'uuid';

import config from '../../config.js';
import readJson from '../../utils/readJson.js'
import signToken from '../../utils/authentication/signToken.js'
import writeJson from '../../utils/writeJson.js';

const COLLECTION_PATH = join(config.database.path, 'users.json')

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
    ...payload
  })

  await writeJson(COLLECTION_PATH, users)

  return signToken({ id, email: payload.email })
}

const model = {
  signin,
  signup
}

export default model
