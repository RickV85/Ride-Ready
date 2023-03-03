import React, { useEffect, useState } from "react";
import './Container.css';
import PropTypes from 'prop-types';
import Tile from "../Tile/Tile";

export default function Container({ userSuspension }) {
  const [susTiles, setSusTiles] = useState([]);
  const noSusMessage = <p className="add-new-mesg">No suspension to view. Add a new suspension part by clicking the button below.</p>;

  useEffect(() => {
    if (userSuspension) {
      const suspensionTiles = userSuspension.map((sus) => {
        return <Tile susDetails={sus} key={`${sus.susData.name}+${sus.rebuildLife}`} />
      })
      setSusTiles(suspensionTiles);
    }
  }, [userSuspension])


  return (
    <section className="container">
      {!userSuspension && noSusMessage}
      {susTiles}
    </section>
  )
}

Container.propTypes = {
  userSuspension: PropTypes.array
}