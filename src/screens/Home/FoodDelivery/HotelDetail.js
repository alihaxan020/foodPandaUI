import {StyleSheet, ScrollView, FlatList, Image, LogBox} from 'react-native';
import React, {useEffect} from 'react';
import {Container, Text} from '../../../components/elements';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import {useTheme} from '@react-navigation/native';
import MenuCard from '../../../components/cards/MenuCard';
import {COLORS} from '../../../../constants';
import {getProducts} from '../../../../redux/actions/cartActions';
import {DeliveryData} from '../../../data';
const HotelDetail = ({navigation, route}) => {
  const {image_url, name, location, phone} = route.params.item;
  const {hotels} = useSelector(state => state.hotelReducer);
  const dispatch = useDispatch();
  const {products} = useSelector(state => state.cartReducer);
  const {colors} = useTheme();
  const fetchProducts = value => dispatch(getProducts(value));
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    fetchProducts(DeliveryData);
  }, []);
  return (
    <Container style={[styles.container, {backgroundColor: colors.card}]}>
      <Header navigation={navigation} />
      <Image
        style={{width: '100%', height: 180, borderRadius: 10}}
        source={{uri: image_url}}
      />
      <Text isHeadingTitle isCenter isBold isItalic>
        {name}
      </Text>
      <Container style={styles.address}>
        <Ionicons
          name="location-outline"
          size={20}
          color={colors.primary}
          style={styles.iconStyle}
        />
        <Text isItalic>
          {location.address1},{location.city}
        </Text>
      </Container>
      <Container style={styles.address}>
        <Foundation
          name="telephone"
          size={20}
          color={colors.primary}
          style={styles.iconStyle}
        />
        <Text isItalic>{phone}</Text>
      </Container>
      <ScrollView
        style={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <MenuCard item={item} navigation={navigation} />
          )}
        />
      </ScrollView>
    </Container>
  );
};

export default HotelDetail;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  address: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
  iconStyle: {
    marginRight: 10,
  },
});
