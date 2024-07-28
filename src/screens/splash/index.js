import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './styles';
import {screens} from '../../constants';
import {getToken} from '../../utils/storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(async () => {
      const token = await getToken();
      if (token) navigation.replace(screens.MAIN);
      else navigation.replace(screens.AUTH);
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;
