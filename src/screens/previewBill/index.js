import {StyleSheet, Text, View, PermissionsAndroid, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Background from '../../components/Background';
import {WebView} from 'react-native-webview';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {toll} from '../../components/tollPreviewHtml/toll';
import DownloadButton from '../../components/DownloadButton';
var perf = require('../../components/tollPreviewHtml/toll.html');

const PreviewBill = ({route}) => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const billData = {
    companyName: route.params?.companyName,
    companyAddress: route.params?.companyAddress,
    ticketAmount: route.params?.ticketAmount,
    ticketNumber: route.params?.ticketNumber,
    journeyType: route.params?.journeyType,
    overWeightCharge: route.params?.overWeightCharge,
    totalAmount:
      parseFloat(route.params?.ticketAmount) +
      parseFloat(route.params?.overWeightCharge),
    lane: route.params?.lane,
    date: moment(new Date(route.params?.date_time)).format('DD/MM/yyyy hh:mm a'),
    vehicleDetails: route.params?.vehicle_details,
  };

  useEffect(() => {
    if (isFocused) {
      requestStoragePermission();
    }
  }, [isFocused]);

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

  const downloadBill = async () => {
    setLoading(true);
    try {
      const html = toll(billData);
      const options = {
        html,
        fileName: `Bill_${moment(Date()).format('yyyy-MM-DD_HH:mm:ss')}`,
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
      <View style={{flex: 1}}>
        <DownloadButton onPress={downloadBill} />
        <WebView style={{flex: 1}} source={{html: toll(billData)}} />
      </View>
    </Background>
  );
};

export default PreviewBill;

const styles = StyleSheet.create({});
