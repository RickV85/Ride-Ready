import React, { useEffect, useState } from "react";
import './EditSus.css'
import { useNavigate } from "react-router-dom";
import { findSusIndexByID } from "../../util";
import moment from 'moment';
import { calculateRebuildLife, isOldestRideBeforeRebuild, filterRideActivities, cleanRideData } from "../../util";
import { getUserActivities } from '../../APICalls';


export default function EditSus({ addUserSuspension, userSuspension, setSelectedSuspension, selectedSuspension, userAccessToken, userRides, addUserRides, pagesFetched, setPagesFetched, userBikes }) {
  const [newRebuildDate, setNewRebuildDate] = useState('');
  const [editSusIndex, setEditSusIndex] = useState(null);
  const [editSusDetails, setEditSusDetails] = useState(null);
  const [fetchPageNumber, setFetchPageNumber] = useState(pagesFetched);
  const [fetchCount, setFetchCount] = useState(pagesFetched);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [submitError, setSubmitError] =useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const index = findSusIndexByID(selectedSuspension, userSuspension);
    setEditSusDetails(userSuspension[index])
    setEditSusIndex(index);
    // eslint-disable-next-line
  }, [selectedSuspension, userSuspension])

  useEffect(() => {
    let moreRidesNeeded;
    if(newRebuildDate) {
      moreRidesNeeded = isOldestRideBeforeRebuild(userRides, newRebuildDate);
    }
    if (moreRidesNeeded === false) {
      if (fetchCount !== fetchPageNumber) return;
      if (fetchCount > 20) return;
      setSubmitDisabled(true);
      setFetchPageNumber(fetchPageNumber + 1)
      getUserActivities(fetchPageNumber, userAccessToken)
      .then((activities) => {
        const rideActivities = filterRideActivities(activities);
        const cleanedRides = cleanRideData(rideActivities);
        if (cleanedRides) {
          addUserRides([...userRides, ...cleanedRides])
        }
        setFetchCount(fetchCount + 1);
        setSubmitDisabled(false);
      })
    }
  // eslint-disable-next-line 
  }, [newRebuildDate, userRides])

  const handleSubmit = () => {
    if (!newRebuildDate) {
      setSubmitError(true)
      setTimeout(() => setSubmitError(false), 3000)
      return;
    }

    const modifiedSus = editSusDetails;
    modifiedSus.rebuildDate = newRebuildDate;
    modifiedSus.rebuildLife = calculateRebuildLife(modifiedSus.susData.id, newRebuildDate, userRides, modifiedSus.onBike.id, userBikes);
    let newUserSusArr = userSuspension;
    newUserSusArr.splice(editSusIndex, 1, modifiedSus);
    addUserSuspension(newUserSusArr);

    setSelectedSuspension(null);
    setPagesFetched(fetchCount);
    navigate('/dashboard');
  }

  return (
    <section className="edit-part-form-section">
      <h1 className="site-logo">Ride Ready</h1>
      <div className="edit-sus-details" >
        {editSusDetails && <h2>{`Change rebuild date of the ${editSusDetails.susData.name}
          on your ${editSusDetails.onBike.brand_name} ${editSusDetails.onBike.model_name}`}</h2>
        }
        {editSusDetails && <h2>{`Currently: ${moment(editSusDetails.rebuildDate).format('ll')}`}</h2>}
        <form>
          <input type="date" value={newRebuildDate} max={new Date().toLocaleDateString('fr-ca')} onChange={(event) => setNewRebuildDate(event.target.value)}/>
        </form>
        <div className="edit-section-buttons">
          <button onClick={() => handleSubmit()} disabled={submitDisabled}>Submit</button>
          <button onClick={() => {
            setSelectedSuspension(null);
            navigate('/dashboard');
          }}>Back</button>
        </div>
        {submitError && <p className="error-wait-message">Please fill out all forms before submitting</p>}
        {fetchCount !== fetchPageNumber && 
        <p className="error-wait-message">
        Please wait for data to load.<br/>
        This could take up to 15 seconds</p>
      }
      </div>
      <div className="edit-spacer"></div>
    </section>
  )
}