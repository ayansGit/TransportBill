import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigators';
import VehicleDetails from '../screens/vehicleDetails';
import DriverDetails from '../screens/driverDetails';
import {colors} from '../theme/colors';
import Tracking from '../screens/tracking';
import ReportDetails from '../screens/reportDetails';
import ConfigureReport from '../screens/fakeReport';
import ConfiguredReportDetails from '../screens/configuredReportDetails';
import TollDetail from '../screens/tollDetails';

const Stack = createNativeStackNavigator();

export default function SignedInNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="DrawerNavigator"
      screenOptions={({route}) => ({
        headerShown: route.name !== 'DrawerNavigator',
        headerStyle: {backgroundColor: colors.main},
        headerTintColor: colors.white,
      })}>
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="Vehicle Details" component={VehicleDetails} />
      <Stack.Screen name="Driver Details" component={DriverDetails} />
      <Stack.Screen name="Report Details" component={ReportDetails} />
      <Stack.Screen
        name="Configured Report Details"
        component={ConfiguredReportDetails}
      />
      <Stack.Screen name="Update Toll" component={TollDetail} />
    </Stack.Navigator>
  );
}
