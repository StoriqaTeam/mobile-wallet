// @flow
import { toJS, observable, autorun, action, computed } from 'mobx'; // eslint-disable-line
import RNSecureKeyStore from 'react-native-secure-key-store';
import { randomString, convertToHex, generateSalt, generateKeyByPin, decrypt } from '@utils';

const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
function offlineWeb3() { 
  return new Web3();
}
function onlineWeb3() { 
  return new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/fbuouJvwnJedVLF6og25'));
}

export default class Account {
  address;
  @observable balance = 0;

  constructor(props) {
    // console.log('^^^^ Account constructor props: ', props);
    this.address = props.address;
    this.balance = props.balance;
  }

  createTransaction = async ({ paymentStr, pin }) => {
    const cipherStr = await RNSecureKeyStore.get(this.address);
    const cipherArr = cipherStr.split('.');
    const cipher = cipherArr[0];
    const salt = cipherArr[1];
    const iv = cipherArr[2];
    if (cipher && salt && iv) {
      console.log('**** Account createTransaction cipher data: ', { cipher, salt, iv });
      const key = await generateKeyByPin(pin, salt);
      console.log('**** Account createTransaction generatedPin: ', key);
      const privateKey = await decrypt({ cipher, key, iv });
      console.log('**** Account createTransaction privateKey: ', privateKey);
      try {
        const web3 = onlineWeb3();
        console.log('**** Account createTransaction web3: ', web3);
      } catch (err) {
        console.error('**** Account createTransaction catch error: ', err);
      }
    }
  }
}