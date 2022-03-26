import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Container, Text} from '../elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../../redux/actions/cartActions';
import {COLORS} from '../../../constants/theme';
const MenuCard = ({navigation, item}) => {
  const {id, name, price, quantity, image, selected} = item;
  const dispatch = useDispatch();
  const {cartItems} = useSelector(state => state.cartReducer);
  const handleAddToCard = id => dispatch(addToCart(id));
  // console.log('products===>', products);
  return (
    <Container style={styles.container}>
      <Image style={{width: 120, height: 150}} source={{uri: image}} />
      <Container style={styles.hotelInfo}>
        <Text isBold style={styles.name}>
          {name}
        </Text>
        <Container style={styles.address}>
          <Text isItalic isCenter>
            Price: {price} USD
          </Text>
        </Container>

        <Container style={styles.hotelRepo}>
          {cartItems.some(item => item.id === id) ? (
            <TouchableOpacity
              style={[styles.addToCart, {backgroundColor: COLORS.green}]}
              onPress={() => navigation.navigate('CartScreen')}>
              <Ionicons
                name="ios-cart-outline"
                size={20}
                color={COLORS.white}
              />
              <Text isItalic isCenter style={styles.goCart}>
                GO TO CART
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addToCart}
              onPress={() => handleAddToCard(id)}>
              <Ionicons
                name="ios-cart-outline"
                size={20}
                color={COLORS.white}
              />
              <Text isItalic isCenter>
                ADD TO CART
              </Text>
            </TouchableOpacity>
          )}
        </Container>
      </Container>
    </Container>
  );
};

export default MenuCard;
// <Container style={styles.address}>
// <Ionicons name="ios-remove-circle-outline" size={30} />
// <Text isItalic isCenter style={styles.quantity}>
//   quantity: {quantity}
// </Text>
// <Ionicons name="ios-add-circle-outline" size={30} />
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
    justifyContent: 'space-around',
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
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
  quantity: {
    paddingHorizontal: 10,
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
  goCart: {
    color: COLORS.white,
  },
});
