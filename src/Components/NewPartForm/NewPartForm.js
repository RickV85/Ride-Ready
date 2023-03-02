import React, { useEffect, useState } from "react";
import { suspensionData } from "../../SuspensionData";
import './NewPartForm.css'

export default function NewPartForm({ bikes }) {
  const [bikeOptions, setBikeOptions] = useState(bikes);
  const [bikeDropdownOptions, setBikeDropdownOptions] = useState([])

  // NEED TO ADD STATES TO CONTROL FORM INPUTS

  useEffect(() => {
    if (!bikeOptions) return;
    const bikeSelects = bikeOptions.map((bike) => {
      return (
        <option key={bike.id} value={bike.id}>{bike.brand_name} {bike.model_name}</option>
      )
    })
    setBikeDropdownOptions([...bikeSelects, <option key={0} value='unlistedBikeID'>Unlisted bike</option>])
  }, [bikeOptions])

  const suspensionOptions = suspensionData.map((sus) => {
    return (
      <option key={sus.id} value={sus.id}>{sus.name}</option>
    )
  })

  return (
    <section className="new-part-form-section">
      <h1 className="site-logo">Ride Ready</h1>
      <form className="new-part-form">
        <label htmlFor="bikeSelect">Which bike is this part on?</label>
        <select name="bikeSelect" className="bike-select" > 
          {bikeDropdownOptions}
        </select>
        <label htmlFor="suspensionSelect">Select suspension make and fork/shock</label>
        <select name="suspensionSelect">
          {suspensionOptions}
        </select>
        <label htmlFor="suspension-select">Select suspension make and fork/shock</label>
        <input name="lastRebuild" type={'date'} max={new Date().toLocaleDateString('fr-ca')} />
      </form>
    </section>
  )
}