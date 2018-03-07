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
  TextInput,
} from 'react-native';
import {observer} from "mobx-react";
import Aes from 'react-native-aes-crypto';
import { Actions } from 'react-native-router-flux';
import store from '@store';
import { ACCOUNTS, ACCOUNTDETAIL, KEYGENERATOR, PIN, QRSCANNER, AMOUNT, QRGENERATOR } from '@constants';
import { AccountComponent } from '@components';
import { Button } from '@components/common';
import { commonStyles } from '@styles';


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
    return (
      <View style={commonStyles.containerView}>
        <View style={commonStyles.view}>
          <Text style={commonStyles.viewTitle}>Accounts</Text>
          <Button
            onClick={this.handleCreateAccount}
            text="New Account"
            type="default"
          />
          <Button
            onClick={this.handleImportAccount}
            text="Import Account"
            type="danger"
          />
          <Button
            onClick={store.fetchBalance}
            text="fetch balance"
            type="default"
            isLight
          />
          <ScrollView>
            {store.accounts.length !== 0 &&
            <AccountsList accounts={store.accounts} onPress={this.onAccountPress} />
            }
          </ScrollView>
        </View>
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