import "./ShowPoll.css";
import axios from "axios";
// React
import { useState, useEffect } from "react";
// Router
import { useParams } from "react-router-dom";
// Components
import Loading from "../../components/general/Loading";
// Chart
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// Icons
import { FiRefreshCw } from "react-icons/fi";

export default function ShowPoll(props) {
  // Requested data
  const [poll, setPoll] = useState(null);
  // Controlled input
  const [choice, setChoice] = useState("");
  // Manual refresh
  const [refresh, setRefresh] = useState(false);
  // Hooks
  let { id } = useParams();

  // Request for poll on load
  useEffect(() => {
    axios({
      method: "post",
      data: { id },
      withCredentials: true,
      url: "/api/poll"
    })
    .then(res => {
      if(res.data.success) {
        setPoll(res.data.poll);
      } else {
        console.log("Poll not found");
      }
    })
    .catch(err => console.log(err));
  }, [refresh]);

  // Handle voting form submission
  const handleChoice = e => {
    // Prevent refresh on submit
    e.preventDefault();
    // Validations
    if(choice === "") {
      console.log("No option selected");
    } else {
      axios({
        method: "put",
        data: {
          id,
          choice
        },
        withCredentials: true,
        url: "/api/poll/vote"
      })
      .then(res => {
        if(res.data.success) {
          console.log("Success");
        }
      })
      .catch(err=> console.log(err));
    }
  };

  if(poll) {
    return (
      <div id="showPoll">
        <div id="showPoll-header">
          <h1>{poll.topic}</h1>
        </div>

        {/*----- Form -----*/}
        <form id="showPoll-form" onSubmit={handleChoice}>
          {poll.options.map((option, idx) => (
            <div className="showPoll-form-group" key={idx}>
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
          <div className="showPoll-form-submit">
            <input type="submit" value="Submit Vote"/>
          </div>
        </form>
        {/*----- /Form -----*/}

        <div id="showPoll-chart-ctrs">
          <button onClick={() => setRefresh(refresh => !refresh)}><span><FiRefreshCw/></span>Refresh Data</button>
        </div>

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
                domain={["dataMin", "dataMax + 1"]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="votes" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/*----- /Chart -----*/}
      </div>
    );
  } else {
    return <Loading/>;
  }
};