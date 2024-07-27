import {getRequest} from './apiRequest';

export const getVehicles = async () => {
  const header = {
    'Content-Type': 'application/json',
  };

  return await getRequest('vehicle/list', header);
};

export const addVehicle = async (vehicleNumber, rcNumber, validUpto) => {
  let request = {
    vehicle_number: vehicleNumber,
    rc_number: rcNumber,
    validupto: validUpto,
  };
  return await postRequest('vehicle/store', request);
};
