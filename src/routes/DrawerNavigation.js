import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomDrawer} from '../components';
const Drawer = createDrawerNavigator();
import BottomTabNavigation from './BottomTabNavigation';
const DrawerNavigation = ({navigation}) => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Tab"
        component={BottomTabNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
