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
  Keyboard,
} from 'react-native';
import { MainLayout } from '@layouts';
import Navbar from '@components/common/Navbar';
import { Button, TextInput } from '@components/common';
import { QRSCANNER, SUCCESS } from '@constants';
import styles from './styles';
import { Actions } from 'react-native-router-flux';
import store from '@store';


type PropsType = {
  callback: (v: string) => void,
};

type StateType = {
  pin: string,
};

export default class AccountPin extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      pin: null,
    }
  }

  // componentDidMount() {
  //   console.log('REF: ', this.textInput)
  //   this.refs.textInput.focus();
  // }

  onChangePin = (pin) => {
    this.setState({ pin });
  };

  handleStoreKey = () => {
    Keyboard.dismiss();
    const { callback } = this.props;
    const { pin } = this.state;
    
    callback(pin);
  };

  render() {
    const { pin } = this.state;
    return (
      <MainLayout
        navbar={
          <Navbar title="Pin-code" back />
        }
      >
        <KeyboardAvoidingView
          behavior="height"
          style={styles.container}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: 15 })}
        >
          <Image source={require('./img/lock.png')} style={styles.image} />
          <Text style={styles.label}>
            Make and remember 4-digit{'\n'}
            pin-code to use while sending money
          </Text>
          <View>
            <TextInput
              ref="textInput"
              value={pin}
              onChangeText={this.onChangePin}
              keyboardType="numeric"
              returnKeyType="done"
              maxLength={5}
              style={styles.input}
              caretHidden
              borderBottomColor="#BCBCBC"
              underlineColorAndroid="transparent"
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
      </MainLayout>
    );
  }
}
