import React, { useEffect, useState } from "react";

export default function Redirect() {
  const [userAuthToken, setUserAuthToken] = useState('');
  const [userAccessToken, setUserAccessToken] = useState('');
  const [userRides, setUserRides] = useState([]);
  const [userGear, setUserGear] = useState([]);
  const [userGearDetails, setUserGearDetails] = useState([])
  const [permissionError, setPermissionError] = useState('');

  const stripURLForToken = (url) => {
    return url.split("&")[1].slice(5);
  };

  const testForDeniedPermission = (url) => {
    if (url.split("&")[1] === 'error=access_denied') {
      setPermissionError(<p>Please allow this app access to all activity data on Strava's login screen</p>)
      return;
    }
  }; 

  const filterRideActivities = (activities) => {
    const rideActivities = activities.filter((act) => act.type === 'Ride')
    return rideActivities;
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

  const getAccessToken = () => {
    return fetch(`https://www.strava.com/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/JSON' },
      body: JSON.stringify({
        client_id: `${process.env.REACT_APP_CLIENT_ID}`,
        client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
        code: `${userAuthToken}`,
        grant_type: "authorization_code"
      })
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).catch((error) => (
      console.log(error)
    ))
  }

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
  
  // "https://www.strava.com/api/v3/gear/{id}" "Authorization: Bearer [[token]]"
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
    // Add conditional in case user does not authorize or it fails
    // to navigate them to an error page or home
    // If access is denied, error=access_denied will be included in the query string
    testForDeniedPermission(window.location.search)
    const fetchedAuthToken = stripURLForToken(window.location.search);
    setUserAuthToken(fetchedAuthToken)
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
  }, [userGear])

  return (
    <div>
      <p>Fetching your data</p>
      {permissionError}
    </div>
  )
}