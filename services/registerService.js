import { axiosInner } from "./httpService";

const apiEndpoint = "/api/auth/register";

export default function registerNewUser(user) {
  const time = new Date();
  const year = time.getFullYear();
  const date = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
  const month =
    time.getMonth() < 9 ? `0${time.getMonth() + 1}` : time.getMonth() + 1;
  const data = {
    email: user.emailRegister,
    phone: user.phoneRegister,
    password: user.passwordRegister,
    name: user.nameRegister,
    shoppingCart: [],
    avatar: "",
    address: {
      province: "",
      district: "",
      commune: "",
      street: "",
    },
    payment: {
      cardType: "",
      cardNumber: "",
      cardOwner: "",
      cardExpireDate: "",
      cardCvv: "",
    },
    createDate: `${date} - ${month} - ${year}`,
    tradeHistory: [],
  };
  return axiosInner.post(apiEndpoint, data);
}
