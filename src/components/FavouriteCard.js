import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {removeFavorite} from '../../redux/actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
const FavouriteCard = ({item}) => {
  const {colors} = useTheme();
  const IMAGE_URL = 'https://image.tmdb.org/t/p/w185' + item.poster_path;
  const dispatch = useDispatch();
  const removeFromFavorites = movie => dispatch(removeFavorite(movie));
  const handleRemoveFavorite = movie => removeFromFavorites(movie);
  return (
    <View style={Styles.container}>
      <View style={Styles.favouriteContainer}>
        <Image
          source={{
            uri: IMAGE_URL,
          }}
          resizeMode="cover"
          style={Styles.posterStyle}
        />
        <View style={Styles.infoContainer}>
          <View>
            <Text style={[Styles.titleMovie, {color: colors.text}]}>
              {item.title}
            </Text>
          </View>
          <View style={Styles.likeContainer}>
            <MaterialIcons color="green" name="thumb-up" size={32} />
            <Text style={[Styles.voteCount, {color: colors.text}]}>
              {item.vote_count}
            </Text>
            <TouchableOpacity
              onPress={() => handleRemoveFavorite(item)}
              activeOpacity={0.7}
              style={Styles.removeFavorite}>
              <MaterialIcons color="orange" size={32} name="favorite" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FavouriteCard;

const Styles = StyleSheet.create({
  container: {marginVertical: 12},
  posterStyle: {width: 100, height: 150, borderRadius: 10},
  infoContainer: {flex: 1, marginLeft: 12},
  favouriteContainer: {flexDirection: 'row', flex: 1},
  titleMovie: {fontSize: 22, paddingRight: 16},
  likeContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  voteCount: {
    fontSize: 18,
    paddingLeft: 10,
  },
  removeFavorite: {
    marginLeft: 14,
    flexDirection: 'row',
    padding: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
  },
});
