import React, { useEffect, useState } from "react";
import { suspensionData } from "../../SuspensionData";
import './NewPartForm.css';
import PropTypes from 'prop-types';
import { calculateRebuildLife } from "../../util";

export default function NewPartForm({ userBikes, userRides, addUserSuspension }) {
  // eslint-disable-next-line
  const [bikeOptions, setBikeOptions] = useState(userBikes);
  const [bikeDropdownOptions, setBikeDropdownOptions] = useState([]);
  const [selectedBike, setSelectedBike] = useState('');
  const [selectedSus, setSelectedSus] = useState('');
  const [selectedRebuildDate, setSelectedRebuildDate] = useState('');

  useEffect(() => {
    if (bikeOptions) {
      const bikeSelects = bikeOptions.map((bike) => {
        return (
          <option key={bike.id} value={bike.id}>{bike.brand_name} {bike.model_name}</option>
        )
      })
      setBikeDropdownOptions([...bikeSelects, <option key={0} value={0} >Unlisted bike</option>])
    } else {
      setBikeDropdownOptions([<option key={0} value={0} >Unlisted bike</option>])
    }
  }, [bikeOptions])

  const suspensionOptions = suspensionData.map((sus) => {
    return (
      <option key={sus.id} value={sus.id}>{sus.name}</option>
    )
  })

  const handleSubmit = () => {
    // Run calculation on service from calculateRebuildLife()
    // Store value in app state with addUserSuspension
    // navigate to dashboard, make an object to pass {above calc result state, suspension selected, bike selected, rebuild date}
    // create new tile / suspension detail in dashboard - will need a new state there for both
    console.log(calculateRebuildLife(selectedSus, selectedRebuildDate, userRides, selectedBike, userBikes))

  }

  return (
    <section className="new-part-form-section">
      <h1 className="site-logo">Ride Ready</h1>
      <form className="new-part-form">
        <label htmlFor="bikeSelect">Which bike is this part on?</label>
        <select name="bikeSelect" className="bike-select" value={selectedBike} onChange={(event) => setSelectedBike(event.target.value)}> 
          <option key={'0'} value={''} disabled>Choose a bike</option>
          {bikeDropdownOptions}
        </select>
        <label htmlFor="suspensionSelect">What is the make and type?</label>
        <select name="suspensionSelect" value={selectedSus} onChange={(event) => setSelectedSus(event.target.value)}>
          <option key={'0'} value={''} disabled>Choose your suspension</option>
          {suspensionOptions}
        </select>
        <label htmlFor="suspension-select">When was it last rebuilt?</label>
        <input name="lastRebuild" type={'date'} max={new Date().toLocaleDateString('fr-ca')} 
          value={selectedRebuildDate} onChange={(event) => setSelectedRebuildDate(event.target.value)}
        />
      </form>
      <button onClick={() => handleSubmit()}>Submit</button>
    </section>
  )
}

NewPartForm.propTypes = {
  userBikes: PropTypes.array,
  userRides: PropTypes.array
}