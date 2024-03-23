import express from 'express'

import controller from './users.controller.js'

const router = express.Router({ strict: true })

router.get('/users/profile', controller.profile)

export default router
