import {View, Text} from 'react-native';
import React from 'react';
import Background from '../../components/Background';
import Button from '../../components/Button';
import {clearStorage} from '../../utils/storage';
import { screens } from '../../constants';

const Settings = ({navigation}) => {
  const logout = async () => {
    await clearStorage();
    navigation.replace(screens.AUTH);
  };
  return (
    <Background>
      <View style={{flex: 1, padding: 10, paddingHorizontal: 15}}>
        <Button title={'LOGOUT'} onPress={logout} />
      </View>
    </Background>
  );
};

export default Settings;
