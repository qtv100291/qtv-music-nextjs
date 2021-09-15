import { axiosFb, axiosInner } from "./httpService";
import { setCookie } from "../utils/cookie";


const apiEndPointFacebookLogin = "/api/auth/log-in-facebook"
const tokenKey = "token_qtv";


export function getDataFacebook(extendOption){
  return axiosFb.get(extendOption)
}

export async function loginFacebook(data){
  const {data: tokenUser } = await axiosInner.post(apiEndPointFacebookLogin, data)
  setCookie(tokenKey, tokenUser.accessToken, 2);
  setCookie("refreshToken_qtv", tokenUser.refreshToken, 14);
}


