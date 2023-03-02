import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, getUserActivities, getUserGearDetails } from '../../APICalls';
import { testForDeniedPermission, stripURLForToken, filterRideActivities, getGearIDNumbers } from '../../util.js'
import './Redirect.css';

export default function Redirect() {
  const [userAuthToken, setUserAuthToken] = useState('');
  const [userAccessToken, setUserAccessToken] = useState('');
  const [userRides, setUserRides] = useState([]);
  const [userGear, setUserGear] = useState([]);
  const [userGearDetails, setUserGearDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (testForDeniedPermission(window.location.search)) {
      navigate('/error', { replace: true, state: { message: `Please allow this app access to all activity data on Strava's login screen. You are being redirected to the home page.` }});
      return;
    } 
    const fetchedAuthToken = stripURLForToken(window.location.search);
    setUserAuthToken(fetchedAuthToken)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!userAuthToken) return;
    getAccessToken(userAuthToken)
    .then((data) => {
      setUserAccessToken(data.access_token);
    })
    // eslint-disable-next-line
  }, [userAuthToken])

  useEffect(() => {
    if (!userAccessToken) return;
    getUserActivities(1, userAccessToken)
    .then((activities) => {
      const rideActivities = filterRideActivities(activities);
      const cleanedRides = rideActivities.map((ride) => {
        return {
          'id': ride.id,
          'ride_duration': ride.moving_time,
          'ride_distance': ride.distance,
          'ride_date': ride.start_date,
          'gear_id': ride.gear_id,
        }
      })
      if (cleanedRides) {
        setUserRides(cleanedRides)
      }
    })
    // eslint-disable-next-line
  }, [userAccessToken])

  useEffect(() => {
    if (userRides.length === 0) return;
    setUserGear(getGearIDNumbers(userRides));
    // eslint-disable-next-line
  }, [userRides])

  useEffect(() => {
    if (userGear.length === 0) return;
    let fetchedGearDetail = [];
    userGear.forEach((gearID) => {
      getUserGearDetails(gearID, userAccessToken)
      .then((details) => {
        fetchedGearDetail.push({
          'id': details.id,
          'brand_name': details.brand_name,
          'model_name': details.model_name
        })
      })
    })
    setUserGearDetails(fetchedGearDetail)
    // eslint-disable-next-line
  }, [userGear])
  
  useEffect(() => {
    if (userGearDetails) {
      setTimeout(() => navigate('/dashboard', { replace: true, state: { userAccessToken: userAccessToken, userRides: userRides, userGearDetails: userGearDetails }}), 1500);
    }
    // eslint-disable-next-line
  }, [userGearDetails])

  return (
    <section className="home-page">
      <h1 className="site-logo">Ride Ready</h1>
      <img src="/assets/mtb-roost.gif" className="loading-gif" alt="mountain biker getting rowdy" />
      {/* <iframe className="loading-gif" title="mountain biking gif" src="https://giphy.com/embed/hWAoUDztX8kGVLvecs" frameBorder="0"></iframe> */}
      <p className="loading-message">Please wait while your data loads.<br/>This could take xxx to xxx seconds.</p>
    </section>
  )
}