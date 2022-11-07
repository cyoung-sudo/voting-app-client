import "./AllUsers.css";
import axios from "axios";
// React
import { useState, useEffect } from "react";
// Routing
import { Link } from "react-router-dom";
// Components
import Loading from "../../components/general/Loading";
import PollCount from "../../components/user/PollCount";
// Utils
import { sortByDate } from "../../utils/Sorting";

export default function AllUsers(props) {
  // Requested data
  const [users, setUsers] = useState(null);
  // Sorting
  const [sortMode, setSortMode] = useState("newest");

  // Request for all users on load
  useEffect(() => {
    axios({
      method: "get",
      withCredentials: true,
      url: "/api/users"
    })
    .then(res => {
      if(res.data.success) {
        setUsers(res.data.users);
      }
    })
    .catch(err => console.log(err));
  }, []);

  // Switch sorting mode
  useEffect(() => {
    if(users) {
      setUsers(sortByDate([...users], sortMode));
    }
  }, [sortMode]);

  if(users) {
    return (
      <div id="allUsers">
        <div id="allUsers-header">
          <h1>Users</h1>
        </div>

        <div id="allUsers-sort">
          <button onClick={() => setSortMode("newest")}>Newest</button>
          <button onClick={() => setSortMode("oldest")}>Oldest</button>
        </div>
  
        <ul id="allUsers-list">
          {users.map((user, idx) => (
            <li key={idx}>
              <Link className="allUsers-list-username" to={`/users/${user._id}`}>
                {user.username}
              </Link>
              <div className="allUsers-list-badges">
                <PollCount id={user._id}/>
              </div>
              <div className="allUsers-list-date">Joined on: {new Date(user.createdAt).toDateString()}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <Loading/>;
  }
};