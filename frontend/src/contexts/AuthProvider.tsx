import { createContext, ReactNode, useContext, useState } from 'react'
import AuthService from '../services/Auth'
import { IAuth } from '../interfaces/api/IAuth'

export const AuthContext = createContext({})

export default function AuthProvider({ children }: { children?: ReactNode }) {
  const [auth, setAuth] = useState<IAuth | null>(null)

  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [isError, setIsError] = useState(false)

  async function findAuth() {
    try {
      setIsError(false)
      setLoadingSubmit(true)

      const selectedAuth = await AuthService.findMe()
      if(selectedAuth) setAuth(selectedAuth.user)

      setLoadingSubmit(false)
      return selectedAuth
    } catch (e) {
      console.error('error', e)
      setIsError(true)
      setLoadingSubmit(false)
    }
  }

  async function createAuth(data: IAuth) {
    try {
      setIsError(false)
      setLoadingSubmit(true)

      const isCreated = await AuthService.create(data)

      return isCreated
    setLoadingSubmit(false)
    } catch (e) {
      console.error('error', e)
      setIsError(true)
      setLoadingSubmit(false)
    }
  }
  
  async function login(data: IAuth) {
    try {
      setIsError(false)
      setLoadingSubmit(true)

      const loginAuth = await AuthService.login(data)
      if(loginAuth) localStorage.setItem('token', loginAuth.token)

      setLoadingSubmit(false)
      return loginAuth
    } catch (e) {
      console.error('error', e)
      setIsError(true)
      setLoadingSubmit(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        createAuth,
        login,
        findAuth,
        loadingSubmit,
        setLoadingSubmit,
        isError,
        setIsError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  const {
    auth,
    setAuth,
    createAuth,
    login,
    findAuth,
    loadingSubmit,
    setLoadingSubmit,
    isError,
    setIsError,
  }: any = context

  return {
    auth,
    setAuth,
    createAuth,
    login,
    findAuth,
    loadingSubmit,
    setLoadingSubmit,
    isError,
    setIsError,
  }
}
