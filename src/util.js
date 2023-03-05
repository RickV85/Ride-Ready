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

export const cleanRideData = (rides) => {
  const cleanedRides = rides.map((ride) => {
    return {
      'id': ride.id,
      'ride_duration': ride.moving_time,
      'ride_distance': ride.distance,
      'ride_date': ride.start_date,
      'gear_id': ride.gear_id
    }
  })
  return cleanedRides;
}

export const getGearIDNumbers = (userRides) => {
  let gearNumbers = userRides.reduce((arr, ride) => {
    let gearID = ride.gear_id;
    if (arr.includes(gearID)) {
      return arr;
    } else if (gearID === null) {
      return arr;
    } else {
      arr.push(gearID)
      return arr;
    }
  }, [])
  return gearNumbers;
}

export const calculateRebuildLife = (newSus, rebuildDate, userRides, onBike, bikeOptions) => {
  const suspension = suspensionData.find(sus => sus.id === +(newSus));
  let susBike;
  let ridesOnBike;
  let rideTimeSinceLastRebuild;
  if (onBike.startsWith('b') && bikeOptions) {
    susBike = bikeOptions.find(bike => bike.id === onBike);
    ridesOnBike = userRides.filter(ride => ride.gear_id === susBike.id);
  }
  if (ridesOnBike) {
    rideTimeSinceLastRebuild = ridesOnBike.reduce((total, ride) => {
      if (moment(ride.ride_date).isAfter(rebuildDate)) {
        total += ride.ride_duration;
      }
      return total;
    }, 0)
  } else {
    rideTimeSinceLastRebuild = userRides.reduce((total, ride) => {
      if (moment(ride.ride_date).isAfter(rebuildDate)) {
        total += ride.ride_duration;
      }
      return total;
    }, 0)
  }
  const hoursSinceLastRebuild = rideTimeSinceLastRebuild / 3600;
  const percentRebuildLifeRemaining = 1 - (hoursSinceLastRebuild / suspension.rebuildInt);
  return percentRebuildLifeRemaining;
}

export const isOldestRideBeforeRebuild = (rides, rebuildDate) => {
  if (!rides) return;
  let today = moment().format()
  const oldestRideDate = rides.reduce((oldest, ride) => {
    if (moment(ride.ride_date).isBefore(oldest)) {
      oldest = ride.ride_date;
    }
    return oldest;
  }, today)
  const lastRideBeforeRebuild = moment(oldestRideDate).isBefore(rebuildDate);
  return lastRideBeforeRebuild;
}

export const findSusIndexByID = (id, susOptions) => {
  const splitIDArr = id.split('+');
  const bikeID = splitIDArr[0];
  const susID = +(splitIDArr[1]);
  const foundSusIndex = susOptions.findIndex((sus) => {
    return sus.onBike.id === bikeID && sus.susData.id === susID
})
  return foundSusIndex;
}