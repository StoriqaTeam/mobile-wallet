/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import './global';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';


const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/fbuouJvwnJedVLF6og25'));
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  componentWillMount() {
    web3.eth.getBlock('latest').then(console.log);
    const createAccount = web3.eth.accounts.create();
    console.log('*** create account: ', createAccount);
    this.getData(web3);
    setTimeout(() => {
      web3.eth.getAccounts().then(result => console.log('*** get accounts after timeout: ', result));
    }, 2000);
    // console.log('*** App accounts: ', web3.eth.getAccounts().then(result => console.log('*** App getAccounts() result: ', result)));
    // const accounts = web3.eth.accounts.create();
    // const wallet = web3.eth.accounts.wallet.create();

    console.log('*** App wallet: ', web3.eth.accounts.wallet);
  }

  getData = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('*** App accounts: ', accounts);
  }

  createWallet = async () => {
    const wallet = web3.eth.accounts.wallet.create();
    console.log('*** App create wallet: ', wallet);
  }

  getWallet = async () => {
    console.log('*** App create get wallet: ', web3.eth.accounts.wallet);
  }

  newAccount = async () => {
    const newAccount = web3.eth.accounts.create();
    const wallet = web3.eth.accounts.wallet.add(newAccount);
    console.log('*** App new account: ', newAccount);
    console.log('*** App new wallet: ', web3.eth.accounts.wallet);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Button
          onPress={this.getData}
          title="Get data"
          color="#841584"
        />
        <Button
          onPress={this.createWallet}
          title="Create wallet"
          color="#841584"
        />
        <Button
          onPress={this.getWallet}
          title="Get wallet"
          color="#841584"
        />
        <Button
          onPress={this.newAccount}
          title="New Account"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
