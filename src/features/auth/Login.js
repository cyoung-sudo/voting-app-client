import "./Login.css";
// React
import { useState } from "react";
// Routing
import { Link, useNavigate } from "react-router-dom";
// Components
import Form from "../../components/auth/Form";
// APIs
import { AuthAPI } from "../../apis/AuthAPI";

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
      props.handlePopUp("No username given", "error");
    } else if(password === "") {
      props.handlePopUp("No password given", "error");
    } else {
      AuthAPI.login(username, password)
      .then(res => {
        if(res.data.success) {
          props.handlePopUp("Successfully logged in", "success");
          props.setUser(res.data.user);
          // Redirect to profile route
          navigate(`/users/${res.data.user._id}`);
        } else {
          props.handlePopUp(res.data.message, "error");
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