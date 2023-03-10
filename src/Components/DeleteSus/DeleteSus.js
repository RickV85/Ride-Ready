import React, { useState, useEffect } from "react";
import "./DeleteSus.css";
import { useNavigate } from "react-router-dom";
import { findSusIndexByID } from "../../util";
import PropTypes from "prop-types";

export default function DeleteSus({
  setUserSuspension,
  userSuspension,
  setSelectedSuspension,
  selectedSuspension,
}) {
  const [deleteSusIndex, setDeleteSusIndex] = useState(null);
  const [deleteSusDetails, setDeleteSusDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedSuspension) {
      const loadedSelection = JSON.parse(
        localStorage.getItem("selectedSuspension")
      );
      setSelectedSuspension(loadedSelection);
    }
    if (!userSuspension) {
      const loadedSus = JSON.parse(localStorage.getItem("userSuspension"));
      setUserSuspension(loadedSus);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!(selectedSuspension || userSuspension)) return;
    const index = findSusIndexByID(selectedSuspension, userSuspension);
    setDeleteSusDetails(userSuspension[index]);
    setDeleteSusIndex(index);
    // eslint-disable-next-line
  }, [selectedSuspension, userSuspension]);

  const handleDelete = () => {
    let newUserSusArr = userSuspension;
    newUserSusArr.splice(deleteSusIndex, 1);
    setUserSuspension(newUserSusArr);
    window.localStorage.setItem(
      "userSuspension",
      JSON.stringify(newUserSusArr)
    );
    setSelectedSuspension(null);
    navigate("/dashboard");
  };

  return (
    <section className="delete-part-form-section">
      <h1 className="site-logo">Ride Ready</h1>
      <div className="delete-sus-details">
        <h2>Are you sure you want to delete your:</h2>
        {deleteSusDetails && (
          <h3 className="delete-part">{`${deleteSusDetails.susData.name} 
          on ${deleteSusDetails.onBike.brand_name} ${deleteSusDetails.onBike.model_name}`}</h3>
        )}
        <div className="delete-section-buttons">
          <button
            onClick={() => {
              setSelectedSuspension(null);
              navigate("/dashboard");
            }}
          >
            Back
          </button>
          <button onClick={() => handleDelete()}>Delete</button>
        </div>
      </div>
      <div className="delete-spacer"></div>
    </section>
  );
}

DeleteSus.propTypes = { 
  setUserSuspension: PropTypes.func,
  userSuspension: PropTypes.array,
  setSelectedSuspension: PropTypes.func,
  selectedSuspension: PropTypes.string,
}
