import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import blood from "./bloodlogo.jpg";
import { api_base_url } from "../../Constants";
import axios from "axios";
import { Carousel, message, Spin } from "antd";
import { updateDonorsData } from "../../redux/actions/donors";
import {
  getBloodType,
  getAllCityByStates,
} from "../../redux/actions/constants";

import img1 from "./press/img1.jpeg";
import img2 from "./press/img2.jpeg";
import img3 from "./press/img3.jpeg";
import img4 from "./press/img4.jpeg";
import img5 from "./press/img5.jpeg";
import img6 from "./press/img6.jpeg";
import img7 from "./press/img7.jpeg";
import img8 from "./press/img8.jpeg";
import img9 from "./press/img9.jpeg";
import img10 from "./press/img10.jpeg";
import img11 from "./press/img11.jpeg";
import img12 from "./press/img12.jpeg";
import img13 from "./press/img13.jpeg";
import img14 from "./press/img15.jpeg";
import img15 from "./press/img15.jpeg";
import { useNavigate } from "react-router-dom";

 const Home = ({ updateDonorsData, bloodType }) => {
   const navigate=useNavigate();
  console.log(getBloodType);
  const [loading,setLoading]=useState(false)
  const [searchParameters, setSearchParameters] = useState({
    blood_type: "All",
    state: "All",
    city: "All",
  });
  const [st, setSt] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ct, setCt] = useState([]);
  // const [donorsData, setDonorsData] = useState([]);
  const handleSearchParam = (e) => {
    let payload = {};
    let name = e.target.name;
    let value = e.target.value;
    payload[name] = value;
    localStorage.setItem(name, value);
    setSearchParameters({ ...searchParameters, ...payload });
  };
  const handleSearchParams = (e, type) => {
    let payload = {};
    let name = type;
    let value = document.getElementById(e.target.value + type).innerText;
    payload[name] = value;

    if (name == "district" || "city") {
      localStorage.setItem(name, value);
    } else {
      localStorage.setItem(name, e.target.value);
    }
    setSearchParameters({ ...searchParameters, ...payload });
  };

  const handleStateChange = (e) => {
    axios
      .post(api_base_url + "/getAllDistrictByStates", {
        state_id: e.target.value,
      })
      .then((res) => setDistrict(res.data));
  };
  const handleDistrictChange = (e) => {
    axios
      .post(api_base_url + "/getAllCityByDistrict", {
        districtid: e.target.value,
      })
      .then((res) => setCt(res.data));
  };
  
  const searchDonors = async () => {
    if(localStorage.getItem("token") !== null ){
    setLoading(true)
    await updateDonorsData(searchParameters);
    setLoading(false)
    navigate("/alldonors")
  }else{
    message.info('Please login to search donar',3)
    navigate("/login")
  }
  } 

  useEffect(() => {
    axios.post(api_base_url + "/getAllStates").then((res) => {
      const st = res.data;
      setSt(st);
    });
  }, []);

  const contentStyle = {
    height: "320px",
    color: "#fff",
    lineHeight: "160px",
    width: "100%",
    background: "#364d79",
    // marginLeft: "25%",
  };
  const headstyle = {
    // borderStyle: "solid",
    // borderColor: "#ad2026",
    // marginTop: "0%",
    border:"1px solid #ad2026"
  };

  return (
    <section
      id="home"
      className="my_section"
      // class="pt-page pt-page-1"
      data-id="home"
      style={{
        fontSize: "14px",
        color: "black",
        display: "block",
        fontWeight: "300",
      }}
    >
      <Spin size="large" spinning={loading}>
      <div
        style={{ marginTop: "6%", alignItems: "center" }}
        className="container"
      >
        <div className="row">
          <div style={{ width: "50%", marginTop: "5%" }} className="wrapWidth">
            <h3>
              <span class="main-color">Quickly Search Donar </span>{" "}
            </h3>
            <p style={{ fontSize: "16px" }}>
              This is an organization that brings voluntary blood donors and
              those in need of blood on to a common platform. Through this
              website, we seek donors who are willing to donate blood, as well
              as provide the timeliest support to those in frantic need of it.
            </p>
            <form class="contact-form" id="contact-form-data">
              <div class="row">
                <div class="col-sm-4" style={{ marginTop: "6px" }}>
                  <label class="font-weight-bold">Blood Type</label>
                </div>
                <div class="col-sm-6">
                  <select
                    class="form-control"
                    name="blood_type"
                    onChange={(e) => {
                      handleSearchParam(e);
                    }}
                  >
                    <option>All</option>;
                    {bloodType.map((st) => {
                      console.log('vbn',st);
                      return <option>{st}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-4" style={{ marginTop: "6px" }}>
                  <label class="font-weight-bold">State</label>
                </div>
                <div class="col-sm-6">
                  <select
                    class="form-control"
                    name="st"
                    onChange={(e) => {
                      handleSearchParams(e, "state");
                      handleStateChange(e);
                      // handleCity(e);
                    }}
                  >
                    <option>All</option>;
                    {st.map((stt) => {
                      return (
                        <option
                          id={stt.state_id + "state"}
                          value={stt.state_id}
                        >
                          {stt.state_title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-4" style={{ marginTop: "6px" }}>
                  <label class="font-weight-bold">District</label>
                </div>
                <div class="col-sm-6">
                  <select
                    class="form-control"
                    name="District"
                    onChange={(e) => {
                      handleSearchParams(e, "district");
                      handleDistrictChange(e);
                    }}
                  >
                    <option>All</option>;
                    {district.map((dt) => {
                      return (
                        <option
                          id={dt.districtid + "district"}
                          value={dt.districtid}
                        >
                          {dt.district_title}
                        </option>
                      );
                    })}
                  </select>
                  {/* </div> */}
                </div>
              </div>
              <div class="row">
                <div class="col-sm-4" style={{ marginTop: "6px" }}>
                  <label class="font-weight-bold">City</label>
                </div>
                <div class="col-sm-6">
                  <select
                    class="form-control"
                    name="city"
                    onChange={(e) => {
                      handleSearchParams(e, "city");
                    }}
                  >
                    <option>All</option>;
                    {ct.map((ctt) => {
                      return (
                        <option id={ctt.id + "city"} value={ctt.id}>
                          {ctt.name}
                        </option>
                      );
                    })}
                  </select>
                  {/* </div> */}
                </div>
              </div>
              <br />
              <a
              
                onClick={() => searchDonors()}
                data-animation="61"
                data-goto="11"
                style={{ color: "white" }}
                // id="submit_btn"
                class="btn btn-large btn-rounded btn-green d-block mt-4 contact_btn"
              >
                <i
                  class="fa fa-spinner fa-spin mr-2 d-none"
                  aria-hidden="true"
                ></i>
                Search Donor
              </a>
            </form>
          </div>
          <div
            className="wrapWidth "
            style={{ marginTop: "20px", width: "50%" }}
          >
            <div class="text-center">
              <img
                src="https://i.pinimg.com/originals/0d/0f/85/0d0f85b1504a9ebe9a080b5b1dd95c0b.gif"
                style={{
                  borderRadius: "50%",
                  height: "80%",
                  width: "80%",
                  // marginLeft: "190px",
                }}
              />
            </div>
          </div>
        </div>
        <br></br>
        <div className="row  " style={{ backgroundColor: "#edf0f2" }}>
          <div class="col-md-8 col-sm-12 text-left mb-4">
            <h2 className="pt-4">WE ARE HELPING PEOPLE FROM 10 YEARS</h2>
            <p style={{ fontSize: "16px" }}>
              You can donate blood at any of our blood donation venues all over
              the country. We have total various donor centers and visit
              thousands of other venues on various occasions.
            </p>
          </div>
          <div class="col-md-4 col-sm-12 " style={{ marginTop: "3%" }}>
            <a
              onClick={() => (window.location.hash = "#donate")}
              data-animation="61"
              data-goto="11"
              style={{ color: "white" }}
              id="submit_btn"
              class="btn btn-large btn-rounded btn-green d-block mt-4 contact_btn"
            >
              <i
                class="fa fa-spinner fa-spin mr-2 d-none"
                aria-hidden="true"
              ></i>
              REGISTER
            </a>
          </div>
        </div>

        <div style={{ marginTop: "80px" }}>
          <h2 style={{ textAlign:"center" }}>DONATION CAMPAIGNS</h2>
          <div style={{ marginLeft: "42%", marginTop: "-2%" }}>
            <img
              src="https://wp.bwlthemes.com/wp_reddrop_buddies/wp-content/themes/reddrop-buddies/images/separator.png"
              alt=""
            ></img>
            <p style={{fontSize:'22px',marginLeft:'-40%',fontFamily:'Dosis'}}>
              Campaigns to encourage new donors to join and existing to continue
              to give blood.
            </p>
          </div>
          <div class="col-md-12 col-sm-12 text-left mb-4 mt-4">
            <div class=" align-items-lg-center dot-box">
              <div style={headstyle}>
                <Carousel autoplay>
                  <div class="row">
                    <div class="col-sm-12 row">
                      <div class="col-6">
                        <img
                          style={contentStyle}
                          height="50px"
                          width="600px"
                          src={img5}
                        ></img>
                      </div>
                      <div class="col-6 ">
                        <img
                          style={contentStyle}
                          height="50px"
                          width="600px"
                          src={img6}
                        ></img>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 row">
                      <div class="col-6">
                        <img
                          style={contentStyle}
                          height="50px"
                          width="600px"
                          src={img8}
                        ></img>
                      </div>
                      <div class="col-6 ">
                        <img
                          style={contentStyle}
                          height="50px"
                          width="600px"
                          src={img9}
                        ></img>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 row">
                      <div class="col-6">
                        <img
                          style={contentStyle}
                          height="50px"
                          width="600px"
                          src={img10}
                        ></img>
                      </div>
                      <div class="col-6 ">
                        <img
                          style={contentStyle}
                          height="50px"
                          width="600px"
                          src={img7}
                        ></img>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 row">
                      <div class="col-6">
                        <img
                          style={contentStyle}
                          height="50px"
                          width="600px"
                          src={img1}
                        ></img>
                      </div>
                      <div class="col-6 ">
                        <img
                          style={contentStyle}
                          height="50px"
                          width="600px"
                          src={img2}
                        ></img>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 row">
                      <div class="col-6">
                        <img
                          style={contentStyle}
                          height="50px"
                          width="600px"
                          src={img3}
                        ></img>
                      </div>
                      <div class="col-6 ">
                        <img
                          style={contentStyle}
                          height="50px"
                          width="600px"
                          src={img4}
                        ></img>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 row">
                      <div class="col-6">
                        <img
                          style={contentStyle}
                          height="50px"
                          width="600px"
                          src={img11}
                        ></img>
                      </div>
                      <div class="col-6 ">
                        <img
                          style={contentStyle}
                          height="50px"
                          width="600px"
                          src={img12}
                        ></img>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 row">
                      <div class="col-6">
                        <img
                          style={contentStyle}
                          height="50px"
                          width="600px"
                          src={img13}
                        ></img>
                      </div>
                      <div class="col-6 ">
                        <img
                          style={contentStyle}
                          height="50px"
                          width="600px"
                          src={img14}
                        ></img>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 row">
                      <div class="col-6">
                        <img
                          style={contentStyle}
                          height="50px"
                          width="600px"
                          src={img15}
                        ></img>
                      </div>
                      <div class="col-6 ">
                        <img
                          style={contentStyle}
                          height="50px"
                          width="600px"
                          src={img6}
                        ></img>
                      </div>
                    </div>
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Spin>
    </section>
  );
};

const mapStateToProps = (state) => ({
  bloodType: state.donors.bloodType,
  states: state.donors.states,
  city: state.donors.city,
});

const mapDispatchToProps = {
  updateDonorsData,
  getBloodType,
  getAllCityByStates,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
