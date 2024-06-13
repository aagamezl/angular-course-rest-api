import { join } from 'node:path'

import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from 'http-status-codes'

import config from '../../config.js';
import readJson from '../../utils/readJson.js';
import writeJson from '../../utils/writeJson.js';

const COLLECTION_PATH = join(config.database.path, 'transactions.json')

const ERRORS = {
  'insufficient-funds': (balance, amount) => {
    return {
      type: 'https://example.com/problems/insufficient-funds',
      title: 'Insufficient Funds',
      status: StatusCodes.BAD_REQUEST,
      details: `Your current balance is ${balance}, but the transaction amount is ${amount}.`,
      balance: balance,
      instance: '{PATH}'
    }
  }
}

const JSON_PROBLEM_MARKER = 'JSON_PROBLEM'

const create = async (payload) => {
  const transactions = await readJson(COLLECTION_PATH)
  let status = 'Success'
  const balance = transactions.at(-1).balance

  if (payload.amount > balance) {
    throw new Error(`${JSON_PROBLEM_MARKER}: ${JSON.stringify(ERRORS['insufficient-funds'](balance, payload.amount))}`)
  }

  const transaction = {
    id: uuidv4(),
    ...payload,
    status,
    date: (new Date()).getTime()
  }

  transactions.push(transaction)

  await writeJson(COLLECTION_PATH, transactions)

  return transaction
}

const deleteById = async (id) => {
  /** @type {Array} */
  const transactions = await readJson(COLLECTION_PATH)

  const index = transactions.findIndex(todo => todo.id === id)

  if (index === -1) {
    return false
  }

  transactions.splice(index, 1)

  await writeFile(COLLECTION_PATH, JSON.stringify(transactions, null, 2))

  return true
}

const getAll = async () => {
  return readJson(COLLECTION_PATH)
}

const getById = async (id) => {
  return (await readJson(COLLECTION_PATH)).find(todo => todo.id === id)
}

const update = async (id, payload) => {
  const transactions = await readJson(COLLECTION_PATH)

  const index = transactions.findIndex(todo => todo.id === id)

  if (index === -1) {
    return
  }

  transactions[index] = { ...transactions[index], ...payload }

  await writeFile(DATABASE_PATH, JSON.stringify(transactions, null, 2))

  return transactions[index]
}

const model = {
  create,
  deleteById,
  getAll,
  getById,
  update,
  ERRORS,
  JSON_PROBLEM_MARKER
}

export default model
