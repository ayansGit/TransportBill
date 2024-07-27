import {Text, View} from 'react-native';
import React, { useEffect } from 'react';
import {styles} from './styles';
import { screens } from '../../constants';

const Splash = ({navigation}) => {

  useEffect(() =>{
    setTimeout(()=>{
      navigation.replace(screens.MAIN)
    }, 2000)
  },[])
  return (
    <View style={styles.container}>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;
