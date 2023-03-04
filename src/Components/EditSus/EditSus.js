import React, { useState } from "react";

export default function EditSus({ addUserSuspension, userSuspension, selectedSuspension }) {
  const [newRebuildDate, setNewRebuildDate] = useState(null);

  const handleSubmit = () => {

  }

  return (
    <section className="edit-part-form-section">
      <h1 className="site-logo">Ride Ready</h1>
      <form>
        <input type="date" value={newRebuildDate} onChange={(event) => setNewRebuildDate(event.target.value)}/>
      </form>
      <button onClick={() => handleSubmit()}>Submit</button>
    </section>
  )
}