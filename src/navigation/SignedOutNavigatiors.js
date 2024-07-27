import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/login';

const Stack = createNativeStackNavigator();

export default function SignedOutNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
