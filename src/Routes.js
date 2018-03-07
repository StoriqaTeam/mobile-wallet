import React from 'react';
import { View } from 'react-native';
import { Router, Modal, Stack, Scene } from 'react-native-router-flux';
import { ROOT, QRGENERATOR, QRSCANNER, KEYGENERATOR, ACCOUNTS, ACCOUNTDETAIL, PIN, AMOUNT } from '@constants';
import { observer } from 'mobx-react/native'
import store from '@store'
import * as qr from './screens/qr';
import * as keys from './screens/keys';
import * as accounts from './screens/accounts';


export default () => (
  <View style={{ flex: 1 }}>
    <Router wrapBy={observer}>
      <Modal hideNavBar>
        <Stack key={ROOT}>
          <Scene key={ACCOUNTS} initial component={accounts.AccountsList} />
          <Scene key={ACCOUNTDETAIL} component={accounts.AccountDetail} />
          <Scene key={KEYGENERATOR} component={keys.KeyGenerator} />
          <Scene key={QRGENERATOR} component={qr.QRGenerator} />
          <Scene key={QRSCANNER} component={qr.QRScanner} />
        </Stack>
        <Scene key={PIN} hideNavBar={false} component={accounts.Pin} />
        <Scene key={AMOUNT} hideNavBar={false} component={accounts.Pin} />
      </Modal>
    </Router>
  </View>
);
