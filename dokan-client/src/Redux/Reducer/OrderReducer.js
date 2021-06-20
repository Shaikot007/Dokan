import { SUBMIT_ORDER_DATA, FETCH_ORDER_DATA } from "../Constant/OrderConstant";

//Redux reducer

export const orderReducer = (state = [], action) => {
  switch (action.type) {
    case SUBMIT_ORDER_DATA:
      return [...state, action.payload];
    case FETCH_ORDER_DATA:
      return action.payload;
    default:
      return state;
  }
};
