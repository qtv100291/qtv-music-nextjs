import shoppingCartFunc from "../../utils/shoppingCartFunc";
import _ from "lodash";
import { reverseShoppingCart } from "../shoppingCart";

const saveShoppingCart =  (store) => (next) => async (action) => {
  const prevShoppingCart = _.cloneDeep(store.getState().shoppingCart);
//   console.log("prevShoppingCart",prevShoppingCart)
  const actionTypeShoppingCart = [
    "shoppingCart/cartAddItem",
    "shoppingCart/cartPlusItem",
    "shoppingCart/cartMinusItem",
    "shoppingCart/cartDeleteItem",
    "shoppingCart/cartChangeQuantity",
    "shoppingCart/cartCheckEmpty",
    "shoppingCart/removeAllItem",
  ];
  next(action);
  if (actionTypeShoppingCart.includes(action.type)) {
    const isUpdateSuccessed = await shoppingCartFunc.saveShoppingCart();
    if (!isUpdateSuccessed) store.dispatch(reverseShoppingCart(prevShoppingCart));
  }
};

export default saveShoppingCart;
