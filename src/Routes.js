import React from 'react';
import { View } from 'react-native';
import { Router, Modal, Stack, Scene } from 'react-native-router-flux';
import * as qr from './screens/qr';
import * as keys from './screens/keys';
import { ROOT, QRGENERATOR, QRSCANNER, KEYGENERATOR } from './constants';


export default () => (
  <View style={{ flex: 1 }}>
    <Router>
      <Modal hideNavBar>
        <Stack key={ROOT}>
          <Scene key={KEYGENERATOR} hideNavBar initial component={keys.KeyGenerator} />
          <Scene key={QRGENERATOR} hideNavBar component={qr.QRGenerator} />
          <Scene key={QRSCANNER} hideNavBar component={qr.QRScanner} />
        </Stack>
      </Modal>
    </Router>
  </View>
);
