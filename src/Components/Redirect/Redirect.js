import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from '../../APICalls'
import './Redirect.css';

export default function Redirect() {
  const [userAuthToken, setUserAuthToken] = useState('');
  const [userAccessToken, setUserAccessToken] = useState('');
  const [userRides, setUserRides] = useState([]);
  const [userGear, setUserGear] = useState([]);
  const [userGearDetails, setUserGearDetails] = useState([])
  const navigate = useNavigate();

  const testForDeniedPermission = (url) => {
    if (url.split("&")[1] === 'error=access_denied') {
      navigate('/error', { replace: true, state: { message: `Please allow this app access to all activity data on Strava's login screen. You are being redirected to the home page.` }});
      return true;
    }
  }; 

  const stripURLForToken = (url) => {
    if(!url) return;
    return url.split("&")[1].slice(5);
  };
  
  const filterRideActivities = (activities) => {
    const rideActivities = activities.filter((act) => act.type === 'Ride')
    return rideActivities;
  }

  // const getAccessToken = () => {
  //   return fetch(`https://www.strava.com/oauth/token`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/JSON' },
  //     body: JSON.stringify({
  //       client_id: `${process.env.REACT_APP_CLIENT_ID}`,
  //       client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
  //       code: `${userAuthToken}`,
  //       grant_type: "authorization_code"
  //     })
  //   }).then((response) => {
  //     if (response.ok) {
  //       return response.json();
  //     }
  //   }).catch((error) => (
  //     console.log(error)
  //   ))
  // }

  const getUserActivities = (pageNum) => {
    return fetch(`https://www.strava.com/api/v3/athlete/activities?page=${pageNum}&per_page=200`, {
      headers: {
        Authorization: `Bearer ${userAccessToken}`
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    }
    ).catch((error) => {
      console.log(error)
    })
  }

  const getGearIDNumbers = () => {
    const gearNumbers = userRides.reduce((arr, ride) => {
      let gearID = ride.gear_id;
      if (arr.includes(gearID)) {
        return arr;
      } else {
        arr.push(gearID)
        return arr;
      }
    }, [])
    setUserGear(gearNumbers)
  }
  
  const getUserGearDetails = (id) => {
    return fetch(`https://www.strava.com/api/v3/gear/${id}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken}`
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    }
    ).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    if (testForDeniedPermission(window.location.search)) return;
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
    getUserActivities(1)
    .then((activities) => {
      const rideActivities = filterRideActivities(activities);
      setUserRides(rideActivities);
    })
    // eslint-disable-next-line
  }, [userAccessToken])

  useEffect(() => {
    if (!userRides) return;
    getGearIDNumbers();
    // eslint-disable-next-line
  }, [userRides])

  useEffect(() => {
    if (!userGear) return;
    let fetchedGearDetail = [];
    userGear.forEach((gearID) => {
      getUserGearDetails(gearID)
      .then((details) => {
        fetchedGearDetail.push(details)
      })
    })
    setUserGearDetails(fetchedGearDetail)
    // eslint-disable-next-line
  }, [userGear])

  // useEffect(() => {
  //   if (error) {
  //     navigate('/error', { replace: true, state: { message: error }})
  //   }
  // }, [error])

  return (
    <section className="home-page">
      <h1 className="site-logo">Ride Ready</h1>
      <iframe className="loading-gif" title="mountain biking gif" src="https://giphy.com/embed/hWAoUDztX8kGVLvecs" frameBorder="0"></iframe>
      <p className="loading-message">Please wait while your data loads.<br/>This could take xxx to xxx seconds.</p>
    </section>
  )
}