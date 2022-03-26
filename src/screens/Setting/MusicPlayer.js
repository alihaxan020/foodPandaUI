import {
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, Text} from '../../components/elements';
import TracksList from './TrackList/TrackList';
import {useSelector, useDispatch} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import tracks from '../../utils/tracks';
import {setSongId} from '../../../redux/actions';

const MusicPlayer = () => {
  const {colors} = useTheme();
  // redux
  const {songs, songId} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const handleChangeId = id => dispatch(setSongId(id));

  const [songsList, setSongsList] = useState(tracks);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    if (songs.length !== undefined) {
      setSongsList([...tracks, ...songs]);
    }
  }, [songs]);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.flatRenderItem,
          {
            backgroundColor:
              item.id == songId ? colors.primary : colors.background,
          },
        ]}
        onPress={() => handleChangeId(item.id)}>
        <Container
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{
              uri: item.artwork
                ? item.artwork
                : 'https://www.freepnglogos.com/uploads/apple-music-logo-circle-png-28.png',
            }}
          />
        </Container>
        <Container
          style={{
            paddingHorizontal: 10,
            flex: 1,
            backgroundColor:
              item.id == songId ? colors.primary : colors.background,
          }}>
          <Text style={{flexShrink: 1}}>{item.title}</Text>
        </Container>
      </TouchableOpacity>
    );
  };
  return (
    <Container style={(styles.container, {backgroundColor: colors.card})}>
      <Text selectable isHeadingTitle isItalic hasMargin isCenter>
        InifinityBits Task
      </Text>
      <ScrollView style={styles.songsContainer}>
        <Container
          style={(styles.containerBtn, {backgroundColor: colors.card})}>
          <FlatList
            data={songsList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </Container>
      </ScrollView>
      <Container style={styles.songsContainer}>
        <TracksList />
      </Container>
    </Container>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  songsContainer: {
    height: '50%',
    width: '100%',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  containerBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatRenderItem: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
});
