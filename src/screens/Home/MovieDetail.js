import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
const MovieDetail = ({route, navigation}) => {
  const {movie} = route.params;
  const IMAGE_URL = 'https://image.tmdb.org/t/p/w185' + movie.poster_path;
  React.useEffect(() => {
    console.log(movie.id);
  }, []);
  return (
    <ImageBackground style={styles.container} source={{uri: IMAGE_URL}}>
      <View style={styles.detailContainer}>
        <View style={styles.posterContainer}>
          <Image source={{uri: IMAGE_URL}} style={styles.poster} />
          <TouchableOpacity
            style={styles.backBtnContainer}
            onPress={() => navigation.goBack()}>
            <Ionicons name="ios-arrow-back-sharp" color="#E21A70" size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.movieTitleContainer}>
          <Text style={styles.heading}>{movie.original_title}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.movieInfo}>
            <View style={styles.releaseContainer}>
              <Text style={styles.heading}>Release Date: </Text>
              <Text style={styles.subHeading}>{movie.release_date}</Text>
            </View>
            <View style={styles.overviewContainer}>
              <Text style={styles.heading}>Overview</Text>
              <Text style={styles.subHeading}>{movie.overview}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  heading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFF',
    fontFamily: 'Muli',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '300',
    color: '#FFFF',
    fontFamily: 'Muli',
  },
  movieInfo: {
    paddingHorizontal: 20,
  },
  overviewContainer: {marginTop: 10},
  releaseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  movieTitleContainer: {alignItems: 'center', paddingVertical: 10},
  backBtnContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    top: 60,
    left: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  poster: {width: '100%', height: '100%', borderRadius: 20},
  posterContainer: {height: '50%', position: 'relative'},
  scrollContainer: {paddingBottom: 50},
});
