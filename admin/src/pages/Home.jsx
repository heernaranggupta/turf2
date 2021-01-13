import React, { useContext } from "react";
import { Link,Redirect } from "react-router-dom";
import { Context } from "../data/context";

const Home = () => {
  const { isLoggedIn, role, companyName, username } = useContext(Context);

  if(isLoggedIn){
    return <Redirect to="/dashboard"/>
  }
  return (
    <div>
      <h2>Home</h2>

      {isLoggedIn ? (
        <div>
          <p>You Are Logged In</p>
          <p>You have role of {role}</p>
          <p>Your Company Name is {companyName}</p>
          <p>Hey, {username}</p>
          <Link to="/dashboard">Go to Dashboard</Link>
        </div>
      ) : (
        <div>
          <p>You are logged out</p>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
