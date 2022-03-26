import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Container} from '../../components/elements';
import {useTheme} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

//redux
import {useSelector, useDispatch} from 'react-redux';
import {setUserProfile} from '../../../redux/actions';
const ImageUploader = ({navigation}) => {
  const {colors} = useTheme();
  //Select Image
  //redux
  const {user} = useSelector(state => state.userReducer);

  const dispatch = useDispatch();
  const handleSetProfile = image => dispatch(setUserProfile(image));
  //redux end
  const cameraImage = () => {
    var options = {
      quality: 0.75,
      mediaType: 'photo',
    };
    launchCamera(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res.assets[0].uri;
        handleSetProfile(source);
      }
    });
  };
  const selectImage = () => {
    var options = {
      mediaType: 'photo',
      quality: 0.75,
    };
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res.assets[0].uri;
        handleSetProfile(source);
      }
    });
  };

  return (
    <Container style={styles.container}>
      <Text style={[styles.heading, {color: colors.text}]}>ImageUploader</Text>
      <View style={styles.imageContainer}>
        <Image
          style={[styles.image, {borderColor: colors.text}]}
          source={{
            uri: user.avatar,
          }}
        />
      </View>
      <View style={[styles.btnContainer, {borderColor: colors.text}]}>
        <TouchableOpacity
          onPress={() => cameraImage()}
          style={[styles.selectImage, {backgroundColor: colors.text}]}>
          <Text style={[styles.heading, {color: colors.background}]}>
            Launch Camera directly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectImage()}
          style={[styles.selectImage, {backgroundColor: colors.text}]}>
          <Text style={[styles.heading, {color: colors.background}]}>
            Launch Image Gallery directly
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('VideoPlayerScreen')}
          style={[
            styles.selectImage,
            {backgroundColor: colors.text, width: '60%'},
          ]}>
          <Text style={[styles.heading, {color: colors.background}]}>
            Go To video Player
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MusicPlayerScreen')}
          style={[
            styles.selectImage,
            {backgroundColor: colors.text, width: '60%'},
          ]}>
          <Text style={[styles.heading, {color: colors.background}]}>
            Go To Music Player
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default ImageUploader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    alignSelf: 'center',
    paddingVertical: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
  },
  imageContainer: {
    alignItems: 'center',
  },
  btnContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  selectImage: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
