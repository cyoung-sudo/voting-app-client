import "./App.css";
import axios from "axios";
// React
import { useState, useEffect } from "react";
// Router
import { Routes, Route } from "react-router-dom";
// Components
import Signup from "./features/auth/Signup";
import Login from "./features/auth/Login";
import Profile from "./features/user/Profile";
import AllPolls from "./features/poll/AllPolls";
import Navbar from "./features/nav/Navbar";
import Footer from "./features/nav/Footer";

function App() {
  // Requested data
  const [user, setUser] = useState(null);

  // Check session status on refresh
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
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div id="app">
      <Navbar 
        user={user}
        setUser={setUser}/>

      <div id="app-content">
        <Routes>
          <Route path="/" element={<AllPolls/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login setUser={setUser}/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </div>

      <Footer/>
    </div>
  );
};

export default App;
