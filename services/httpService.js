import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import additionalFunctionDom from "../utils/additionalFunctionDom";
import { getCookie, setCookie } from "../utils/cookie";

export const axiosInner = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_DEV || "http://localhost:3000",
});

export const axiosFb = axios.create({
  baseURL: "https://graph.facebook.com",
});

let axiosOuter = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_DEV || "http://localhost:3000",
});

if (typeof window !== "undefined") {
  axiosOuter.defaults.headers.common["Authorization"] =
    "Bearer " + getCookie("token_qtv");
}

axiosOuter.interceptors.response.use(null, async (error) => {
  // console.log(error);
  const originalRequest = error.config;
  if (
    error.response.status === 401 &&
    error.response.data.message === "jwt expired"
  ) {
    try{
      const { data: userToken } = await axiosInner.post(
        "/api/auth/refresh-token",
        {
          refreshToken: getCookie("refreshToken_qtv"),
        }
      );
      setCookie("token_qtv", userToken.accessToken, 2);
      setCookie("refreshToken_qtv", userToken.refreshToken, 14);
      if (typeof window !== "undefined") {
        axiosOuter.defaults.headers.common["Authorization"] =
          "Bearer " + userToken.accessToken;
      }
      originalRequest.headers['Authorization'] = "Bearer " + userToken.accessToken
      return axiosOuter(originalRequest);
    }
    catch(err){
      return Promise.reject(error)
    }
    
  }

  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: "error",
      html: "Đã Có Lỗi Xảy Ra. Xin Thử Lại",
      showConfirmButton: false,
      timer: 1250,
    }).then(() => {
      additionalFunctionDom.releaseBody();
    });
  }
  return Promise.reject(error);
});

export default axiosOuter;
