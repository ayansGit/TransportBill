import firebase from '@react-native-firebase/app';
import {Platform} from 'react-native';

// Your secondary Firebase project credentials for Android...
const androidCredentials = {
  clientId: '',
  appId: '1:929245989132:android:379b270b2d78ab0788a129',
  apiKey: 'yKHh1ZnI9Bav0GVQKiEIPzm7PdMCVNCVn19oVPVN',
  databaseURL: 'https://transportbill-7c61b-default-rtdb.asia-southeast1.firebasedatabase.app/',
  storageBucket: '',
  messagingSenderId: '',
  projectId: 'transportbill-7c61b',
};

// Your secondary Firebase project credentials for iOS...
const iosCredentials = {
  clientId: '',
  appId: '',
  apiKey: '',
  databaseURL: 'https://transportbill-7c61b-default-rtdb.asia-southeast1.firebasedatabase.app/',
  storageBucket: '',
  messagingSenderId: '',
  projectId: 'transportbill-7c61b',
};

// Select the relevant credentials
const credentials = Platform.select({
  android: androidCredentials,
  ios: iosCredentials,
});



const config = {
  name: 'SECONDARY_APP',
};

const initFirebase = async () => {
  let instance = await firebase.initializeApp(credentials, '[DEFAULT]');
  console.log('FB Instance', instance);
};

export {credentials, initFirebase};
