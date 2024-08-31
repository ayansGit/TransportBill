import {postAnyRequest, postRequest} from './apiRequest';

export const getReportList = async (vehicle_id, time) => {
  let request = {
    vehicle_id: vehicle_id,
    time: time,
  };
  return await postRequest('report/list', request);
};

export const getConfiguredReportList = async (
  vehicle_id,
  copy_vehicle_id,
  date,
  time,
) => {
  let request = {
    vehicle_id: vehicle_id,
    copy_vehicle_id: copy_vehicle_id,
    date: date,
    time: time,
  };
  return await postAnyRequest(
    'https://transportbill.pdttech.in/api/driver/admin/report/store',
    request,
  );
};
