import express from 'express'

import { authenticate, validate } from '../../utils/middlewares/index.js'

import controller from './authentication.controller.js'
import validations from './authentication.validation.js'

const router = express.Router({ strict: true })

router.get('/check-signin', authenticate, controller.checkSignin)

router.post('/signin', validate(validations.signin), controller.signin)

router.post('/signup', validate(validations.signup), controller.signup)

export default router
