import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {screens} from '../../constants';
import Background from '../../components/Background';
import VehicleList from './VehicleList';
import {getVehicles} from '../../api';
import Input from '../../components/Input';
import {useDebounce} from '../../utils/useDebounce';

const Vehicles = ({navigation}) => {
  const isFocused = useIsFocused();
  const [searchKey, setSearchKey] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  const debouncedValue = useDebounce(searchKey);

  useEffect(() => {
    if (isFocused) handleGetVehicles();
  }, [isFocused, navigation]);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue]);

  const onSearch = useCallback(
    text => {
      if (!text) {
        setFilteredVehicles(vehicles);
        return;
      }
      const filteredData = vehicles.filter(value =>
        value.vehicle_number.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredVehicles(filteredData);
    },
    [debouncedValue],
  );

  const handleGetVehicles = async () => {
    try {
      const response = await getVehicles();
      setVehicles(response?.data);
      setFilteredVehicles(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onVehicleAdd = () => {
    navigation.navigate(screens.VEHICLE_DETAILS);
  };

  return (
    <Background onAdd={onVehicleAdd}>
      <Input
        width="95%"
        placeholder="Search.."
        marginTop={0}
        marginBottom={20}
        style={styles.search}
        search
        onChangeText={setSearchKey}
      />
      <VehicleList data={filteredVehicles} />
    </Background>
  );
};

export default Vehicles;

const styles = StyleSheet.create({
  search: {alignSelf: 'center'},
});
