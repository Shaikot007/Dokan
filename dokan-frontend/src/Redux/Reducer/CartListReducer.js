import { CART_LIST } from "../Constant/CartListConstant";

//Redux reducer

export const cartListReducer = (state = [], action) => {
  switch (action.type) {
    case CART_LIST:
      return [...action.payload];
    default:
      return state;
  }
};
