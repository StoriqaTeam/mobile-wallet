// @flow

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { Button } from '@components/common'

const Error = (props: PropsType) => (
  <View style={styles.container}>
    <Image source={require('./img/error.png')} style={styles.image} />
    <Text style={styles.descLabel}>
      Please try again later - server{'\n'}
      is overloaded currently
    </Text>
    <Button
      text="OK"
      type="default"
      style={{ width: 203, marginBottom: 120 }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    marginTop: 150,
  },
  amountLabel: {
    textAlign: 'center',
    fontSize: 30,
  },
  descLabel: {
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Error;
