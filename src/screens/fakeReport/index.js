import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import Background from '../../components/Background';
import {colors} from '../../theme/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {screens} from '../../constants';
import {getVehicles} from '../../api';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimeField from '../../components/DateTimeField';

const ConfigureReport = ({navigation}) => {
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [copyVehicleOpen, setCopyVehicleOpen] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [copyVehicle, setCopyVehicle] = useState(null);
  const [vehicleList, setvehicleList] = useState([]);

  const [date, setDate] = useState('');
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
    Alert.alert('Alert', 'Are you sure want to create a duplicate bill?', [
      {
        text: 'YES',
        onPress: () => {
          navigation.navigate(screens.CONFIGURED_REPORT_DETAILS, {
            vehicleId: vehicle,
            copyVehicleId: copyVehicle,
            date: date,
            time: trackingTime,
          });
        },
      },
      {
        text: 'CANCEL',
        onPress: () => console.log('cancel'),
      },
    ], {
      cancelable: true,
    });
  };

  return (
    <Background loading={isLoading}>
      <ScrollView>
        <View style={{flex: 1, padding: 10, paddingHorizontal: 15}}>
          <Text
            style={{
              fontSize: 14,
              color: colors.text,
            }}>
            Vehicle
          </Text>

          <Dropdown
            style={{
              height: 50,
              borderColor: colors.lightGrey,
              borderWidth: 0.5,
              borderRadius: 8,
              paddingHorizontal: 8,
              marginTop: 10,
            }}
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            search
            value={vehicle}
            data={vehicleList}
            onChange={item => {
              setVehicle(item.value);
            }}
          />

          <Text
            style={{
              fontSize: 14,
              color: colors.text,
              marginTop: 10,
            }}>
            Copy Vehicle
          </Text>

          <Dropdown
            style={{
              height: 50,
              borderColor: colors.lightGrey,
              borderWidth: 0.5,
              borderRadius: 8,
              paddingHorizontal: 8,
              marginTop: 10,
            }}
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            search
            value={copyVehicle}
            data={vehicleList}
            onChange={item => {
              setCopyVehicle(item.value);
            }}
          />

          <DateTimeField
            label={'Tracking Date'}
            placeholder={'Select Date'}
            onChange={setDate}
          />

          <Input
            label="Time Difference (minutes)"
            placeholder="Enter time difference between locations"
            value={trackingTime}
            isNumber
            onChangeText={setTrackingTime}
          />

          <Button
            style={{marginTop: 40}}
            title={'SUBMIT'}
            onPress={showReport}
          />
        </View>
      </ScrollView>
    </Background>
  );
};

export default ConfigureReport;

const styles = StyleSheet.create({});
