import "./PollCount.css";
import axios from "axios";
// React
import { useState, useEffect } from "react";

export default function PollCount(props) {
  // Requested data
  const [count, setCount] = useState(null);

  useEffect(() => {
    axios({
      method: "post",
      data: { id: props.id },
      withCredentials: true,
      url: "/api/polls/user"
    })
    .then(res => {
      if(res.data.success) {
        setCount(res.data.polls.length);
      }
    })
    .catch(err => console.log(err));
  }, []);
  
  if(count !== null) {
    return (
      <div className="pollCount">
        Polls: {count}
      </div>
    );
  }
};