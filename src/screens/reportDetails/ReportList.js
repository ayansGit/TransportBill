import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import ReportItem from './ReportItem';

const ReportList = ({data = [], onItemSelected}) => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <ReportItem
              vehicleNumber={item?.vehicle_name}
              time={item?.total_time}
              fromLocation={item?.from_location_name}
              toLocation={item?.to_location_name}
              status={item?.status}
              onItemSelected={() => onItemSelected && onItemSelected(item)}
            />
          );
        }}
      />
    </View>
  );
};

export default ReportList;

const styles = StyleSheet.create({});
