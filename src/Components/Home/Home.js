import React, { useEffect } from "react";
import "./Home.css";

export default function Home() {
  const clientID = `${process.env.REACT_APP_CLIENT_ID_LOCAL}`;
  const redirectUrl = "http://localhost:3000/redirect";
  const scope = "activity:read_all";

  const loginUser = () => {
    window.location = `http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=auto&scope=${scope}`;
  };

  useEffect(() => {
    window.localStorage.setItem("userAccessToken", JSON.stringify(null));
    window.localStorage.setItem("userRides", JSON.stringify(null));
    window.localStorage.setItem("userBikes", JSON.stringify(null));
    window.localStorage.setItem("selectedSuspension", JSON.stringify(null));
  }, []);

  return (
    <section className="home-page">
      <h1 className="site-logo">Ride Ready</h1>
      <h2 className="tag-line">Your personal suspension manager</h2>
      <button onClick={loginUser}>Log in with Strava</button>
    </section>
  );
}
