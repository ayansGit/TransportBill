import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {screens} from '../../constants';
import Background from '../../components/Background';
import VehicleList from './VehicleList';
import {getVehicles} from '../../api';

const Vehicles = ({navigation}) => {
  const isFocused = useIsFocused();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    if (isFocused) handleGetVehicles();
  }, [isFocused, navigation]);

  const handleGetVehicles = async () => {
    try {
      const response = await getVehicles();
      setVehicles(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onVehicleAdd = () => {
    navigation.navigate(screens.VEHICLE_DETAILS);
  };

  return (
    <Background onAdd={onVehicleAdd}>
      <VehicleList data={vehicles}/>
    </Background>
  );
};

export default Vehicles;

const styles = StyleSheet.create({});
