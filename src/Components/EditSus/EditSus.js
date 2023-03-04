import React, { useEffect, useState } from "react";
import './EditSus.css'
import { useNavigate } from "react-router-dom";
import { findSusIndexByID } from "../../util";
import moment from 'moment';

export default function EditSus({ addUserSuspension, userSuspension, setSelectedSuspension, selectedSuspension }) {
  const [newRebuildDate, setNewRebuildDate] = useState('');
  const [editSusIndex, setEditSusIndex] = useState(null);
  const [editSusDetails, setEditSusDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const index = findSusIndexByID(selectedSuspension, userSuspension);
    setEditSusDetails(userSuspension[index])
    setEditSusIndex(index);
    // eslint-disable-next-line
  }, [selectedSuspension, userSuspension])

  const handleSubmit = () => {
    const modifiedSus = editSusDetails;
    modifiedSus.rebuildDate = newRebuildDate;
    let newUserSusArr = userSuspension;
    newUserSusArr.splice(editSusIndex, 1, modifiedSus);
    addUserSuspension(newUserSusArr);
    setSelectedSuspension(null);
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
          <input type="date" value={newRebuildDate} onChange={(event) => setNewRebuildDate(event.target.value)}/>
        </form>
        <div className="edit-section-buttons">
          <button onClick={() => handleSubmit()}>Submit</button>
          <button onClick={() => navigate('/dashboard')}>Back</button>
        </div>
      </div>
      <div className="edit-spacer"></div>
    </section>
  )
}