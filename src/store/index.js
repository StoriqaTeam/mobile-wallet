// @flow
import { AsyncStorage } from 'react-native';
import { toJS, observable, autorun, action, computed } from 'mobx'; // eslint-disable-line
import { Actions } from 'react-native-router-flux'; // eslint-disable-line
import RNSecureKeyStore from 'react-native-secure-key-store';
import Aes from 'react-native-aes-crypto';
import { fetchQuery, randomString, convertToHex, generateSalt, generateKeyByPin, encrypt } from '@utils';
import R from 'ramda'; // eslint-disable-line
import Account from './Account';
import {
  DEBUG,
} from '@constants';


const Web3 = require('web3');
function offlineWeb3() { 
  return new Web3();
}
function onlineWeb3() { 
  return new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/fbuouJvwnJedVLF6og25'));
}

class Store {
  @observable accounts = [];
  @observable addresses = [];
  @observable isLoading = false;

  constructor() {
    this.web3 = offlineWeb3();
    // this.importAccount({ privateKey: '0x50334a37797163c98700cb487f79ca8f294dcf53871b86f5d0be350ca4be5869', pin: '22222' });
    // this.importAccount({ privateKey: '0x1fd90fe13b3fd920babf518709ac9929a940d61af615a687fad3342e4c884c1c', pin: '22222' });
    this.updateAddresses();
    autorun(() => {
      console.log('### Store autorun isLoading: ', toJS(this.isLoading));
      // console.log('### Store autorun isLoading: ', toJS(this.accounts.slice()));
      this.updateAccounts();
    });
    setInterval(() => {
      this.updateAccounts();
    }, 15000);
  }

  @action setIsLoading = value => {
    this.isLoading = value;
  }

  fetchBalance = async (address) => {
    // console.log('^^^^^ fetch balance address: ', address);
    const token = 'I8ZWEG466U3WV3EAKH4CJHJCBAYNVR2HPK';
    const contractAddress = '0xec827D2c2493ca90cC237f4F314979973f17F5A8';
    const url = `https://api-kovan.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${token}`;
    const result = await fetchQuery(url);
    // console.log('^^^^^ fetch balance result: ', result);
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

  @action removeAllAccounts = () => {
    R.forEach(account => {
      this._removePrivateKey(account);
    }, this.accounts);
    this.addresses.replace([]);
    this.accounts.replace([]);
  }

  @action removeAccount = account => {
    this._removePrivateKey(account);
    this.addresses.remove(account.address);
    this.accounts.remove(account);
    Actions.pop();
  }

  // удаляем account
  _removePrivateKey = async (account) => {
    try {
      RNSecureKeyStore.remove(account.address);
      AsyncStorage.removeItem(`@AccountAddress:${account.address}`);
    } catch(err) {
      console.error('### Store._removePrivateKey error: ', err);
    }
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
    // console.log('**** create account address, privateKey: ', { address, privateKey });
    this._storePrivateKey({ address, privateKey, pin });
  }

  importAccount = async ({ privateKey, pin }) => {
    const isFormatedPrivateKey = R.startsWith('0x', privateKey);
    if (!isFormatedPrivateKey) {
      privateKey = `0x${privateKey}`;
    }
    const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    // console.log('^^^^ imported account: ', account);
    const address = account.address;
    this._storePrivateKey({ address, privateKey, pin });
    // const isexist = await this.isAsyncStorageIncludesAddress(account.address);
    // if (!isExist) {
    //   this._storePrivateKey({ address:account.address, privateKey: str, pin });
    // }
  }

  // сохраняем ключи в зашифрованном виде
  _storePrivateKey = async ({ address, privateKey, pin }: {
    address: string,
    pin: string,
  }) => {
    try {
      const encrypted = await encrypt({ str: privateKey, pin });
      // console.log('**** _storePrivateKey encrypted: ', { encrypted });
      const privateStr = [encrypted.cipher, encrypted.salt, encrypted.iv].join('.');
      const stored = await RNSecureKeyStore.set(address, privateStr);
      const storedtoAS = await AsyncStorage.setItem(`@AccountAddress:${address}`, '');
      // console.log('**** _storePrivateKey privateKey: ', { stored });
      this.updateAddresses();
    } catch(err) {
      console.error('### Store.storePrivateKey error: ', err);
    }
  }

  // проверяем есть ли ключи с таким же address
  // isAsyncStorageIncludesAddress = async (address) => {
  //   const keys = await AsyncStorage.getAllKeys();
  //   return keys
  //     .filter(key => R.startsWith('@AccountAddress:', key))
  //     .map(key => key.split('@AccountAddress:')[1])
  //     .includes(address);
  // }

  getPrivateKey = async (address) => {
    RNSecureKeyStore.get(address)
      .then((res) => {
        // console.log('# got private key from keystore: ', res);
      }, (err) => {
        // console.log('# error when getting private key from keystore: ', err);
      });
  }

}

export default new Store();
