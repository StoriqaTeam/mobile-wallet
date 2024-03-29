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
import { MainLayout } from '@layouts';
import Navbar from '@components/common/Navbar';
import { Button, TextInput } from '@components/common';
import { QRSCANNER } from '@constants';
import styles from './styles';

type PropsType = {
  callback: (v: string) => void,
};

type StateType = {
  amount: string,
};

export default class AccountPin extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    // console.log('### AccountPin constructor props: ', props);
    this.state = {
      amount: null,
    }
  }

  onChangeAmount = (amount) => {
    this.setState({ amount });
  };

  handleStoreKey = () => {
    const { callback } = this.props;
    const { amount } = this.state;
    callback(amount);
  };

  render() {
    const { amount } = this.state;
    return (
      <MainLayout
        navbar={
          <Navbar title="Amount" back />
        }
      >
        <KeyboardAvoidingView
          behavior="height"
          style={styles.container}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: 15 })}
        >
          <Image source={require('./img/wallet.png')} style={styles.image} />
          <Text style={styles.label}>
            Enter amount
        </Text>
          <View>
            <TextInput
              value={amount}
              onChangeText={this.onChangeAmount}
              keyboardType="numeric"
              style={styles.input}
              autoFocus
              caretHidden
              borderBottomColor="#BCBCBC"
              textColor="#BCBCBC"
            />
            <Button
              onClick={this.handleStoreKey}
              text="Create"
              type="default"
              disabled={!amount}
              style={styles.button}
            />
          </View>
        </KeyboardAvoidingView>
      </MainLayout>
    );
  }
}
