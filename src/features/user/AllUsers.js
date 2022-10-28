import "./AllUsers.css";
import axios from "axios";
// React
import { useState, useEffect } from "react";
// Routing
import { Link } from "react-router-dom";
// Components
import Loading from "../../components/general/Loading";

export default function AllUsers(props) {
  // Requested data
  const [users, setUsers] = useState(null);

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

  if(users) {
    return (
      <div id="allUsers">
        <div id="allUsers-header">
          <h1>Users</h1>
        </div>
  
        <ul id="allUsers-list">
          {users.map((user, idx) => (
            <li key={idx}>
              <Link className="allUsers-list-username" to={`/users/${user._id}`}>
                {user.username}
              </Link>
              <div>Joined: {new Date(user.createdAt).toDateString()}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <Loading/>;
  }
};