import "./Profile.css";
import axios from "axios";
// React
import { useState, useEffect } from "react";
// Router
import { useParams } from "react-router-dom";
// Components
import DisplayPolls from "../../components/poll/DisplayPolls";
import Loading from "../../components/general/Loading";

export default function Profile(props) {
  // Requested data
  const [user, setUser] = useState(null);
  const [polls, setPolls] = useState(null);
  // Hooks
  let { id } = useParams();

  // Request for user on load
  useEffect(() => {
    axios({
      method: "post",
      data: { id },
      withCredentials: true,
      url: "/api/user"
    })
    .then(res => {
      if(res.data.success) {
        setUser(res.data.user);
      }

      return axios({
        method: "post",
        data: { id: res.data.user._id },
        withCredentials: true,
        url: "/api/polls/user"
      })
    })
    .then(res => {
      if(res.data.success) {
        setPolls(res.data.polls)
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