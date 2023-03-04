import React from "react";
import PropTypes from 'prop-types';
import './Tile.css'
import moment from 'moment';
import { NavLink } from "react-router-dom";


export default function Tile({ susDetails, setSelectedSuspension }) {

  const rebuildLifeMessage = (susDetails.rebuildLife * 100).toFixed(2);
  const bikeDisplayMessage = () => {
    console.log('susDetails.onBike', susDetails.onBike)
    console.log('susDetails', susDetails)
    if (susDetails.onBike.brand_name && susDetails.onBike.model_name) {
      return `On your ${susDetails.onBike.brand_name} ${susDetails.onBike.model_name}`;
    } else {
      return '';
    }
  }

  return(
    <article className="tile">
      <h2>{susDetails.susData.name}</h2>
      <h3>{bikeDisplayMessage()}</h3>
      <h3>{`${rebuildLifeMessage}% service life remaining`}</h3>
      <p>{`Last serviced: ${moment(susDetails.rebuildDate).format('ll')}`}</p>
      <div className="tile-button-section">
        <NavLink to={'/dashboard/edit'} >
          <button onClick={() => setSelectedSuspension(susDetails)} >Update service date</button>
        </NavLink>
        <NavLink to={'/dashboard/delete'} >
          <button onClick={() => setSelectedSuspension(susDetails)} >Delete suspension</button>
        </NavLink>
      </div>
    </article>
  )
}

Tile.propTypes = {
  susDetails: PropTypes.object
}