import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addFavorite, removeFavorite} from '../../redux/actions';
import {useTheme} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const FavoriteScreen = () => {
  const {movies, favorites} = useSelector(state => state.moviesReducer);
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const addToFavorites = movie => dispatch(addFavorite(movie));
  const removeFromFavorites = movie => dispatch(removeFavorite(movie));

  const handleAddFavorite = movie => {
    addToFavorites(movie);
  };

  const handleRemoveFavorite = movie => {
    removeFromFavorites(movie);
  };

  const exists = movie => {
    if (favorites.filter(item => item.id === movie.id).length > 0) {
      return true;
    }

    return false;
  };
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.textHeader, {color: colors.text}]}>
        Popular Movies
      </Text>
      <View style={styles.flatListContainer}>
        <FlatList
          data={movies}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            const IMAGE_URL =
              'https://image.tmdb.org/t/p/w185' + item.poster_path;
            return (
              <View style={{marginVertical: 12}}>
                <View style={styles.movieContainer}>
                  <Image
                    source={{
                      uri: IMAGE_URL,
                    }}
                    resizeMode="cover"
                    style={styles.posterStyle}
                  />
                  <View style={styles.voteContainer}>
                    <View>
                      <Text style={[styles.movieTitle, {color: colors.text}]}>
                        {item.title}
                      </Text>
                    </View>
                    <View style={styles.likeBtn}>
                      <MaterialIcons color="green" name="thumb-up" size={32} />
                      <Text
                        style={[styles.voteCountStyle, {color: colors.text}]}>
                        {item.vote_count}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          exists(item)
                            ? handleRemoveFavorite(item)
                            : handleAddFavorite(item)
                        }
                        activeOpacity={0.7}
                        style={styles.favoriteBtn}>
                        <MaterialIcons
                          color="orange"
                          size={32}
                          name={exists(item) ? 'favorite' : 'favorite-outline'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 20},
  textHeader: {fontSize: 22},
  flatListContainer: {flex: 1, marginTop: 12},
  favoriteBtn: {
    marginLeft: 14,
    flexDirection: 'row',
    padding: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
  },
  likeBtn: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  movieTitle: {fontSize: 22, paddingRight: 16},
  voteCountStyle: {
    fontSize: 18,
    paddingLeft: 10,
  },
  movieContainer: {flexDirection: 'row', flex: 1},
  posterStyle: {width: 100, height: 150, borderRadius: 10},
  voteContainer: {flex: 1, marginLeft: 12},
});
