import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Container from '../Container/Container'
import './Dashboard.css';
import PropTypes from 'prop-types';

export default function Dashboard({ userSuspension }) {
  // const location = useLocation();
  // const [userAccessToken, setUserAccessToken] = useState(null);
  // const [userRides, setUserRides] = useState(null);
  // const [userGearDetails, setUserGearDetails] = useState(null);
  // const [userSuspension, setUserSuspension] = useState(null);

  // useEffect(() => {
  //   const accessTokenProp = location.state.userAccessToken;
  //   const userRideProp = location.state.userRides;
  //   const userGearDetailsProp = location.state.userGearDetails;

  //   setUserAccessToken(accessTokenProp);
  //   setUserRides(userRideProp);
  //   setUserGearDetails(userGearDetailsProp);
  //   // eslint-disable-next-line
  // }, [])

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
  populateUserBikes: PropTypes.func,
}

