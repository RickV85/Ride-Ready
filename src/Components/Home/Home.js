import React from "react";
import './Home.css'

export default function Home () {
  const clientID = `${process.env.REACT_APP_CLIENT_ID}`;
  const redirectUrl = "http://localhost:3000/redirect";
  const scope = "activity:read_all";

  const loginUser = () => {
    window.location = `http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=auto&scope=${scope}`;
};

  return (
    <section className='home-page'>
      <h1 className="site-logo">Ride Ready</h1>
      <h2 className="tag-line">Your personal suspension manager</h2>
      <button onClick={loginUser}>Log in with Strava</button>
    </section>
  )
}