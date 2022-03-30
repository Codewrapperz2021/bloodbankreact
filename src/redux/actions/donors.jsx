import { UPDATE_DONORS_DATA } from "./actionTypes";
import axios from "axios";
import { api_base_url } from "../../Constants";
import { message } from "antd";
export const updateDonorsData = (payload) => {
  return async (dispatch) => {
    try {
      if(localStorage.getItem('token')){
        let { data } = await axios.post(`${api_base_url}/findDonors`, payload);
        data.status == "success" &&
          dispatch({
            type: UPDATE_DONORS_DATA,
            payload: data.donorsData,
          });
      }else{
        let { data } = await axios.post(`${api_base_url}/findDonorss`, payload);
        data.status == "success" &&
          dispatch({
            type: UPDATE_DONORS_DATA,
            payload: data.donorsData,
          });
      }
  
    } catch (error) {
      console.log("error", error);
    }
  };
};
export const deleteUser = (payload) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.post(`${api_base_url}/deleteUser`, payload);
      data == "success" && message.success("Success");
      data == "success" && dispatch(updateDonorsData());
    } catch (error) {
      console.log(error);
    }
  };
};
