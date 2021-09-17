import { useRouter } from "next/router";
import authService from "../../services/loginService";

const UnseenRoute = (WrappedComponent) => (props) => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    const tokenKey = authService.checkToken();
    const timeNow = Date.now() / 1000;
    if (tokenKey && tokenKey.exp > timeNow) router.replace('/')
    return <WrappedComponent {...props}/>
  }
  return null
}

export default UnseenRoute;