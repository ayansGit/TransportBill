import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import Background from '../../components/Background';
import DropDownPicker from 'react-native-dropdown-picker';
import {colors} from '../../theme/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {screens} from '../../constants';
import {getVehicles} from '../../api';

const ViewReport = ({navigation}) => {
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [vehicleList, setvehicleList] = useState([]);

  const [trackingTime, setTrackingTime] = useState('');

  const isFocused = useIsFocused();
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocused) handleGetVehicles();
  }, [isFocused, navigation]);

  const handleGetVehicles = async () => {
    setLoading(true);
    try {
      const response = await getVehicles();
      const list = response?.data?.map((value, index) => ({
        label: value.vehicle_number,
        value: value.vehicle_id,
      }));
      setvehicleList(list);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const showReport = () => {
    navigation.navigate(screens.REPORT_DETAILS, {
      vehicleId: vehicle,
      time: trackingTime,
    });
  };

  return (
    <Background loading={isLoading}>
      <View style={{flex: 1, padding: 10, paddingHorizontal: 15}}>
        <Text
          style={{
            fontSize: 14,
            color: colors.text,
          }}>
          Vehicle
        </Text>
        <DropDownPicker
          open={vehicleOpen}
          value={vehicle}
          items={vehicleList}
          setOpen={setVehicleOpen}
          setValue={setVehicle}
          style={{marginTop: 10}}
        />

        <Input
          label="Tracking Date (yyyy-mm-dd)"
          placeholder="Enter date in yyyy-mm-dd format"
          value={trackingTime}
          onChangeText={setTrackingTime}
        />

        <Button style={{marginTop: 40}} title={'SUBMIT'} onPress={showReport} />
      </View>
    </Background>
  );
};

export default ViewReport;

const styles = StyleSheet.create({});
