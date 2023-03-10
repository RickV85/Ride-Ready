const getAccessToken = (userAuthToken) => {
  let clientID = `${process.env.REACT_APP_CLIENT_ID}`;
  let clientSecret = `${process.env.REACT_APP_CLIENT_SECRET}`;

  if (window.location.href.startsWith('http://localhost:3000/redirect/')) {
    clientID = `${process.env.REACT_APP_CLIENT_ID_LOCAL}`;
    clientSecret = `${process.env.REACT_APP_CLIENT_SECRET_LOCAL}`;
  }

  return fetch(`https://www.strava.com/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/JSON" },
    body: JSON.stringify({
      client_id: clientID,
      client_secret: clientSecret,
      code: `${userAuthToken}`,
      grant_type: "authorization_code",
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  });
};

const getUserActivities = (pageNum, userAccessToken) => {
  return fetch(
    `https://www.strava.com/api/v3/athlete/activities?page=${pageNum}&per_page=200`,
    {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    }
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  });
};

const getUserGearDetails = (id, userAccessToken) => {
  return fetch(`https://www.strava.com/api/v3/gear/${id}`, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  });
};

export { getAccessToken, getUserActivities, getUserGearDetails };
