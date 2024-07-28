import {BASE_URL} from '../constants';
import axios from 'axios';
import React from 'react';
import NetInfo from '@react-native-community/netinfo';

export const getRequest = async (
  endpoint,
  header = {'Content-Type': 'application/json'},
) => {
  console.log('header', header);
  console.log('url', `${BASE_URL.ADMIN}/${endpoint}`);

  let connection = await NetInfo.fetch();
  if (connection.isConnected) {
    try {
      let response = await axios.get(`${BASE_URL.ADMIN}/${endpoint}`, {
        headers: header,
      });
      let responseData = await response.data;
      console.log('RESPONSE', JSON.stringify(responseData));
      return responseData;
    } catch (error) {
      console.log('ERROR', error);
      if (error.response.status != 500)
        throw {
          status: error.response.status,
          message: `${error.response.message}`,
        };
      else throw {status: 500, message: `Something went wrong`};
    }
  } else {
    throw {status: 500, message: `No internet connection`};
  }
};

export const postRequest = async (
  endpoint,
  param,
  header = {'Content-Type': 'application/json'},
) => {
  return new Promise(async (resolve, reject) => {
    console.log('url', `${BASE_URL.ADMIN}/${endpoint}`);
    console.log('Param', param);
    console.log('header', JSON.stringify(header));
    let connection = await NetInfo.fetch();
    if (connection.isConnected) {
      try {
        let response = await axios.post(
          `${BASE_URL.ADMIN}/${endpoint}`,
          param,
          {
            headers: header,
          },
        );
        let responseData = await response.data;
        console.log('RESPONSE', responseData);
        resolve(responseData);
      } catch (error) {
        console.log('ERROR', error);
        if (error?.response?.status == 401)
          reject({status: 401, message: `${error.response.message}`});
        else reject({status: 500, message: `Something went wrong`});
      }
    } else {
      reject({status: 500, message: `No internet connection`});
    }
  });
};

export const getAnyRequest = async (
  url,
  header = {'Content-Type': 'application/json'},
) => {
  console.log('header', header);
  console.log('any_url', `${url}`);

  let connection = await NetInfo.fetch();
  if (connection.isConnected) {
    try {
      let response = await axios.get(url, {headers: header});
      let responseData = await response.data;
      console.log('RESPONSE', responseData);
      return responseData;
    } catch (error) {
      console.log('ERROR', error);
      if (error.response.status == 401)
        throw {status: 401, message: `${error.response.message}`};
      else throw {status: 500, message: `${error}`};
    }
  } else {
    throw {status: 500, message: `No internet connection`};
  }
};

export const postAnyRequest = async (
  url,
  param,
  header = {'Content-Type': 'application/json'},
) => {
  return new Promise(async (resolve, reject) => {
    console.log('url', `${url}`);
    console.log('Param', param);
    console.log('header', JSON.stringify(header));
    let connection = await NetInfo.fetch();
    if (connection.isConnected) {
      try {
        let response = await axios.post(url, param, {
          headers: header,
        });
        let responseData = await response.data;
        console.log('RESPONSE', responseData);
        resolve(responseData);
      } catch (error) {
        console.log('ERROR', error);
        if (error?.response?.status == 401)
          reject({status: 401, message: `${error.response.message}`});
        else reject({status: 500, message: `Something went wrong`});
      }
    } else {
      reject({status: 500, message: `No internet connection`});
    }
  });
};
