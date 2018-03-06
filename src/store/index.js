// @flow
import { AsyncStorage } from 'react-native';
import { observable, autorun, action, computed } from 'mobx'; // eslint-disable-line
import { Actions } from 'react-native-router-flux'; // eslint-disable-line
import RNSecureKeyStore from 'react-native-secure-key-store';
import Aes from 'react-native-aes-crypto';
import { randomString, convertToHex, generateSalt, generateKeyByPin, encrypt } from '@utils';
import R from 'ramda'; // eslint-disable-line
// import { ROOT, PROFILE } from '../constants';

const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
function offlineWeb3() { 
  return new Web3();
}
function onlineWeb3() { 
  return new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/fbuouJvwnJedVLF6og25'));
}

class Store {
  @observable accounts = [];

  constructor() {
    this.web3 = offlineWeb3();
    
    autorun(() => {
      console.log('### Store autorun Actions.currentScene: ', Actions.currentScene);
    });
    // web3.eth.getBlock('latest').then(result => {
    //   console.log('### store web3 getBlock result: ', result);
    // });
    // web3.eth.getAccounts().then(result => console.log('### store web3 getAccounts result: ', result));

    // const newAccount = web3.eth.accounts.create();
    // console.log('*** populateAccounts account: ', newAccount)
    // console.log('*** populateAccounts wallet: ', web3.eth.accounts.wallet)
    // web3.eth.accounts.wallet.add(newAccount)
    // console.log('*** populateAccounts wallet: ', web3.eth.accounts.wallet)
    // // web3.eth.accounts.wallet.save();
    // web3.eth.accounts.wallet.clear();
    // console.log('*** populateAccounts wallet: ', web3.eth.accounts.wallet)
  }

  // создание аккаунта
  createAccount = (pin): string => {
    const { address, privateKey } = this.web3.eth.accounts.create();
    this._storePrivateKey({ address, privateKey, pin });
  }

  importAccount = ({ address, privateKey, pin }) => {
    if (!this.isAsyncStorageIncludesAddress(address)) {
      this._storePrivateKey({ address, privateKey, pin });
    }
  }

  // сохраняем ключи в зашифрованном виде
  _storePrivateKey = ({ address, privateKey, pin }: {
    address: string,
    pin: string,
  }) => {
    try {
      encrypt({ str: privateKey, pin })
        .then(result => {
          const privateStr = [result.cipher, result.salt, result.iv].join('.');
          RNSecureKeyStore.set(address, privateStr)
            .then((res) => {
              console.log('# privat key added to keystore: ', res);
              /* сохраняем ключ в AsyncStorage для удобства перебора
              по ключам (isAsyncStorageIncludesAddress) */
              AsyncStorage.setItem(`@AccountAddress:${address}`, '');
            }, (err) => {
              console.log('# error when adding private key to keystore: ', err);
            });
        })
        .catch(err => { console.log('*** storePrivatKey encrypt error: ', err) });
    } catch(err) {
      console.error('### Store.storePrivateKey error: ', err);
    }
  }

  // проверяем есть ли ключи с таким же address
  isAsyncStorageIncludesAddress = async (address) => {
    const keys = await AsyncStorage.getAllKeys();
    console.log('LENGTH', keys.length);
    return keys
      .filter(key => R.startsWith('@AccountAddress:', key))
      .map(key => key.split('@AccountAddress:')[1])
      .includes(address);
  }

  getPrivateKey = async (address) => {
    RNSecureKeyStore.get(address)
      .then((res) => {
        console.log('# got private key from keystore: ', res);
      }, (err) => {
        console.log('# error when getting private key from keystore: ', err);
      });
  }

}

export default new Store();
