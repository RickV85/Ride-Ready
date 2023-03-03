import React from "react";
import './Container.css';
import PropTypes from 'prop-types';

export default function Container({ userSuspension }) {
  

  return (
    <section className="container">
      <p className="add-new-mesg">No suspension to view. Add a new suspension part to track by clicking the button below.</p>
    </section>
  )
}

Container.propTypes = {
  userSuspension: PropTypes.array
}