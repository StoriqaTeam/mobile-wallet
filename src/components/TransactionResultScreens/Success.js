// @flow

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { Button } from '@components/common'

type PropsType = {
  amount: string,
};

const Success = (props: PropsType) => (
  <View style={styles.container}>
    <Image source={require('./img/success.png')} style={styles.image} />
    <View>
      <Text style={styles.amountLabel}>
        {`${props.amount} STQ`}
      </Text>
      <Text style={styles.descLabel}>
        was successfully transferred{'\n'}
        to your wallet
      </Text>
    </View>
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

export default Success;
