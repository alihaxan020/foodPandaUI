import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  LogBox,
} from 'react-native';

import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tracks from '../../../utils/tracks';
import {COLORS} from '../../../../constants/theme';
const {width, height} = Dimensions.get('window');
import {useSelector, useDispatch} from 'react-redux';
import DocumentPicker, {
  isInProgress,
  types,
} from 'react-native-document-picker';
import {setTracks, setSongId} from '../../../../redux/actions';
import {Container, Text} from '../../../components/elements';

// react-native-track-player setUp player
const setup = async () => {
  await TrackPlayer.setupPlayer({});
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });

  await TrackPlayer.add(tracks);
};
// play pause button method
const togglePlayback = async playbackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack == null) {
    // TODO: Perhaps present an error or restart the playlist?
  } else {
    if (playbackState === State.Paused) {
      await TrackPlayer.play();
      id.push(trackObject.id);
    } else {
      await TrackPlayer.pause();
    }
  }
};

const MusicPlayer = () => {
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  //redux
  const dispatch = useDispatch();
  const handleSetTracks = value => {
    dispatch(setTracks(value));
  };
  const handleSetSongId = id => {
    dispatch(setSongId(id));
  };
  const {songId, songs} = useSelector(state => state.userReducer);

  // custom referecnces
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);

  //   changing the track on complete

  useTrackPlayerEvents(
    [
      Event.PlaybackQueueEnded,
      Event.PlaybackTrackChanged,
      Event.RemotePlay,
      Event.RemotePause,
    ],
    async event => {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack !== undefined
      ) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        const {title, artist, artwork} = track || {};
        setTrackTitle(title);
        setTrackArtist(artist);
        setTrackArtwork(artwork);
      } else if (event.type === Event.RemotePause) {
        TrackPlayer.pause();
      } else if (event.type === Event.RemotePlay) {
        TrackPlayer.play();
      } else if (event.type === Event.PlaybackQueueEnded) {
        console.log('Event.PlaybackQueueEnded fired.');
      }
    },
  );

  const getId = async () => {
    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    console.log(`Title: ${trackObject.id}`);
    if (trackObject !== undefined) {
      handleSetSongId(`${trackObject.id}`);
    }
  };
  const skipTo = React.useCallback(async () => {
    await TrackPlayer.skip(songId - 1);
  }, [songId]);

  useEffect(() => {
    skipTo();
  }, [skipTo]);

  useEffect(() => {
    LogBox.ignoreAllLogs();
    setup();
    if (songs.length !== undefined) {
      TrackPlayer.add([...tracks, ...songs]);
    }
    scrollX.addListener(({value}) => {
      //   console.log(`ScrollX : ${value} | Device Width : ${width} `);
      const index = Math.round(value / width);
      console.log('index===>', value);
      handleSkip(index);
      // TrackPlayer.skip(index);
      // let trackIndex = await TrackPlayer.getCurrentTrack(trackIndex);
      // let trackObject = await TrackPlayer.getTrack(trackIndex);
      // handleSetSongId(trackObject.id);
      //   console.log(`Index : ${index}`);
    });

    return () => {
      scrollX.removeAllListeners();
      TrackPlayer.reset();
      TrackPlayer.destroy();
      handleSetSongId(1);
    };
  }, [songs]);

  const handleError = err => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };
  const bufferedPercentage = Math.round(
    (progress.buffered / progress.duration) * 100,
  );

  const handleSkipToNext = () => {
    TrackPlayer.skipToNext();
    TrackPlayer.play();
    getId();
  };

  const handleSkipToPrevious = () => {
    TrackPlayer.skipToPrevious();
    TrackPlayer.play();
    getId();
  };

  const handleSkip = index => {
    TrackPlayer.skip(index);
    getId();
  };
  const renderSongs = ({item, index}) => {
    return (
      <Animated.View style={style.mainWrapper}>
        <View
          style={[
            style.imageWrapper,
            style.elevation,
            {transform: [{rotate: `${progress.position * 5}deg`}]},
          ]}>
          <Image
            //   source={item.artwork}
            source={{
              uri: trackArtwork
                ? trackArtwork
                : 'https://www.freepnglogos.com/uploads/apple-music-logo-circle-png-28.png',
            }}
            style={style.musicImage}
          />
        </View>
      </Animated.View>
    );
  };
  return (
    <SafeAreaView style={style.container}>
      {/* music player section */}
      <Container style={style.folderContainer}>
        <TouchableOpacity
          style={style.folderContainerItem}
          onPress={() => {
            DocumentPicker.pick({
              allowMultiSelection: true,
              type: [types.audio],
            })
              .then(pick => handleSetTracks(pick))
              .catch(handleError);
          }}>
          <Ionicons name="ios-musical-notes-sharp" size={35} color="blue" />
        </TouchableOpacity>
      </Container>

      <View style={style.mainContainer}>
        {/* Image */}
        <Animated.FlatList
          ref={songSlider}
          renderItem={renderSongs}
          data={tracks}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={true}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: scrollX},
                },
              },
            ],
            {useNativeDriver: true},
          )}
        />

        {/* Title & Artist Name */}
        <View>
          <Text style={[style.songContent, style.songTitle]}>
            {/* {songs[songIndex].title} */ trackTitle}
          </Text>
          <Text style={[style.songContent, style.songArtist]}>
            {/* {songs[songIndex].artist} */ trackArtist}
          </Text>
        </View>

        {/* songslider */}
        <View>
          <Slider
            style={style.progressBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor={COLORS.primary}
            minimumTrackTintColor={COLORS.primary}
            maximumTrackTintColor="#fff"
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
          />
          <View
            style={{
              position: 'absolute',
              backgroundColor: '#FFFF',
              justifyContent: 'center',
              alignItems: 'center',
              width: isNaN(bufferedPercentage)
                ? 0
                : (bufferedPercentage / 100) * 325,
              height: 1,
              top: 44,
              left: 16,
              borderRadius: 10,
            }}></View>

          {/* Progress Durations */}
          <View style={style.progressLevelDuraiton}>
            <Text style={style.progressLabelText}>
              {new Date(progress.position * 1000)
                .toLocaleTimeString()
                .replace('AM', '')
                .substring(3)}
            </Text>
            <Text style={style.progressLabelText}>
              {new Date((progress.duration - progress.position) * 1000)
                .toLocaleTimeString()
                .replace('AM', '')
                .substring(3)}
            </Text>
          </View>
        </View>

        {/* music control */}
        <View style={style.musicControlsContainer}>
          <TouchableOpacity onPress={() => handleSkipToPrevious()}>
            <Ionicons
              name="play-skip-back-outline"
              size={35}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
            <Ionicons
              name={
                playbackState === State.Playing
                  ? 'ios-pause-circle'
                  : 'ios-play-circle'
              }
              size={75}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSkipToNext()}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayer;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
    borderTopLeftRadius: 25,

    borderTopRightRadius: 25,
  },
  folderContainer: {
    width: '100%',
    height: 50,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    backgroundColor: '#222831',
  },
  folderContainerItem: {
    width: 70,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  musicImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  elevation: {
    elevation: 5,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  songContent: {
    textAlign: 'center',
    color: '#EEEEEE',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  songArtist: {
    fontSize: 16,
    fontWeight: '300',
  },

  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
    zIndex: 10,
  },
  progressLevelDuraiton: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#FFF',
  },

  musicControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    width: '60%',
    marginBottom: 30,
  },
});
