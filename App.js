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
  TextInput,
} from 'react-native';
import Aes from 'react-native-aes-crypto';


const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
// const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/fbuouJvwnJedVLF6og25'));


type Props = {};

export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      result: null,
      pin: null,
    }
  }

  componentWillMount() {
    web3.eth.getBlock('latest').then(console.log);
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
  }

  onChangePin = (pin) => {
    this.setState({ pin });
  }

  generateBase64Key = async () => {
    const { pin } = this.state;
    const salt = Math.random().toString(36).substring(2, 15);
    return await Aes.pbkdf2(pin, salt);
  }

  encryptPrivat = async () => {
    const text = "Hello some text";
    const keyBase64 = await this.generateBase64Key();
    const ivHex = convertToHex(randomString(16));
    // const iv = "11112222333344445555666677778888";
    // const salt = Math.random().toString(36).substring(2, 15);
    // console.log('*** check Base64: ', isBase64(ivBase64), isBase64(keyBase64));
    // console.log('*** App encryptPrivat data: ', {text, keyBase64, ivHex});
    const encryptedResult = await Aes.encrypt(text, keyBase64, ivHex);
    // keyBase64 = cece3a7dc9cf86aae926fd2ee520a06e
    // ivHex = 11112222333344445555666677778888
    // console.log('*** App encryptedResult: ', encryptedResult);
    return encryptedResult;
  }

  handleEncript = () => {
    this.encryptPrivat().then(result => {
      // this.setState({ result });
    });
  }

  render() {
    const { pin, result } = this.state;
    return (
      <View style={{}}>
        <Text style={styles.instructions}>
          {result}
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
        <TextInput
          value={pin}
          onChangeText={this.onChangePin}
          keyboardType="numeric"
          maxLength={5}
          enablesReturnKeyAutomatically={true}
          returnKeyType="done"
          style={{ margin: 16, padding: 5, borderWidth: 1 }}
        />
        <Button
          onPress={this.handleEncript}
          title="Generate key"
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

function randomString(length) {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var randomstring = '';
	for (var i=0; i<length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum, rnum+1);
  }
	return randomstring;
}

function isBase64(str) {
  try {
      return btoa(atob(str)) == str;
  } catch (err) {
      return false;
  }
}

function convertToHex(str) {
  var hex = '';
  for(var i=0;i<str.length;i++) {
      hex += ''+str.charCodeAt(i).toString(16);
  }
  console.log('*** str: ', str);
  console.log('*** hex: ', hex);
  return hex;
}
