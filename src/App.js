import "./App.css";
import axios from "axios";
// React
import { useState, useEffect } from "react";
// Router
import { Routes, Route } from "react-router-dom";
// Features
import Signup from "./features/auth/Signup";
import Login from "./features/auth/Login";
import Profile from "./features/user/Profile";
import Settings from "./features/user/Settings";
import AllUsers from "./features/user/AllUsers";
import AllPolls from "./features/poll/AllPolls";
import CreatePoll from "./features/poll/CreatePoll";
import ShowPoll from "./features/poll/ShowPoll";
import Navbar from "./features/nav/Navbar";
import Footer from "./features/nav/Footer";
// Components
import Loading from "./components/general/Loading";
import PopUp from "./components/general/PopUp";
// Utils
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  // Requested data
  const [user, setUser] = useState(null);
  // Loading status
  const [loading, setLoading] = useState(true);
  // Popup
  const [popUp, setPopUp] = useState("");
  const [popUpType, setPopUpType] = useState("");
  const [popUpDisplay, setPopUpDisplay] = useState(false);
  const [popUpOverride, setPopUpOverride] = useState(false);

  // Check session status on load
  useEffect(() => {
    axios({
      method: "get",
      withCredentials: true,
      url: "/api/auth/sessionStatus"
    })
    .then(res => {
      if(res.data.success) {
        setUser(res.data.user);
      }
      setLoading(false);
    })
    .catch(err => console.log(err));
  }, []);

  // Handle pop-ups
  const handlePopUp = (message, type) => {
    // Override existing pop-up
    if(popUpDisplay) {
      console.log("override");
      setPopUpOverride(state => !state);
    }
    setPopUp(message);
    setPopUpType(type);
    setPopUpDisplay(true);
    // Scroll to top of page
    window.scrollTo(0, 0);
  };

  if(!loading) {
    return (
      <div id="app">
        <Navbar 
          user={user}
          setUser={setUser}
          handlePopUp={handlePopUp}/>
  
        <div id="app-content">
          <PopUp 
            message={popUp} 
            type={popUpType}
            popUpDisplay={popUpDisplay}
            popUpOverride={popUpOverride}
            setPopUpDisplay={setPopUpDisplay}/>

          <Routes>
            <Route path="/" element={<AllPolls/>}/>

            {/*----- Auth Routes -----*/}
            <Route path="signup" element={<Signup handlePopUp={handlePopUp}/>}/>
            <Route path="login" element={
              <Login 
                setUser={setUser} 
                handlePopUp={handlePopUp}/>}/>
            {/*----- /Auth Routes -----*/}
  
            {/*----- User Routes -----*/}
            <Route path="users">
              <Route index element={<AllUsers/>}/>
              <Route path=":id" element={<Profile handlePopUp={handlePopUp}/>}/>
              <Route path="settings" element={
                <ProtectedRoute user={user}>
                  <Settings 
                    setUser={setUser}
                    handlePopUp={handlePopUp}/>
                </ProtectedRoute>}/>
            </Route>
            {/*----- /User Routes -----*/}
  
            {/*----- Poll Routes -----*/}
            <Route path="polls">
              <Route index element={<AllPolls/>}/>
              <Route path="new" element={
                <ProtectedRoute user={user}>
                  <CreatePoll 
                    user={user}
                    handlePopUp={handlePopUp}/>
                </ProtectedRoute>}/>
              <Route path=":id" element={
                <ShowPoll 
                  user={user}
                  handlePopUp={handlePopUp}/>}/>
            </Route>
            {/*----- /Poll Routes -----*/}
          </Routes>
        </div>
  
        <Footer/>
      </div>
    );
  } else {
    return <Loading/>;
  }
};

export default App;
