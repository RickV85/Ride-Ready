import React, { useEffect, useState } from "react";

// URL received after user auth accepted:
// http://localhost:3000/redirect/exchange_token?state=&code=156062db6648cfc82c9dfb310ec38aa7ede05669&scope=read


export default function Redirect() {
  const [userAuthToken, setUserAuthToken] = useState('');
  const [userAccessToken, setUserAccessToken] = useState('');
  // eslint-disable-next-line
  const [userRefreshToken, setUserRefreshToken] = useState('');
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

  const getUserActivities = () => {
    const pageParam = 1;
    return fetch(`https://www.strava.com/api/v3/athlete/activities?page=${pageParam}&per_page=200`, {
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
      setUserRefreshToken(data.refresh_token);
      console.log(data)
    })
    // eslint-disable-next-line
  }, [userAuthToken])

  useEffect(() => {
    if (!userAccessToken) return;
    getUserActivities()
    .then((data) => {
      console.log(data)
    })
    // eslint-disable-next-line
  }, [userAccessToken])

  return (
    <div>
      {<p>Fetching your data</p> && permissionError}
    </div>
  )
}