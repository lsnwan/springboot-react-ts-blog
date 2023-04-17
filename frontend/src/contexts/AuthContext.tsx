import {createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState} from "react";
import * as U from '../utils';
import axios from "axios";

export type LoggedUser = {userId: string; userEmail: string; userNickname: string; userRole: string[]}
type Callback = (message?: string) => void

type ContextType = {
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
    U.readStringP('userId')
      .then(() => {
        return axios.post('/api/login', {
          userEmail: email,
          userPw: password
        })
      })
      .then(res => res.data)
      .then((result: {code: string; message: string; data?: any;}) => {
        if (result.code === '200') {
          setLoggedUser(notUsed => result.data.userInfo)
          localStorage.setItem("userId", result.data.userInfo.userId);
          callback && callback()
        } else {
          setMessage(result.message ?? '')
          callback && callback(result.message)
        }
      })

  }, []);

  /*
   ! 로그아웃
   */
  const logout = useCallback((callback?: Callback) => {

    axios.post('/api/auth/logout', null)
      .then((res) => {
        setLoggedUser(undefined);
        localStorage.removeItem("userId");
      })
    callback && callback();
  }, []);


  useEffect(() => {

    const userId = localStorage.getItem("userId");
    if (loggedUser == undefined) {
      axios.post(`/api/accounts/my-info`, {userId: userId})
        .then(res => res.data)
        .then((result: { status: number; code: string; message: string; data: any; }) => {
          if (result.code === '200') {
            setLoggedUser(result.data)
            return;
          }

          if (result.code === 'A-001') {
            U.removeStringP("userId").then(() => {
            });
          }
        })
        .catch(e => {
          alert('서버에 문제가 발생했습니다.');
        })
    }

  }, [])


  const value = {
    loggedUser, signup, login, logout
  }

  return <AuthContext.Provider value={value} children={children} />
}

export const useAuth = () => {
  return useContext(AuthContext)
}