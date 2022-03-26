import {Text, View} from 'react-native';
import React, {useEffect} from 'react';

const HooksTest = () => {
  // useEffect hook
  useEffect(() => {
    //mounting phase
    // console.log('render');

    //cleanup function return function inside useEffect function logic in cleanup function

    return () => {
      //unmounting phase
      // console.log('unmount');
    };
    //[] is dependency array
  }, []);
  return (
    <View>
      <Text>HooksTest</Text>
    </View>
  );
};

export default HooksTest;
