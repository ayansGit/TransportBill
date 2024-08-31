import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigators';
import VehicleDetails from '../screens/vehicleDetails';
import DriverDetails from '../screens/driverDetails';
import {colors} from '../theme/colors';
import Tracking from '../screens/tracking';

const Stack = createNativeStackNavigator();

export default function SignedInDriverNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Transport"
      screenOptions={({route}) => ({
        headerShown: route.name !== 'DrawerNavigator',
        headerStyle: {backgroundColor: colors.main},
        headerTintColor: colors.white,
      })}>
      <Stack.Screen name="Transport" component={Tracking} />
    </Stack.Navigator>
  );
}
