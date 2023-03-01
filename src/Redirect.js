import React, { useEffect, useState } from "react";

// URL received after user auth accepted:
// http://localhost:3000/redirect/exchange_token?state=&code=156062db6648cfc82c9dfb310ec38aa7ede05669&scope=read


export default function Redirect() {
  const [userAuthToken, setUserAuthToken] = useState(null);
  const [userAccessToken, setUserAccessToken] = useState(null);
  // eslint-disable-next-line
  const [userRefreshToken, setUserRefreshToken] = useState(null);

  const stripURLForToken = (url) => {
    return url.split("&")[1].slice(5);
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
    const fetchedAuthToken = stripURLForToken(window.location.search);
    setUserAuthToken(fetchedAuthToken)
  }, [])

  useEffect(() => {
    getAccessToken(userAuthToken)
    .then((data) => {
      setUserAccessToken(data.access_token);
      setUserRefreshToken(data.refresh_token);
      console.log(data)
    })
    // need response.access_token and response.refresh_token
    // eslint-disable-next-line
  }, [userAuthToken])

  useEffect(() => {
    getUserActivities()
    .then((data) => {
      console.log(data)
    })
    // eslint-disable-next-line
  }, [userAccessToken])

  return (
    <p>Fetching your data</p>
  )
}