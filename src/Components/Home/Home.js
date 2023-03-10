import React, { useEffect, useState } from "react";
import "./Home.css";

export default function Home() {
  const [clientID, setClientID] = useState(`${process.env.REACT_APP_CLIENT_ID}`);
  const [redirectUrl, setRedirectUrl] = useState('https://ride-ready.vercel.app/redirect');

  useEffect(() => {
    window.localStorage.setItem("userAccessToken", JSON.stringify(null));
    window.localStorage.setItem("userRides", JSON.stringify(null));
    window.localStorage.setItem("userBikes", JSON.stringify(null));
    window.localStorage.setItem("selectedSuspension", JSON.stringify(null));

    if (window.location.href === 'http://localhost:3000/') {
      setClientID(`${process.env.REACT_APP_CLIENT_ID_LOCAL}`);
      setRedirectUrl('http://localhost:3000/redirect')
    }
  }, []);
  
  const loginUser = () => {
    window.location = `http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=auto&scope=activity:read_all`;
  };
  
  return (
    <section className="home-page">
      <h1 className="site-logo">Ride Ready</h1>
      <h2 className="tag-line">Your personal suspension manager</h2>
      <button onClick={loginUser}>Log in with Strava</button>
    </section>
  );
}
