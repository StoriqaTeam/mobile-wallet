// @flow

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {observer} from "mobx-react";
import Aes from 'react-native-aes-crypto';
import { Actions } from 'react-native-router-flux';
import store from '@store';
import { ACCOUNTS, ACCOUNTDETAIL, KEYGENERATOR, PIN, QRSCANNER, AMOUNT, QRGENERATOR } from '@constants';
import { AccountComponent } from '@components';
import { Button } from '@components/common';
import { MainLayout } from '@layouts';
import Navbar from '@components/common/Navbar';
import { commonStyles } from '@styles';
import { icon_add } from '@images';
import CreateOrImportModal from '@components/Account/CreateOrImportModal';
import { map } from 'ramda';

type PropsType = {
}

type AccountType = {
  address: string,
  privateKey: string,
  accountState: number,
}

type StateType = {
  accounts: Array<AccountType>,
  isModalVisible: boolean,
}

@observer
class Accounts extends Component<PropsType, StateType> {
  state: StateType = {
    isModalVisible: false,
    accounts: [],
  };
  // пушим экран ввода Pin и передаем колбэк который вызывается
  // в методе handleStoreKey Pin 
  handleCreateAccount = () => {
    Actions.push(PIN, { callback: this.newAccountPinCallback });
  };

  newAccountPinCallback = (pin: string) => {
    store.createAccount(pin);
    Actions.pop();
  }

  // пушим экран сканирования QR и передаем колбэк который вызывается
  // в методе onSuccess QRScanner 
  handleImportAccount = () => {
    Actions.push(QRSCANNER, { callback: this.importAccountQRScannerCallback });
  }

  importAccountQRScannerCallback = str => {
    const qrArray = str.split('.');
    const address = qrArray[0];
    const privateKey = qrArray[1];
    Actions.push(PIN, {
      callback: pin => this.importAccountPinCallback({ address, privateKey, pin }),
    });
  }

  importAccountPinCallback = ({ address, privateKey, pin }) => {
    console.log('&&&& importAccountPinCallback data: ', { address, privateKey, pin })
    store.importAccount({ address, privateKey, pin });
    Actions.push(ACCOUNTS);
  }

  onAccountPress = account => {
    Actions.push(ACCOUNTDETAIL, { account });
  }

  render() {
    return (
      <MainLayout
        navbar={
          <Navbar title="My wallets">
            <TouchableOpacity
              style={commonStyles.addIcon}
              onPress={() => this.setState({ isModalVisible: true })}
            >
              <Image source={icon_add} />
            </TouchableOpacity>
          </Navbar>
        }
      >
        <View style={[commonStyles.containerView/*, {backgroundColor: 'red'}*/]}>
          <CreateOrImportModal
            visible={this.state.isModalVisible}
            onPressClose={() => this.setState({ isModalVisible: false })}
            onPressCreate={() => {
              this.setState({ isModalVisible: false });
              this.handleCreateAccount();
            }}
            onPressImport={() => {
              this.setState({ isModalVisible: false });
              this.handleImportAccount();
            }}
          />
          <View>
            <ScrollView style={{ paddingTop: 13, }} showsVerticalScrollIndicator={false}>
              {map(item => (<AccountComponent key={item.address} account={item} onPress={this.onAccountPress} />), store.accounts)}
              <Button
                onClick={() => this.setState({ isModalVisible: true })}
                text="Create or import wallet"
                type="default"
                isLight
                style={{marginTop: 0, marginBottom: 26 }}
              />
            </ScrollView>
          </View>
        </View>
      </MainLayout>
    );
  }
}

export default Accounts;