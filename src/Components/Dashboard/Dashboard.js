import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Container from "../Container/Container";
import "./Dashboard.css";
import PropTypes from "prop-types";

export default function Dashboard({
  userSuspension,
  setUserSuspension,
  setSelectedSuspension,
  userBikes,
  setUserBikes,
}) {
  useEffect(() => {
    if (userBikes === null) {
      const loadedBikes = JSON.parse(localStorage.getItem("userBikes"));
      setUserBikes(loadedBikes);
    }
    if (userSuspension === null) {
      const loadedSus = JSON.parse(localStorage.getItem("userSuspension"));
      setUserSuspension(loadedSus);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userBikes !== [] && userBikes) {
      window.localStorage.setItem("userBikes", JSON.stringify(userBikes));
    }
  }, [userBikes]);

  return (
    <section className="dashboard">
      <h1 className="site-logo">Ride Ready</h1>
      <Container
        userSuspension={userSuspension}
        setSelectedSuspension={setSelectedSuspension}
      />
      <NavLink className="add-suspension-link" to="add-new-part">
        <button id="dash-add-sus">Add new suspension</button>
      </NavLink>
    </section>
  );
}

Dashboard.propTypes = {
  userSuspension: PropTypes.array,
  setUserSuspension: PropTypes.func,
  setSelectedSuspension: PropTypes.func,
  userBikes: PropTypes.array,
  setUserBikes: PropTypes.func,
};
