import "./Profile.css";
// React
import { useState, useEffect } from "react";
// Router
import { useParams, useNavigate } from "react-router-dom";
// Components
import DisplayPolls from "../../components/poll/DisplayPolls";
import Loading from "../../components/general/Loading";
// APIs
import * as UserAPI from "../../apis/UserAPI";
import * as PollAPI from "../../apis/PollAPI";
// Utils
import { sortByDate } from "../../utils/Sorting";

export default function Profile(props) {
  // Requested data
  const [user, setUser] = useState(null);
  const [polls, setPolls] = useState(null);
  // Sorting
  const [sortMode, setSortMode] = useState("newest");
  // Hooks
  const { id } = useParams();
  const navigate = useNavigate();

  // Request for user & polls on load
  useEffect(() => {
    UserAPI.getOne(id)
    .then(res => {
      if(res.data.success) {
        // Set user
        setUser(res.data.user);
        PollAPI.getAllUser(id)
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

  // Switch sorting mode
  useEffect(() => {
    if(polls) {
      setPolls(sortByDate([...polls], sortMode));
    }
  }, [sortMode]);


  if(user && polls) {
    return (
      <div id="profile">
        <div id="profile-header">
          <h1>{user.username}</h1>
        </div>

        <div id="profile-sort">
          <button onClick={() => setSortMode("newest")}>Newest</button>
          <button onClick={() => setSortMode("oldest")}>Oldest</button>
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