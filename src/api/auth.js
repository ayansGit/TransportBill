import {postAnyRequest, postRequest} from './apiRequest';

export const login = async (email, password, type) => {
  let request = {
    email: email,
    password: password,
  };
  return await postAnyRequest(
    'https://transportbill.pdttech.in/api/user/login',
    request,
  );
};
