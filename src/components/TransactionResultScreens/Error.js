// @flow

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { Button } from '@components/common'
import { Actions } from 'react-native-router-flux';
import { ACCOUNTS } from '@constants';


const Error = ({ error }) => (
  <View style={styles.container}>
    <Image source={require('./img/error.png')} style={styles.image} />
    {error &&
      <Text>{error}</Text> ||
      <Text style={styles.descLabel}>
        Please try again later - server{'\n'}
        is overloaded currently
      </Text>
    }
    <Button
      onClick={() => Actions.push(ACCOUNTS)}
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
