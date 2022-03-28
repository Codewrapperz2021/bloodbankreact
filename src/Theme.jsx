import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Login from "./Components/Login";
import SideNavigation from "./Components/Navigation/SideNavigation";
import TopNavigation from "./Components/Navigation/TopNavigation";
import PreLoader from "./Components/PreLoader";
import Donate from "./Components/Sections/Donate";
import Clients from "./Components/Sections/Clients";
import Request from "./Components/Sections/Request";
import Home from "./Components/Sections/Home";
import Achievements from "./Components/Sections/Achievements";
import AboutUs from "./Components/Sections/AboutUs";
import Facts from "./Components/Sections/Facts";
import FAQ from "./Components/Sections/FAQ";
import Donors from "./Components/Donors";
import { getBloodType, getAllStates } from "./redux/actions/constants";
import Profile from "./Components/Sections/Profile";
import AllRequest from "./Components/AllRequest";
import Presscoverage from "./Components/Sections/Presscoverage";
import ProjectCompleted from "./Components/Sections/ProjectCompleted";
import ProjectInprocess from "./Components/Sections/ProjectInprocess";
import Contributions from "./Components/Sections/Contributions";
import VisionMission from "./Components/Sections/VisionMission";
import PrivacyPolicy from "./Components/Sections/PrivacyPolicy";
import Register from "./Components/Sections/Register";
import Footer from "./Components/Admin/layout/Footer";
import axios from "axios";
import { api_base_url } from "./Constants";
import { message } from "antd";
export const Theme = ({ getBloodType, getAllStates }) => {
  useEffect(() => {
    getBloodType();
    getAllStates();
    
  }, []);
  useEffect(() => {

       window.location.hash.length>100&& fetch(window.location.hash.substring(24), {
method: 'GET', 
headers: {
  'Content-Type': 'application/json',
  'Authorization':`Bearer ${localStorage.getItem('registerToken')}`
      }}).then(()=>          message.success("Verified successfully", 10))
      .catch(()=>message.success('Verifiction Failed',10))



    }, []);
  const toggler = [
    <svg
      width="20"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      key={0}
    >
      <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
    </svg>,
  ];
  return (
    <div>
      <PreLoader />
      <header
        //  class="header-left"
        id="header-left"
      >
        <a class="logo" href="#home">
          <h1 class="logo-text">
            {/* <img style={{ borderRadius: "50%" }} src="/logo.png" alt="logo" />{" "} */}
            {/* {toggler} */}
          </h1>
        </a>

        <SideNavigation />
        <TopNavigation />
      </header>

      <div class="main-left leftActive" id="main">
        <div class="pt-wrapper">
          <div class="subpages">
            <Home />
            <Donate />
            <Achievements />
            <Clients />
            <Request />
            <AboutUs />
            <Facts />
            <FAQ />
            <Donors />
            <AllRequest />
            <Contributions />
            <VisionMission />
            <Presscoverage />
            <ProjectCompleted />
            <ProjectInprocess />
            <PrivacyPolicy />
            {localStorage.getItem("token") == null ?<> <Login /><Register /></>:<><Profile /><Profile/></>}
          </div>
        </div>
        {/* <Footer /> */}
      </div>   
      <div
        style={{
          position: "fixed",
          right: 0,
          top: "35%",
          display: "flex",
          flexDirection: "column",
          background:'white'
        }}
      >
        <a href="tel:+91-9819887086">
          <img
            src="https://thumbs.dreamstime.com/b/icon-support-customer-service-call-center-vector-icons-help-phone-contact-business-line-symbol-communication-telephone-technology-140921462.jpg"
            width="60"
            height="60"
            alt=""
            style={{marginLeft:'5%',marginTop:'20%'}}
          />
            <p style={{fontSize:'10px', marginLeft:'23%',marginTop:'-17%',color:'black'}}>call back</p>
        </a>

        <a href="tel:+91-9819887086">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvWvDYZjEyaI7UeAsXCjeJBPojTq_a8OfF94bdqcacOQRCYCXC3AYM_e8yMC9nZ9zWr-8&usqp=CAU"
            width="35"
            height="35"
            alt=""
            style={{marginLeft:'27%',marginTop:'15%'}}
          />
          <p style={{fontSize:'10px', marginLeft:'27%', color:'black'}}>call now</p>
        
        </a>
        
        <a href="https://api.whatsapp.com/send?phone=+91-0000000000">
          <img
            src="https://i.pinimg.com/originals/84/7a/34/847a34f8bc72a7f5223ec0f3aa227796.png"
            width="30px"
            height="30px"
            style={{marginLeft:'31%',marginTop:'15%'}}
           
            alt=""
          />
          <p style={{fontSize:'10px', marginLeft:'20%',color:'black',marginTop:'5%'}}>whatsapp</p>
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  getBloodType,
  getAllStates,
};

export default connect(mapStateToProps, mapDispatchToProps)(Theme);

// export default Theme;
