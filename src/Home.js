import React from "react";

// URL received after user auth accepted:
// http://localhost:3000/redirect/exchange_token?state=&code=156062db6648cfc82c9dfb310ec38aa7ede05669&scope=read

export default function Home () {
  const clientID = `${process.env.REACT_APP_CLIENT_ID}`;
  const redirectUrl = "http://localhost:3000/redirect";
  const scope = "read";

  const loginUser = () => {
    window.location = `http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=${scope}`;
};

  return (
    <section>
      <h1>Ride Ready</h1>
      <button onClick={loginUser}>Click to authorize with Strava</button>
    </section>
  )
}