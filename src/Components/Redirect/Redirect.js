import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, getUserActivities, getUserGearDetails } from '../../APICalls';
import { testForDeniedPermission, stripURLForToken, filterRideActivities, getGearIDNumbers } from '../../util.js'
import './Redirect.css';

export default function Redirect({
  addAuthToken,
  userAuthToken, 
  addAccessToken,
  userAccessToken,
  addUserBikes,
  userBikes, 
  addUserRides,
  userRides,
  changeErrorMessage
}) {
  // const [userAuthToken, setUserAuthToken] = useState('');
  // const [userAccessToken, setUserAccessToken] = useState('');
  // const [userRides, setUserRides] = useState([]);
  const [userGear, setUserGear] = useState(null);
  // const [userGearDetails, setUserGearDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (testForDeniedPermission(window.location.search)) {
      changeErrorMessage(`Please allow this app access to all activity data on Strava's login screen. 
        You are being redirected to the home page.`)
      navigate('/error', { replace: true });
      return;
    } 
    const fetchedAuthToken = stripURLForToken(window.location.search);
    addAuthToken(fetchedAuthToken)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!userAuthToken) return;
    getAccessToken(userAuthToken)
    .then((data) => {
      addAccessToken(data.access_token);
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
        addUserRides(cleanedRides)
      }
    })
    // eslint-disable-next-line
  }, [userAccessToken])

  useEffect(() => {
    if (!userRides) return;
    setUserGear(getGearIDNumbers(userRides));
    // eslint-disable-next-line
  }, [userRides])

  useEffect(() => {
    if (!userGear) return;
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
    addUserBikes(fetchedGearDetail)
    // eslint-disable-next-line
  }, [userGear])
  
  useEffect(() => {
    if (userRides) {
      setTimeout(() => navigate('/dashboard', { replace: true }), 1000);
    }
    // eslint-disable-next-line
  }, [userRides])

  return (
    <section className="home-page">
      <h1 className="site-logo">Ride Ready</h1>
      <img src="/assets/mtb-roost.gif" className="loading-gif" alt="mountain biker getting rowdy" />
      <p className="loading-message">Please wait while your data loads.<br/>If this takes longer than 10 seconds, please return to the home screen and try again.</p>
    </section>
  )
}