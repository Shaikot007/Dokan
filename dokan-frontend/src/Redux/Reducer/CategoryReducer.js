import { FETCH_CATEGORIES_DATA } from "../Constant/CategoryConstant";

//Redux reducer

export const categoriesReducer = (state = [], action) => {
  switch(action.type) {
    case FETCH_CATEGORIES_DATA:
      return [...action.payload];
    default:
      return state;
  }
};
