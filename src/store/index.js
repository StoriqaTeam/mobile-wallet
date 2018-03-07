// @flow
import { AsyncStorage } from 'react-native';
import { toJS, observable, autorun, action, computed } from 'mobx'; // eslint-disable-line
import { Actions } from 'react-native-router-flux'; // eslint-disable-line
import RNSecureKeyStore from 'react-native-secure-key-store';
import Aes from 'react-native-aes-crypto';
import { fetchQuery, randomString, convertToHex, generateSalt, generateKeyByPin, encrypt } from '@utils';
import R from 'ramda'; // eslint-disable-line
import Account from './Account';
// import { ROOT, PROFILE } from '../constants';

const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
export function offlineWeb3() { 
  return new Web3();
}
export function onlineWeb3() { 
  return new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/fbuouJvwnJedVLF6og25'));
}

class Store {
  @observable accounts = [];
  @observable addresses = [];

  constructor() {
    this.web3 = offlineWeb3();
    this.updateAddresses();
    autorun(() => {
      // console.log('### Store autorun Actions.currentScene: ', Actions.currentScene);
      console.log('### Store autorun addresses: ', toJS(this.addresses));
      this.updateAccounts();
    });
    setInterval(() => {
      this.updateAccounts();
      // this.accounts.forEach(this.updateAccounts);
    }, 15000);
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

  fetchBalance = async (address) => {
    const token = 'I8ZWEG466U3WV3EAKH4CJHJCBAYNVR2HPK';
    const contractAddress = '0xec827D2c2493ca90cC237f4F314979973f17F5A8';
    const url = `https://api-kovan.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${token}`;
    const result = await fetchQuery(url);
    const devider = Math.pow(10, 18);
    const converted = parseInt(result.result, 10) / Math.pow(10, 18);
    return converted;
  }

  updateAccounts = () => {
    const promises = this.addresses.map(address => {
      return this.fetchBalance(address)
        .then(balance => new Account({ address, balance }));
    });
    Promise.all(promises).then(accounts => this.accounts.replace(accounts));
  }

  updateAddresses = async () => {
    let keys = await AsyncStorage.getAllKeys();
    keys = keys
      .filter(key => R.startsWith('@AccountAddress:', key))
      .map(key => key.split('@AccountAddress:')[1]);
    this.addresses.replace(keys);
  }

  // создание аккаунта
  createAccount = (pin): string => {
    const { address, privateKey } = this.web3.eth.accounts.create();
    this._storePrivateKey({ address, privateKey, pin });
  }

  importAccount = async ({ address, privateKey, pin }) => {
    const isExist = await this.isAsyncStorageIncludesAddress(address);
    if (!isExist) {
      this._storePrivateKey({ address, privateKey, pin });
    }
  }

  // сохраняем ключи в зашифрованном виде
  _storePrivateKey = async ({ address, privateKey, pin }: {
    address: string,
    pin: string,
  }) => {
    // console.log('### Store.storePrivateKey privateKey: ', privateKey);
    try {
      const encrypted = await encrypt({ str: privateKey, pin });
      const privateStr = [encrypted.cipher, encrypted.salt, encrypted.iv].join('.');
      const stored = await RNSecureKeyStore.set(address, privateStr);
      const storedtoAS = await AsyncStorage.setItem(`@AccountAddress:${address}`, '');
      this.updateAddresses();
    } catch(err) {
      console.error('### Store.storePrivateKey error: ', err);
    }
  }

  // проверяем есть ли ключи с таким же address
  isAsyncStorageIncludesAddress = async (address) => {
    const keys = await AsyncStorage.getAllKeys();
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
