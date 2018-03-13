// @flow

import React from 'react';
import { Image, TouchableOpacity, Platform } from 'react-native';
import Navbar from '@components/common/Navbar';
import { Actions } from 'react-native-router-flux';

const QRScannerNavbar = () => (
  <Navbar title="QR-code">
    <TouchableOpacity
      onPress={() => Actions.pop() }
      style={{ position: 'absolute', top: Platform.select({ ios: 31, android: 11 }), right: 17 }}
    >
      <Image
        source={require('./img/qr_scanner_close.png')}
      />
    </TouchableOpacity>
  </Navbar>
);

export default QRScannerNavbar;