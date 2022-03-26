import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './stacks/HomeStack';
import SettingStack from './stacks/SettingStack';
import ProfileStack from './stacks/ProfileStack';
import FavoriteScreen from '../screens/FavoriteScreen';
import Favourites from '../screens/Favourites';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {COLORS} from '../../constants/theme';
const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          height: 60,
        },
        tabBarIcon: ({focused}) => {
          switch (route.name) {
            case 'HomeStack':
              return (
                <View style={styles.iconStyle}>
                  <Ionicons
                    name="ios-home-sharp"
                    size={30}
                    color={focused ? colors.primary : COLORS.grayLight}
                  />

                  <Text
                    style={[
                      styles.labelText,
                      {
                        color: focused ? colors.primary : COLORS.grayLight,
                      },
                    ]}>
                    Home
                  </Text>
                </View>
              );
            case 'FavoriteScreen':
              return (
                <View style={styles.iconStyle}>
                  <MaterialIcons
                    name="movie-filter"
                    size={30}
                    color={focused ? colors.primary : COLORS.grayLight}
                  />

                  <Text
                    style={[
                      styles.labelText,
                      {
                        color: focused ? colors.primary : COLORS.grayLight,
                      },
                    ]}>
                    Movies
                  </Text>
                </View>
              );
            case 'Favourites':
              return (
                <View style={styles.iconStyle}>
                  <MaterialIcons
                    color={focused ? colors.primary : COLORS.grayLight}
                    size={32}
                    name="favorite"
                  />
                  <Text
                    style={[
                      styles.labelText,
                      {
                        color: focused ? colors.primary : COLORS.grayLight,
                      },
                    ]}>
                    Favourites
                  </Text>
                </View>
              );
            case 'Setting':
              return (
                <View style={styles.iconStyle}>
                  <Ionicons
                    name="ios-settings-sharp"
                    size={30}
                    color={focused ? colors.primary : COLORS.grayLight}
                  />

                  <Text
                    style={[
                      styles.labelText,
                      {
                        color: focused ? colors.primary : COLORS.grayLight,
                      },
                    ]}>
                    Setting
                  </Text>
                </View>
              );
            case 'Profile':
              return (
                <View style={styles.iconStyle}>
                  <Ionicons
                    name="person-sharp"
                    size={30}
                    color={focused ? colors.primary : COLORS.grayLight}
                  />

                  <Text
                    style={[
                      styles.labelText,
                      {
                        color: focused ? colors.primary : COLORS.grayLight,
                      },
                    ]}>
                    Setting
                  </Text>
                </View>
              );
            default:
              break;
          }
        },
      })}>
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <Tab.Screen name="Favourites" component={Favourites} />
      <Tab.Screen name="Setting" component={SettingStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({
  iconStyle: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 19,
  },
});
