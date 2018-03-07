// @flow
import { toJS, observable, autorun, action, computed } from 'mobx'; // eslint-disable-line


// type AccountType = {
//   address: string,
//   balance: number,
// }

export default class Account {
  address;
  @observable balance = 0;

  constructor(props) {
    console.log('^^^^ Account constructor props: ', props);
    this.address = props.address;
    this.balance = props.balance;
  }

  createTransaction = () => {

  }
}