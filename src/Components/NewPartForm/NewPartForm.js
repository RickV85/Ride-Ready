import React, { useEffect, useState } from "react";

export default function NewPartForm({ bikes }) {
  const [bikeOptions, setBikeOptions] = useState(bikes);

  useEffect(() => {
    const bikeDropdownOptions = bikeOptions.map((bike) => {
      
    })
  }, [bikeOptions])

  return (
    <section className="new-part-form-section">
      <form>
        <select name="bike-select" className="bike-select"> 
          <option></option>
        </select>

      </form>
    </section>
  )
}