import {postRequest} from './apiRequest';

export const getTollList = async (vehicle_id, date) => {
  let request = {
    vehicle_id: vehicle_id,
    date: date,
  };
  return await postRequest('toll/list', request);
};
