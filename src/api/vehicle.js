import {getRequest, postRequest} from './apiRequest';

export const getVehicles = async () => {
  const header = {
    'Content-Type': 'application/json',
  };

  return await getRequest('vehicle/list', header);
};

export const addVehicle = async (vehicleNumber, rcNumber, validUpto, transport, vehicleType, weight) => {
  let request = {
    vehicle_number: vehicleNumber,
    rc_number: rcNumber,
    validupto: validUpto,
    vehicle_weight: weight,
    vehicle_type_id: vehicleType,
    transport_id: transport,
  };
  return await postRequest('vehicle/store', request);
};

export const getTransports = async () => {
  const header = {
    'Content-Type': 'application/json',
  };

  return await getRequest('transport/list', header);
};

export const getVehicleTypes = async () => {
  const header = {
    'Content-Type': 'application/json',
  };

  return await getRequest('vehicletype/list', header);
};
