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
// import RNSecureKeyStore from 'react-native-secure-key-store';
import { Actions } from 'react-native-router-flux';
import { KEYGENERATOR } from '../../constants';
import AccountComponent from '../../components/Account';
// import QRCode from 'react-native-qrcode';
// import { QRSCANNER } from '../../constants';


const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/fbuouJvwnJedVLF6og25'));


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
    this.state = {
      accounts: [],
    }
  }

  render() {
    const { accounts } = this.state;
    console.log('****** accounts this.state: ', { ...this.state });
    return (
      <View style={{ marginTop: 30 }}>
        <Text style={{}}>Accounts</Text>
        <Button
          onPress={() => Actions.push(KEYGENERATOR)}
          title="New Account"
          color="#841584"
        />
        <Button
          onPress={() => Actions.push(QRSCANNER)}
          title="Import Account"
          color="#841584"
        />
        {accounts.length !== 0 &&
          <AccountComponent account={account} />
        }
      </View>
    );
  }
}
