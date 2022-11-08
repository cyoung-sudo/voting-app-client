import "./AllPolls.css";
// React
import { useState, useEffect } from "react";
// Components
import DisplayPolls from "../../components/poll/DisplayPolls";
import Loading from "../../components/general/Loading";
// APIs
import { PollAPI } from "../../apis/PollAPI";
// Utils
import { sortByDate } from "../../utils/Sorting";

export default function AllPolls(props) {
  // Requested data
  const [polls, setPolls] = useState(null);
  // Sorting
  const [sortMode, setSortMode] = useState("newest");

  // Request for polls on load
  useEffect(() => {
    PollAPI.getAll()
    .then(res => {
      if(res.data.success) {
        setPolls(res.data.polls);
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

  if(polls) {
    return (
      <div id="allPolls">
        <div id="allPolls-header">
          <h1>Polls</h1>
        </div>

        <div id="allPolls-sort">
          <button onClick={() => setSortMode("newest")}>Newest</button>
          <button onClick={() => setSortMode("oldest")}>Oldest</button>
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