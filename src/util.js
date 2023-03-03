import moment from 'moment';
import { suspensionData } from './SuspensionData';

export const testForDeniedPermission = (url) => {
  if (url.split("&")[1] === 'error=access_denied') {
    return true;
  }
}; 

export const stripURLForToken = (url) => {
  if(!url) return;
  return url.split("&")[1].slice(5);
};

export const filterRideActivities = (activities) => {
  const rideActivities = activities.filter((act) => act.type === 'Ride')
  return rideActivities;
}

export const getGearIDNumbers = (userRides) => {
  const gearNumbers = userRides.reduce((arr, ride) => {
    let gearID = ride.gear_id;
    if (arr.includes(gearID)) {
      return arr;
    } else {
      arr.push(gearID)
      return arr;
    }
  }, [])
  return gearNumbers;
}

export const calculateRebuildLife = (newSus, date, rides, onBike, bikeOptions) => {
  const suspension = suspensionData.find(sus => sus.id === newSus.id);
  // const today = Date.now() with moment conversion?
  const susBike = bikeOptions.find(bike => bike.id === onBike.id);
  const ridesOnBike = rides.filter(ride => ride.gear_id === onBike.id);
  
}