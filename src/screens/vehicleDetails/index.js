import {View, ScrollView, Text} from 'react-native';
import React, {useState} from 'react';
import Background from '../../components/Background';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {showAlert} from '../../utils';
import {addVehicle} from '../../api';
import {screens} from '../../constants';

const VehicleDetails = ({navigation}) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [rcNumber, setRCNumber] = useState('');
  const [validUpto, setValidUpto] = useState('');
  const [loading, setLoading] = useState(false);

  const onVehicleAdd = async () => {
    console.log('login');
    setLoading(true);
    if (!vehicleNumber) {
      showAlert('Alert', 'Please enter vehicle number');
    } else if (!rcNumber) {
      showAlert('Alert', 'Please enter RC number');
    } else if (!validUpto) {
      showAlert('Alert', 'Please enter date valid upto');
    } else {
      try {
        const response = await addVehicle(vehicleNumber, rcNumber, validUpto);
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
            onChangeText={setVehicleNumber}
          />

          <Input
            label="RC Number"
            isNumber
            placeholder="Enter vehicle number"
            onChangeText={setRCNumber}
          />

          <Input
            label="Valid upto (yyyy-mm-dd)"
            placeholder="Enter date in yyyy-mm-dd format"
            onChangeText={setValidUpto}
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
