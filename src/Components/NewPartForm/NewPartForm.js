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
      <form>
        <select name="bike-select" className="bike-select" > 
          <option value='' disabled selected hidden>Which bike is this part on?</option>
          {bikeDropdownOptions}
          <option value='unlistedBikeID'>Unlisted bike</option>
        </select>
      </form>
    </section>
  )
}