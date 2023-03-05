import React, { useEffect, useState } from "react";
import "./EditSus.css";
import { useNavigate } from "react-router-dom";
import { findSusIndexByID } from "../../util";
import moment from "moment";
import {
  calculateRebuildLife,
  isOldestRideBeforeRebuild,
  filterRideActivities,
  cleanRideData,
} from "../../util";
import { getUserActivities } from "../../APICalls";
import PropTypes from "prop-types";

export default function EditSus({
  addUserSuspension,
  userSuspension,
  setSelectedSuspension,
  selectedSuspension,
  userAccessToken,
  addAccessToken,
  userRides,
  addUserRides,
  pagesFetched,
  setPagesFetched,
  userBikes,
  addUserBikes,
  changeErrorMessage,
}) {
  const [newRebuildDate, setNewRebuildDate] = useState("");
  const [editSusIndex, setEditSusIndex] = useState(null);
  const [editSusDetails, setEditSusDetails] = useState(null);
  const [fetchPageNumber, setFetchPageNumber] = useState(pagesFetched);
  const [fetchCount, setFetchCount] = useState(pagesFetched);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userBikes) {
      const loadedBikes = JSON.parse(localStorage.getItem("userBikes"));
      addUserBikes(loadedBikes);
    }
    if (!userRides) {
      const loadedRides = JSON.parse(localStorage.getItem("userRides"));
      addUserRides(loadedRides);
    }
    if (!userAccessToken) {
      const loadedToken = JSON.parse(localStorage.getItem("userAccessToken"));
      addAccessToken(loadedToken);
    }
    if (!selectedSuspension) {
      const loadedSelection = JSON.parse(
        localStorage.getItem("selectedSuspension")
      );
      setSelectedSuspension(loadedSelection);
    }
    if (!userSuspension) {
      const loadedSus = JSON.parse(localStorage.getItem("userSuspension"));
      addUserSuspension(loadedSus);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!(selectedSuspension || userSuspension)) return;
    const index = findSusIndexByID(selectedSuspension, userSuspension);
    setEditSusDetails(userSuspension[index]);
    setEditSusIndex(index);
    // eslint-disable-next-line
  }, [selectedSuspension, userSuspension]);

  useEffect(() => {
    let moreRidesNeeded;
    if (newRebuildDate) {
      moreRidesNeeded = isOldestRideBeforeRebuild(userRides, newRebuildDate);
    }
    if (moreRidesNeeded === false) {
      if (fetchCount !== fetchPageNumber) return;
      if (fetchCount > 10) return;
      setSubmitDisabled(true);
      setFetchPageNumber(fetchPageNumber + 1);
      getUserActivities(fetchPageNumber, userAccessToken)
        .then((activities) => {
          const rideActivities = filterRideActivities(activities);
          const cleanedRides = cleanRideData(rideActivities);
          if (cleanedRides) {
            addUserRides([...userRides, ...cleanedRides]);
            window.localStorage.setItem(
              "userRides",
              JSON.stringify([...userRides, ...cleanedRides])
            );
          }
          setFetchCount(fetchCount + 1);
          setSubmitDisabled(false);
        })
        .catch(() => {
          changeErrorMessage(`An error occurred while fetching your rides. 
      Please return to the home page and try logging in again.`);
        });
    }
    // eslint-disable-next-line
  }, [newRebuildDate, userRides]);

  const handleSubmit = () => {
    if (!newRebuildDate) {
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 3000);
      return;
    }

    const modifiedSus = editSusDetails;
    modifiedSus.rebuildDate = newRebuildDate;
    modifiedSus.rebuildLife = calculateRebuildLife(
      modifiedSus.susData.id,
      newRebuildDate,
      userRides,
      modifiedSus.onBike.id,
      userBikes
    );
    let newUserSusArr = userSuspension;
    newUserSusArr.splice(editSusIndex, 1, modifiedSus);
    addUserSuspension(newUserSusArr);
    window.localStorage.setItem(
      "userSuspension",
      JSON.stringify(newUserSusArr)
    );

    setSelectedSuspension(null);
    setPagesFetched(fetchCount);
    navigate("/dashboard");
  };

  return (
    <section className="edit-part-form-section">
      <h1 className="site-logo">Ride Ready</h1>
      <div className="edit-sus-details">
        {editSusDetails && (
          <h2>{`Change rebuild date of the ${editSusDetails.susData.name}
          on your ${editSusDetails.onBike.brand_name} ${editSusDetails.onBike.model_name}`}</h2>
        )}
        {editSusDetails && (
          <h2>{`Currently: ${moment(editSusDetails.rebuildDate).format(
            "ll"
          )}`}</h2>
        )}
        <form>
          <input
            type="date"
            value={newRebuildDate}
            max={new Date().toLocaleDateString("fr-ca")}
            onChange={(event) => setNewRebuildDate(event.target.value)}
          />
        </form>
        <div className="edit-section-buttons">
          <button onClick={() => handleSubmit()} disabled={submitDisabled}>
            Submit
          </button>
          <button
            onClick={() => {
              setSelectedSuspension(null);
              navigate("/dashboard");
            }}
          >
            Back
          </button>
        </div>
        {submitError && (
          <p className="error-wait-message">
            Please fill out all forms before submitting
          </p>
        )}
        {fetchCount !== fetchPageNumber && (
          <p className="error-wait-message">
            Please wait for data to load.
            <br />
            This could take up to 15 seconds
          </p>
        )}
      </div>
      <div className="edit-spacer"></div>
    </section>
  );
}

EditSus.propTypes = {
  addUserSuspension: PropTypes.func,
  userSuspension: PropTypes.array,
  setSelectedSuspension: PropTypes.func,
  selectedSuspension: PropTypes.string,
  userAccessToken: PropTypes.string,
  addAccessToken: PropTypes.func,
  userRides: PropTypes.array,
  addUserRides: PropTypes.func,
  pagesFetched: PropTypes.number,
  setPagesFetched: PropTypes.func,
  userBikes: PropTypes.array,
  addUserBikes: PropTypes.func,
  changeErrorMessage: PropTypes.func,
};
