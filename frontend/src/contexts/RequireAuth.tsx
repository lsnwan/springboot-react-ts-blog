import {FC, PropsWithChildren, useEffect} from "react";
import {useAuth} from "./AuthContext";
import {useNavigate} from "react-router";

type RequireAuthProps = {}

const RequireAuth: FC<PropsWithChildren<RequireAuthProps>> = ({children}) => {
  const {loggedUser} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedUser) navigate('/login')
  }, [loggedUser, navigate]);

  return <>{children}</>
}

export default RequireAuth