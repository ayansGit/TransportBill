import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Drivers from '../screens/drivers';
import Vehicles from '../screens/vehicles';
import {colors} from '../theme/colors';
import ViewReport from '../screens/viewReport';
import ConfigureReport from '../screens/fakeReport';
import Settings from '../screens/settings';
import Toll from '../screens/tolls';

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
      {/* <Drawer.Screen name="Drivers" component={Drivers} /> */}
      <Drawer.Screen name="Reports" component={ViewReport} />
      <Drawer.Screen name="Configure Reports" component={ConfigureReport} />
      <Drawer.Screen name="Toll" component={Toll} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};
