import axios from "axios";
import { message } from "antd";
import { api_base_url } from "../Constants";
import { Navigate, useNavigate } from "react-router-dom";
// const navigate=useNavigate();

export const loginHandler =async (email, password) => {
  await axios
    .post(`${api_base_url}/login`, {
      email,
      password,
    })
    .then((res) => {
      // if (res.data.status == "success" && res.data.loginData.email_verified_at!=null) {
      if (res.data.status == "success") {
          
       

        message.success("Logged In Successfully");
        localStorage.setItem("userDetails", JSON.stringify(res.data.loginData));
        localStorage.setItem("token", res.data.loginData.token);
        res.data.loginData.role !== "admin"
        ?  (window.location.pathname = "/profile")
        : (window.location.pathname = "/admin/users");
      
      } else if (res.data.status == "failure") {
        message.warning("Something Went Wrong");
        
      }
    });
};
export const logout =async () => {
  await axios.post(`${api_base_url}/logout`).then((res) => {
    if (res.data.status == "success") {
      // if ((window.location.pathname = "/")) {
      //   window.location.hash = "home";
      // } else {
      //   window.location.pathname = "/";
      // }
      message.info("Logged Out Successfully");
      
      window.location="/login"
      // window.location.hash = "home";
      // window.location.reload();
      localStorage.clear();
    } else if (res.data.status == "failure") {
      message.warning(res.data.error);
    }
  });
};
export const updateUser = async(payload) => {
 await axios.post(`${api_base_url}/update`, payload).then((res) => {
    if (res.data.status == "success") {
      message.success("Profile Updated");
      localStorage.setItem("userDetails", JSON.stringify(res.data.updatedData));
      return true
    } else if (res.data.status == "failure") {
      message.warning(res.data.error);
      return false
    }
  });
};
