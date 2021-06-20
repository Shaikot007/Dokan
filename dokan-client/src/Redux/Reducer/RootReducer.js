import { combineReducers } from "redux";
import { productsReducer } from "./ProductsReducer";
import { categoriesReducer } from "./CategoryReducer";
import { countriesReducer } from "./CountryReducer";
import { cartListReducer } from "./CartListReducer";
import { orderReducer } from "./OrderReducer";

export default combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  countries: countriesReducer,
  cartlist: cartListReducer,
  order: orderReducer
});
