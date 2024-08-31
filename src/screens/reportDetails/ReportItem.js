import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../theme/colors';
import {Icons} from '../../assets';

const ReportItem = ({
  time,
  vehicleNumber,
  fromLocation,
  toLocation,
  status,
  onItemSelected,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onItemSelected}>
      <View style={{width: '20%'}}>
        <Text style={{fontWeight: 'bold', fontSize: 10, color: colors.text}}>
          Time
        </Text>
        <Text style={{fontSize: 12, marginTop: 5, color: colors.text}}>
          {time}
        </Text>
      </View>
      <View
        style={{
          height: '80%',
          width: 1,
          marginHorizontal: 5,
          backgroundColor: colors.lightGrey,
        }}
      />
      {/* <View style={{width: '15%'}}>
        <Text style={{fontWeight: 'bold', fontSize: 10, color: colors.text}}>
          Vehicle No
        </Text>
        <Text style={{fontSize: 12, marginTop: 5, color: colors.text}}>
          {vehicleNumber}
        </Text>
      </View> */}
      {/* <View
        style={{
          height: '80%',
          width: 1,
          marginHorizontal: 5,
          backgroundColor: colors.lightGrey,
        }}
      /> */}
      <View style={{width: '30%'}}>
        <Text style={{fontWeight: 'bold', fontSize: 10, color: colors.text}}>
          From Location
        </Text>
        <Text style={{fontSize: 12, marginTop: 5, color: colors.text}}>
          {fromLocation}
        </Text>
      </View>
      <View
        style={{
          height: '80%',
          width: 1,
          marginHorizontal: 5,
          backgroundColor: colors.lightGrey,
        }}
      />
      <View style={{width: '30%'}}>
        <Text style={{fontWeight: 'bold', fontSize: 10, color: colors.text}}>
          To Location
        </Text>
        <Text style={{fontSize: 12, marginTop: 5, color: colors.text}}>
          {toLocation}
        </Text>
      </View>
      <View
        style={{
          height: '80%',
          width: 1,
          marginHorizontal: 5,
          backgroundColor: colors.lightGrey,
        }}
      />
      <View style={{width: '10%'}}>
        <Text style={{fontWeight: 'bold', fontSize: 10, color: colors.text}}>
          Status
        </Text>
        <Text style={{fontSize: 12, marginTop: 5, color: colors.text}}>
          {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ReportItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    elevation: 5,
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowOffset: {height: 0, width: 0},
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
  },
});
