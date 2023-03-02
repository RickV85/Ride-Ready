import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from '../Container/Container'
import './Dashboard.css';
import PropTypes from 'prop-types';

export default function Dashboard() {
  const location = useLocation();
  const [userAccessToken, setUserAccessToken] = useState(null);
  const [userRides, setUserRides] = useState(null);
  const [userGearDetails, setUserGearDetails] = useState(null);
  const [userSuspension, setUserSuspension] = useState(null);

  useEffect(() => {
    const accessTokenProp = location.state.userAccessToken;
    const userRideProp = location.state.userRides;
    const userGearDetailsProp = location.state.userGearDetails;

    setUserAccessToken(accessTokenProp);
    setUserRides(userRideProp);
    setUserGearDetails(userGearDetailsProp);
    // eslint-disable-next-line
  }, [])

  Dashboard.propTypes = {
    accessTokenProp: PropTypes.string,
    userRideProp: PropTypes.array,
    userGearDetailsProp: PropTypes.array
  }

  return(
    <section className="dashboard">
      <h1 className="site-logo">Ride Ready</h1>
      <Container />
      <button>Add new suspension</button>
    </section>
  )
}

