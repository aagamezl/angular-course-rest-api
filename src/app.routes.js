import { Router } from 'express'

import { authenticationRouter } from './domains/authentication/index.js'
import { transactionsRouter } from './domains/transactions/index.js'
import { usersRouter } from './domains/users/index.js'
import { productsRouter } from './domains/products/index.js'

const router = Router()

router.use('/', authenticationRouter)
router.use('/', productsRouter)
router.use('/', transactionsRouter)
router.use('/', usersRouter)

export default router
