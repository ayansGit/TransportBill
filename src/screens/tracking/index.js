import {StyleSheet, Text, View, PermissionsAndroid, Alert} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import Background from '../../components/Background';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import {colors} from '../../theme/colors';
import Button from '../../components/Button';
import Geolocation from 'react-native-geolocation-service';
import BackgroundJob from 'react-native-background-actions';
import AddTollModal from './AddTollModal';
import {
  getCurrentAddress,
  getLastStatus,
  postTracking,
  updateTracking,
} from '../../api/tracking';
import {
  clearStorage,
  getDLNumber,
  getUserId,
  getVehicles,
} from '../../utils/storage';
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
  setReportId,
  getReportId,
  getTripId,
  setTripId,
} from '../../utils/tracking';
import {getDateTimeForSeconds} from './utils';
import {useNetInfo} from '@react-native-community/netinfo';

const Tracking = ({navigation}) => {
  const netInfo = useNetInfo();
  let watchId = null;
  const trackingIntervalRef = useRef(null);
  const isFocused = useIsFocused();
  const [open, setOpen] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [dlNumber, setDLNumber] = useState(null);
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

  const {time, startTimer, stopTimer, getTime, startBackgroundTimer} =
    useTimer();

  const options = {
    taskName: 'Transport Bill',
    taskTitle: 'Tracking',
    taskDesc: 'Tracking started',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
      package: 'com.transportbill',
    },
    color: colors.main,
    linkingURI: 'com.transportBill://',
    parameters: {
      delay: 20000,
    },
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     requestNotificationPermission();
  //   }, [requestNotificationPermission]),
  // );

  useEffect(() => {
    initialize();
    requestLocationPermission();
    if (!BackgroundJob.isRunning()) setTrackingStatus(TRACKING_STATUS.START);
    return () => {
      if (!BackgroundJob.isRunning()) {
        setTollTax('');
        setTrackingStatus(TRACKING_STATUS.START);
      }
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

  const initialize = async () => {
    try {
      const vehicleId = await getVehicles();
      const dlNumber = await getDLNumber();
      const fromLocation = await getFromLocation();
      const status = await getTrackingStatus();
      getLastTrackingStatus();
      setVehicle(vehicleId);
      setDLNumber(dlNumber);
      setFromLocationData(fromLocation);
      setJourneyStatus(status);
    } catch (error) {
      console.warn(error);
    }
  };

  const updateViews = async () => {
    const location = await getFromLocation();
    const status = await getTrackingStatus();
    setFromLocationData(location);
    setJourneyStatus(status);
  };

  const getLastTrackingStatus = async () => {
    setLoading(true);
    try {
      let tripId = await getTripId();
      if (!tripId) {
        setLoading(false);
        return;
      }
      const response = await getLastStatus(tripId);
      if (response?.data) {
        setJourneyStatus(response?.data?.status);
        setTrackingStatus(response?.data?.status);
        setIsJourneyStarted(response?.data?.status !== TRACKING_STATUS.END);
        if (!BackgroundJob.isRunning()) {
          const timeDifference = moment.duration(
            moment(new Date()).diff(moment(new Date(response.data.date_time))),
          );
          onJourneyStart(timeDifference.asSeconds());
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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

      await requestNotificationPermission();
    } catch (err) {
      console.log('requestLocationPermission', err);
    }
  };

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const notificationPermCheck = await PermissionsAndroid.check(
          'android.permission.POST_NOTIFICATIONS',
        );
        if (!notificationPermCheck) {
          const notificationPerm = await PermissionsAndroid.request(
            'android.permission.POST_NOTIFICATIONS',
            {
              title: 'Notification',
              message:
                'App needs access to your notification ' +
                'to track your vehicle',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );

          if (notificationPerm === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notification permission granted');
          } else {
            console.log('Notification permission denied');
          }
        }
      } catch (err) {
        console.log('Notification Error=====>', err);
      }
    }
  };

  const startTracking = async () => {
    watchId = Geolocation.watchPosition(
      async position => {
        let x = [position.coords.longitude, position.coords.latitude];
        var speed =
          position.coords.speed < 0 ? 0 : Math.round(position.coords.speed);
        // console.warn('LAT LONG :', Platform.OS, x, ' Speed: ', speed);
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
      async error => {
        console.log('Error in getting location', error.code, error.message);
        if (BackgroundJob.isRunning())
          await BackgroundJob.updateNotification({
            taskDesc: `Tracking Error: ${error?.code} :: ${error?.message}`,
          });
      },
      {
        accuracy: {
          android: 'high',
          ios: 'bestForNavigation',
        },
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 20000,
        fastestInterval: 20000,
        showsBackgroundLocationIndicator: true,
      },
    );
  };

  const onJourneyStart = async (timeDifference = 0) => {
    if (!dlNumber) {
      Alert.alert(
        'Alert',
        'Cannot start tracking. No Driver is assigned to this vehicle',
      );
      return;
    }
    setIsJourneyStarted(true);
    // startTimer();
    startTracking();
    try {
      await BackgroundJob.start(
        () => startBackgroundTimer(timeDifference),
        options,
      );
      await BackgroundJob.updateNotification({
        taskDesc: `Tracking started..`,
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const onJourneyEnd = async () => {
    stopTimer();
    setIsJourneyStarted(false);
    Geolocation.stopObserving();
    Geolocation.clearWatch(watchId);
    try {
      await BackgroundJob.stop();
    } catch (error) {
      console.warn(error);
    }
    setTollTax('');
    setJourneyStatus(TRACKING_STATUS.END);
    setTrackingTime('');
    setFromLocation('');
    setFromTime('');
    setTollTax('');
    setTrackingStatus(TRACKING_STATUS.START);
    // await clearStorage();
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
        console.log(error);
      },
    );
  };

  const setTrackingLocation = async (status, lat, long, speed, toll) => {
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
      if (BackgroundJob.isRunning())
        await BackgroundJob.updateNotification({
          taskDesc: `No internet connection`,
        });
      return;
    }
    try {
      let userId = await getUserId();
      let tripId = await getTripId();
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
        tripId,
      );
      if (!response.success) {
        // onJourneyEnd();
        console.warn(response?.message?.join('\n'));
        return;
      }
      if (BackgroundJob.isRunning())
        await BackgroundJob.updateNotification({
          taskDesc: `Current Location: ${address.data.currentAddress}`,
        });
      setTripId(response?.data?.trip_id);
      setFromLocation(address.data.currentAddress);
      setFromLocationData(address.data.currentAddress);
      setFromTime(time);
      if (status === TRACKING_STATUS.STOPAGE) {
        setReportId(response?.data?.report_id);
        updateViews();
        return;
      }
      if (journeyStatus !== TRACKING_STATUS.END) {
        // setJourneyStatus(TRACKING_STATUS.RUNNING);
        setTrackingStatus(TRACKING_STATUS.RUNNING);
      }
      if (journeyStatus === TRACKING_STATUS.END) {
        // setJourneyStatus(TRACKING_STATUS.START);
        setTrackingStatus(TRACKING_STATUS.START);
      }
      updateViews();
    } catch (error) {
      // onJourneyEnd();
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

  const handleOnEndJourney = () => {
    Alert.alert('End Transport', 'Are you sure you want to end your journey', [
      {text: 'YES', onPress: () => onJourneyEnd()},
      {text: 'CANCEL', onPress: () => {}},
    ]);
  };

  const logout = async () => {
    Geolocation.stopObserving();
    Geolocation.clearWatch(watchId);
    await clearStorage();
    navigation.replace(screens.AUTH);
  };

  return (
    <Background>
      <View style={{flex: 1, padding: 10, paddingHorizontal: 15}}>
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

        {!BackgroundJob.isRunning() && !isJourneyStarted && (
          <Button
            title={'START'}
            isLoading={isLoading}
            onPress={() => onJourneyStart()}
          />
        )}

        {(BackgroundJob.isRunning() || isJourneyStarted) && (
          <Button
            title={'ADD TOLL'}
            isLoading={isLoading}
            onPress={onAddToll}
          />
        )}

        {(BackgroundJob.isRunning() || isJourneyStarted) && (
          <Button
            title={'END'}
            isLoading={isLoading}
            onPress={handleOnEndJourney}
          />
        )}

        {!BackgroundJob.isRunning() && (
          <Button title={'LOGOUT'} onPress={logout} />
        )}

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
