import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {Container, Text} from '../../components/elements';
import axios from 'axios';
//react-hook form
import {useForm, Controller} from 'react-hook-form';
import {useTheme} from '@react-navigation/native';
import {COLORS} from '../../../constants/theme';
import {useDispatch} from 'react-redux';
import {setUserData} from '../../../redux/actions';
const SignInScreen = ({navigation}) => {
  const {colors} = useTheme();
  const {
    control,
    handleSubmit,
    formState: {errors},
    register,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  //redux
  const dispatch = useDispatch();
  const handleSetUserData = async value => {
    // const email = value.emil;
    // const password = value.firstName;
    const response = await axios.post(
      'https://dyslexia-backend.herokuapp.com/sign-in',
      {email: value.email, password: value.password},
    );
    console.log(response.data);
    if (response.data.success) {
      dispatch(setUserData(response.data.user));
      navigation.goBack();
    } else {
      alert(response.data.message);
    }
  };

  const onSubmit = data => {
    handleSetUserData(data);
  };
  return (
    <Container style={styles.container}>
      <Text isCenter isHeadingTitle hasMargin>
        SignInScreen
      </Text>
      <Container>
        <Container style={styles.fieldContainer}>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.card,
                    color: colors.text,
                    borderWidth: 1,
                    borderColor: errors.email ? 'red' : colors.border,
                  },
                ]}
                {...register('email', {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please enter a valid email',
                  },
                })}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your email"
                placeholderTextColor={colors.border}
                autoCapitalize="none"
              />
            )}
            name="email"
          />
        </Container>
        {errors.email && (
          <Text isPrimary style={styles.errorStyle}>
            {errors.email.message ? `${errors.email.message}` : 'Required!'}
          </Text>
        )}
        <Container style={styles.fieldContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            {...register('password', {
              minLength: 8,
            })}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.card,
                    color: colors.text,
                    borderWidth: 1,
                    borderColor: errors.password ? 'red' : colors.border,
                  },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your password"
                placeholderTextColor={colors.border}
                autoCapitalize="none"
              />
            )}
            name="password"
          />
        </Container>
        {errors.password && (
          <Text isPrimary style={styles.errorStyle}>
            Password should 8 characters long
          </Text>
        )}
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.submitBtn, {backgroundColor: COLORS.primary}]}
            onPress={handleSubmit(onSubmit)}>
            <Text isCenter isHeadingTitle>
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.submitBtn, {backgroundColor: COLORS.red}]}
            onPress={() => reset()}>
            <Text isCenter isHeadingTitle>
              Reset Values
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    </Container>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: '90%',
    borderRadius: 10,
    paddingLeft: 10,
    borderWidth: 1,
  },
  errorStyle: {
    marginLeft: 20,
    marginTop: 5,
  },
  submitBtn: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  btnContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  fieldContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
