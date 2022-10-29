import "./Form.css";

export default function Form(props) {
  return (
    <form className="form" onSubmit={e => props.submit(e)}>
      <div className="form-group">
        <label htmlFor="form-username">Username</label>
        <input 
          onChange={e => props.setUsername(e.target.value)}
          type="text" 
          id="form-username"
          placeholder="username"/>
      </div>

      <div className="form-group">
        <label htmlFor="form-password">Password</label>
        <input 
          onChange={e => props.setPassword(e.target.value)}
          type="password"
          id="form-password"
          placeholder="password"/>
      </div>

      <div className="form-submit">
        <input type="submit" value="Submit"/>
      </div>
    </form>
  );
};