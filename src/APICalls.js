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
  }).catch((error) => (
    console.log(error)
  ))
}


export {getAccessToken};