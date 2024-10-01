import {StyleSheet, Text, PermissionsAndroid, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import moment from 'moment';
import ReportList from './ReportList';
import Background from '../../components/Background';
import {getReportList} from '../../api';
import DownloadButton from '../../components/DownloadButton';
import {colors} from '../../theme/colors';
import {getReportHTML} from '../../components/reportHtml/report';

const ReportDetails = ({navigation, route}) => {
  const vehicleId = route?.params?.vehicleId;
  const time = route?.params?.time;

  const isFocused = useIsFocused();
  const [reportList, setReportList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      handleGetReportList();
      requestStoragePermission();
    }
  }, [isFocused, navigation, vehicleId, time]);

  const handleGetReportList = async () => {
    setLoading(true);
    try {
      const response = await getReportList(vehicleId, time);
      setReportList(response?.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.log('requestLocationPermission', err);
    }
  };

  const downloadReport = async () => {
    setLoading(true);
    try {
      const html = await getReportHTML(reportList);
      const options = {
        html,
        fileName: `Tracking_Report_${moment(Date()).format('yyyy-MM-DD_HH:mm:ss')}`,
        directory: 'Transport Bill',
      };
      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert('Success', `PDF saved to ${file.filePath}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Background loading={loading}>
      {reportList.length > 0 && <DownloadButton onPress={downloadReport} />}

      {!loading && reportList.length === 0 && (
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.lightGrey,
            alignSelf: 'center',
            marginTop: 40,
          }}>
          Empty Report
        </Text>
      )}
      <ReportList data={reportList} />
    </Background>
  );
};

export default ReportDetails;

const styles = StyleSheet.create({});
