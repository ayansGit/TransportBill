import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import VehicleItem from './VehicleItem';

const VehicleList = ({data = [], onItemSelected}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <VehicleItem
              vehicleNumber={item?.vehicle_number}
              rnNumber={item?.rc_number}
              validUpto={item?.validupto}
              onItemSelected={() => onItemSelected && onItemSelected(item)}
            />
          );
        }}
      />
    </View>
  );
};

export default VehicleList;

const styles = StyleSheet.create({
  container: {flex: 1}
});
