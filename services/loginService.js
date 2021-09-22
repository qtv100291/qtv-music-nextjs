import http from "./httpService";
import jwtDecode from "jwt-decode";
import shoppingCartFunc from "../utils/shoppingCartFunc";
import { setCookie, getCookie } from "../utils/cookie";

const apiEndpoint = "/api/auth/log-in";
const tokenKey = "token_qtv";
const apiEndpointUser = "/api/auth/user";
const apiEndpointShoppingCart = "api/shopping-cart/update"

export async function login(user) {
  const userData = {
    email: user.emailLogIn,
    password: user.passwordLogIn,
  };
  const { data: tokenUser } = await http.post(apiEndpoint, userData);
  setCookie(tokenKey, tokenUser.accessToken, 2);
  setCookie("refreshToken_qtv", tokenUser.refreshToken, 14);
}

export function checkToken() {
  try {
    const jwtUser = getCookie("refreshToken_qtv");
    return jwtDecode(jwtUser);
  } catch (ex) {
    return null;
  }
}

export async function getUserData() {
  //get user's data and synchronize server
  const { data: user } = await http.get(apiEndpointUser);
  const shoppingCartServer = [...user.shoppingCart];
  const shoppingCartLocal = shoppingCartFunc.loadCartLocal() || [];
  const shoppingCart = shoppingCartFunc.merge2shoppingCart(
    shoppingCartServer,
    shoppingCartLocal
  ); // merger shopping from server and shopping card on user's computer
  const userData = { ...user };
  userData.shoppingCart = [...shoppingCart];
  await http.post(apiEndpointShoppingCart, {shoppingCart}); //update shopping cart on server
  localStorage.removeItem("qtv-cart");
  return userData;
}

export default {
  login,
  checkToken,
  getUserData,
};
