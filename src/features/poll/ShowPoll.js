import "./ShowPoll.css";
// React
import { useState, useEffect } from "react";
// Router
import { useParams, useNavigate } from "react-router-dom";
// Components
import Loading from "../../components/general/Loading";
// APIs
import { PollAPI } from "../../apis/PollAPI";
// Chart
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// Icons
import { FiRefreshCw } from "react-icons/fi";
import { BsTrashFill } from "react-icons/bs";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";

export default function ShowPoll(props) {
  // Requested data
  const [poll, setPoll] = useState(null);
  const [owner, setOwner] = useState(false);
  // Controlled input
  const [choice, setChoice] = useState("");
  const [newOption, setNewOption] = useState("");
  // Manual refresh
  const [refresh, setRefresh] = useState(false);
  // Loading status
  const [loading, setLoading] = useState(true);
  // Hooks
  const { id } = useParams();
  const navigate = useNavigate();

  // Request for poll on load
  useEffect(() => {
    PollAPI.getOne(id)
    .then(res => {
      if(res.data.success) {
        setPoll(res.data.poll);
        // Check if user is poll owner
        if((props.user) && (res.data.poll.userId === props.user._id)) {
          setOwner(true);
        }
      } else {
        props.handlePopUp("Poll not found", "error");
        // Redirect to root route
        navigate("/");
      }
      setLoading(false);
    })
    .catch(err => console.log(err));
  }, [refresh]);

  // Handle voting form submission
  const handleChoice = e => {
    // Prevent refresh on submit
    e.preventDefault();
    // Validations
    if(choice === "") {
      props.handlePopUp("No option selected", "error");
    } else {
      PollAPI.vote(id, choice)
      .then(res => {
        if(res.data.success) {
          props.handlePopUp("Successfully voted", "success");
        } else {
          props.handlePopUp(res.data.message, "error");
          // Redirect to root route
          navigate("/");
        }
      })
      .catch(err=> console.log(err));
    }
  };

  // Handle option form submission
  const handleOption = e => {
    // Prevent refresh on submit
    e.preventDefault();
    // Validations
    if(newOption === "") {
      props.handlePopUp("No option(s) given", "error");
    } else {
      PollAPI.addOption(id, newOption)
      .then(res => {
        if(res.data.success) {
          props.handlePopUp("Option(s) added", "success");
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
  };

  // Handle deleting poll
  const handleDelete = () => {
    let result = window.confirm("Are you sure you want to delete this poll?");
    if(result) {
      PollAPI.delete(id)
      .then(res => {
        if(res.data.success) {
          props.handlePopUp("Poll deleted", "success");
          navigate(`/users/${poll.userId}`);
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

  // Handle changing poll status
  const handleStatus = status => {
    PollAPI.setStatus(id, status)
    .then(res => {
      if(res.data.success) {
        props.handlePopUp("Poll status changed", "success");
      } else {
        props.handlePopUp(res.data.message, "error");
        // Reset user
        props.setUser(null);
        // Redirect to root route
        navigate("/");
      }
    })
    .catch(err => console.log(err));
  };

  // Handle page refresh
  const handleRefresh = () => {
    setRefresh(state => !state);
    props.handlePopUp("Data refreshed", "success");
  };

  if(!loading) {
    return (
      <div id="showPoll">
        <div id="showPoll-header">
          <h1>{poll.topic}</h1>
          <div className="showPoll-status">
            Status: {poll.closed ? "closed" : "open"}
          </div>
        </div>

        {/*----- Voting Form -----*/}
        {(!poll.closed) && <form id="showPoll-votingForm" onSubmit={handleChoice}>
          {poll.options.map((option, idx) => (
            <div className="showPoll-votingForm-group" key={idx}>
              <label>
                <input
                  type="radio"
                  name="poll-option"
                  value={option.value}
                  checked={choice === option.value}
                  onChange={e => setChoice(e.target.value)}
                />
                {option.value}
              </label>
            </div>
          ))}
          <div className="showPoll-votingForm-submit">
            <input type="submit" value="Submit Vote"/>
          </div>
        </form>}
        {/*----- /Voting Form -----*/}

        {/*----- Option Form -----*/}
        {owner && (!poll.closed) && <form id="showPoll-optionForm" onSubmit={handleOption}>
          <div className="showPoll-optionForm-group">
            <label htmlFor="showPoll-optionForm-option">New Option</label>
            <input 
              onChange={e => setNewOption(e.target.value)}
              type="text" 
              id="showPoll-optionForm-option"
              placeholder="option"/>
          </div>

          <div className="showPoll-optionForm-submit">
            <input type="submit" value="Add Option"/>
          </div>
        </form>}
        {/*----- /Option Form -----*/}

        {/*----- Chart -----*/}
        <div id="showPoll-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={poll.options}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="value" />
              <YAxis 
                allowDecimals={false}
                domain={[0, "dataMax + 1"]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="votes" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/*----- /Chart -----*/}

        {/*----- Controls -----*/}
        <div id="showPoll-ctrs">
          <button onClick={handleRefresh} className="showPoll-ctrs-refresh">
            <span><FiRefreshCw/></span>Refresh
          </button>
          {owner && !poll.closed && <button onClick={() => handleStatus("close")} className="showPoll-ctrs-close">
            <span><AiFillLock/></span>Close Poll
          </button>}
          {owner && poll.closed && <button onClick={() => handleStatus("open")} className="showPoll-ctrs-open">
            <span><AiFillUnlock/></span>Open Poll
          </button>}
          {owner && <button onClick={handleDelete} className="showPoll-ctrs-delete">
            <span><BsTrashFill/></span>Delete
          </button>}
        </div>
        {/*----- /Controls -----*/}
      </div>
    );
  } else {
    return <Loading/>;
  }
};