import {axiosInner} from './httpService';

const apiEndpoint = '/api/subscription';

export default function subscrible(user){
    const data = { email: user["email-subscription"] }
    return axiosInner.post(apiEndpoint, data)
}