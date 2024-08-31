import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import ReportItem from './ReportItem';

const ReportList = ({data = [], onItemSelected}) => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{flex: 1}}
        data={data}
        renderItem={({item}) => {
          return (
            <ReportItem
              time={item?.total_time}
              fromLocation={item?.from_location_name}
              toLocation={item?.to_location_name}
              status={item?.status}
              fromTime={item.from_time}
              toTime={item?.NewTime}
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
