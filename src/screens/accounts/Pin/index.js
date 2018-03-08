// @flow

import '../../../../global';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

import { Button, TextInput } from '@components/common';
import { QRSCANNER } from '@constants';

import styles from './styles';

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
  };

  handleStoreKey = () => {
    const { callback } = this.props;
    const { pin } = this.state;
    callback(pin);
  };

  render() {
    const { pin } = this.state;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={64}
        behavior="height"
        style={styles.container}
      >
        <Image source={require('./img/lock.png')} style={styles.image} />
        <Text style={styles.label}>
          Make and remember 4-digit{'\n'}
          pin-code to use while sending money
        </Text>
        <View>
          <TextInput
            value={pin}
            onChangeText={this.onChangePin}
            keyboardType="numeric"
            maxLength={5}
            style={styles.input}
            autoFocus
            caretHidden
            borderBottomColor="#BCBCBC"
            textColor="#BCBCBC"
            secureTextEntry
          />
          <Button
            onClick={this.handleStoreKey}
            text="Create"
            type="default"
            disabled={!pin}
            style={styles.button}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
