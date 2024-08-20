import { IAuth } from '../../interfaces/api/IAuth'
import api from '../index'

export default class AuthService {
  static async create(data: IAuth) {
    const response = await api.post('users', data)

    const responseData = response.data
    return responseData
  }

  static async login(data: IAuth): Promise<{ token: string } | null> {
    const response = await api.post('login', data)

    const responseData = response.data
    return responseData
  }

  static async findMe(): Promise<{user: IAuth} | null> {
    const response = await api.get(`me`)

    return response.data
  }

}
