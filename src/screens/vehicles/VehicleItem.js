import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../theme/colors';
import {Icons} from '../../assets';

const VehicleItem = ({}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Icons.Vehicle color={colors.lightGrey} marginTop={5}/>
      <View
        style={{
          height: 40,
          width: 1,
          marginHorizontal: 10,
          backgroundColor: colors.lightGrey,
        }}
      />
      <View style={{alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 10, color: colors.text}}>Vehicle No</Text>
        <Text style={{fontSize: 12, marginTop: 5, color: colors.text}}>Vehicle Number</Text>
      </View>
      <View
        style={{
          height: 40,
          width: 1,
          marginHorizontal: 10,
          backgroundColor: colors.lightGrey,
        }}
      />
      <View style={{alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 10, color: colors.text}}>RC Number</Text>
        <Text style={{fontSize: 12, marginTop: 5, color: colors.text}}>RC Number</Text>
      </View>
      <View
        style={{
          height: 40,
          width: 1,
          marginHorizontal: 10,
          backgroundColor: colors.lightGrey,
        }}
      />
      <View style={{alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 10, color: colors.text}}>Valid Upto</Text>
        <Text style={{fontSize: 12, marginTop: 5, color: colors.text}}>Valid Upto</Text>
      </View>
    </TouchableOpacity>
  );
};

export default VehicleItem;

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
    justifyContent: 'space-around',
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10
  },
});
