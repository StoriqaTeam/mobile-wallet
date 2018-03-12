// @flow

import '../../../../global';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from '@components/common';
import RemoveAlertModal from '@components/AccountDetail/RemoveAlertModal'
import { KEYGENERATOR, QRGENERATOR, AMOUNT, QRSCANNER, PIN, SUCCESS, ERROR } from '@constants';
import { MainLayout } from '@layouts';
import Navbar from '@components/common/Navbar';
import { commonStyles } from '@styles';
import { icon_remove } from '@images';
import store from '@store';


type StateType = {
  isModalVisible: boolean,
};

export default class Account extends Component<{}, StateType> {
  state = {
    isModalVisible: false,
  };

  // static defaultProps = {
  //   account: {
  //     address: '0x134c2658d60a06333FF0e5CE47cEaC800b3Aa608',
  //     balance: '0.0023423'
  //   }
  // };

  onCreatePaymentCallback = (amount) => {
    const { account } = this.props;
    Actions.push(QRGENERATOR, { text: `${account.address}.${amount}` });
  };

  handleCreatePayment = () => {
    // const { account } = this.props;
    Actions.push(AMOUNT, { callback: this.onCreatePaymentCallback });
  };

  onCreateTransactionCallback = paymentStr => {
    const { account } = this.props;
    // Actions.push(PIN, { callback: pin => this.onGetTransactionPin({ account, paymentStr, pin })});
    Actions.push(PIN, { callback: pin => account.createTransaction({ paymentStr, pin })});
  }

  handleCreateTransaction = () => {
    // commit Action.push for development and force onCreateTransactionCallback
    Actions.push(QRSCANNER, { callback: this.onCreateTransactionCallback });
    // // development test block
    // const paymentStr = '0x4B88cce4c42814623325315aB138b3666058010D,3.45';
    // this.onCreateTransactionCallback(paymentStr);
    // // end development test block
  }

  render() {
    const { account } = this.props;
    return (
      <MainLayout
        navbar={
          <Navbar title="Wallet balance" back>
            <TouchableOpacity
              style={commonStyles.removeIcon}
              onPress={() => this.setState({ isModalVisible: true })}
            >
              <Image source={icon_remove} />
            </TouchableOpacity>
          </Navbar>
        }
      >
        <View style={styles.container}>
          <RemoveAlertModal
            visible={this.state.isModalVisible}
            onPressClose={() => this.setState({ isModalVisible: false })}
            onPressYes={() => store.removeAccount(account)}
            onPressCancel={() => this.setState({ isModalVisible: false })}
          />
          <Image
            style={styles.image}
            source={require('./img/wallet.png')}
          />
          <View style={styles.info}>
            <Text style={styles.defaultLabel}>Wallet address:</Text>
            <Text style={styles.bigLabel}>{account.address}</Text>
            <Text style={[styles.defaultLabel, { marginTop: 26 }]}>Current balance on wallet:</Text>
            <Text style={styles.bigLabel}>{account.shortBalance} STQ</Text>
          </View>
          <View style={{ width: '100%' }}>
            <Button
              onClick={this.handleCreatePayment}
              text="Receive money"
              type="default"
              icon="arrow_down"
              style={{ marginLeft: 0, marginRight: 0 }}
            />
            <Button
              onClick={this.handleCreateTransaction}
              text="Pay the bill"
              type="default"
              isLight
              style={{ marginBottom: 12, marginLeft: 0, marginRight: 0 }}
              icon="arrow_up"
            />
          </View>
        </View>
      </MainLayout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    justifyContent: 'space-between',
  },
  image: {
    marginTop: 34,
  },
  info: {
    //
  },
  defaultLabel: {
    fontSize: 13,
    textAlign: 'center',
  },
  bigLabel: {
    fontSize: 30,
    textAlign: 'center',
  },
});
