import {View, ScrollView, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Background from '../../components/Background';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {showAlert} from '../../utils';
import {addVehicle, getTransports, getVehicleTypes} from '../../api';
import {screens} from '../../constants';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../theme/colors';
import {useIsFocused} from '@react-navigation/native';
import DateTimeField from '../../components/DateTimeField';

const VehicleDetails = ({navigation}) => {
  const isFocused = useIsFocused();
  const [transportList, setTransportList] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [rcNumber, setRCNumber] = useState('');
  const [validUpto, setValidUpto] = useState('');
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(false);
  const [transport, setTransport] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);

  useEffect(() => {
    if (isFocused) {
      handleGetTransports();
      handleGetVehicleTypes();
    }
  }, [isFocused, navigation]);

  const handleGetTransports = async () => {
    setLoading(true);
    try {
      const response = await getTransports();
      const list = response?.data?.map((value, index) => ({
        label: value.name,
        value: value.transport_id,
      }));
      setTransportList(list);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleGetVehicleTypes = async () => {
    setLoading(true);
    try {
      const response = await getVehicleTypes();
      const list = response?.data?.map((value, index) => ({
        label: value.name,
        value: value.vehicle_type_id,
      }));
      setVehicleTypes(list);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onVehicleAdd = async () => {
    console.log('login');
    setLoading(true);
    if (!vehicleNumber) {
      showAlert('Alert', 'Please enter vehicle number');
    } else if (!rcNumber) {
      showAlert('Alert', 'Please enter RC number');
    } else if (!validUpto) {
      showAlert('Alert', 'Please enter date valid upto');
    } else if (!transport) {
      showAlert('Alert', 'Please select a transport type');
    } else if (!vehicleType) {
      showAlert('Alert', 'Please select a vehicle type');
    } else if (!weight) {
      showAlert('Alert', 'Please enter transport weight');
    } else {
      try {
        const response = await addVehicle(
          vehicleNumber,
          rcNumber,
          validUpto,
          transport,
          vehicleType,
          weight,
        );
        if (response?.success) {
          navigation.navigate(screens.VEHICLES);
          showAlert('', response?.message?.join('\n'));
        } else {
          showAlert('Error', response?.message?.join('\n'));
        }
      } catch (error) {
        showAlert('Error', error?.message);
      }
    }
    setLoading(false);
  };
  return (
    <Background>
      <ScrollView style={{flex: 1}}>
        <View style={{marginHorizontal: 20}}>
          <Input
            label="Vehicle Number"
            placeholder="Enter vehicle number"
            value={vehicleNumber}
            onChangeText={setVehicleNumber}
          />

          <Input
            label="RC Number"
            isNumber
            placeholder="Enter RC number"
            value={rcNumber}
            onChangeText={setRCNumber}
          />

          <DateTimeField
            label={'Valid upto'}
            placeholder={'Select Date'}
            onChange={setValidUpto}
          />

          <Text
            style={{
              fontSize: 14,
              color: colors.text,
              marginTop: 20,
            }}>
            Transport
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
            value={transport}
            data={transportList}
            onChange={item => {
              setTransport(item.value);
            }}
          />

          <Text
            style={{
              fontSize: 14,
              color: colors.text,
              marginTop: 20,
            }}>
            Vehicle Type
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
            value={vehicleType}
            data={vehicleTypes}
            onChange={item => {
              setVehicleType(item.value);
            }}
          />

          <Input
            label="Transport Weight"
            isNumber
            placeholder="Enter transport weight"
            value={weight}
            onChangeText={setWeight}
          />

          <Button
            style={{marginTop: 40}}
            title={'SUBMIT'}
            isLoading={loading}
            onPress={onVehicleAdd}
          />
        </View>
      </ScrollView>
    </Background>
  );
};

export default VehicleDetails;
