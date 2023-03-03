import React from "react";
import { NavLink } from "react-router-dom";
import Container from '../Container/Container'
import './Dashboard.css';
import PropTypes from 'prop-types';

export default function Dashboard({ userSuspension }) {

  return(
    <section className="dashboard">
      <h1 className="site-logo">Ride Ready</h1>
      <Container userSuspension={userSuspension} />
      <NavLink className="add-suspension-link" to="add-new-part">
        <button>Add new suspension</button>
      </NavLink>
    </section>
  )
}

Dashboard.propTypes = {
  userSuspension: PropTypes.array,
}