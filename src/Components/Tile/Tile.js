import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Tile.css";
import moment from "moment";
import { NavLink } from "react-router-dom";

export default function Tile({ susDetails, setSelectedSuspension, id }) {
  const [rebuildLifeMessage, setRebuildLifeMessage] = useState("");
  const [rebuildLifeBad, setRebuildLifeBad] = useState("");

  const rebuildLifePercentage = (susDetails.rebuildLife * 100).toFixed(0);

  const bikeDisplayMessage = () => {
    if (susDetails.onBike.brand_name && susDetails.onBike.model_name) {
      return `on your ${susDetails.onBike.brand_name} ${susDetails.onBike.model_name}`;
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (rebuildLifePercentage > 25) {
      setRebuildLifeMessage(`It's Ride Ready!`);
    } else if (rebuildLifePercentage <= 25 && rebuildLifePercentage >= 0) {
      setRebuildLifeMessage(`Get ready to rebuild soon!`);
    } else if (rebuildLifePercentage < 0 && rebuildLifePercentage > -25) {
      setRebuildLifeBad(true);
      setRebuildLifeMessage(`Overdue for rebuild!`);
    } else if (rebuildLifePercentage <= -25) {
      setRebuildLifeBad(true);
      setRebuildLifeMessage(
        `Way overdue for rebuild! Performance greatly decreased!`
      );
    }
  }, [rebuildLifeMessage, rebuildLifePercentage]);

  return (
    <article className="tile">
      <h2>{susDetails.susData.name}</h2>
      <h3>{bikeDisplayMessage()}</h3>
      <h3>{`${rebuildLifePercentage}% service life remaining`}</h3>
      <h3
        id="rebuildMsg"
        className={`${rebuildLifeBad ? "rebuild-bad" : "rebuild-good"}`}
      >
        {rebuildLifeMessage}
      </h3>
      <p>{`Last serviced: ${moment(susDetails.rebuildDate).format("ll")}`}</p>
      <a href={susDetails.susData.serviceLink}>
        <p>Link to service resource</p>
      </a>
      <div className="tile-button-section">
      <NavLink to={"/dashboard/delete"}>
          <button
            onClick={() => {
              setSelectedSuspension(id);
              window.localStorage.setItem(
                "selectedSuspension",
                JSON.stringify(id)
              );
            }}
          >
            Delete suspension
          </button>
        </NavLink>
        <NavLink to={"/dashboard/edit"}>
          <button
            onClick={() => {
              setSelectedSuspension(id);
              window.localStorage.setItem(
                "selectedSuspension",
                JSON.stringify(id)
              );
            }}
          >
            Update service date
          </button>
        </NavLink>
      </div>
    </article>
  );
}

Tile.propTypes = {
  susDetails: PropTypes.object,
  setSelectedSuspension: PropTypes.func,
  id: PropTypes.string,
};
