import { FETCH_COUNTRIES_DATA } from "../Constant/CountryConstant";
import axios from "axios";
import config from "../../config";

//Redux action

export const fetchCountriesAction = () => {
  return (dispatch) => {
    return axios.get(`${config.api_url}/countries`)
      .then(response => {
        return response.data
      })
      .then(data => {
        dispatch({
          type: FETCH_COUNTRIES_DATA,
          payload: data
        })
      })
      .catch (error => {
        console.error(error);
        return { message: "something went wrong" };
      });
  };
};
