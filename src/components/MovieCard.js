import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
const MovieCard = ({navigation, item}) => {
  const IMAGE_URL = 'https://image.tmdb.org/t/p/w185' + item.poster_path;
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() =>
        navigation.navigate('MovieDetail', {
          movie: item,
        })
      }>
      <Image
        source={{
          uri: IMAGE_URL,
        }}
        style={styles.poster}
      />

      <Text style={[styles.movieTitle, {color: colors.text}]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
    width: 180,
    marginRight: 10,
  },
  poster: {width: '100%', height: 180, borderRadius: 10},
  movieTitle: {
    fontSize: 16,
    paddingTop: 10,
    fontWeight: '600',
  },
});
