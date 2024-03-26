import express from 'express'

import { validate } from '../../middlewares/index.js'

import controller from './transactions.controller.js'
import { validations } from './transactions.validation.js'

const router = express.Router({ strict: true })

router.post('/transactions', validate(validations.create), controller.create)

router.get('/transactions', controller.getAll)

router.get('/transactions/:id', validate(validations.getById), controller.getById)

export default router
