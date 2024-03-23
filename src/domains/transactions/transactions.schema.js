import { Type } from '@sinclair/typebox'

export const TodoID = Type.Object({
  id: Type.String({ format: 'uuid' })
})

export const TodoCreate = Type.Object({
  type: Type.String(Type.Enum('Deposit', 'Withdrawal')),
  source: Type.String({ maxLength: 14 }),
  destination: Type.Optional(Type.Union([
    Type.String({ maxLength: 14 }),
    Type.Null()
  ])),
  amount: Type.Number({type: 'float'}),
  category: Type.String(),
  description: Type.String()
  // status: Type.String(Type.Enum('a', 'b')),,
  // balance: Type.Number({ type: 'float' }),
  // date: Type.Integer()
}, { additionalProperties: false })

export const TodoUpdate = Type.Partial(TodoCreate)
