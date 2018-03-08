import React from 'react';
import { View } from 'react-native';
import { Router, Modal, Stack, Scene } from 'react-native-router-flux';
import {
  ROOT,
  QRGENERATOR,
  QRSCANNER,
  KEYGENERATOR,
  ACCOUNTS,
  ACCOUNTDETAIL,
  PIN,
  AMOUNT,
  SUCCESS,
  ERROR,
} from '@constants';
import { observer } from 'mobx-react/native';
import * as qr from './screens/qr';
import * as keys from './screens/keys';
import * as accounts from './screens/accounts';
import AccountsListNavbar from '@components/Account/AccountsListNavbar';
import AccountDetailNavbar from '@components/AccountDetail/AccountDetailNavbar';
import PinNavbar from '@components/Pin/PinNavbar';
import AmountNavbar from '@components/Amount/AmountNavbar';
import QRGeneratorNavbar from '@components/QRGenerator/QRGeneratorNavbar';
import Success from './components/TransactionResultScreens/Success';

export default () => (
  <View style={{ flex: 1 }}>
    <Router wrapBy={observer}>
      <Modal hideNavBar>
        <Stack key={ROOT}>
          <Scene key={ACCOUNTS} initial component={accounts.AccountsList} navBar={AccountsListNavbar} />
          <Scene key={ACCOUNTDETAIL} component={accounts.AccountDetail} navBar={AccountDetailNavbar} />
          <Scene key={KEYGENERATOR} component={keys.KeyGenerator} />
          <Scene key={QRGENERATOR} component={qr.QRGenerator} navBar={QRGeneratorNavbar} />
          <Scene key={QRSCANNER} component={qr.QRScanner} />
        </Stack>
        <Scene key={PIN} hideNavBar={false} component={accounts.Pin} navBar={PinNavbar} />
        <Scene key={AMOUNT} hideNavBar={false} component={accounts.Amount} navBar={AmountNavbar} />
        <Scene key={SUCCESS} initial hideNavBar component={Success} />
      </Modal>
    </Router>
  </View>
);
