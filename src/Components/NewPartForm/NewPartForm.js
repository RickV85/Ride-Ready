import React, { useEffect, useState } from "react";
import { suspensionData } from "../../SuspensionData";
import "./NewPartForm.css";
import PropTypes from "prop-types";
import {
  calculateRebuildLife,
  isOldestRideBeforeRebuild,
  filterRideActivities,
  cleanRideData,
} from "../../util";
import { getUserActivities } from "../../APICalls";
import { useNavigate } from "react-router-dom";

export default function NewPartForm({
  userBikes,
  setUserBikes,
  userRides,
  setUserSuspension,
  userSuspension,
  userAccessToken,
  setUserAccessToken,
  setUserRides,
  pagesFetched,
  setPagesFetched,
  changeErrorMessage,
}) {
  // eslint-disable-next-line
  const [bikeOptions, setBikeOptions] = useState(userBikes);
  const [bikeDropdownOptions, setBikeDropdownOptions] = useState([]);
  const [selectedBike, setSelectedBike] = useState("");
  const [selectedSus, setSelectedSus] = useState("");
  const [selectedRebuildDate, setSelectedRebuildDate] = useState("");
  const [fetchPageNumber, setFetchPageNumber] = useState(pagesFetched);
  const [fetchCount, setFetchCount] = useState(pagesFetched);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userBikes) {
      const loadedBikes = JSON.parse(localStorage.getItem("userBikes"));
      setBikeOptions(loadedBikes);
      setUserBikes(loadedBikes);
    }
    if (!userRides) {
      const loadedRides = JSON.parse(localStorage.getItem("userRides"));
      setUserRides(loadedRides);
    }
    if (!userAccessToken) {
      const loadedToken = JSON.parse(localStorage.getItem("userAccessToken"));
      setUserAccessToken(loadedToken);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (bikeOptions) {
      const bikeSelects = bikeOptions.map((bike) => {
        return (
          <option key={bike.id} value={bike.id}>
            {bike.brand_name} {bike.model_name}
          </option>
        );
      });
      setBikeDropdownOptions([
        ...bikeSelects,
        <option key={0} value={0}>
          Unlisted bike - uses all rides available
        </option>,
      ]);
    } else {
      setBikeDropdownOptions([
        <option key={0} value={0}>
          Unlisted bike (uses all rides available)
        </option>,
      ]);
    }
  }, [bikeOptions]);

  const suspensionOptions = suspensionData.map((sus) => {
    return (
      <option key={sus.id} value={sus.id}>
        {sus.name}
      </option>
    );
  });

  useEffect(() => {
    let moreRidesNeeded;
    if (selectedRebuildDate) {
      moreRidesNeeded = isOldestRideBeforeRebuild(
        userRides,
        selectedRebuildDate
      );
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
            setUserRides([...userRides, ...cleanedRides]);
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
  }, [selectedRebuildDate, userRides]);

  const handleSubmit = () => {
    if (!(selectedBike && selectedSus && selectedRebuildDate)) {
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 3000);
      return;
    }

    const selectedSuspensionName = suspensionData.find(
      (sus) => sus.id === +selectedSus
    );
    let selectedBikeName;
    if (bikeOptions) {
      selectedBikeName = bikeOptions.find((bike) => bike.id === selectedBike);
    } else {
      selectedBikeName = null;
    }

    const newSuspensionData = {
      susData: selectedSuspensionName,
      onBike: selectedBikeName || {
        id: Date.now().toString(),
        brand_name: "Unlisted",
        model_name: "bike",
      },
      rebuildDate: selectedRebuildDate,
      rebuildLife: calculateRebuildLife(
        selectedSus,
        selectedRebuildDate,
        userRides,
        selectedBike,
        userBikes
      ),
    };

    if (userSuspension) {
      setUserSuspension([...userSuspension, newSuspensionData]);
      window.localStorage.setItem(
        "userSuspension",
        JSON.stringify([...userSuspension, newSuspensionData])
      );
    } else {
      setUserSuspension([newSuspensionData]);
      window.localStorage.setItem(
        "userSuspension",
        JSON.stringify([newSuspensionData])
      );
    }

    setPagesFetched(fetchCount);
    navigate("/dashboard");
  };

  return (
    <section className="new-part-form-section">
      <h1 className="site-logo">Ride Ready</h1>
      <form className="new-part-form">
        <label htmlFor="bikeSelect">Which bike is this part on?</label>
        <select
          name="bikeSelect"
          className="bike-select"
          value={selectedBike}
          onChange={(event) => setSelectedBike(event.target.value)}
        >
          <option key={"0"} value={""} disabled>
            Choose a bike
          </option>
          {bikeDropdownOptions}
        </select>
        <label htmlFor="suspensionSelect">What is the make and type?</label>
        <select
          name="suspensionSelect"
          value={selectedSus}
          onChange={(event) => setSelectedSus(event.target.value)}
        >
          <option key={"0"} value={""} disabled>
            Choose your suspension
          </option>
          {suspensionOptions}
        </select>
        <label htmlFor="lastRebuild">When was it last rebuilt?</label>
        <input
          name="lastRebuild"
          type={"date"}
          max={new Date().toLocaleDateString("fr-ca")}
          value={selectedRebuildDate}
          onChange={(event) => setSelectedRebuildDate(event.target.value)}
        />
      </form>
      <div className="newpartform-button-section">
        <button onClick={() => handleSubmit()} disabled={submitDisabled}>
          Submit
        </button>
        <button onClick={() => navigate("/dashboard")}>Back</button>
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
    </section>
  );
}

NewPartForm.propTypes = {
  userBikes: PropTypes.array,
  setUserBikes: PropTypes.func,
  userRides: PropTypes.array,
  setUserSuspension: PropTypes.func,
  userSuspension: PropTypes.array,
  userAccessToken: PropTypes.string,
  setUserAccessToken: PropTypes.func,
  setUserRides: PropTypes.func,
  pagesFetched: PropTypes.number,
  setPagesFetched: PropTypes.func,
  changeErrorMessage: PropTypes.func,
};
