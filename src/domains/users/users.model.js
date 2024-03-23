import { join } from 'node:path'

import config from '../../config.js'
import veryToken from '../../utils/authentication/verifyToken.js'
import readJson from '../../utils/readJson.js'

const COLLECTION_PATH = join(config.database.path, 'users.json')

const profile = async (accessToken) => {
  const { authentication: { secretKey } } = config

  accessToken.split(' ').at(-1)

  const { id } = await veryToken(accessToken.split(' ').at(-1), secretKey)

  const users = await readJson(COLLECTION_PATH)

  const user = users.find(item => item.id === id)

  return user
}

const model = {
  profile
}

export default model
