import React, { useState } from "react";
import { loginHandler } from "../Service/AuthService";
import tlogo from "./Sections/tname.jpg";
import blood from "./Sections/./bloodgif.gif";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Input, Modal, Button, Table, Spin, Tag, message } from "antd";
import axios from "axios";
import { api_base_url } from "../Constants";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [number, setNumber] = useState("");
  const [sendotp, setSendotp] = useState("");
  const [otp, setOtp] = useState("");
  const [Password, setPassword] = useState("");
  const [forgetvis, setForgetvis] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await loginHandler(email, pass);
    setLoading(false);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPass(e.target.value);
  };
  function sentotp() {
    const num = {
      phone: number,
    };
    axios.post(api_base_url + "/resetpasswordotp", num).then((res) => {
      setSendotp(res.data.otp);
      message.success("otp sent to your phone");
     
    });
  }
  function forgetpass() {
    const data = {
      phone: number,
      password: Password,
    };
    {
      otp == sendotp
        ? axios.post(api_base_url + "/resetpassowrd", data).then((res) => {
            message.success("Password changed");
            setForgetvis(false)
            
          })
        : message.error("please enter correct otp");
    }
  }
  return (
    <section id="login" data-id="login" className="my_section">
      <Modal
        title="Forget Password"
        visible={forgetvis}
        onOk={(e) => forgetpass(e)}
        onCancel={() => setForgetvis(false)}
      >
        {/* <Spin spinning={loading} size="large"> */}
        <form
          class="contact-form"
          id="contact-form-data"
          onSubmit={(e) => {
            forgetpass(e);
          }}
        >
          <div class="col-lg-12 row">
            <div class="col-lg-8">
              <div class="form-group">
                <input
                  class="form-control"
                  type="number"
                  placeholder="Phone"
                  name="phone "
                  onChange={(e) => {
                    setNumber(e.target.value);
                  }}
                />
              </div>
            </div>
            <div class="col-lg-4">
              <Button
                onClick={sentotp}
                style={{ background: "#ed2d34", color: "white" }}
              >
                sent otp
              </Button>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group">
              <input
                class="form-control"
                type="text"
                placeholder="Otp"
                name="otp"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group">
              <input
                class="form-control"
                type="password"
                placeholder="Password"
                name="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
        </form>
        {/* </Spin> */}
      </Modal>

      <Spin spinning={loading} size="large">
        <div style={{ marginLeft: "6%" }} class="container">
          <div class="row dot-box makeWrap">
            <div
              style={{ width: "50%", marginTop: "10%", fontFamily: "lato" }}
              className="wrapWidth"
            >
              <div class="heading-area">
                {/* <h2 class="title">Login</h2> */}
                <p style={{ paddingBottom: "12px" }}>
                  <Tag
                    color="magenta"
                    style={{ border: "none", fontSize: "38px" }}
                  >
                    Login
                  </Tag>
                </p>

                <h6 class="sub-title main-color">
                  Please Enter You Registered Email And Password.
                </h6>
              </div>

              <form
                onSubmit={(e) => handleSubmit(e)}
                class="contact-form"
                id="contact-form-data"
              >
                <label className="input_label">Email</label>
                <Input
                  onChange={(e) => handleEmailChange(e)}
                  type="email"
                  className="input_field"
                  placeholder="Enter the email"
                />
                <br />
                <br />
                <label className="input_label">Password</label>
                <Input
                  onChange={(e) => handlePasswordChange(e)}
                  type="password"
                  // class="form-control"
                  className="input_field"
                  placeholder="Enter your passwaord"
                />

                <button
                  type="submit"
                  id="submit_btn"
                  class="btn btn-large btn-rounded btn-green d-block mt-4 contact_btn mr-4"
                >
                  <i
                    class="fa fa-spinner fa-spin mr-2 d-none"
                    aria-hidden="true"
                  ></i>
                  Login
                </button>
                <div style={{ marginTop: "10px", marginLeft: "15px" }}>
                  <Link
                    style={{ color: "#ed2d34", fontWeight: "bold" }}
                    to="/register"
                  >
                    Click to Register?
                  </Link><br/>
                  <a  style={{ color: "#ed2d34", fontWeight: "bold" }} onClick={() => setForgetvis(true)}>forget password</a>
                </div>
              </form>
            </div>
            <div style={{ width: "50%", background: "" }} className="wrapWidth">
              <ul class="address-item">
                <li class="w-100 mb-4">
                  <img src={tlogo}></img>
                </li>
                <li class="w-100 mb-4">
                  <img
                    style={{ height: "300px", width: "1000px" }}
                    src={blood}
                  />
                </li>

                <li class="w-100 mb-4">
                  <i class="lni-apartment main-color"></i>
                  <div class="content">
                    <h6 class="main-color m-0">Address</h6>
                    <p style={{ color: "black", fontWeight: "bold" }}>
                      Omniscient IT Solutions Pvt Ltd, 4/28, Saraswati Marg,
                      Block 4, WEA, Karol Bagh, New Delhi, Delhi 110005
                    </p>
                  </div>
                </li>

                <li class="pr-1">
                  <i class="lni-comment-reply main-color"></i>
                  <div class="content">
                    <h6 class="main-color m-0">Email:</h6>
                    <p>
                      <a
                        style={{ color: "black" }}
                        href="mailto:info@omniscientitsolutions.com"
                      >
                        info@omniscientitsolutions
                      </a>
                    </p>
                  </div>
                </li>

                <li>
                  <i class="lni-phone-handset main-color"></i>
                  <div class="content">
                    <h6 class="main-color m-0">Contact</h6>
                    <p>
                      <a style={{ color: "black" }} href="tel:+91-9811027310">
                        +91-9811027310
                      </a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div
            style={{
              marginLeft: "-23%",
              height: "400px",
              width: "150%",
              backgroundPosition: "center",
              backgroundImage:
                "url(https://wp.bwlthemes.com/wp_reddrop_buddies/wp-content/uploads/2017/06/cta_bg.jpg?id=2114)",
            }}
          >
            <div class="row">
              <div className="col-12">
                <h1
                  style={{ marginLeft: "35%", marginTop: "7%", color: "white" }}
                >
                  JOIN WITH US AND SAVE LIFE
                </h1>
                <div>
                  <a
                    onClick={() => navigate("/register")}
                    data-animation="61"
                    data-goto="11"
                    style={{ color: "white", width: "20%", marginLeft: "40%" }}
                    id="submit_btn"
                    class="btn btn-large btn-rounded btn-green d-block mt-4 contact_btn mt-2"
                  >
                    <i
                      class="fa fa-spinner fa-spin mr-2 d-none"
                      aria-hidden="true"
                    ></i>
                    REGISTER
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </section>
  );
}
