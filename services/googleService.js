import { axiosInner } from "./httpService";
import { setCookie } from "../utils/cookie";


const apiEndPointGoogleLogin = "/api/auth/log-in-google"
const tokenKey = "token_qtv";

export async function loginGoogle(data){
  const {data: tokenUser } = await axiosInner.post(apiEndPointGoogleLogin, data)
  setCookie(tokenKey, tokenUser.accessToken, 2);
  setCookie("refreshToken_qtv", tokenUser.refreshToken, 14);
}
