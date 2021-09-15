
import http from './httpService';

const apiEndpoint ='/order';

export default function sendOrder(orderInfo){
    return http.post(apiEndpoint,orderInfo)
}