import { Type } from '@sinclair/typebox'

export const SignUp = Type.Object({
  firstName: Type.String({ minLength: 1 }),
  lastName: Type.String({ minLength: 1 }),
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 8, maxLength: 64 })
}, { additionalProperties: false })

export const SignIn = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 8, maxLength: 64 })
}, { additionalProperties: false })
