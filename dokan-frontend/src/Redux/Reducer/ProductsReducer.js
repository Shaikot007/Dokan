import {
  FETCH_PRODUCTS_DATA,
  FETCH_PRODUCTS_COUNT,
  SET_PRODUCTS_FILTERS,
  FETCH_PRODUCT_DETAILS_DATA
} from "../Constant/ProductConstant";

//Redux reducer
const defaultState = {
  product_list: [],
  products_count: 0,
  products_details: {},
  product_filters: {
    product_name: "",
    product_category: "",
    min_price: "",
    max_price: "",
    product_country: "",
    sort_by: "",
    page: 1,
    limit: 15
  }
};

export const productsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_DATA:
      return { ...state, product_list: [...action.payload] };
    case FETCH_PRODUCTS_COUNT:
      return { ...state, products_count: action.payload };
    case SET_PRODUCTS_FILTERS:
      return { ...state, product_filters: action.payload };
    case FETCH_PRODUCT_DETAILS_DATA:
      return { ...state, products_details: {...action.payload} };
    default:
      return state;
  }
};
