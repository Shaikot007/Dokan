import { FETCH_COUNTRIES_DATA } from "../Constant/CountryConstant";

//Redux reducer

export const countriesReducer = (state = [], action) => {
  switch(action.type) {
    case FETCH_COUNTRIES_DATA:
      return [...action.payload];
    default:
      return state;
  }
};
