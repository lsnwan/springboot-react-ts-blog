import {createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState} from "react";
import * as U from '../utils';
import axios from "axios";

export type LoggedUser = {email: string; password: string}
type Callback = () => void

type ContextType = {
  jwt?: string
  errorMessage?: string
  loggedUser?: LoggedUser
  signup: (email: string, password: string, callback?: Callback) => void
  login: (email: string, password: string, callback?: Callback) => void
  logout: (callback?: Callback) => void
}

export const AuthContext = createContext<ContextType>({
  signup: (email: string, password: string, callback?: Callback) => {},
  login: (email: string, password: string, callback?: Callback) => {},
  logout: (callback?: Callback) => {},
})

type AuthProviderProps = {}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({children}) => {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | undefined>(undefined)
  const [jwt, setJwt] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  /*
   ! 회원가입
   */
  const signup = useCallback((email: string, password: string, callback?: Callback) => {

  }, [])

  /*
   ! 로그인
   */
  const login = useCallback((email: string, password: string, callback?: Callback) => {
    const user = {email, password}
    U.readStringP('jwt')
      .then(jwt => {
        setJwt(jwt ?? '')
        return axios.post('/api/login', {
          userEmail: user.email,
          userPw: user.password
        })
      })
      .then(res => res.data)
      .then((result: {code: string; message?: string}) => {
        if (result.code === '200') {
          setLoggedUser(notUsed => user)
          callback && callback()
        } else {
          setMessage(result.message ?? '')
        }
      })
      .catch((e: Error) => setMessage(e.message ?? ''))

  }, []);

  /*
   ! 로그아웃
   */
  const logout = useCallback((callback?: Callback) => {
    setJwt(notUsed => '')
    setLoggedUser(undefined)
    callback && callback()
  }, []);


  useEffect(() => {
    const deleteToken = false
    if (deleteToken) {
      U.writeStringP('jwt', '')
        .then(() => {})
        .catch(() => {})
    } else {
      U.readStringP('jwt')
        .then(jwt => setJwt(jwt ?? ''))
        .catch(() => {})
    }
  })

  useEffect(() => {
    if (message) {
      alert(message)
      setMessage(notUsed => '')
    }
  }, [message])

  const value = {
    jwt, message, loggedUser, signup, login, logout
  }

  return <AuthContext.Provider value={value} children={children} />
}

export const useAuth = () => {
  return useContext(AuthContext)
}