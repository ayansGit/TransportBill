import {Alert, ToastAndroid, Platform} from 'react-native';

export const showAlert = (title='', message) => {
  if (Platform.OS === 'android') ToastAndroid.show(message, ToastAndroid.LONG);
  else {
    Alert.alert(title, message);
  }
};
