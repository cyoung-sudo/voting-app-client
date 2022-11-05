import "./Settings.css";
import axios from "axios";
// Routing
import { useNavigate } from "react-router-dom";

export default function Settings(props) {
  // Hooks
  const navigate = useNavigate();

  // Handle deleting account
  const handleDelete = () => {
    let result = window.confirm("Are you sure you want to delete this account?");
    if(result) {
      axios({
        method: "delete",
        withCredentials: true,
        url: "/api/user"
      })
      .then(res => {
        if(res.data.success) {
          axios({
            method: "post",
            withCredentials: true,
            url: "/api/auth/logout"
          })
          .then(res => {
            if(res.data.success) {
              props.handlePopUp("Account deleted", "success");
              // Reset user state
              props.setUser(null);
              // Redirect to root route
              navigate("/");
            } else {
              props.handlePopUp(res.data.message, "error");
              // Reset user
              props.setUser(null);
              // Redirect to root route
              navigate("/");
            }
          })
          .catch(err => console.log(err));
        } else {
          props.handlePopUp(res.data.message, "error");
          // Reset user
          props.setUser(null);
          // Redirect to root route
          navigate("/");
        }
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <div id="settings">
      <div id="settings-header">
        <h1>Settings</h1>
      </div>

      <ul id="settings-options">
        <li className="settings-option">
          <div>Delete Account?</div>
          <button onClick={handleDelete}>Delete</button>
        </li>
      </ul>
    </div>
  );
};