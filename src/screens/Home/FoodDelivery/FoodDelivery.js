import {StyleSheet, ScrollView, FlatList, LogBox} from 'react-native';
import React, {useEffect} from 'react';
import {Container, Text} from '../../../components/elements';
import {useDispatch, useSelector} from 'react-redux';
import {getHotels} from '../../../../redux/actions';
import Header from '../../../components/Header';
import HotelCard from '../../../components/cards/HotelCard';
import {useTheme} from '@react-navigation/native';
import {getProducts} from '../../../../redux/actions/cartActions';
import DeliveryData from '../../../data';
const FoodDelivery = ({navigation}) => {
  const {hotels} = useSelector(state => state.hotelReducer);
  const dispatch = useDispatch();
  const fetchHotels = () => dispatch(getHotels());
  const {colors} = useTheme();
  const fetchProducts = value => dispatch(getProducts(value));

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    fetchHotels();
    fetchProducts(DeliveryData);
  }, []);
  return (
    <Container style={[styles.container, {backgroundColor: colors.card}]}>
      <Header navigation={navigation} />
      <ScrollView
        style={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Text isHeadingTitle isCenter hasMargin isItalic>
          Restaurants nearby you
        </Text>
        <FlatList
          data={hotels}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <HotelCard item={item} navigation={navigation} />
          )}
        />
      </ScrollView>
    </Container>
  );
};

export default FoodDelivery;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
