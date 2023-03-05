import React, { useState, useEffect } from "react";
import "./DeleteSus.css";
import { useNavigate } from "react-router-dom";
import { findSusIndexByID } from "../../util";

export default function DeleteSus({
  addUserSuspension,
  userSuspension,
  setSelectedSuspension,
  selectedSuspension,
}) {
  const [deleteSusIndex, setDeleteSusIndex] = useState(null);
  const [deleteSusDetails, setDeleteSusDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const index = findSusIndexByID(selectedSuspension, userSuspension);
    setDeleteSusDetails(userSuspension[index]);
    setDeleteSusIndex(index);
    // eslint-disable-next-line
  }, [selectedSuspension, userSuspension]);

  const handleDelete = () => {
    let newUserSusArr = userSuspension;
    newUserSusArr.splice(deleteSusIndex, 1);
    addUserSuspension(newUserSusArr);
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
          <button onClick={() => handleDelete()}>Delete</button>
          <button
            onClick={() => {
              setSelectedSuspension(null);
              navigate("/dashboard");
            }}
          >
            Back
          </button>
        </div>
      </div>
      <div className="delete-spacer"></div>
    </section>
  );
}
