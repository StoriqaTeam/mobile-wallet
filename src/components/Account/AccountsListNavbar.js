// @flow

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const AccountsListNavbar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        My wallets
      </Text>
      <TouchableOpacity style={styles.addIcon} onPress={() => {}}>
        <Image source={require('./img/navbar_icon_add.png')} />
      </TouchableOpacity>
    </View>
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
