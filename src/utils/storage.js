import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async token => {
  try {
    await AsyncStorage.setItem('animalkingdom.token', token);
  } catch (error) {
    console.log(error);
  }
};

export const getToken = async () => {
  try {
    let value = await AsyncStorage.getItem('animalkingdom.token');
    return value;
  } catch (error) {
    console.log(error);
  }
  return '';
};
