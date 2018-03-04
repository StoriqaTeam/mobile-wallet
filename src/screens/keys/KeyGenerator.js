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
import RNSecureKeyStore from 'react-native-secure-key-store';
import { Actions } from 'react-native-router-flux';
import { QRSCANNER } from '../../constants';


const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/fbuouJvwnJedVLF6og25'));
// const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/fbuouJvwnJedVLF6og25'));


type PropsType = {
  qrtext?: string,
};

type StateType = {
  publicKey: string,
  privateKey: string,
  pin: string,
  grKeys?: {
    publicKey: string,
    privateKey: string,
  },
};

export default class App extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    console.log('*** KeyGenerator constructor props: ', props);
    this.state = {
      publicKey: null,
      privateKey: null,
      pin: null,
    }
  }

  componentWillMount() {
    web3.eth.getBlock('latest').then(console.log);
  }

  componentWillReceiveProps(newProps) {
    console.log('*** KeyGenerator componentWillReceiveProps newProps: ', newProps);
    if (newProps.qrText) {
      const qrArray = newProps.qrText.split('.');
      this.setState({
        grkeys: {
          publicKey: qrArray[0],
          privateKey: qrArray[1]
        },
      });
    }
  }

  onChangePin = (pin) => {
    this.setState({ pin });
  }

  encrypt = async ({ str, pin }: {
    str: string,
    pin: string,
  }) => {
    // const { pin } = this.state;
    const salt = generateSalt();
    const iv = convertToHex(randomString(16));
    const key = await generateKeyByPin(pin, salt);
    // return Aes.encrypt(str, key, iv).then(cipher => { cipher, salt, iv });
    console.log('### encrypt data: ', {str, key, iv})
    return Aes.encrypt(str, key, iv)
      .then((cipher, err) => {
        console.log('### encrypt cipher: ', cipher)
        console.log('### encrypt err: ', err)
        return { cipher, salt, iv }
      });
  }

  decrypt = async (cipher, key, iv) => {
    return await Aes.decrypt(cipher, key, iv);
  }

  getPrivateKey = async () => {
    const { publicKey } = this.state;
    RNSecureKeyStore.get(publicKey)
      .then((res) => {
        console.log('# got private key from keystore: ', res);
      }, (err) => {
        console.log('# error when getting private key from keystore: ', err);
      });
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

  storePrivateKey = ({ publicKey, privateKey, pin }: {
    publicKey: string,
    privateKey: string,
    pin: string,
  }) => {
    // const { publicKey, privateKey } = this.state;
    console.log('*** storePrivateKey data: ', { publicKey, privateKey, pin });
    this.encrypt({ str: privateKey, pin })
      .then(result => {
        console.log('*** storePrivateKey result: ', result);
        const privateStr = [result.cipher, result.salt, result.iv].join('.');
        console.log('*** storePrivateKey privateStr: ', privateStr);
        RNSecureKeyStore.set(publicKey, privateStr)
          .then((res) => {
            console.log('# privat key added to keystore: ', res);
          }, (err) => {
            console.log('# error when adding private key to keystore: ', err);
          });
      })
      .catch(err => { console.log('*** storePrivatKey err: ', err)});
  }

  render() {
    const { pin, publicKey, privateKey, qrKeys } = this.state;
    // console.log('*** KeyGenerator render props: ', this.props);
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
        <Button
          onPress={() => Actions.push(QRSCANNER)}
          title="Scan QR"
          color="#841584"
        />
        {/* <Button
          onPress={() => Actions.push(QRSCANNER)}
          title="Save with QR code"
          color="#841584"
        /> */}
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
          onPress={() => this.storePrivateKey({ privateKey, publicKey, pin })}
          title="Store privateKey"
          color="#841584"
          disabled={!publicKey || !pin}
        />
        <Button
          onPress={() => this.storePrivateKey({ privateKey: qrKeys.privateKey, publicKey: qrKeys.publicKey, pin })}
          title="Store qr privateKey"
          color="#841584"
          disabled={!qrKeys || !qrKeys.privateKey || !qrKeys.publicKey}
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
  return await Aes.pbkdf2(pin, salt);
}
