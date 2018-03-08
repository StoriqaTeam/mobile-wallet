// @flow

import React from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';
import Navbar from '@components/common/Navbar';

const AccountDetailNavbar = () => (
  <Navbar title="Wallet balance" back>
    <Image style={styles.removeIcon} source={require('./img/navbar_remove.png')} />
  </Navbar>
);

const styles = StyleSheet.create({
  removeIcon: {
    position: 'absolute',
    top: 31,
    right: 22,
  },
});

export default AccountDetailNavbar;