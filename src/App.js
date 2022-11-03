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
// Utils
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  // Requested data
  const [user, setUser] = useState(null);
  // Loading status
  const [loading, setLoading] = useState(true);

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

  if(!loading) {
    return (
      <div id="app">
        <Navbar 
          user={user}
          setUser={setUser}/>
  
        <div id="app-content">
          <Routes>
            <Route path="/" element={<AllPolls/>}/>
            <Route path="signup" element={<Signup/>}/>
            <Route path="login" element={<Login setUser={setUser}/>}/>
  
            <Route path="users">
              <Route index element={<AllUsers/>}/>
              <Route path=":id" element={<Profile/>}/>
              <Route path="settings" element={
                <ProtectedRoute user={user}>
                  <Settings setUser={setUser}/>
                </ProtectedRoute>}/>
            </Route>
  
            <Route path="polls">
              <Route index element={<AllPolls/>}/>
              <Route path="new" element={
                <ProtectedRoute user={user}>
                  <CreatePoll user={user}/>
                </ProtectedRoute>}/>
              <Route path=":id" element={<ShowPoll user={user}/>}/>
            </Route>
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
