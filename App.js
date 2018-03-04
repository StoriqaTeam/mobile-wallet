/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

// @flow
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
// import RNSecureKeyStore from 'react-native-secure-key-store';

const host = Platform.OS === 'ios' ? 'http://localhost:8545' : 'http://8adb6cae.ngrok.io';
const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider(host));
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/fbuouJvwnJedVLF6og25'));


type PropsType = {};
type StateType = {
  publicKey: string,
  privateKey: string,
  pin: string,
};

export default class App extends Component<PropsType, StateType> {
  constructor() {
    super();
    this.state = {
      publicKey: null,
      privateKey: null,
      pin: null,
    }
  }

  componentWillMount() {
    web3.eth.getBlock('latest').then(console.log);
  }

  onChangePin = (pin) => {
    this.setState({ pin });
  }

  encrypt = async (str: string) => {
    const { pin } = this.state;
    const salt = generateSalt();
    const iv = convertToHex(randomString(16));
    const key = await generateKeyByPin(pin, salt);
    return Aes.encrypt(str, key, iv).then(cipher => { cipher, salt, iv });
    // return 'str';
  }

  decrypt = async (cipher, key, iv) => {
    // return await Aes.decrypt(cipher, key, iv);
    return 'str1'
  }

  getPrivateKey = async () => {
    // const { publicKey } = this.state;
    // RNSecureKeyStore.get(publicKey)
    //   .then((res) => {
    //     console.log('# got private key from keystore: ', res);
    //   }, (err) => {
    //     console.log('# error when getting private key from keystore: ', err);
    //   });
    console.log('str2');
  }

  // getData = async () => {
  //   const accounts = await web3.eth.getAccounts();
  //   console.log('*** App accounts: ', accounts);
  // }

  // createWallet = async () => {
  //   const wallet = web3.eth.accounts.wallet.create();
  //   console.log('*** App create wallet: ', wallet);
  // }

  // getWallet = async () => {
  //   console.log('*** App create get wallet: ', web3.eth.accounts.wallet);
  // }

  newAccount = async () => {
    const newAccount = web3.eth.accounts.create();
    console.log('*** App new account: ', newAccount);
    this.setState({ publicKey: newAccount.address, privateKey: newAccount.privateKey }); // this unsecure just for develop

    // const wallet = web3.eth.accounts.wallet.add(newAccount);
    // const result = web3.eth.accounts.privateKeyToAccount('0x9aabf3b04524979bebe58ace7139e0bb2aac2cf87644577ea7dd66a9a2cdab52');
  }

  storePrivateKey = () => {
    const { publicKey, privateKey } = this.state;
    // this.encrypt(privateKey)
    //   .then(result => {
    //     console.log('*** storePrivateKey result: ', result);
    //     const privateStr = [result.cipher, result.salt, result.iv].join('.');
    //     RNSecureKeyStore.set(publicKey, privateStr)
    //       .then((res) => {
    //         console.log('# privat key added to keystore: ', res);
    //       }, (err) => {
    //         console.log('# error when adding private key to keystore: ', err);
    //       });
    //   })
    //   .catch(err => { console.log('*** storePrivatKey err: ', err)});
  }

  render() {
    const { pin, publicKey } = this.state;
    return (
      <View style={{ marginTop: 30 }}>
        <Text style={{}}>
          Storiqa STQ Peeck
        </Text>
        {/* <Button
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
        /> */}
        <Button
          onPress={this.newAccount}
          title="New Account"
          color="#841584"
        />
        <View style={{ alignItems: 'center' }}>
          <Text>Enter PIN</Text>
          <TextInput
            value={pin}
            onChangeText={this.onChangePin}
            keyboardType="numeric"
            maxLength={5}
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
            style={{ margin: 16, padding: 5, borderWidth: 1, width: '90%', textAlign: 'center' }}
          />
        </View>
        <Button
          onPress={this.storePrivateKey}
          title="Store privateKey"
          color="#841584"
          disabled={!publicKey || !pin}
        />
        <Button
          onPress={this.getPrivateKey}
          title="Get privateKey"
          color="#841584"
          disabled={!publicKey}
        />
      </View>
    );
  }
}


function randomString(length) {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var randomstring = '';
	for (var i=0; i<length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum, rnum+1);
  }
	return randomstring;
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

function generateSalt() {
  return Math.random().toString(36).substring(2, 15);
}

const generateKeyByPin = async (pin, salt) => {
  // return await Aes.pbkdf2(pin, salt);
  return 'str3'
}