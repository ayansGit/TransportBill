import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import ReportList from './ReportList';
import ReportItem from './ReportItem';
import Background from '../../components/Background';
import {getReportList} from '../../api';

const ReportDetails = ({navigation, route}) => {
  const vehicleId = route?.params?.vehicleId;
  const time = route?.params?.time;

  console.log('test', vehicleId, time);

  const isFocused = useIsFocused();
  const [reportList, setReportList] = useState([]);

  useEffect(() => {
    if (isFocused) handleGetReportList();
  }, [isFocused, navigation, vehicleId, time]);

  const handleGetReportList = async () => {
    try {
      const response = await getReportList(vehicleId, time);
      setReportList(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Background>
      <ReportList data={reportList} />
    </Background>
  );
};

export default ReportDetails;

const styles = StyleSheet.create({});
