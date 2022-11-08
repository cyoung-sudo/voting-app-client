import "./Settings.css";
// Routing
import { useNavigate } from "react-router-dom";
// APIs
import { AuthAPI } from "../../apis/AuthAPI";
import { UserAPI } from "../../apis/UserAPI";

export default function Settings(props) {
  // Hooks
  const navigate = useNavigate();

  // Handle deleting account
  const handleDelete = () => {
    let result = window.confirm("Are you sure you want to delete this account?");
    if(result) {
      UserAPI.delete()
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