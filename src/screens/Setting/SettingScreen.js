import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {HooksTest} from '../../components';
import {useFetch} from '../../hooks';
import {COLORS} from '../../../constants/theme';
import {useTheme} from '@react-navigation/native';
import CbCounter from '../../components/CbCounter';
const SettingScreen = ({navigation}) => {
  const {colors} = useTheme();
  //useState hook
  //counter is current state while setCounter mutate the counter value
  const [counter, setCounter] = useState(0);
  const [cbCounter, setCbCounter] = useState(0);
  const [email, setEmail] = useState('');
  const [toggle, setToggle] = useState(true);
  const [fetchCounter, setFetchCounter] = useState(0);
  // useEffect hook
  useEffect(() => {
    //mounting phase  componentDidMount
    // console.log('render');

    //cleanup function return function inside useEffect function logic in cleanup function
    return () => {
      //unmounting phase
      // console.log('unmount');
    };
    //[] is dependency array componentDidUpdate(if we pass value in array)
  }, [email]);

  //custom hook to fetch url data
  const {data, loading} = useFetch(
    `http://numbersapi.com/${fetchCounter}/trivia`,
  );
  // useRef Hook reference
  const inputRef = useRef();

  //callback hook

  const increment = React.useCallback(() => {
    setCbCounter(prevState => prevState + 1);
  }, [setCbCounter]);
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.counterContainer}>
        <Button
          onPress={() => setCounter(prevState => prevState - 1)}
          title="Decrement"
          color={COLORS.red}
        />
        <Text style={[styles.heading, {color: colors.text}]}>
          Counter Value: {counter}
        </Text>
        <Button
          onPress={() => setCounter(prevState => prevState + 1)}
          title="Increment"
          color={COLORS.green}
        />
      </View>
      <View style={styles.effectContainer}>
        <Text style={[styles.heading, {color: colors.text}]}>Email</Text>
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            {backgroundColor: colors.background, color: colors.text},
          ]}
          placeholder="Enter email address"
          placeholderTextColor={colors.text}
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={[styles.heading, {color: colors.text}]}>
          Your email: {email}
        </Text>
        <TouchableOpacity
          style={styles.toggle}
          onPress={() => inputRef.current.focus()}>
          <Text style={styles.heading}>Focus</Text>
        </TouchableOpacity>
        <Text style={[styles.heading, {color: colors.text}]}>
          Mounting and unmounting Component
        </Text>
        {toggle && <HooksTest />}
        <TouchableOpacity
          style={styles.toggle}
          onPress={() => setToggle(!toggle)}>
          <Text style={styles.heading}>Toggle Component Visibility</Text>
        </TouchableOpacity>
        <Text style={[styles.heading, {color: colors.text}]}>
          {loading ? 'Loading....' : data}
        </Text>
        <TouchableOpacity
          style={styles.toggle}
          onPress={() => setFetchCounter(prevState => prevState + 1)}>
          <Text style={styles.heading}>Fetch Next Data {fetchCounter}</Text>
        </TouchableOpacity>
        <View style={[styles.counterContainer, {paddingVertical: 10}]}>
          <Text style={[styles.heading, {color: colors.text}]}>
            CB Counter Value: {cbCounter}
          </Text>
          {/*callback*/}
          <CbCounter increment={increment} />
        </View>
        <TouchableOpacity
          style={styles.toggle}
          onPress={() => navigation.navigate('ImageUploadScreen')}>
          <Text style={styles.heading}>Go To Image Upload Screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 1,
  },
  effectContainer: {
    borderBottomWidth: 1,
    height: '80%',
    borderBottomColor: COLORS.primary,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    color: COLORS.grayLight,
    paddingLeft: 10,
  },
  toggle: {
    width: '60%',
    height: 50,
    backgroundColor: COLORS.blueLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
