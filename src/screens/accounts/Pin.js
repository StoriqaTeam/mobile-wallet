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
      pin: null,
    }
  }

  onChangePin = (pin) => {
    this.setState({ pin });
  }

  handleStoreKey = () => {
    const { callback } = this.props;
    const { pin } = this.state;
    callback(pin);
  }

  render() {
    const { pin } = this.state;
    return (
      <View style={{ marginTop: 30 }}>
        <Text style={{}}>
          Storiqa STQ PIN
        </Text>
        <View style={{ alignItems: 'center' }}>
          <Text>Enter PIN</Text>
          <TextInput
            value={pin}
            onChangeText={this.onChangePin}
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
          disabled={!pin}
        />
      </View>
    );
  }
}
