// @flow

import React from 'react';
import { Image, TouchableOpacity, Platform } from 'react-native';
import Navbar from '@components/common/Navbar';
import { Actions } from 'react-native-router-flux';

const QRScannerNavbar = () => (
  <Navbar
    title="QR-code"
    rightButton={{
      onPress: Actions.pop,
      component: <Image
        source={require('./img/qr_scanner_close.png')}
      />,
    }}
  />
);

export default QRScannerNavbar;