import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Error.css';


export default function Error ({ error }) {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {navigate('/', { replace: true })}, 7000)
    // eslint-disable-next-line
  }, [])

  return(
    <section className="home-page">
      <h1 className="site-logo">Ride Ready</h1>
      <img className="error-gif" src="/assets/mtb-crash.gif" alt="mountain biker crashing"/>
      <p className="error-message">{error}</p>
    </section>
  )
}