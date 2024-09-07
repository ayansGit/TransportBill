import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import Background from '../../components/Background';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../theme/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {getVehicles} from '../../api';
import {getTollList} from '../../api/tolls';
import moment from 'moment';
import DateTimeField from '../../components/DateTimeField';

const Toll = ({navigation}) => {
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [vehicleList, setvehicleList] = useState([]);

  const [trackingTime, setTrackingTime] = useState('');

  const isFocused = useIsFocused();
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [tollList, setTollList] = useState([]);

  useEffect(() => {
    if (isFocused) handleGetVehicles();
  }, [isFocused, navigation]);

  const handleGetVehicles = async () => {
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
  };

  const getTolls = async () => {
    setLoading(true);
    try {
      const response = await getTollList(vehicle, trackingTime);
      setTollList(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const navigateToTollDetail = tollData => {
    navigation.navigate('Update Toll', {toll: tollData});
  };

  return (
    <Background>
      <View style={{width: '100%', padding: 10, paddingHorizontal: 15}}>
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

        <DateTimeField
          label={'Tracking Date'}
          placeholder={'Select Date'}
          onChange={setTrackingTime}
        />

        <Button
          style={{marginTop: 40}}
          title={'SUBMIT'}
          onPress={getTolls}
          isLoading={isLoading}
        />
      </View>
      <View style={{flex: 1}}>
        <FlatList
          style={{flex: 1}}
          data={tollList}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  backgroundColor: colors.white,
                  elevation: 5,
                  margin: 20,
                  padding: 10,
                }}
                onPress={() => navigateToTollDetail(item)}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>{`Toll: ${
                    index + 1
                  }`}</Text>
                  <Text style={{fontSize: 14, fontStyle: 'italic'}}>
                    {moment(item?.time).format('DD MMM, yyyy hh:mm a')}
                  </Text>
                </View>

                <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10}}>
                  Address:{' '}
                  <Text style={{fontSize: 14, fontWeight: 'normal'}}>
                    {item?.to_location_name}
                  </Text>
                </Text>

                <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10}}>
                  Vehicle No:{' '}
                  <Text style={{fontSize: 14, fontWeight: 'normal'}}>
                    {item?.vehicle_details?.vehicle_number}
                  </Text>
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Background>
  );
};

export default Toll;

const styles = StyleSheet.create({});
