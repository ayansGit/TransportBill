import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {screens} from '../../constants';
import Background from '../../components/Background';
import VehicleItem from './VehicleItem';

const Vehicles = ({navigation}) => {
  const onVehicleAdd = () => {
    navigation.navigate(screens.VEHICLE_DETAILS);
  };
  return (
    <Background onAdd={onVehicleAdd}>
      <VehicleItem/>
    </Background>
  );
};

export default Vehicles;

const styles = StyleSheet.create({});
