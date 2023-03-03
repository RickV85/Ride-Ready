import changeErrorMessage from "./Components/App/App";
import { useNavigate } from "react-router-dom";

const getAccessToken = (userAuthToken) => {
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
  }).catch((error) => {
    changeErrorMessage(`An error occurred while requesting an access token. 
      Please return to the home page and try logging in again. 
      ${error}`
    )
    useNavigate('/error', { replace: true });
  })
}

const getUserActivities = (pageNum, userAccessToken) => {
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
  }).catch((error) => {
    changeErrorMessage(`An error occurred while fetching your rides. 
      Please return to the home page and try logging in again. 
      ${error}`
    );
    useNavigate('/error', { replace: true });
  })
}

const getUserGearDetails = (id, userAccessToken) => {
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
    changeErrorMessage(`An error occurred while fetching your bike details. 
      Please return to the home page and try logging in again. 
      ${error}`
    );
    useNavigate('/error', { replace: true });
  })
}


export { getAccessToken, getUserActivities, getUserGearDetails };