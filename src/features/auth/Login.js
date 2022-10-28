import "./Login.css";
import axios from "axios";
// React
import { useState } from "react";
// Routing
import { Link, useNavigate } from "react-router-dom";
// Components
import Form from "../../components/auth/Form";

export default function Login(props) {
  // Controlled inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Hooks
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = e => {
    // Prevent refresh on submit
    e.preventDefault();
    // Validations
    if(username === "") {
      console.log("No username provided");
    } else if(password === "") {
      console.log("No password provided");
    } else {
      axios({
        method: "post",
        data: {
          username,
          password
        },
        withCredentials: true,
        url: "/api/auth/login"
      })
      .then(res => {
        if(res.data.success) {
          console.log("Logged in");
          props.setUser(res.data.user);
          // Redirect to profile route
          navigate(`/users/${res.data.user._id}`);
        } else {
          console.log(res.data.message);
        }
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <div id="login">
      <div id="login-header">
        <h1>Login</h1>
      </div>

      <div id="login-form">
        <Form 
          setUsername={setUsername}
          setPassword={setPassword}
          submit={handleSubmit}/>
      </div>

      <div id="login-redirect">
        Don't have an account? <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};