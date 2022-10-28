import "./Signup.css";
import axios from "axios";
// React
import { useState } from "react";
// Routing
import { Link, useNavigate } from "react-router-dom";
// Components
import Form from "../../components/auth/Form";

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
        url: "/api/auth/signup"
      })
      .then(res => {
        if(res.data.success) {
          // Redirect to login route
          navigate("/login");
        } else {
          console.log(res.data.message);
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