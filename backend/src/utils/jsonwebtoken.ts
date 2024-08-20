import { ENV_API } from '../config/ENV_API'
import { sign, verify } from 'jsonwebtoken'

export const Jsonwebtoken = {
  generate(id: string) {
    const token = sign({ id }, ENV_API.secretKey)
    return token
  },

  validate(token: string): Validate {
    try {
      const response = verify(token, ENV_API.secretKey) as Validate
      return response
    } catch (err) {
      console.error(err)
      return false
    }
  },
}

type Validate = {
  id: string
} | false
