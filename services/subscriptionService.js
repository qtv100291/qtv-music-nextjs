import http from './httpService';

const apiEndpoint = '/subscription';

export default function subscrible(user){
    const data = { email: user["email-subscription"] }
    return http.post(apiEndpoint,data)
}