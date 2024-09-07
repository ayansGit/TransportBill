import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import ReportList from './ReportList';
import ReportItem from './ReportItem';
import Background from '../../components/Background';
import {getConfiguredReportList, getReportList} from '../../api';
import {colors} from '../../theme/colors';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import DownloadButton from '../../components/DownloadButton';

const ConfiguredReportDetails = ({navigation, route}) => {
  const vehicleId = route?.params?.vehicleId;
  const copyVehicleId = route?.params?.copyVehicleId;
  const date = route?.params?.date;
  const time = route?.params?.time;

  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [reportList, setReportList] = useState([]);

  useEffect(() => {
    if (isFocused) {
      handleGetReportList();
      requestStoragePermission();
    }
  }, [isFocused, navigation, vehicleId, time]);

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

  const getHTML = () => {
    const content = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Helvetica';
            font-size: 12px;
          }
          header, footer {
            height: 50px;
            background-color: #fff;
            color: #000;
            display: flex;
            justify-content: center;
            padding: 0 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #000;
            padding: 5px;
          }
          th {
            background-color: #ccc;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Report</h1>
        </header>
        <h1>Tracking Summary</h1>
        <table>
          <tr>
            <th>Time</th>
            <th>From Location</th>
            <th>From Time</th>
            <th>To Location</th>
            <th>To Time</th>
            <th>Status</th>
          </tr>
          ${reportList
            .map(
              line => `
            <tr>
              <td>${line.total_time}</td>
              <td>${line.from_location_name}</td>
              <td>${line.from_time}</td>
              <td>${line.to_location_name}</td>
              <td>${line.NewTime}</td>
              <td>${line.status}</td>
            </tr>
          `,
            )
            .join('')}
        </table>
        <footer>
          <p>Thank you for your business!</p>
        </footer>
      </body>
    </html>
  `;
    return content;
  };

  const handleGetReportList = async () => {
    setLoading(true);
    try {
      const response = await getConfiguredReportList(
        vehicleId,
        copyVehicleId,
        date,
        time,
      );
      setReportList(response?.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const downloadReport = async () => {
    setLoading(true);
    try {
      const html = getHTML();
      const options = {
        html,
        fileName: `Tracking Report ${new Date().getTime()}`,
        directory: 'Transport Bill',
      };
      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert('Success', `PDF saved to ${file.filePath}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
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

export default ConfiguredReportDetails;

const styles = StyleSheet.create({});
