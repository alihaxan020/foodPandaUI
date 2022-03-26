import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container} from './elements';
import {useTheme} from '@react-navigation/native';

const SearchComponent = props => {
  const {colors} = useTheme();
  return (
    <Container style={styles.container}>
      <View style={styles.inputWrapper}>
        <Ionicons
          name="ios-search-outline"
          size={30}
          style={{paddingHorizontal: 10}}
          color={colors.text}
        />
        <TextInput
          placeholder="Search for shops & restaurants"
          style={styles.formField}
          placeholderTextColor={colors.text}
          borderWidth={0.15}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.25,
  },
  formField: {
    borderWidth: 0.5,
    paddingHorizontal: 12,
    fontSize: 16,
    height: 40,
    width: '80%',
    borderRadius: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default SearchComponent;
