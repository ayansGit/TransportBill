import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/splash';
import SignedOutNavigator from './SignedOutNavigatiors';
import SignedInNavigator from './SignedInNavigators';
import SignedInDriverNavigator from './SignedInDriverNavigators';

const Stack = createNativeStackNavigator();

export default Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen
          name="SignedOutNavigator"
          component={SignedOutNavigator}
        />
        <Stack.Screen name="SignedInNavigator" component={SignedInNavigator} />
        <Stack.Screen
          name="SignedInDriverNavigator"
          component={SignedInDriverNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
