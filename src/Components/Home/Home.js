import React from "react";


export default function Home () {
  const clientID = `${process.env.REACT_APP_CLIENT_ID}`;
  const redirectUrl = "http://localhost:3000/redirect";
  const scope = "activity:read_all";

  const loginUser = () => {
    window.location = `http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=auto&scope=${scope}`;
};

  return (
    <section>
      <h1>Ride Ready</h1>
      <button onClick={loginUser}>Click to authorize with Strava</button>
    </section>
  )
}