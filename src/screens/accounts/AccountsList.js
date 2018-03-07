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
import {observer} from "mobx-react";
import Aes from 'react-native-aes-crypto';
import { Actions } from 'react-native-router-flux';
import store from '@store';
import { ACCOUNTS, ACCOUNTDETAIL, KEYGENERATOR, PIN, QRSCANNER, AMOUNT, QRGENERATOR } from '@constants';
import { AccountComponent } from '@components';


type PropsType = {
}

type AccountType = {
  address: string,
  privateKey: string,
  accountState: number,
}

type StateType = {
  accounts: AccountType[],
}

@observer
class Accounts extends Component<PropsType, StateType> {
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

  importAccountQRScannerCallback = str => {
    const qrArray = str.split('.');
    const address = qrArray[0];
    const privateKey = qrArray[1];
    Actions.push(PIN, {
      callback: pin => this.importAccountPinCallback({ address, privateKey, pin }),
    });
  }

  importAccountPinCallback = ({ address, privateKey, pin }) => {
    console.log('&&&& importAccountPinCallback data: ', { address, privateKey, pin })
    store.importAccount({ address, privateKey, pin });
    Actions.push(ACCOUNTS);
  }

  onAccountPress = account => {
    Actions.push(ACCOUNTDETAIL, { account });
  }

  render() {
    console.log('$$$ store.accounts: ', store.accounts.slice());
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
        <Button
          onPress={store.fetchBalance}
          title="fetch balance"
          color="#841584"
        />
        <ScrollView>
          {store.accounts.length !== 0 &&
            <AccountsList accounts={store.accounts} onPress={this.onAccountPress} />
          }
        </ScrollView>
      </View>
    );
  }
}

const AccountsList = ({ accounts, onPress }) => (<View>
  {accounts.map((account, index) => (
    <AccountComponent key={index} account={account} onPress={onPress} />
  ))}
</View>);

export default Accounts;