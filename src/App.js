import { render } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Theme from "./Theme";

import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import User from "./Components/Admin/Components/User";
import { Feed } from "./Components/Admin/Components/Feed";
import Notification from "./Components/Admin/Components/Notification";
import Requests from "./Components/Admin/Components/Request";
import Dashboard from "./Dashboard";
import Home from "./Components/Sections/Home";
import LandingPage from "./Components/Sections/LandingPage";
import Raisedrequest from "./Components/Admin/Components/Raisedrequest";
import Feedback from "./Components/Admin/Components/Feedback";
function App() {
  return (
    <BrowserRouter>
          <Routes>
        <Route path= "/*" element={localStorage.getItem('userDetails')!=null ? JSON.parse(localStorage.getItem("userDetails")).role !='admin' ?<Dashboard/>:<User />:<Dashboard/>} />
       
          <Route exact path="admin/users" element={<User />} />
          <Route exact path="admin/feeds" element={<Feed />} />
          <Route exact path="admin/notifications" element={<Notification />} />
          <Route exact path="admin/requests" element={<Requests />} />
          <Route exact path="admin/raisedrequests" element={<Raisedrequest />} />
          <Route exact path="admin/feedback" element={<Feedback />} />
       
      </Routes>
     
     
    </BrowserRouter>
  );
}

export default App;
