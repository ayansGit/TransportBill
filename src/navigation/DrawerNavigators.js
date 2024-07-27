import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Drivers from '../screens/drivers';
import Vehicles from '../screens/vehicles';
import {colors} from '../theme/colors';

const Drawer = createDrawerNavigator();

export default DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Vehicles"
      screenOptions={{
        headerStyle: {backgroundColor: colors.main},
        headerTintColor: colors.white,
      }}>
      <Drawer.Screen name="Vehicles" component={Vehicles} />
      <Drawer.Screen name="Drivers" component={Drivers} />
    </Drawer.Navigator>
  );
};
