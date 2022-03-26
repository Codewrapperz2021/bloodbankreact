import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, message, Tag } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { getBloodType, getAllStates } from "./redux/actions/constants";

import { useState } from "react";
import "./dashboard.css";
import Home from "./Components/Sections/Home";
import AboutUs from "./Components/Sections/AboutUs";
import Achivements from "./Components/Sections/Achievements";
import Clients from "./Components/Sections/Clients";
import Facts from "./Components/Sections/Facts";
import FAQ from "./Components/Sections/FAQ";
import Contributions from "./Components/Sections/Contributions";
import VisionMission from "./Components/Sections/VisionMission";
import Presscoverage from "./Components/Sections/Presscoverage";
import ProjectCompleted from "./Components/Sections/ProjectCompleted";
import ProjectInprocess from "./Components/Sections/ProjectInprocess";
import PrivacyPolicy from "./Components/Sections/PrivacyPolicy";
import Login from "./Components/Login";
import Donate from "./Components/Sections/Donate";
import Donors from "./Components/Donors";
import Request from "./Components/Sections/Request";
import LandingPage from "./Components/Sections/LandingPage";
import Profile from "./Components/Sections/Profile";
import { connect } from "react-redux";
import Footer from "./Components/Admin/layout/Footer";

const { Header, Sider, Content } = Layout;

 const Dashboard = ({ getBloodType, getAllStates }) => {
    useEffect(() => {
        getBloodType();
        getAllStates();
        
      }, []);
    //   useEffect(() => {
    
    //        window.location.hash.length>100&& fetch(window.location.hash.substring(24), {
    // method: 'GET', 
    // headers: {
    //   'Content-Type': 'application/json',
    //   'Authorization':`Bearer ${localStorage.getItem('registerToken')}`
    //       }}).then(()=>          message.success("Verified successfully", 10))
    //       .catch(()=>message.success('Verifiction Failed',10))
    
    
    
    //     }, []);
  const [collapsed, setCollapsed] = useState(true);
  const toggle = (value) => {
    setCollapsed(value);
  };
  return (
    <>
      <Header className="dash_header" style={{ padding: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", gap: 2 }}>
            {" "}
            <div>
              <img className="logo_img" src="/bloodlogo.png" alt="logo" />
            </div>
            {/* <div>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: toggle,
                }
              )}
            </div> */}
          </div>
          <div style={{ display: "flex", gap: "2rem", marginRight: "12px" }}>
            <p>
            <Link to="/requestblood">
              <Tag className="my_tag" color="red">
                Request Blood
              </Tag>
              </Link>
            </p>
            <p>
            {localStorage.getItem("token") !== null ?<Link to="/alldonors">
              <Tag className="my_tag" color="red">
                All Donors
              </Tag>
              </Link>:  <Tag onClick={()=>{message.error('Please Login')}}className="my_tag" color="red">
                All Donors
              </Tag>}
            </p>
            
            {localStorage.getItem("token") == null ? 
            <p>
                <Link to="/login">
              <Tag className="my_tag" color="red">
                Login
              </Tag>
              </Link>
            </p>
            :
            <p>
                <Link to="/profile">
              <Tag className="my_tag" color="red">
                Profile
              </Tag>
              </Link>
            </p>
            }

{localStorage.getItem("token") == null ? 
            <p>
            <Link to="/register">
              <Tag className="my_tag" color="red">
                Register
              </Tag>
              </Link>
            </p>
            :<></>}
          </div>
        </div>
      </Header>
      <Layout>
        <Sider
          className="site-layout-background dash_sidebar"
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ height: "91vh", overflow: "auto" }}
          onMouseEnter={() => toggle(false)}
          onMouseLeave={() => toggle(true)}
        >
          <Menu className="dash_menu" mode="inline" >
            <Menu.Item key="1">
              <div className="menu_div">
                <div>
                  <i class="fa fa-home hov" aria-hidden="true" />
                </div>
               <Link to="/home"> <p>Home</p></Link>
              </div>
            </Menu.Item>
            <Menu.Item key="2">
              <div className="menu_div">
                <div>
                  <i class="fa fa-trophy" aria-hidden="true" />
                </div>
                <Link to="/achivements">  <p>Achivements</p></Link>
              </div>
            </Menu.Item>

            <Menu.Item key="4">
              <div className="menu_div">
                <div>
                  <i class="fa fa-users" aria-hidden="true" />
                </div>
                <Link to="/ourvolunteer">  <p>Our Volunteer</p></Link>
              </div>
            </Menu.Item>
            <Menu.Item key="5">
              <div className="menu_div">
                <div>
                  <i class="fa fa-globe" aria-hidden="true" />
                </div>
                <Link to="/aboutus"><p>About Us</p></Link>
              </div>
            </Menu.Item>

            <Menu.Item key="7">
              <div className="menu_div">
                <div>
                  <i class="fa fa-lightbulb-o" aria-hidden="true" />
                </div>
                <Link to="/facts"><p>Facts</p></Link>
              </div>
            </Menu.Item>
            <Menu.Item key="8">
              <div className="menu_div">
                <div>
                  <i class="fa fa-question" aria-hidden="true" />
                </div>
                <Link to="/whocandonate"><p>Who Can Donate</p></Link>
              </div>
            </Menu.Item>

            <Menu.Item key="9">
              <div className="menu_div">
                <div>
                  <i class="fa fa-handshake-o" aria-hidden="true" />
                </div>
                <Link to="/contributions"> <p>Contributions</p></Link>
              </div>
            </Menu.Item>
            <Menu.Item key="10">
              <div className="menu_div">
                <div>
                  <i class="fa fa-diamond" aria-hidden="true" />
                </div>
                <Link to="/visionmission"> <p>Vision Mission</p></Link>
              </div>
            </Menu.Item>
            <Menu.Item key="11">
              <div className="menu_div">
                <div>
                  <i class="fa fa-newspaper-o" aria-hidden="true" />
                </div>
                <Link to="/presscoverage"> <p>Press Coverage</p></Link>
              </div>
            </Menu.Item>
            <Menu.Item key="12">
              <div className="menu_div">
                <div>
                  <i class="fa fa-bar-chart" aria-hidden="true" />
                </div>
                <Link to="/projectcompleted"> <p>Project Completed</p></Link>
              </div>
            </Menu.Item>
            <Menu.Item key="13">
              <div className="menu_div">
                <div>
                  <i class="fa fa-bar-chart" aria-hidden="true" />
                </div>
                <Link to="/projectinprocess"> <p>Project In Process</p></Link>
              </div>
            </Menu.Item>

            <Menu.Item key="14">
              <div className="menu_div">
                <div>
                  <i class="fa fa-user-secret" aria-hidden="true" />
                </div>
                <Link to="/privacypolicy"> <p>Privacy Policy</p></Link>
              </div>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">

          <Content className="site-layout-background dash_content">
            {/* <Home /> */}
        <Routes>
          <Route exact  path="/" element={<LandingPage />} />
          <Route exact  path="/home" element={<Home />} />
          <Route exact  path="/aboutus" element={<AboutUs />} />
          <Route exact  path="/achivements" element={<Achivements />} />
          <Route exact  path="/ourVolunteer" element={<Clients />} />
          <Route exact  path="/facts" element={<Facts />} />
          <Route exact  path="/whocandonate" element={<FAQ />} />
          <Route exact  path="/contributions" element={<Contributions />} />
          <Route exact  path="/visionmission" element={<VisionMission />} />
          <Route exact  path="/presscoverage" element={<Presscoverage />} />
          <Route exact  path="/projectcompleted" element={<ProjectCompleted />} />
          <Route exact  path="/projectinprocess" element={<ProjectInprocess />} />
          <Route exact  path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route exact  path="/login" element={localStorage.getItem("token") == null ?<Login />:<Profile/>} />
          <Route exact  path="/register" element={<Donate />} />
          <Route exact  path="/alldonors" element={<Donors />} />
          <Route exact  path="/requestblood" element={<Request />} />
          <Route exact  path="/profile" element={<Profile />}/>




          </Routes>
            {/* <AboutUs /> */}
          <Footer/>

          </Content>

          <div
            style={{
                zIndex:1000,
              position: "fixed",
              right: 0,
              top: "35%",
              display: "flex",
              flexDirection: "column",
              background: "#fafafa",
              alignItems: "center",
              gap:"1rem"
              
            }}
          >
              <div style={{textAlign:"center"}}>
            <a href="tel:+91-9819887086" >
              <img
                src="https://media.istockphoto.com/vectors/flat-call-center-icon-vector-id503116471?k=6&m=503116471&s=612x612&w=0&h=8isjW5aHMBUKAXeAdC3NRkeDT4Rv7YNnJHiXxuEAwB4="
                width="30"
                height="30"
                alt=""
                style={{}}
              />
              <p style={{}}>
                <Tag color="magenta">Support</Tag>
              </p>
            </a>
            </div>
            <div style={{textAlign:"center"}}>
            <a href="tel:+91-9819887086" >
              <img
                src="https://th.bing.com/th/id/OIP.F0wxID8kOD-hpWCGJgO9vAHaIq?pid=ImgDet&rs=1"
                width="30"
                height="30"
                alt=""
                style={{}}
              />
              <p style={{}}>
                <Tag color="blue">Call now</Tag>
              </p>
            </a>
            </div>
            <div style={{textAlign:"center"}}>
            <a href="https://api.whatsapp.com/send?phone=+91-0000000000" >
              <img
                src="https://logospng.org/download/whatsapp/logo-whatsapp-verde-icone-ios-android-4096.png"
                width="30"
                height="30"
                style={{}}
                alt=""
              />
              <p style={{}}>
                <Tag color="green">Whatsapp</Tag>
              </p>
            </a>
            </div>
          </div>
        </Layout>
      </Layout>
    </>
  );
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  getBloodType,
  getAllStates,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
// export default Dashboard
