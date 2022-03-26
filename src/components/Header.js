import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Container, Text} from './elements';
import {COLORS, fontFamily} from '../../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const Header = ({navigation}) => {
  const {colors} = useTheme();
  const {cartItems} = useSelector(state => state.cartReducer);
  return (
    <Container style={[styles.container, {backgroundColor: colors.card}]}>
      <Container
        style={[styles.headerLeftContainer, {backgroundColor: colors.card}]}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          style={{marginLeft: 10}}>
          <Ionicons name="menu-outline" size={30} color={colors.primary} />
        </TouchableOpacity>
        <Container style={{paddingLeft: 15, backgroundColor: colors.card}}>
          <Text style={[styles.currentLocation, {color: colors.primary}]}>
            Current Location
          </Text>
          <Text style={[styles.locationUser, {color: colors.text}]}>
            Cubator 1 Sunrise Avenue
          </Text>
        </Container>
      </Container>
      <Container style={{backgroundColor: colors.card}}>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <Ionicons
            name="ios-cart-outline"
            size={25}
            color={colors.primary}
            style={styles.cart}
          />
          {cartItems.length > 0 && (
            <Container
              style={{
                backgroundColor: colors.primary,
                width: 25,
                height: 25,
                borderRadius: 12.5,
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                top: -10,
                left: 10,
              }}>
              <Text style={{color: colors.text}} isCenter>
                {cartItems.length}
              </Text>
            </Container>
          )}
        </TouchableOpacity>
      </Container>
    </Container>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    paddingLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  currentLocation: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: fontFamily.fontItalic,
  },
  locationUser: {
    fontSize: 14,
    fontFamily: fontFamily.fontItalic,
  },
  cart: {
    paddingRight: 30,
  },
});
