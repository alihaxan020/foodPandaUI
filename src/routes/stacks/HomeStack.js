import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {MovieDetail, HomeScreen} from '../../screens/Home';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import Cart from '../../screens/Home/Cart';
import {HotelDetail, FoodDelivery} from '../../screens/Home/FoodDelivery';
const Stack = createNativeStackNavigator();
const HomeStack = ({navigation, route}) => {
  const {colors} = useTheme();
  const tabHiddenRoutes = ['MovieDetail'];
  React.useLayoutEffect(() => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FoodDelivery"
        component={FoodDelivery}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HotelDetail"
        component={HotelDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CartScreen"
        component={Cart}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
const Styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentLocation: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Muli',
  },
  locationUser: {
    fontSize: 14,
    fontFamily: 'Muli',
  },
});
