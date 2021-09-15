import { axiosInner } from './httpService';

const apiEndpoint = '/api/auth/register';

export default function registerNewUser(user){
    const data = {
        email : user.emailRegister,
        phone : user.phoneRegister,
        password : user.passwordRegister,
        name : user.nameRegister,
        shoppingCart : [],
        avatar:"",
        address : {
            province : "",
            district : "",
            commune : "",
            street : ""
        },
        payment : {
            cardType : "",
            cardNumber : "",
            cardOwner: "",
            cardExpireDate: "",
            cardCvv: ""
        },
        tradeHistory:[]
    }
    return axiosInner.post(apiEndpoint,data)
}




