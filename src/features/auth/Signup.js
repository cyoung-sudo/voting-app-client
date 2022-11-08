import "./Signup.css";
// React
import { useState } from "react";
// Routing
import { Link, useNavigate } from "react-router-dom";
// Components
import Form from "../../components/auth/Form";
// APIs
import { AuthAPI } from "../../apis/AuthAPI";

export default function Signup(props) {
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
      AuthAPI.signup(username, password)
      .then(res => {
        if(res.data.success) {
          props.handlePopUp("Successfully signed up");
          // Redirect to login route
          navigate("/login");
        } else {
          props.handlePopUp(res.data.message, "error");
        }
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <div id="signup">
      <div id="signup-header">
        <h1>Signup</h1>
      </div>

      <div id="signup-form">
        <Form 
          setUsername={setUsername}
          setPassword={setPassword}
          submit={handleSubmit}/>
      </div>

      <div id="signup-redirect">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};