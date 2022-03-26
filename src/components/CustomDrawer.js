import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {height} = Dimensions.get('screen');
import {useTheme} from '@react-navigation/native';
const CustomDrawer = props => {
  const {colors} = useTheme();
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: colors.background}}>
        <View
          style={[styles.headerContainer, {backgroundColor: colors.primary}]}>
          <TouchableWithoutFeedback
            onPress={() => props.navigation.navigate('Profile')}>
            <Text style={styles.textStyle}>Log in / Create account</Text>
          </TouchableWithoutFeedback>
        </View>
        <TouchableOpacity
          onPress={() => alert('Navigate to help center screen')}>
          <View style={styles.helpContainer}>
            <Ionicons
              name="md-help-circle-outline"
              size={30}
              style={{paddingHorizontal: 10}}
              color={colors.primary}
            />
            <Text style={[styles.textStyle, {color: colors.text}]}>
              Help Center
            </Text>
          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SettingScreen')}>
              <Text style={[styles.textStyle, {color: colors.text}]}>
                Settings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('terms and conditions')}>
              <Text style={[styles.textStyle, {color: colors.text}]}>
                Terms & Conditions / Privacy
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  headerContainer: {
    height: height * 0.25,
    justifyContent: 'flex-end',
    padding: 15,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Muli',
  },
  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.15,
    height: 60,
  },
  footerContainer: {
    paddingHorizontal: 15,
    height: 100,
    justifyContent: 'space-evenly',
  },
});
