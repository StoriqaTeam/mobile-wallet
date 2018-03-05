import React from 'react';
import { View } from 'react-native';
import { Router, Modal, Stack, Scene } from 'react-native-router-flux';
import * as qr from './screens/qr';
import * as keys from './screens/keys';
import * as accounts from './screens/accounts';
import { ROOT, QRGENERATOR, QRSCANNER, KEYGENERATOR, ACCOUNTS, ACCOUNTDETAIL } from './constants';


export default () => (
  <View style={{ flex: 1 }}>
    <Router>
      <Modal hideNavBar>
        <Stack key={ROOT}>
          <Scene key={ACCOUNTS} initial component={accounts.AccountsList} />
          <Scene key={ACCOUNTDETAIL} component={accounts.AccountDetail} />
          <Scene key={KEYGENERATOR} component={keys.KeyGenerator} />
          <Scene key={QRGENERATOR} component={qr.QRGenerator} />
          <Scene key={QRSCANNER} component={qr.QRScanner} />
        </Stack>
      </Modal>
    </Router>
  </View>
);
