import React, { useEffect, useState } from "react";

// URL received after user auth accepted:
// http://localhost:3000/redirect/exchange_token?state=&code=156062db6648cfc82c9dfb310ec38aa7ede05669&scope=read


export default function Redirect() {
  const [userAuthToken, setUserAuthToken] = useState(null);

  const stripURLForToken = (url) => {
    return url.split("&")[1].slice(5);
  };

  useEffect(() => {
    const fetchedAuthToken = stripURLForToken(window.location.search);
    setUserAuthToken(fetchedAuthToken)
    console.log(fetchedAuthToken)
  }, [])

  return (
    <p>Fetching your data</p>
  )
}