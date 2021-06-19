import { SUBMIT_ORDER_DATA, FETCH_ORDER_DATA } from "../Constant/OrderConstant";
import axios from "axios";
import config from "../../config";

//Redux action

export const submitOrderAction = (order) => {
  return (dispatch) => {
    //Get data from local storage
    const user_token = localStorage.getItem("myToken");

    const url = `${config.api_url}/order`;

    return axios.post(url, order, {
      headers: {
        Authorization: `Bearer ${user_token}`
      }
    })
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: SUBMIT_ORDER_DATA,
            payload: response.data.order
          })
          alert("Order submitted.")
        }
      })
      .catch(error => error.response.status !== 200 ? alert("Please sign in to your account.") : null);
  }
};

export const fetchOrderAction = () => {
  return (dispatch) => {
    //Get data from local storage
    const user_token = localStorage.getItem("myToken");

    const url = `${config.api_url}/order`;

    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${user_token}`
      }
    })
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: FETCH_ORDER_DATA,
          payload: response.data
        })
      }
    })
    .catch(error => error.response.status !== 200 ? alert("Authentication failed.") : null);
  };
};
