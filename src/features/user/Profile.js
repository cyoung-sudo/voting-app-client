import "./Profile.css";
import axios from "axios";
// React
import { useState, useEffect } from "react";
// Router
import { useParams } from "react-router-dom";
// Components
import Loading from "../../components/general/Loading";

export default function Profile(props) {
  // Requested data
  const [user, setUser] = useState(null);
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
    })
    .catch(err => console.log(err));
  }, []);


  if(user) {
    return (
      <div id="profile">
        <h1>{user.username}</h1>
      </div>
    );
  } else {
    return <Loading/>;
  }
};