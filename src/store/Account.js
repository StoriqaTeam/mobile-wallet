// @flow
import { toJS, observable, autorun, action, computed } from 'mobx'; // eslint-disable-line
import { Keyboard } from 'react-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import { Actions } from 'react-native-router-flux'; // eslint-disable-line
import { randomString, convertToHex, intToHex, generateSalt, generateKeyByPin, decrypt } from '@utils';
import { fetchQuery, parseAmountToNum, stqToWEI, weiToSTQ } from '../utils';
import { SUCCESS, ERROR, CONTRACTADDRESS, ABI, TOKEN } from '@constants';
import store from '@store';


const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
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
    this.address = props.address;
    this.balance = props.balance;
  }

  @computed get shortBalance() {
    const splited = this.balance.toString().split('.');
    if (splited[1]) {
      return `${splited[0]}.${splited[1].slice(0, 2)}`;
    }
    return splited[0];
  }

  createTransaction = async ({ paymentStr, pin }) => {
    const cipherStr = await RNSecureKeyStore.get(this.address);
    const cipherArr = cipherStr.split('.');
    const cipher = cipherArr[0];
    const salt = cipherArr[1];
    const iv = cipherArr[2];
    if (cipher && salt && iv) {
      store.setIsLoading(true);
      const key = await generateKeyByPin(pin, salt);
      const privateKey = '';
      try {
        privateKey = await decrypt({ cipher, key, iv });
      } catch (error) {
        console.log( '^^^^^ decrypt error : ', error )
        store.setIsLoading(false);
        Actions.reset(ERROR, { error: 'Probably you entered an incorrect pin' });
      }
      if (privateKey) {
        try {
          const url = `https://api-kovan.etherscan.io/api?module=proxy&action=eth_getTransactionCount&address=${this.address}&tag=latest&apikey=${TOKEN}`;
          const nonceResponce = await fetchQuery(url);
          const web3 = onlineWeb3();
          // create data for transaction
          const privateKeyBuffer = new Buffer(privateKey.split('0x')[1], 'hex');
          const gasPrice = intToHex(40 * Math.pow(10, 9));
          const gasLimit = intToHex(100000);
          // get data from payment
          const receiverAddress = paymentStr.split(',')[0];
          const amountSTQStr = paymentStr.split(',')[1];
          const amount = stqToWEI(parseAmountToNum(amountSTQStr));


          // create data
          const contract = new web3.eth.Contract(ABI);
          const data = contract.methods
            .transfer(receiverAddress, amount)
            .encodeABI();

          const rawTx = {
            nonce: nonceResponce.result,
            gasPrice,
            gasLimit,
            to: CONTRACTADDRESS,
            value: '0x00',
            data,
          };
          // console.log('**** Account createTransaction privateKeyBuffer: ', {
          //   privateKey,
          //   privateKeyBuffer,
          //   rawTx,
          //   amount,
          // });
          const tx = new Tx(rawTx);
          tx.sign(privateKeyBuffer);
          const serializedTx = tx.serialize();
          web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
            .on('receipt', result => {
              store.setIsLoading(false);
              Actions.reset(SUCCESS, { result, amount: weiToSTQ(amount) });
            })
            .on('error', error => {
              Actions.reset(ERROR, { error });
              store.setIsLoading(false);
            });
        } catch (error) {
          console.log('**** Account createTransaction catch error: ', error);
          store.setIsLoading(false);
          Actions.push(ERROR, { error: 'Transaction failed for some reasone. Please try again later.' });
        }
      }
    }
  }
}
