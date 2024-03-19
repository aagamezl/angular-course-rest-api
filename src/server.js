import { join } from 'node:path'

import cors from 'cors'
import express, { json } from 'express'
import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';


import { readJsonFile, writeJsonFile } from './utils/read-json-file.js'
import veryToken from './utils/verify-token.js';
import signToken from './utils/sign-token.js';

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3000
const HOSTNAME='localhost'
const DATABASE_NAME = 'database'
const DATABASE_PATH = join(process.cwd(), DATABASE_NAME)

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send({ status: 'ok' })
})

app.get('/transactions', async (req, res) => {
  try {
    return res.json(await readJsonFile(join(DATABASE_PATH, 'transactions.json')))
  } catch (error) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
  }
})
app.get('/profile', async (req, res) => {
  try {
    return res.json(await readJsonFile(join(DATABASE_PATH, 'users.json')))
  } catch (error) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
  }
})

app.listen(PORT, HOSTNAME, () => {
  console.log(`Example app listening on port http://${HOSTNAME}:${PORT}`)
})
