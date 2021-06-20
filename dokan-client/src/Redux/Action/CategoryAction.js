import { FETCH_CATEGORIES_DATA } from "../Constant/CategoryConstant";
import axios from "axios";
import config from "../../config";

//Redux action

export const fetchCategoriesAction = () => {
  return (dispatch) => {
    return axios.get(`${config.api_url}/categories`)
      .then(response => {
        return response.data
      })
      .then(data => {
        dispatch({
          type: FETCH_CATEGORIES_DATA,
          payload: data
        })
      })
      .catch (error => {
        console.error(error);
        return { message: "something went wrong" };
      });
  };
};
