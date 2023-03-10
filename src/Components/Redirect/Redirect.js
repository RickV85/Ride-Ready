import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAccessToken,
  getUserActivities,
  getUserGearDetails,
} from "../../APICalls";
import {
  testForDeniedPermission,
  stripURLForToken,
  filterRideActivities,
  getGearIDNumbers,
  cleanRideData,
} from "../../util.js";
import "./Redirect.css";
import PropTypes from "prop-types";

export default function Redirect({
  setUserAuthToken,
  userAuthToken,
  setUserAccessToken,
  userAccessToken,
  setUserBikes,
  setUserRides,
  userRides,
  changeErrorMessage,
}) {
  const [userGear, setUserGear] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (testForDeniedPermission(window.location.search)) {
      changeErrorMessage(`Please allow this app access to all activity data on Strava's login screen. 
        You are being redirected to the home page.`);
      navigate("/error", { replace: true });
      return;
    }
    const fetchedAuthToken = stripURLForToken(window.location.search);
    setUserAuthToken(fetchedAuthToken);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!userAuthToken) return;
    getAccessToken(userAuthToken)
      .then((data) => {
        setUserAccessToken(data.access_token);
        window.localStorage.setItem(
          "userAccessToken",
          JSON.stringify(data.access_token)
        );
      })
      .catch(() => {
        changeErrorMessage(`An error occurred while requesting an access token. 
      Please return to the home page and try logging in again.`);
      });
    // eslint-disable-next-line
  }, [userAuthToken]);

  useEffect(() => {
    if (!userAccessToken) return;
    getUserActivities(1, userAccessToken)
      .then((activities) => {
        const rideActivities = filterRideActivities(activities);
        const cleanedRides = cleanRideData(rideActivities);
        if (cleanedRides) {
          setUserRides(cleanedRides);
          window.localStorage.setItem(
            "userRides",
            JSON.stringify(cleanedRides)
          );
        }
      })
      .catch(() => {
        changeErrorMessage(`An error occurred while fetching your rides. 
      Please return to the home page and try logging in again.`);
      });
    // eslint-disable-next-line
  }, [userAccessToken]);

  useEffect(() => {
    if (!userRides) return;
    setUserGear(getGearIDNumbers(userRides));

    if (getGearIDNumbers(userRides) === []) {
      navigate("/dashboard", { replace: true });
    }
    // eslint-disable-next-line
  }, [userRides]);

  useEffect(() => {
    if (!userGear) {
      return;
    }
    Promise.all(
      userGear.map((gearID) => getUserGearDetails(gearID, userAccessToken))
    )
      .then((details) => {
        setUserBikes(
          details.map((detail) => ({
            id: detail.id,
            brand_name: detail.brand_name,
            model_name: detail.model_name,
          }))
        );
      })
      .catch(() => {
        changeErrorMessage(`An error occurred while fetching your bike details. 
      Please return to the home page and try logging in again.`);
      });

    navigate("/dashboard", { replace: true });
    // eslint-disable-next-line
  }, [userGear]);

  return (
    <section className="home-page">
      <h1 className="site-logo">Ride Ready</h1>
      <img
        src="/assets/mtb-roost.gif"
        className="loading-gif"
        alt="mountain biker getting rowdy"
      />
      <p className="loading-message">
        Please wait while your data loads.
        <br />
        If this takes longer than 10 seconds, please return to the home screen
        and try again.
      </p>
    </section>
  );
}

Redirect.propTypes = {
  setUserAuthToken: PropTypes.func,
  userAuthToken: PropTypes.string,
  setUserAccessToken: PropTypes.func,
  userAccessToken: PropTypes.string,
  setUserBikes: PropTypes.func,
  setUserRides: PropTypes.func,
  userRides: PropTypes.array,
  changeErrorMessage: PropTypes.func,
};
