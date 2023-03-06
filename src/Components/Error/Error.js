import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";
import PropTypes from "prop-types";

export default function Error({ errorMessage, changeErrorMessage }) {
  const [badRequest, setBadRequest] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      changeErrorMessage("");
    }, 7000);
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 7000);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      setBadRequest(true)
    } else {
      setBadRequest(false)
    }
    // eslint-disable-next-line
  }, [errorMessage])

  return (
    <section className="home-page">
      <h1 className="site-logo">Ride Ready</h1>
      <img
        className="error-gif"
        src="/assets/mtb-crash.gif"
        alt="mountain biker crashing"
      />
      <p className="error-message">{errorMessage}</p>
      {badRequest && <p className="error-message">Oops, no page exists here. Sending you back to the home page.</p>}
    </section>
  );
}

Error.propTypes = {
  changeErrorMessage: PropTypes.func,
  errorMessage: PropTypes.string,
};
