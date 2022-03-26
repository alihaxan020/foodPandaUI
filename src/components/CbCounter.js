import {Text, View, Button} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {useCountRenders} from '../hooks/useCountRenders';
export const CbCounter = React.memo(({increment}) => {
  const {colors} = useTheme();
  useCountRenders();

  return (
    <View>
      <Button onPress={increment} title="Increment" color="green" />
      <Text style={{fontSize: 20, color: colors.text}}> CB Counter Value</Text>
    </View>
  );
});

export default CbCounter;
