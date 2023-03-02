import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './Dashboard.css'

export default function Dashboard() {
  const location = useLocation();
  const [userAccessToken, setUserAccessToken] = useState('');
  const [userRides, setUserRides] = useState(null);
  const [userGearDetails, setUserGearDetails] = useState(null);
  const [userSuspension, setUserSuspension] = useState(null);

  useEffect(() => {
    setUserAccessToken(location.state.userAccessToken)
    setUserRides(location.state.userRides)
    setUserGearDetails(location.state.userGearDetails)
    // eslint-disable-next-line
  }, [])

  return(
    <section className="dashboard">
      <h1 className="site-logo">Ride Ready</h1>
      <p className="add-new-mesg">No suspension to view. Add a new suspension part to track by clicking the button below.</p>
      <button>Add new suspension</button>
    </section>
  )
}