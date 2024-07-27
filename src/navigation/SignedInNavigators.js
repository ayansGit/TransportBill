import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigators';
import VehicleDetails from '../screens/vehicleDetails';
import DriverDetails from '../screens/driverDetails';
import {colors} from '../theme/colors';

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
    </Stack.Navigator>
  );
}
