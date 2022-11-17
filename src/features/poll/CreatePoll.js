import "./CreatePoll.css";
// React
import { useState } from "react";
// Routing
import { useNavigate } from "react-router-dom";
// APIs
import * as PollAPI from "../../apis/PollAPI";

export default function CreatePoll(props) {
  // Controlled inputs
  const [topic, setTopic] = useState("");
  const [options, setOptions] = useState("");
  // Hooks
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = e => {
    // Prevent refresh on submit
    e.preventDefault();
    // Validations
    if(topic === "") {
      props.handlePopUp("No topic given", "error");
    } else if(options === "") {
      props.handlePopUp("No option(s) given", "error");
    } else {
      PollAPI.create(topic, options)
      .then(res => {
        if(res.data.success) {
          props.handlePopUp("Created poll", "success");
          // Redirect to profile route
          navigate(`/users/${props.user._id}`);
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
  }

  return (
    <div id="createPoll">
      <div id="createPoll-header">
        <h1>Create Poll</h1>
      </div>

      <form id="createPoll-form" onSubmit={e => handleSubmit(e)}>
        <div className="createPoll-form-group">
          <label htmlFor="createPoll-form-topic">Topic</label>
          <input
            data-testid="createPoll-topic"
            onChange={e => setTopic(e.target.value)}
            type="text" 
            id="createPoll-form-topic"
            placeholder="topic"/>
        </div>

        <div className="createPoll-form-group">
          <label htmlFor="createPoll-form-options">Options (separate with commas)</label>
          <textarea
            data-testid="createPoll-options"
            onChange={e => setOptions(e.target.value)}
            type="text"
            id="createPoll-form-options"
            placeholder="options"/>
        </div>

        <div className="createPoll-form-submit">
          <input 
            data-testid="createPoll-submit"
            type="submit"
            value="Submit"/>
        </div>
      </form>
    </div>
  );
};