import { StatusCodes } from 'http-status-codes'

import model from './users.model.js'

/**
 * Create a new resource.
 *
 * @param {import('express').Request} req The Express.js request object
 * @param {import('express').Response} res The Express.js response object
 */
const profile = async (req, res) => {
  try {
    const user = await model.profile(req.headers['authorization'])

    res.status(StatusCodes.OK).json(user)
  } catch (error) {
    console.log(error)

    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const controller = {
  profile
}

export default controller
