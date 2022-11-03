import "./Profile.css";
import axios from "axios";
// React
import { useState, useEffect } from "react";
// Router
import { useParams, useNavigate } from "react-router-dom";
// Components
import DisplayPolls from "../../components/poll/DisplayPolls";
import Loading from "../../components/general/Loading";

export default function Profile(props) {
  // Requested data
  const [user, setUser] = useState(null);
  const [polls, setPolls] = useState(null);
  // Hooks
  const { id } = useParams();
  const navigate = useNavigate();

  // Request for user & polls on load
  useEffect(() => {
    axios({
      method: "post",
      data: { id },
      withCredentials: true,
      url: "/api/user"
    })
    .then(res => {
      if(res.data.success) {
        // Set user
        setUser(res.data.user);
        axios({
          method: "post",
          data: { id },
          withCredentials: true,
          url: "/api/polls/user"
        })
        .then(res => {
          if(res.data.success) {
            setPolls(res.data.polls)
          }
        })
        .catch(err => console.log(err));
      } else {
        props.handlePopUp("User not found", "error");
        // Redirect to root route
        navigate("/");
      }
    })
    .catch(err => console.log(err));
  }, []);


  if(user && polls) {
    return (
      <div id="profile">
        <div id="profile-header">
          <h1>{user.username}</h1>
        </div>

        <div id="profile-polls">
          <DisplayPolls polls={polls}/>
        </div>
      </div>
    );
  } else {
    return <Loading/>;
  }
};