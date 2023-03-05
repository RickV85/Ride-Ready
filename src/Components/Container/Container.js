import React, { useEffect, useState } from "react";
import "./Container.css";
import PropTypes from "prop-types";
import Tile from "../Tile/Tile";

export default function Container({ userSuspension, setSelectedSuspension }) {
  const [susTiles, setSusTiles] = useState([]);
  const noSusMessage = (
    <p className="add-new-mesg">
      No suspension to view. Add a new suspension part by clicking the button
      below.
    </p>
  );

  useEffect(() => {
    if (userSuspension) {
      const suspensionTiles = userSuspension.map((sus) => {
        return (
          <Tile
            susDetails={sus}
            setSelectedSuspension={setSelectedSuspension}
            id={`${sus.onBike.id}+${sus.susData.id}`}
            key={`${sus.onBike.id}+${sus.susData.id}`}
          />
        );
      });
      setSusTiles(suspensionTiles);
    }
    // eslint-disable-next-line
  }, [userSuspension]);

  return (
    <section className="container">
      {(userSuspension === null || userSuspension.length === 0) && noSusMessage}
      {susTiles}
    </section>
  );
}

Container.propTypes = {
  userSuspension: PropTypes.array,
  setSelectedSuspension: PropTypes.func
};
