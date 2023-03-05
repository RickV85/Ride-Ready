import React from "react";
import PropTypes from "prop-types";
import "./Tile.css";
import moment from "moment";
import { NavLink } from "react-router-dom";

export default function Tile({ susDetails, setSelectedSuspension, id }) {
  const rebuildLifeMessage = (susDetails.rebuildLife * 100).toFixed(0);
  const bikeDisplayMessage = () => {
    if (susDetails.onBike.brand_name && susDetails.onBike.model_name) {
      return `on your ${susDetails.onBike.brand_name} ${susDetails.onBike.model_name}`;
    } else {
      return "";
    }
  };

  return (
    <article className="tile">
      <h2>{susDetails.susData.name}</h2>
      <h3>{bikeDisplayMessage()}</h3>
      <h3>{`${rebuildLifeMessage}% service life remaining`}</h3>
      <p>{`Last serviced: ${moment(susDetails.rebuildDate).format("ll")}`}</p>
      <a href={susDetails.susData.serviceLink}>
        <p>Link to service resource</p>
      </a>
      <div className="tile-button-section">
        <NavLink to={"/dashboard/edit"}>
          <button onClick={() => {
            setSelectedSuspension(id)
            window.localStorage.setItem('selectedSuspension', JSON.stringify(id))
          }}>
            Update service date
          </button>
        </NavLink>
        <NavLink to={"/dashboard/delete"}>
          <button onClick={() => {
            setSelectedSuspension(id)
            window.localStorage.setItem('selectedSuspension', JSON.stringify(id))
          }}>
            Delete suspension
          </button>
        </NavLink>
      </div>
    </article>
  );
}

Tile.propTypes = {
  susDetails: PropTypes.object,
};
