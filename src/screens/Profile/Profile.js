import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Container, Text} from '../../components/elements';
import {COLORS} from '../../../constants/theme';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
const Profile = ({navigation}) => {
  const {user} = useSelector(state => state.userReducer);
  const {colors} = useTheme();
  const ref = firestore().collection('users');
  const [users, setUsers] = useState([]);

  React.useEffect(() => {
    const unsubscribe = ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {name, email, password} = doc.data();
        list.push({
          id: doc.id,
          name,
          email,
          password,
        });
      });
      setUsers(list);
      console.log(list[0].name);
    });
    return () => unsubscribe();
  }, []);

  console.log('Users===>', users);
  return (
    <Container style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageStyle}
          source={{uri: user.avatar}}
          resizeMode="cover"
        />
      </View>
      <Text isCenter hasMargin isHeadingTitle>
        Profile
      </Text>

      <View style={styles.userInfo}>
        <Text hasMargin isHeadingTitle>
          Name: {user.name}
        </Text>
        <Text hasMargin isHeadingTitle>
          Email: {user.email}
        </Text>
        <Text hasMargin isHeadingTitle>
          Age: {user.age}
        </Text>
        <Text hasMargin isHeadingTitle>
          Gender: {user.gender}
        </Text>
        <Text hasMargin isHeadingTitle>
          password: {user.password}
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.signInbtn}
          onPress={() => navigation.navigate('SignInScreen')}>
          <Text isCenter hasMargin isHeadingTitle>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageStyle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
  },
  signInbtn: {
    padding: 20,
    backgroundColor: COLORS.primary,
    width: 100,
    borderRadius: 10,
  },
  btnContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  userInfo: {
    paddingLeft: 20,
  },
});
