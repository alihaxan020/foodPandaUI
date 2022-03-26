import {StyleSheet, StatusBar, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import VideoPlayer from 'react-native-video-controls';
import {useFocusEffect} from '@react-navigation/native';
const VideoPlayerScreen = ({navigation, uri}) => {
  const {colors} = useTheme();
  useFocusEffect(() => {
    // This will run when component is `focused` or mounted.
    StatusBar.setHidden(true);

    // This will run when component is `blured` or unmounted.
    return () => {
      StatusBar.setHidden(false);
    };
  });
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <VideoPlayer
        seekColor={colors.primary}
        onBack={() => navigation.goBack()}
        controlAnimationTiming={750}
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        }} // Can be a URL or a local file.
        style={{
          flex: 1,
        }}
        resizeMode={'contain'}
      />
    </View>
  );
};

export default VideoPlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    alignSelf: 'center',
    paddingVertical: 10,
  },
});
