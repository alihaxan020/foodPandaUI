import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Container, Text} from '../elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../constants/theme';
const HotelCard = ({item, navigation}) => {
  const {name, image_url, location, rating, review_count} = item;
  return (
    <Container style={styles.container}>
      <Image style={{width: 100, height: 120}} source={{uri: image_url}} />
      <Container style={styles.hotelInfo}>
        <Text isBold style={styles.name}>
          {name}
        </Text>
        <Container style={styles.address}>
          <Ionicons name="location-outline" size={20} color={COLORS.primary} />
          <Text isItalic>{location.city}</Text>
        </Container>
        <Container style={styles.hotelRepo}>
          <Container style={styles.ratingContainer}>
            <Ionicons name="md-star" size={20} color={COLORS.primary} />
            <Text isItalic>{rating}</Text>
          </Container>
          <Container style={styles.ratingContainer}>
            <Text isItalic>Reviews: {review_count}</Text>
          </Container>
        </Container>
        <Container style={styles.hotelRepo}>
          <TouchableOpacity
            style={styles.addToCart}
            onPress={() =>
              navigation.navigate('HotelDetail', {
                item: item,
              })
            }>
            <Ionicons
              name="ios-fast-food-outline"
              size={20}
              color={COLORS.white}
            />
            <Text isItalic isCenter>
              VIEW MENU
            </Text>
          </TouchableOpacity>
        </Container>
      </Container>
    </Container>
  );
};

export default HotelCard;
// <Container style={styles.hotelRepo}>
// <TouchableOpacity
//   style={styles.addToCart}
//   onPress={() =>
//     navigation.navigate('CartScreen', {
//       item: item,
//     })
//   }>
//   <Ionicons name="md-cart-outline" size={20} color={COLORS.white} />
//   <Text isItalic isCenter>
//     ADD TO CARD
//   </Text>
// </TouchableOpacity>
// </Container>
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  hotelInfo: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  address: {
    flexDirection: 'row',
  },
  name: {
    marginLeft: 10,
    marginBottom: 3,
  },
  hotelRepo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 3,
  },
  iconStyle: {
    marginLeft: 20,
  },
  addToCart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    marginVertical: 5,
    height: 30,
    width: '70%',
    borderRadius: 10,
  },
});
