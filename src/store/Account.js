// @flow
import { toJS, observable, autorun, action, computed } from 'mobx'; // eslint-disable-line
import RNSecureKeyStore from 'react-native-secure-key-store';
import { randomString, convertToHex, intToHex, generateSalt, generateKeyByPin, decrypt } from '@utils';
import { fetchQuery } from '../utils';

const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
function offlineWeb3() { 
  return new Web3();
}
function onlineWeb3() { 
  return new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/fbuouJvwnJedVLF6og25'));
}
function localWeb3() {
  return new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

export default class Account {
  address;
  @observable balance = 0;

  constructor(props) {
    // console.log('^^^^ Account constructor props: ', props);
    this.address = props.address;
    this.balance = props.balance;
  }

  // signTransaction = (paymentStr) => {
  //   const web3 = onlineWeb3();
  //   const gasPrice = intToHex(40 * Math.pow(10, 9));
  //   const gasLimit = intToHex(100000);
  //   const to = paymentStr.split('.')[0];
  //   web3.eth.signTransaction({
  //     from: this.address,
  //     gasPrice,
  //     gas: gasLimit,
  //     to,
  //     value: "1",
  //     data: "",
  //     nonce: '0x0',
  //   })
  //   .then(console.log)
  //   .catch(console.error);
  // }

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
      // this.signTransaction(paymentStr);
      try {
        const token = 'I8ZWEG466U3WV3EAKH4CJHJCBAYNVR2HPK';
        const url = `https://api-kovan.etherscan.io/api?module=proxy&action=eth_getTransactionCount&address=${this.address}&tag=latest&apikey=${token}`;
        const nonceResponce = await fetchQuery(url);
        console.log('****** Account nonce: ', nonceResponce.result);
        const web3 = onlineWeb3();
        // create data for transaction
        const privateKeyBuffer = new Buffer(privateKey.split('0x')[1], 'hex');
        const gasPrice = intToHex(40 * Math.pow(10, 9));
        const gasLimit = intToHex(100000);
        // get data from payment
        const contractAddress = '0xec827D2c2493ca90cC237f4F314979973f17F5A8';
        const to = paymentStr.split('.')[0];
        // const value = intToHex(parseInt(paymentStr.split('.')[1], 16));
        const value = parseInt(paymentStr.split('.')[1], 16);
        // create data
        const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"removeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"startCirculation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"m_numOwners","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"m_externalMintingEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"amIOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"detachController","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokensCreatedInSTQ","type":"uint256"}],"name":"emission","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"addOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"m_multiOwnedRequired","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"disableMinting","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_controller","type":"address"}],"name":"setController","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOwners","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"m_emissions","outputs":[{"name":"created","type":"uint256"},{"name":"totalSupplyWas","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_operation","type":"bytes32"}],"name":"revoke","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newRequired","type":"uint256"}],"name":"changeRequirement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_operation","type":"bytes32"},{"name":"_owner","type":"address"}],"name":"hasConfirmed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ownerIndex","type":"uint256"}],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"requestDividends","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"m_controller","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"m_isCirculating","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_owners","type":"address[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokensCreated","type":"uint256"},{"indexed":false,"name":"totalSupplyWas","type":"uint256"},{"indexed":false,"name":"time","type":"uint256"}],"name":"Emission","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Dividend","type":"event"},{"anonymous":false,"inputs":[],"name":"CirculationEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"controller","type":"address"}],"name":"ControllerSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"was","type":"address"}],"name":"ControllerRetired","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"operation","type":"bytes32"}],"name":"Confirmation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"operation","type":"bytes32"}],"name":"Revoke","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"operation","type":"bytes32"}],"name":"FinalConfirmation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldOwner","type":"address"},{"indexed":false,"name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOwner","type":"address"}],"name":"OwnerAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldOwner","type":"address"}],"name":"OwnerRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newRequirement","type":"uint256"}],"name":"RequirementChanged","type":"event"}];
        const contract = new web3.eth.Contract(abi);
        const data = contract.methods
          .transfer(to, 1)
          .encodeABI();


        const rawTx = {
          nonce: nonceResponce.result,
          gasPrice,
          gasLimit,
          to: '0xec827D2c2493ca90cC237f4F314979973f17F5A8',
          value: '0x00',
          data,
        };
        console.log('**** Account createTransaction privateKeyBuffer: ', { privateKey, privateKeyBuffer, rawTx });
        const tx = new Tx(rawTx);
        tx.sign(privateKeyBuffer);
        const serializedTx = tx.serialize();

        // console.log(serializedTx.toString('hex'));
        // 0xf889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f

        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
          .on('receipt', console.log);
      } catch (err) {
        console.error('**** Account createTransaction catch error: ', err);
      }
    }
  }
}
