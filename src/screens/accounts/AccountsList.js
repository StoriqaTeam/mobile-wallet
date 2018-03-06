/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

// @flow
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
} from 'react-native';
import Aes from 'react-native-aes-crypto';
import { Actions } from 'react-native-router-flux';
import store from '@store';
import { ACCOUNTS, KEYGENERATOR, PIN, QRSCANNER } from '@constants';
import { AccountComponent } from '@components';


type PropsType = {
}

type AccountType = {
  publicKey: string,
  privateKey: string,
  accountState: number,
}

type StateType = {
  accounts: AccountType[],
}

export default class Accounts extends Component<PropsType, StateType> {
  // пушим экран ввода Pin и передаем колбэк который вызывается
  // в методе handleStoreKey Pin 
  handleCreateAccount = () => {
    Actions.push(PIN, { callback: this.newAccountPinCallback });
  }

  newAccountPinCallback = (pin: string) => {
    store.createAccount(pin);
    Actions.pop();
  }
  // пушим экран сканирования QR и передаем колбэк который вызывается
  // в методе onSuccess QRScanner 
  handleImportAccount = () => {
    Actions.push(QRSCANNER, { callback: this.importAccountQRScannerCallback });
  }

  importAccountQRScannerCallback = (str, pin) => {
    const qrArray = str.split('.');
    const address = qrArray[0];
    const privateKey = qrArray[1];
    store.importAccount({ address, privateKey, pin });
    Actions.push(ACCOUNTS);
  }

  render() {
    return (
      <View style={{ marginTop: 30 }}>
        <Text style={{}}>Accounts</Text>
        <Button
          onPress={this.handleCreateAccount}
          title="New Account"
          color="#841584"
        />
        <Button
          onPress={this.handleImportAccount}
          title="Import Account"
          color="#841584"
        />
        <ScrollView>
          {store.accounts.length !== 0 &&
            <AccountsList accounts={store.accounts} />
          }
        </ScrollView>
      </View>
    );
  }
}

const AccountsList = ({ accounts }) => (<View>
  {accounts.map((account, index) => (
    <AccountComponent key={index} account={account} />
  ))}
</View>);
