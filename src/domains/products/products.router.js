import { join } from 'node:path'

import express from 'express'

import readJson from '../../utils/readJson.js'
import config from '../../config.js'

const router = express.Router({ strict: true })

const COLLECTION_PATH = join(config.database.path, 'products.json')

router.get('/products', async (req, res) => {
  // const token = req.headers['Authentication'].split(' ').get(-1)
  console.log(req.headers)

  res.json(await readJson(join(COLLECTION_PATH)))
})

router.post('/products', async (req, res) => {
  const data = await readJson(join(COLLECTION_PATH))
  const newProduct = {
    id: uuidv4(),
    ...req.body
  }
  data.push(newProduct)

  await writeJsonFile(join(COLLECTION_PATH), data)

  res.status(StatusCodes.CREATED).json(newProduct)
})

router.get('/products/:id', async (req, res) => {
  const products = await readJson(join(COLLECTION_PATH))
  const product = products.find(item => item.id === req.params.id)
  console.log(product);

  if (!product) {
    res.send(StatusCodes.NOT_FOUND)
  }

  res.json(product)
})

export default router
