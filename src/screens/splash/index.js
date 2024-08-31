import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './styles';
import {screens} from '../../constants';
import {getToken, getUserType} from '../../utils/storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(async () => {
      const token = await getToken();
      const userType = await getUserType();
      if (token) {
        if (userType === 'admin') navigation.replace(screens.MAIN);
        else navigation.replace(screens.MAIN_DRIVER);
      } else navigation.replace(screens.AUTH);
    }, 2000);
  }, []);
  return <View style={styles.container}></View>;
};

export default Splash;
