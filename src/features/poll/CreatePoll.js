import "./CreatePoll.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
// React
import { useState } from "react";
// Routing
import { useNavigate } from "react-router-dom";
// Date picker
import DatePicker from "react-datepicker";

export default function CreatePoll(props) {
  // Controlled inputs
  const [topic, setTopic] = useState("");
  const [options, setOptions] = useState("");
  const [expiration, setExpiration] = useState(new Date());
  // Hooks
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = e => {
    // Prevent refresh on submit
    e.preventDefault();
    // Validations
    if(topic === "") {
      console.log("No topic given");
    } else if(options === "") {
      console.log("No options given");
    } else if(expiration < new Date()) {
      console.log("Given expiration has passed");
    } else {
      axios({
        method: "post",
        data: {
          topic,
          options,
          expiration
        },
        withCredentials: true,
        url: "/api/polls"
      })
      .then(res => {
        if(res.data.success) {
          // Redirect to profile route
          navigate(`/users/${props.user._id}`);
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
            onChange={e => setTopic(e.target.value)}
            type="text" 
            id="createPoll-form-topic"
            placeholder="topic"/>
        </div>

        <div className="createPoll-form-group">
          <label htmlFor="createPoll-form-options">Options (separate with commas)</label>
          <textarea 
            onChange={e => setOptions(e.target.value)}
            type="text"
            id="createPoll-form-options"
            placeholder="options"/>
        </div>

        <div className="createPoll-form-group">
          <label htmlFor="createPoll-form-expiration">Expiration</label>
          <div className="createPoll-form-expiration-wrapper">
            <DatePicker 
              onChange={date => setExpiration(date)}
              id="createPoll-form-expiration"
              selected={expiration}
              showTimeSelect
              dateFormat="Pp"/>
          </div>
        </div>

        <div className="createPoll-form-submit">
          <input type="submit" value="Submit"/>
        </div>
      </form>
    </div>
  );
};