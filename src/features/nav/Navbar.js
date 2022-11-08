import "./Navbar.css";
// Routing
import { NavLink, useNavigate } from "react-router-dom";
// APIs
import { AuthAPI } from "../../apis/AuthAPI";
// Icons
import { MdHowToVote } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar(props) {
  //Hooks
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    AuthAPI.logout()
    .then(res => {
      if(res.data.success) {
        props.handlePopUp("Successfully logged out", "success");
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

      {/*----- Links -----*/}
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
            to="polls/new"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Create Poll</NavLink>
        </li>}

        {props.user && <li>
          <NavLink
            to={`users/${props.user._id}`}
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Profile</NavLink>
        </li>}

        {props.user && <li>
          <NavLink
            to="users/settings"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Settings</NavLink>
        </li>}

        {props.user && <li>
          <button onClick={handleLogout}>Logout</button>
        </li>}
      </ul>
      {/*----- /Links -----*/}

      {/*----- Collapse toggle -----*/}
      <input id="navbar-collapse" type="checkbox"/>
      <label id="navbar-collapse-label" htmlFor="navbar-collapse">
        <GiHamburgerMenu size={25}/>
      </label>
      {/*----- /Collapse toggle -----*/}

      {/*----- Collapsed Links -----*/}
      <ul id="navbar-collapsedLinks">
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
            to="polls/new"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Create Poll</NavLink>
        </li>}

        {props.user && <li>
          <NavLink
            to={`users/${props.user._id}`}
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Profile</NavLink>
        </li>}

        {props.user && <li>
          <NavLink
            to="users/settings"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Settings</NavLink>
        </li>}

        {props.user && <li>
          <button onClick={handleLogout}>Logout</button>
        </li>}
      </ul>
      {/*----- Collapsed Links -----*/}
    </div>
  );
};