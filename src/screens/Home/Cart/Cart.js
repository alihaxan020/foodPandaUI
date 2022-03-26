import {StyleSheet, ScrollView, FlatList, Image} from 'react-native';
import React from 'react';
import {Container, Text} from '../../../components/elements';
import Header from '../../../components/Header';
import CartCard from '../../../components/cards/CartCard';
import {useSelector, useDispatch} from 'react-redux';
import {useTheme} from '@react-navigation/native';
const Cart = ({navigation}) => {
  const {cartItems} = useSelector(state => state.cartReducer);
  const total = cartItems.reduce(
    //reduce go through the array and cartItem is the each item in the array
    (accumulatedTotal, cartItem) =>
      accumulatedTotal + cartItem.price * cartItem.quantity,
    0, //0 is the start point of accumulatedTotal
  );
  console.log('Total: ', total);
  const {colors} = useTheme();
  return (
    <Container style={[styles.container, {backgroundColor: colors.card}]}>
      <Header navigation={navigation} />
      <Text isHeadingTitle isCenter>
        Your Cart
      </Text>
      <Text isHeadingTitle isCenter>
        Total Amount: {total} USD
      </Text>

      <ScrollView
        style={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <CartCard item={item} navigation={navigation} />
          )}
        />
      </ScrollView>
    </Container>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
});
