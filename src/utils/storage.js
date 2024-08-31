import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};
export const setToken = async token => {
  try {
    await AsyncStorage.setItem('transportbill.token', token);
  } catch (error) {
    console.log(error);
  }
};

export const getToken = async () => {
  try {
    let value = await AsyncStorage.getItem('transportbill.token');
    return value;
  } catch (error) {
    console.log(error);
  }
  return '';
};

export const setUserId = async token => {
  try {
    await AsyncStorage.setItem('transportbill.userid', token);
  } catch (error) {
    console.log(error);
  }
};

export const getUserId = async () => {
  try {
    let value = await AsyncStorage.getItem('transportbill.userid');
    return value;
  } catch (error) {
    console.log(error);
  }
  return '';
};

export const setUserType = async value => {
  try {
    await AsyncStorage.setItem('transportbill.user.type', value);
  } catch (error) {
    console.log(error);
  }
};

export const getUserType = async () => {
  try {
    let value = await AsyncStorage.getItem('transportbill.user.type');
    return value;
  } catch (error) {
    console.log(error);
  }
  return '';
};

export const setVehicle = async value => {
  try {
    await AsyncStorage.setItem('transportbill.vehicle.id', value);
  } catch (error) {
    console.log(error);
  }
};

export const getVehicles = async () => {
  try {
    let value = await AsyncStorage.getItem('transportbill.vehicle.id');
    return value;
  } catch (error) {
    console.log(error);
  }
  return '';
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
