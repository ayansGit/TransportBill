import {StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Background from '../../components/Background';
import {useIsFocused} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import {colors} from '../../theme/colors';
import Button from '../../components/Button';
import Geolocation from 'react-native-geolocation-service';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import AddTollModal from './AddTollModal';
import {
  getCurrentAddress,
  postTracking,
  updateTracking,
} from '../../api/tracking';
import {clearStorage, getUserId, getVehicles} from '../../utils/storage';
import {screens} from '../../constants';
import {useTimer} from './hooks/useTimer';
import moment from 'moment';
import {
  setTrackingTime,
  getTrackingStatus,
  setTrackingStatus,
  TRACKING_STATUS,
  getFromLocation,
  setFromLocation,
  getFromTime,
  getToTime,
  setFromTime,
  getReportId,
} from '../../utils/tracking';
import {getDateTimeForSeconds} from './utils';

const Tracking = ({navigation}) => {
  let watchId = null;
  const trackingIntervalRef = useRef(null);
  const isFocused = useIsFocused();
  const [open, setOpen] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [items, setItems] = useState([
    {label: 'WB1234', value: '123'},
    {label: 'HP1234', value: '456'},
  ]);
  const [isLoading, setLoading] = useState(false);
  const [isJourneyStarted, setIsJourneyStarted] = useState(false);
  const [isShowTollModal, setShowTollModal] = useState(false);
  const [journeyStatus, setJourneyStatus] = useState(TRACKING_STATUS.START);
  const [tollTax, setTollTax] = useState('');
  const [fromLocation, setFromLocationData] = useState('');
  const [reportId, setReportId] = useState('');

  const {time, startTimer, stopTimer, getTime} = useTimer();

  useEffect(() => {
    setTrackingTime(time);
  }, [time]);

  useEffect(() => {
    getVehicle();
    requestLocationPermission();
    setTrackingStatus(TRACKING_STATUS.START);
    return () => {
      Geolocation.stopObserving();
      Geolocation.clearWatch(watchId);
      setTollTax('');
      setTrackingStatus(TRACKING_STATUS.START);
    };
  }, [isFocused, navigation]);

  useEffect(() => {
    if (
      journeyStatus === TRACKING_STATUS.TOLL ||
      journeyStatus === TRACKING_STATUS.END
    ) {
      getCurrentLocation();
    }
  }, [journeyStatus]);

  const getVehicle = async () => {
    try {
      const vehicleId = await getVehicles();
      console.log('vehicleID', vehicleId);
      setVehicle(vehicleId);
    } catch (error) {
      console.warn(error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
      const backgroundGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: 'Background Location Permission',
          message: 'We need access to your location for background tracking.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (backgroundGranted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Background location permission granted');
      } else {
        console.log('Background location permission denied');
      }
    } catch (err) {
      console.log('requestLocationPermission', err);
    }
  };

  const updateForeground = () => {
    ReactNativeForegroundService.add_task(() => startTracking(), {
      delay: 5000,
      onLoop: true,
      taskId: 'taskid',
      onError: e => console.log(`Error logging:`, e),
    });
  };

  const Notification = () => {
    ReactNativeForegroundService.start({
      id: 1244,
      title: 'Location Tracking',
      message: 'Location Tracking',
      icon: 'ic_launcher',
      button: false,
      button2: false,
      setOnlyAlertOnce: true,
      color: '#000000',
    });
  };

  const startTracking = async () => {
    watchId = Geolocation.watchPosition(
      async position => {
        let x = [position.coords.longitude, position.coords.latitude];
        var speed =
          position.coords.speed < 0 ? 0 : Math.round(position.coords.speed);
        console.warn('LAT LONG :', Platform.OS, x, ' Speed: ', speed);
        const trackingStatus = await getTrackingStatus();
        if (trackingStatus === TRACKING_STATUS.START) {
          setTrackingLocation(
            trackingStatus,
            position.coords.latitude,
            position.coords.longitude,
            speed,
            null,
          );
        } else if (
          speed === 0 &&
          trackingStatus !== TRACKING_STATUS.STOPAGE &&
          trackingStatus !== TRACKING_STATUS.TOLL
        ) {
          setJourneyStatus(TRACKING_STATUS.STOPAGE);
          setTrackingStatus(TRACKING_STATUS.STOPAGE);
          setTrackingLocation(
            TRACKING_STATUS.STOPAGE,
            position.coords.latitude,
            position.coords.longitude,
            speed,
            null,
          );
        } else if (speed !== 0 && trackingStatus === TRACKING_STATUS.TOLL) {
          setJourneyStatus(TRACKING_STATUS.RUNNING);
          setTrackingStatus(TRACKING_STATUS.RUNNING);
          updateTrackingLocation(trackingStatus);
        } else if (speed !== 0 && trackingStatus === TRACKING_STATUS.STOPAGE) {
          setJourneyStatus(TRACKING_STATUS.RUNNING);
          setTrackingStatus(TRACKING_STATUS.RUNNING);
          updateTrackingLocation(trackingStatus);
        } else if (speed !== 0) {
          setTrackingLocation(
            trackingStatus ? trackingStatus : journeyStatus,
            position.coords.latitude,
            position.coords.longitude,
            speed,
            null,
          );
        }
      },
      error => {
        console.log('maperror in getting location', error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 20000,
        showsBackgroundLocationIndicator: true,
      },
    );
  };

  const onJourneyStart = () => {
    setIsJourneyStarted(true);
    // updateForeground();
    // Notification();
    startTimer();
    startTracking();
  };

  const onJourneyEnd = () => {
    stopTimer();
    setIsJourneyStarted(false);
    ReactNativeForegroundService.remove_task('taskid');
    Geolocation.stopObserving();
    setTollTax('');
    setJourneyStatus(TRACKING_STATUS.END);
  };

  const onAddToll = () => {
    setShowTollModal(true);
  };

  const handleOnTollModalClose = () => {
    setShowTollModal(false);
  };

  const handleOnTollSubmit = tollTax => {
    setShowTollModal(false);
    setTollTax(tollTax);
    setTrackingStatus(TRACKING_STATUS.TOLL);
    setJourneyStatus(TRACKING_STATUS.TOLL);
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setTrackingLocation(
          journeyStatus,
          position.coords.latitude,
          position.coords.longitude,
          '0',
          tollTax,
        );
        // setJourneyStatus('running');
      },
      error => {
        console.error(error.message);
      },
    );
  };

  const setTrackingLocation = async (status, lat, long, speed, toll) => {
    try {
      let userId = await getUserId();
      let address = await getCurrentAddress(lat, long);
      const time = await getTime();
      const fromLocation = await getFromLocation();
      const fromTime = await getFromTime();
      const toTime = await getToTime();
      var duration = moment.duration(
        moment(new Date(time)).diff(moment(new Date(fromTime))),
      );
      const timeDiff = getDateTimeForSeconds(duration.asSeconds());
      let response = await postTracking(
        status,
        userId,
        vehicle,
        lat,
        long,
        speed,
        moment(new Date()).format('yyyy-MM-DD HH:mm:ss'),
        moment(timeDiff).format('HH:mm:ss'),
        fromTime,
        time,
        address.data.currentAddress,
        fromLocation ? fromLocation : address.data.currentAddress,
        toll,
        address.data.currentAddress,
      );
      if (!response.success) {
        onJourneyEnd();
        console.warn(response?.message?.join('\n'));
        return;
      }

      setFromLocation(address.data.currentAddress);
      setFromLocationData(address.data.currentAddress);
      setFromTime(time);

      if (status === TRACKING_STATUS.STOPAGE) {
        setReportId(response?.data?.report_id);
        return;
      }
      if (journeyStatus !== TRACKING_STATUS.END) {
        setJourneyStatus(TRACKING_STATUS.RUNNING);
        setTrackingStatus(TRACKING_STATUS.RUNNING);
      }
      if (journeyStatus === TRACKING_STATUS.END) {
        setJourneyStatus(TRACKING_STATUS.START);
        setTrackingStatus(TRACKING_STATUS.START);
      }
    } catch (error) {
      onJourneyEnd();
      console.error(error?.message);
    }
  };

  const updateTrackingLocation = async status => {
    const time = await getTime();
    const reportId = await getReportId();
    const fromTime = await getFromTime();
    const toTime = await getToTime();
    const duration = moment.duration(
      moment(new Date(time)).diff(moment(new Date(fromTime))),
    );
    const timeDiff = getDateTimeForSeconds(duration.asSeconds());
    let response = await updateTracking(
      fromTime,
      time,
      moment(timeDiff).format('HH:mm:ss'),
      reportId,
    );
    if (!response.success) {
      console.warn(response?.message?.join('\n'));
      return;
    }
    if (status === TRACKING_STATUS.STOPAGE) {
      setTrackingStatus(TRACKING_STATUS.RUNNING);
      setJourneyStatus(TRACKING_STATUS.RUNNING);
    }
  };

  const logout = async () => {
    ReactNativeForegroundService.remove_task('taskid');
    Geolocation.stopObserving();
    await clearStorage();
    navigation.replace(screens.AUTH);
  };

  return (
    <Background>
      <View style={{flex: 1, padding: 10, paddingHorizontal: 15}}>
        {/* <Text
          style={{
            fontSize: 14,
            color: colors.text,
          }}>
          Vehicle
        </Text>
        <DropDownPicker
          open={open}
          value={vehicle}
          items={items}
          setOpen={setOpen}
          setValue={setVehicle}
          // setItems={setItems}
          style={{marginTop: 10}}
          disabled={isJourneyStarted}
        /> */}

        <View
          style={{
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
            padding: 10,
          }}>
          <View style={{width: '60%', alignItems: 'center'}}>
            <Text
              style={{fontWeight: 'bold', fontSize: 10, color: colors.text}}>
              Location
            </Text>
            <Text style={{fontSize: 12, marginTop: 5, color: colors.text}}>
              {fromLocation}
            </Text>
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
            <Text
              style={{fontWeight: 'bold', fontSize: 10, color: colors.text}}>
              Status
            </Text>
            <Text style={{fontSize: 12, marginTop: 5, color: colors.text}}>
              {journeyStatus}
            </Text>
          </View>
        </View>

        {!isJourneyStarted && (
          <Button
            title={'START'}
            isLoading={isLoading}
            onPress={onJourneyStart}
          />
        )}

        {isJourneyStarted && (
          <Button
            title={'ADD TOLL'}
            isLoading={isLoading}
            onPress={onAddToll}
          />
        )}

        {isJourneyStarted && (
          <Button title={'END'} isLoading={isLoading} onPress={onJourneyEnd} />
        )}

        <Button title={'LOGOUT'} onPress={logout} />

        <AddTollModal
          visible={isShowTollModal}
          onClose={handleOnTollModalClose}
          onAddTollTax={handleOnTollSubmit}
        />
      </View>
    </Background>
  );
};

export default Tracking;

const styles = StyleSheet.create({});
