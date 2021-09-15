import http from "./httpService";
import store from "../store/configureStore";

const apiEndpoint = "/api/auth/updateUser";
const apiEndpointAvatar = "/api/auth/updateAvatar";
const apiEndpointShoppingCart = "/api/shopping-cart/update";
const apiEndpointPayout = "/api/payout";

async function updateUser() {
  const userDataAddress = { ...store.getState().user.userData.address };
  const userDataPayment = { ...store.getState().user.userData.payment };
  const userDataUpdate = { address: userDataAddress, payment: userDataPayment };
  await http.patch(apiEndpoint, userDataUpdate);
}

export async function updateAvatarUser(avatarLink) {
  await http.patch(apiEndpointAvatar, { avatarLink });
}

export async function updateShoppingCart() {
  const shoppingCart = [...store.getState().shoppingCart];
  try {
    await http.post(apiEndpointShoppingCart, { shoppingCart });
    return true
  } catch (err) {
    return false
  }
}


export default updateUser;
