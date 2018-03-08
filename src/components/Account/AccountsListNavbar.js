// @flow

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Navbar from '@components/common/Navbar';

const AccountsListNavbar = () => {
  return (
    <Navbar title="My wallets">
      <TouchableOpacity style={styles.addIcon} onPress={() => {}}>
        <Image source={require('./img/navbar_icon_add.png')} />
      </TouchableOpacity>
    </Navbar>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 64,
  },
  label: {
    fontSize: 17,
    fontFamily: 'Helvetica',
    alignSelf: 'center',
    marginTop: 31,
  },
  addIcon: {
    height: 26,
    width: 26,
    position: 'absolute',
    right: 16,
    bottom: 8,
  },
});

export default AccountsListNavbar;
