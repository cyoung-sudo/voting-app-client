import "./Settings.css";
// Routing
import { useNavigate } from "react-router-dom";
// APIs
import * as AuthAPI from "../../apis/AuthAPI";
import * as UserAPI from "../../apis/UserAPI";

export default function Settings(props) {
  // Hooks
  const navigate = useNavigate();

  // Handle deleting account
  const handleDelete = () => {
    // Check for valid session
    AuthAPI.getUser()
    .then(res => {
      if(res.data.success) {
        let result = window.confirm("Are you sure you want to delete this account?");
        if(result) {
          UserAPI.deleteUser(res.data.user._id)
          .then(res => {
            if(res.data.success) {
              AuthAPI.logout()
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
      } else {
        props.handlePopUp("Session has expired", "error");
        // Reset user
        props.setUser(null);
        // Redirect to root route
        navigate("/");
      }
    })
  };

  return (
    <div id="settings">
      <div id="settings-header">
        <h1>Settings</h1>
      </div>

      <ul id="settings-options">
        <li className="settings-option">
          <div>Delete Account?</div>
          <button 
            data-testid="settings-delete"
            onClick={handleDelete}>Delete</button>
        </li>
      </ul>
    </div>
  );
};