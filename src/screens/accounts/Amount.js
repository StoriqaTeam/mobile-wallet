/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

// @flow
import '../../../global';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import { Actions } from 'react-native-router-flux';
import QRCode from 'react-native-qrcode';
import { QRSCANNER } from '../../constants';


type PropsType = {
  callback: (v: string) => void,
};

type StateType = {
  pin: string,
};

export default class AccountPin extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    console.log('### AccountPin constructor props: ', props);
    this.state = {
      amount: null,
    }
  }

  onChangeAmount = (amount) => {
    this.setState({ amount });
  }

  handleStoreKey = () => {
    const { callback } = this.props;
    const { amount } = this.state;
    callback(amount);
  }

  render() {
    const { amount } = this.state;
    return (
      <View style={{ marginTop: 30 }}>
        <Text style={{}}>
          Storiqa STQ amount
        </Text>
        <View style={{ alignItems: 'center' }}>
          <Text>Enter amount</Text>
          <TextInput
            value={amount}
            onChangeText={this.onChangeAmount}
            keyboardType="numeric"
            maxLength={5}
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
            style={{ margin: 16, padding: 5, borderWidth: 1, width: '90%', textAlign: 'center' }}
          />
        </View>
        <Button
          onPress={this.handleStoreKey}
          title="Store privateKey"
          color="#841584"
          disabled={!amount}
        />
      </View>
    );
  }
}
