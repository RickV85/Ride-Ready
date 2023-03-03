import React from "react";
import PropTypes from 'prop-types';
import './Tile.css'
import moment from 'moment';


export default function Tile({ susDetails }) {

  const rebuildLifeMessage = (susDetails.rebuildLife * 100).toFixed(2);
  const bikeDisplayMessage = () => {
    if (susDetails.onBike.brand_name && susDetails.onBike.brand_name) {
      return `On your ${susDetails.onBike.brand_name} ${susDetails.onBike.brand_name}`;
    } else {
      return;
    }
  }

  return(
    <article className="tile">
      <h2>{susDetails.susData.name}</h2>
      <h3>{bikeDisplayMessage()}</h3>
      <h3>{`${rebuildLifeMessage}% service life remaining`}</h3>
      <p>{`Last serviced: ${moment(susDetails.rebuildDate).format('ll')}`}</p>
      <div className="tile-button-section">
        <button>Update service date</button>
        <button>Delete suspension</button>
      </div>
    </article>
  )
}

Tile.propTypes = {
  susDetails: PropTypes.object
}