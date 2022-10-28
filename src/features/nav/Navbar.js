import "./Navbar.css";
import axios from "axios";
// Routing
import { NavLink, useNavigate } from "react-router-dom";
// Icons
import { MdHowToVote } from "react-icons/md";

export default function Navbar(props) {
  //Hooks
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    axios({
      method: "post",
      withCredentials: true,
      url: "/api/auth/logout"
    })
    .then(res => {
      if(res.data.success) {
        console.log("Logged out");
        props.setUser(null);
        // Redirect to root route
        navigate("/");
      }
    })
    .catch(err => console.log(err));
  };

  // Styling for active navlink
  const activeStyle = {
    backgroundColor: "hsla(0, 0%, 90%, 0.5)"
  };

  return (
    <div id="navbar">
      <div id="navbar-logo"><span><MdHowToVote size={28}/></span>Voting App</div>
      <ul id="navbar-links">
        <li>
          <NavLink
            to="/"
            end
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Polls</NavLink>
            
        </li>

        <li>
          <NavLink
            to="users"
            end
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Users</NavLink>
            
        </li>
        
        {!props.user && <li>
          <NavLink
            to="signup"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Signup</NavLink>
        </li>}

        {!props.user && <li>
          <NavLink
            to="login"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Login</NavLink>
        </li>}

        {props.user && <li>
          <NavLink
            to={`users/${props.user._id}`}
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Profile</NavLink>
        </li>}

        {props.user && <li>
          <button onClick={handleLogout}>Logout</button>
        </li>}
      </ul>
    </div>
  );
};