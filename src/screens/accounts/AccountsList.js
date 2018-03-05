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
import { KEYGENERATOR, ACCOUNTPIN } from '@constants';
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
  constructor(props: PropsType) {
    super(props);
    console.log('### constructor props: ', props);
  }

  newAccountPinCallback = (pin: string) => {
    console.log('### newAccountPinCallback pin: ', pin);
    store.createAccount(pin);
    Actions.pop();
    // const isExist = store.isAsyncStorageIncludesAddress(address);
    // store.storePrivateKey({ address, pin })
  }

  handleCreateAccount = () => {
    // const address = store.createAccount();
    // console.log('*** handleCreateAccount account: ', address);
    // Actions.push(ACCOUNTPIN, { address });
    Actions.push(ACCOUNTPIN, { callback: this.newAccountPinCallback });
  }

  render() {
    // const { accounts } = this.state;
    console.log('****** accounts this.state: ', { ...this.state });
    return (
      <View style={{ marginTop: 30 }}>
        <Text style={{}}>Accounts</Text>
        <Button
          onPress={this.handleCreateAccount}
          title="New Account"
          color="#841584"
        />
        <Button
          onPress={() => Actions.push(QRSCANNER)}
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
