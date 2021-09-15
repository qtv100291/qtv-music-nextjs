import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import additionalFunctionDom from "../utils/additionalFunctionDom";
import { getCookie } from "../utils/cookie";

export const axiosInner = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_DEV,
}) 

export const axiosFb = axios.create({
  baseURL: "https://graph.facebook.com"
})

const axiosOuter = axios.create({
  baseURL : process.env.NEXT_PUBLIC_API_BASE_URL_DEV,
  
})

if (typeof window !== "undefined") {
  axiosOuter.defaults.headers.common["Authorization"] =
  "Bearer " + getCookie("token_qtv");
}

axiosOuter.interceptors.response.use(null, (error) => {
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
