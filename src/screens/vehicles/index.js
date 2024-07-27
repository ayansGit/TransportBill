import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {screens} from '../../constants';
import Background from '../../components/Background';

const Vehicles = ({navigation}) => {
  const onVehicleAdd = () => {
    navigation.navigate(screens.VEHICLE_DETAILS);
  };
  return (
    <Background onAdd={onVehicleAdd}>
      <View>
        <Text>Vehicles</Text>
      </View>
    </Background>
  );
};

export default Vehicles;

const styles = StyleSheet.create({});
