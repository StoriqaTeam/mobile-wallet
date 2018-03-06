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
import Aes from 'react-native-aes-crypto';
import { Actions } from 'react-native-router-flux';
import { KEYGENERATOR, QRGENERATOR, AMOUNT, QRSCANNER } from '../../constants';
import AccountComponent from '../../components/Account';


export default class Account extends Component<PropsType, StateType> {

  onCreatePaymentCallback = (amount) => {
    const { account } = this.props;
    console.log('**** ON create payment amount: ', amount);
    Actions.push(QRGENERATOR, { text: `${account.address}.${amount}` });
  }

  handleCreatePayment = () => {
    const { account } = this.props;
    console.log('**** ON PRESS account: ', account);
    Actions.push(AMOUNT, { callback: this.onCreatePaymentCallback });
  }

  onCreateTransactionCallback = text => {
    const { account } = this.props;
    console.log('**** ON onCreateTransactionCallback qr text: ', text);
  }

  handleCreateTransaction = () => {
    Actions.push(QRSCANNER, { callback: this.onCreateTransactionCallback });
  }

  render() {
    const { account } = this.props;
    console.log('****** account this.props: ', { ...this.props });
    return (
      <View style={{ marginTop: 30 }}>
        <Text style={{}}>Account</Text>
        <Text style={{}}>{account.address}</Text>
        <Text style={{}}>{account.balance}</Text>
        <Button
          onPress={this.handleCreatePayment}
          title="Create Pyament"
          color="#841584"
        />
        <Button
          onPress={this.handleCreateTransaction}
          title="Create Transaction by QR"
          color="#841584"
        />
      </View>
    );
  }
}
