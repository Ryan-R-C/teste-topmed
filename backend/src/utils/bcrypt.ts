import { ENV_API } from '../config/ENV_API'
import { compareSync, hash } from 'bcrypt'

export const Bcrypt = {
  async hash(password: string): Promise<string> {
    const hashPassword = await hash(password, ENV_API.saltRounds)
    return hashPassword
  },

  compare(password: string, hashPassword: string): boolean {
    const isMatchPassword = compareSync(password, hashPassword)
    return isMatchPassword
  },
}
