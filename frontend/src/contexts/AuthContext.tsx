import {createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState} from "react";
import * as U from '../utils';
import axios from "axios";
import {useNavigate} from "react-router";
import {Path} from "@remix-run/router/history";

export type LoggedUser = {
  userId: string;
  userEmail: string;
  userNickname: string;
  emailVerifiedConfirmDate: string
  profilePath: string | null;
  userRole: string[]}
type Callback = (message?: string) => void

type ContextType = {

  loggedUser?: LoggedUser
  signup: (email: string, password: string, callback?: Callback) => void
  login: (email: string, password: string, callback?: Callback) => void
  socialLogin: (code: string, platformName: string, callback?: Callback) => void
  logout: (callback?: Callback) => void
  updateProfile: (profilePath: string | null) => void
}

export const AuthContext = createContext<ContextType>({
  signup: (email: string, password: string, callback?: Callback) => {},
  login: (email: string, password: string, callback?: Callback) => {},
  socialLogin: (code: string, platformName: string, callback?: Callback) => {},
  logout: (callback?: Callback) => {},
  updateProfile: (profilePath: string | null) => {},
})

type AuthProviderProps = {}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({children}) => {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | undefined>(undefined)
  const [message, setMessage] = useState<string>('')
  const navigate = useNavigate();
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
          setLoggedUser(notUsed => result.data.userInfo);
          localStorage.setItem("userId", result.data.userInfo.userId);
          callback && callback()
        } else {
          setMessage(result.message ?? '')
          callback && callback(result.message)
        }
      })

  }, []);

  /*
   ! 소셜 로그인
   */
  const socialLogin = useCallback((code: string, platformName: string, callback?: Callback) => {
    U.readStringP("userId")
      .then(() => {
        return axios.post(`/api/oauth/${platformName}/login`, {
          accountType: platformName,
          code: code
        }).then(res => res.data)
          .then((result: {code: string; message: string; data?: any;}) => {
            if (result.code === '200') {
              setLoggedUser(notUsed => result.data.userInfo);
              localStorage.setItem("userId", result.data.userInfo.userId);
              callback && callback()
            } else {
              alert(result.message);
              callback && callback()
            }
          })
      })
  }, [])

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

  const updateProfile = ((profilePath: string | null) => {
    if (loggedUser !== undefined) {
      setLoggedUser(prevState => ({
        ...prevState!,
        profilePath: profilePath
      }));
    }
  });

  useEffect(() => {

    const userId = localStorage.getItem("userId");
    if (loggedUser == undefined) {
      axios.post(`/api/accounts/my-info`, {userId: userId})
        .then(res => res.data)
        .then((result: { status: number; code: string; message: string; data: any; path: string | Partial<Path>;}) => {
          if (result.code === '200') {
            setLoggedUser(result.data)
            return;
          }

          if (result.code === 'A-001') {
            U.removeStringP("userId").then(() => {
            });
            navigate(result.path);
          }
        })
        .catch(e => {
          alert('서버에 문제가 발생했습니다.');
        })
    }

  }, [])


  const value = {
    loggedUser, signup, login, socialLogin, logout, updateProfile
  }

  return <AuthContext.Provider value={value} children={children} />
}

export const useAuth = () => {
  return useContext(AuthContext)
}