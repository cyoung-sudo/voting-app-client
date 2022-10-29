import "./AllPolls.css";
import axios from "axios";
// React
import { useState, useEffect } from "react";
// Components
import DisplayPolls from "../../components/poll/DisplayPolls";
import Loading from "../../components/general/Loading";

export default function AllPolls(props) {
  // Requested data
  const [polls, setPolls] = useState(null);

  // Request for polls on load
  useEffect(() => {
    axios({
      method: "get",
      withCredentials: true,
      url: "/api/polls"
    })
    .then(res => {
      if(res.data.success) {
        setPolls(res.data.polls);
      }
    })
    .catch(err => console.log(err));
  }, []);

  if(polls) {
    return (
      <div id="allPolls">
        <div id="allPolls-header">
          <h1>All Polls</h1>
        </div>
  
        <div id="allPolls-polls">
          <DisplayPolls polls={polls}/>
        </div>
      </div>
    );
  } else {
    return <Loading/>;
  }
};