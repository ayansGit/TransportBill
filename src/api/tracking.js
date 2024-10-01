import moment from 'moment';
import {
  getAnyRequest,
  getRequest,
  postAnyRequest,
  postRequest,
} from './apiRequest';
import {GOOGLE_API_KEY} from '../constants';

export const postTracking = async (
  status,
  driver_id,
  vehicle_id,
  lat,
  long,
  speed,
  time,
  total_time,
  from_time,
  to_time,
  location_name,
  from_location,
  toll_tax,
  toll_address,
  trip_id,
) => {
  let request = {
    status: status,
    driver_id: driver_id,
    vehicle_id: vehicle_id,
    lat: lat,
    lng: long,
    speed: speed,
    time: time,
    date_time: time,
    total_time: total_time,
    location_name: location_name,
    from_location_name: from_location,
    to_location_name: location_name,
    from_time: from_time,
    to_time: to_time,
    trip_id: trip_id,
    toll: toll_tax
      ? {
          address: toll_address,
          tax: toll_tax,
        }
      : null,
  };
  return await postAnyRequest(
    'https://transportbill.pdttech.in/api/driver/report/store',
    request,
  );
};

export const updateTracking = async (
  from_time,
  to_time,
  total_time,
  report_id,
) => {
  let request = {
    from_time: from_time,
    to_time: to_time,
    total_time: total_time,
    report_id: report_id,
  };
  return await postAnyRequest(
    'https://transportbill.pdttech.in/api/driver/report/update',
    request,
  );
};

export const getCurrentAddress = async (lat, lng) => {
  try {
    const currentLocation = await getAnyRequest(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`,
    );
    console.log('CurrentLocation', currentLocation);

    if (currentLocation.results.length > 0) {
      return {
        status: 200,
        data: {
          currentAddress: currentLocation.results[0].formatted_address,
        },
      };
    } else if (currentLocation.status === 'OK') {
      throw {status: 400, message: 'No result found'};
    } else {
      throw {status: 400, message: currentLocation?.error_message};
    }
  } catch (error) {
    // throw error;
    console.log(error);
  }
};
