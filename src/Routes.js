// @flow

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
import * as accounts from './screens/accounts';
import AccountsListNavbar from '@components/Account/AccountsListNavbar';
import AccountDetailNavbar from '@components/AccountDetail/AccountDetailNavbar';
import PinNavbar from '@components/Pin/PinNavbar';
import AmountNavbar from '@components/Amount/AmountNavbar';
import QRScannerNavbar from '@components/QRScanner/QRScannerNavbar';
import QRGeneratorNavbar from '@components/QRGenerator/QRGeneratorNavbar';
import Success from './components/TransactionResultScreens/Success';
import Error from './components/TransactionResultScreens/Error';

export default () => (
  <View style={{ flex: 1 }}>
    <Router wrapBy={observer}>
      <Modal hideNavBar>
        <Stack hideNavBar key={ROOT}>
          <Scene key={ACCOUNTS} initial component={accounts.AccountsList} />
          <Scene key={ACCOUNTDETAIL} component={accounts.AccountDetail} />
          <Scene key={QRGENERATOR} component={qr.QRGenerator} navBar={QRGeneratorNavbar} />
          <Scene key={QRSCANNER} component={qr.QRScanner} navBar={QRScannerNavbar} />
        </Stack>
        <Scene key={PIN} hideNavBar={false} component={accounts.Pin} navBar={PinNavbar} />
        <Scene key={AMOUNT} hideNavBar={false} component={accounts.Amount} navBar={AmountNavbar} />
        <Scene key={SUCCESS} hideNavBar component={Success} />
        <Scene key={ERROR} hideNavBar component={Error} />
      </Modal>
    </Router>
  </View>
);
