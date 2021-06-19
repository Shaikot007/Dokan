import axios from "axios";
import {
  FETCH_PRODUCTS_DATA,
  FETCH_PRODUCTS_COUNT,
  SET_PRODUCTS_FILTERS,
  FETCH_PRODUCT_DETAILS_DATA
} from "../Constant/ProductConstant";
import config from "../../config";

//Redux action

export const setPaginationFilterAndFetchProducts = (number, productsPerPage) => {
  return (dispatch, getState) => {
    const filters = getState().products.product_filters;

    dispatch(setProductFilters({
      ...filters,
      page: number,
      limit: productsPerPage,
      sort_by: "name"
    }));

    dispatch(fetchProductsAction());
  }
};

export const setNameFilterAndFetchProducts = (name) => {
  return (dispatch, getState) => {
    const filters = getState().products.product_filters;

    dispatch(setProductFilters({
      ...filters,
      product_name: name,
      sort_by: "name"
    }));

    dispatch(fetchProductsAction());
  }
};

export const setCategoryFilterAndFetchProducts = (category) => {
  return (dispatch, getState) => {
    const filters = getState().products.product_filters;

    dispatch(setProductFilters({
      ...filters,
      product_category: category,
      sort_by: "name"
    }));

    dispatch(fetchProductsAction());
  }
};

export const setPriceFilterAndFetchProducts = (price) => {
  return (dispatch, getState) => {
    const filters = getState().products.product_filters;

    dispatch(setProductFilters({
      ...filters,
      min_price: price.min_price,
      max_price: price.max_price,
      sort_by: "price"
    }));

    dispatch(fetchProductsAction());
  }
};

export const setCountryFilterAndFetchProducts = (country) => {
  return (dispatch, getState) => {
    const filters = getState().products.product_filters;

    dispatch(setProductFilters({
      ...filters,
      product_country: country,
      sort_by: "name"
    }));

    dispatch(fetchProductsAction());
  }
};

export const setProductFilters = (filters) => {
  return (dispatch) => {
    dispatch({
      type: SET_PRODUCTS_FILTERS,
      payload: filters
    })
  }
};

export const fetchProductsAction = () => {
  return (dispatch, getState) => {
    const host = `${config.api_url}`;
    const path = "/products";

    const queryObj = getState().products.product_filters;

    let queries = [];

    const {
      product_name,
      product_category,
      min_price,
      max_price,
      product_id,
      product_country,
      sort_by,
      page,
      limit
    } = queryObj;

    if(product_name !== "") {
      queries.push("product_name=" + product_name);
    }
    if(product_category !== "") {
      queries.push("product_category=" + product_category);
    }
    if(min_price !== "") {
      queries.push("min_price=" + min_price);
    }
    if(max_price !== "") {
      queries.push("max_price=" + max_price);
    }
    if(product_country !== "") {
      queries.push("product_country=" + product_country);
    }
    if(product_id !== "") {
      queries.push("product_id=" + product_id);
    }
    if(sort_by !== "") {
      queries.push("sort_by=" + sort_by);
    };
    if(page !== "") {
      queries.push("page=" + page);
    };
    if(limit !== "") {
      queries.push("limit=" + limit);
    };

    let url = host + path;

    if(queries.length > 0) {
      url += "?" + queries.join("&");
    };

    axios.get(url)
      .then(response => {
        return response.data
      })
      .then(data => {
        dispatch({
          type: FETCH_PRODUCTS_DATA,
          payload: data.products_list
        })
        dispatch({
          type: FETCH_PRODUCTS_COUNT,
          payload: data.count
        })
      })
      .catch (error => {
        console.error(error);
        return { message: "something went wrong" };
      });
  };
};

export const fetchProductDetailsAction = (id) => {
  return (dispatch) => {
    const host = `${config.api_url}`;
    const path = "/products/" + id;

    let url = host + path;

    axios.get(url)
      .then(response => {
        return response.data
      })
      .then(data => {
        dispatch({
          type: FETCH_PRODUCT_DETAILS_DATA,
          payload: data
        })
      })
      .catch (error => {
        console.error(error);
        return { message: "something went wrong" };
      });
  };
};
