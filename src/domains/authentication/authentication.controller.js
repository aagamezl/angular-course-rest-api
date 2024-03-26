import { StatusCodes } from 'http-status-codes'

import model from './authentication.model.js'

/**
 * Create a new resource.
 *
 * @param {import('express').Request} req The Express.js request object
 * @param {import('express').Response} res The Express.js response object
 */
const checkSignin = (req, res) => {
  res.status(StatusCodes.OK).json({ loggedIn: true })
}

/**
 * Create a new resource.
 *
 * @param {import('express').Request} req The Express.js request object
 * @param {import('express').Response} res The Express.js response object
 */
const signin = async (req, res) => {
  try {
    const { email, password } = req.body

    const accessToken = await model.signin(email, password)

    if (!accessToken) {
      return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    return res.status(StatusCodes.OK).json({ accessToken })
  } catch (error) {
    console.error(error)

    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

/**
 * Create a new resource.
 *
 * @param {import('express').Request} req The Express.js request object
 * @param {import('express').Response} res The Express.js response object
 */
const signup = async (req, res) => {
  try {
    const accessToken = await model.signup(req.body)

    if (!accessToken) {
      return res.status(StatusCodes.BAD_REQUEST)
        .header('accept', 'application/json, application/problem+json')
        .json({
          type: 'https://example.com/problems/duplicate-user',
          title: 'Duplicate user',
          details: `A user with the email ${req.body.email} already exists`,
          instance: req.path
        })
    }

    return res.status(StatusCodes.OK).json({ accessToken })
  } catch (error) {
    console.error(error)

    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const controller = {
  checkSignin,
  signin,
  signup
}

export default controller
