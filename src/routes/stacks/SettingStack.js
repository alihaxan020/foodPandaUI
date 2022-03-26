import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import SettingScreen from '../../screens/Setting/SettingScreen';
import ImageUploader from '../../screens/Setting/ImageUploader';
import VideoPlayerScreen from '../../screens/Setting/VideoPlayerScreen';
import MusicPlayer from '../../screens/Setting/MusicPlayer';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const SettingStack = ({navigation, route}) => {
  const tabHiddenRoutes = ['VideoPlayerScreen', 'MusicPlayerScreen'];
  React.useLayoutEffect(() => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="ImageUploadScreen" component={ImageUploader} />
      <Stack.Screen
        name="VideoPlayerScreen"
        component={VideoPlayerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MusicPlayerScreen"
        component={MusicPlayer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SettingStack;
