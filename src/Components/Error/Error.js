import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Error.css';


export default function Error () {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {navigate('/', { replace: true })}, 7000)
  }, [])
  return(
    <section className="home-page">
      <h1 className="site-logo">Ride Ready</h1>
      <iframe className="error-gif" src="https://giphy.com/embed/GCUhAD3TxGKZsPypz2" title="mountain bike crash" frameBorder="0" ></iframe>
      <p className="error-message">{location.state.message}</p>
    </section>
  )
}