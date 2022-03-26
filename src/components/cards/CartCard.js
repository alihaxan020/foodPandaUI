import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Container, Text} from '../elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  removeFromCart,
  addQuantity,
  subtractQuantity,
  emptyCart,
} from '../../../redux/actions/cartActions';
import {COLORS} from '../../../constants/theme';
import {useTheme} from '@react-navigation/native';
const CartCard = ({item}) => {
  const {id, name, price, quantity, image, selected} = item;
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const handleAddQuantity = id => dispatch(addQuantity(id));
  const handleSubtractQuantity = id => dispatch(subtractQuantity(id));
  const handleRemoveFromCart = id => dispatch(removeFromCart(id));

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
        <Container style={styles.address}>
          <TouchableOpacity
            onPress={() => handleSubtractQuantity(id)}
            disabled={quantity == 1 ? true : false}>
            <Ionicons
              name="ios-remove-circle-outline"
              size={30}
              color={quantity == 1 ? colors.background : colors.primary}
            />
          </TouchableOpacity>
          <Text isItalic isCenter style={styles.quantity}>
            quantity: {quantity}
          </Text>
          <TouchableOpacity onPress={() => handleAddQuantity(id)}>
            <Ionicons
              name="ios-add-circle-outline"
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>
        </Container>
        <Container style={styles.removeBtn}>
          <TouchableOpacity
            style={styles.addToCart}
            onPress={() => handleRemoveFromCart(id)}>
            <Text isItalic isCenter>
              REMOVE
            </Text>
          </TouchableOpacity>
        </Container>
      </Container>
    </Container>
  );
};

export default CartCard;

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
    justifyContent: 'center',
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
  removeBtn: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
