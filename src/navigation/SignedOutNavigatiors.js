import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/login';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

export default function SignedOutNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerStyle:{backgroundColor: colors.main}, headerTintColor: colors.white}}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
