import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDateTimeForSeconds} from '../screens/tracking/utils';

export const TRACKING_STATUS = {
  START: 'start',
  RUNNING: 'running',
  TOLL: 'toll',
  STOPAGE: 'stopage',
  END: 'end',
};

export const setTrackingTime = async value => {
  try {
    await AsyncStorage.setItem('transportbill.tracking.time', value);
  } catch (error) {
    console.log(error);
  }
};

export const getTrackingTime = async () => {
  try {
    let value = await AsyncStorage.getItem('transportbill.tracking.time');
    return value;
  } catch (error) {
    console.log(error);
  }
  return '';
};

export const setFromTime = async value => {
  try {
    await AsyncStorage.setItem('transportbill.from.time', value);
  } catch (error) {
    console.log(error);
  }
};

export const getFromTime = async () => {
  try {
    let value = await AsyncStorage.getItem('transportbill.from.time');
    return value ? value : getDateTimeForSeconds(0);
  } catch (error) {
    console.log(error);
  }
  return getDateTimeForSeconds(0);
};

export const setToTime = async value => {
  try {
    await AsyncStorage.setItem('transportbill.to.time', value);
  } catch (error) {
    console.log(error);
  }
};

export const getToTime = async () => {
  try {
    let value = await AsyncStorage.getItem('transportbill.to.time');
    return value ? value : getDateTimeForSeconds(0);
  } catch (error) {
    console.log(error);
  }
  return getDateTimeForSeconds(0);
};

export const setTrackingStatus = async value => {
  try {
    await AsyncStorage.setItem('transportbill.tracking.status', value);
  } catch (error) {
    console.log(error);
  }
};

export const getTrackingStatus = async () => {
  try {
    let value = await AsyncStorage.getItem('transportbill.tracking.status');
    return value;
  } catch (error) {
    console.log(error);
  }
  return '';
};

export const setFromLocation = async value => {
  try {
    await AsyncStorage.setItem('transportbill.from.location', value);
  } catch (error) {
    console.log(error);
  }
};

export const getFromLocation = async () => {
  try {
    let value = await AsyncStorage.getItem('transportbill.from.location');
    return value;
  } catch (error) {
    console.log(error);
  }
  return '';
};

export const setReportId = async value => {
  try {
    await AsyncStorage.setItem('transportbill.report.id', value);
  } catch (error) {
    console.log(error);
  }
};

export const getReportId = async () => {
  try {
    let value = await AsyncStorage.getItem('transportbill.report.id');
    return value;
  } catch (error) {
    console.log(error);
  }
  return '';
};
