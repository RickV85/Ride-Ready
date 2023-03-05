import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";
import PropTypes from "prop-types";

export default function Error({ errorMessage, changeErrorMessage }) {
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

  return (
    <section className="home-page">
      <h1 className="site-logo">Ride Ready</h1>
      <img
        className="error-gif"
        src="/assets/mtb-crash.gif"
        alt="mountain biker crashing"
      />
      <p className="error-message">{errorMessage}</p>
    </section>
  );
}

Error.propTypes = {
  changeErrorMessage: PropTypes.func,
  errorMessage: PropTypes.string,
};
