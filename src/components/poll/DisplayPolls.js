import "./DisplayPolls.css";
// Routing
import { Link } from "react-router-dom";

export default function DisplayPolls(props) {
  if(props.polls.length > 0) {
    return (
      <ul className="displayPolls">
        {props.polls.map((poll, idx) => (
          <li className="displayPolls-poll" key={idx}>
            <div className="displayPolls-topic">{poll.topic}</div>
            <ul className="displayPolls-options">
              {poll.options.map((option, idx) => (
                <li key={idx}>
                  <div>{option.value}</div>
                  <div>Votes: {option.votes}</div>
                </li>
              ))}
            </ul>
            <Link className="displayPolls-view" to={`/polls/${poll._id}`}>
              View Poll
            </Link>
          </li>
        ))}
      </ul>
    );
  } else {
    return (
      <div id="displayPolls-empty">
        No Polls...
      </div>
    );
  }
};