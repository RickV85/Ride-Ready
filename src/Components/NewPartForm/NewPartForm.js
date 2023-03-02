import React, { useEffect, useState } from "react";
import './NewPartForm.css'

export default function NewPartForm({ bikes }) {
  const [bikeOptions, setBikeOptions] = useState(bikes);
  const [bikeDropdownOptions, setBikeDropdownOptions] = useState([])

  useEffect(() => {
    if (!bikeOptions) return;
    const bikeSelects = bikeOptions.map((bike) => {
      return (
        <option key={bike.id} value={bike.id}>{bike.brand_name} {bike.model_name}</option>
      )
    })
    setBikeDropdownOptions(bikeSelects)
  }, [bikeOptions])

  return (
    <section className="new-part-form-section">
      <h1 className="site-logo">Ride Ready</h1>
      <form className="new-part-form">
        <label htmlFor="bikeSelect">Which bike is this part on?</label>
        <select name="bikeSelect" className="bike-select" > 
          {bikeDropdownOptions}
          <option value='unlistedBikeID'>Unlisted bike</option>
        </select>
        <label htmlFor="suspensionSelect">Select suspension make and fork/shock</label>
        <select name="suspensionSelect">
          {/* Add all suspension types from table here */}
          <option value='unlistedSuspension'>Unlisted suspension</option>
        </select>
        <label htmlFor="suspension-select">Select suspension make and fork/shock</label>
        <input name="lastRebuild" type={'date'} max={new Date().toLocaleDateString('fr-ca')} />
      </form>
    </section>
  )
}