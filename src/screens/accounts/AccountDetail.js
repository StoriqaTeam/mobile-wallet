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
import { KEYGENERATOR, QRGENERATOR, AMOUNT, QRSCANNER, PIN, SUCCESS, ERROR } from '@constants';
import AccountComponent from '../../components/Account';


export default class Account extends Component<PropsType, StateType> {

  onCreatePaymentCallback = (amount) => {
    const { account } = this.props;
    Actions.push(QRGENERATOR, { text: `${account.address}.${amount}` });
  }

  handleCreatePayment = () => {
    const { account } = this.props;
    Actions.push(AMOUNT, { callback: this.onCreatePaymentCallback });
  }

  onGetPin = async ({ account, paymentStr, pin }) => {
    const result = await account.createTransaction({ paymentStr, pin });
    if (result) {
      Actions.push(SUCCESS, { result })
    } else {
      Actions.push(ERROR)
    }
  }

  onCreateTransactionCallback = paymentStr => {
    const { account } = this.props;
    console.log('**** ON onCreateTransactionCallback qr text: ', paymentStr);
    // console.log('**** ON onCreateTransactionCallback account: ', account);
    Actions.push(PIN, { callback: pin => this.onGetPin({ account, paymentStr, pin })});
  }

  handleCreateTransaction = () => {
    // commit Action.push for development and force onCreateTransactionCallback
    // Actions.push(QRSCANNER, { callback: this.onCreateTransactionCallback });

    // start remove this block
    const str = '0x134c2658d60a06333FF0e5CE47cEaC800b3Aa608.1';
    this.onCreateTransactionCallback(str);
    // end remove this block
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
