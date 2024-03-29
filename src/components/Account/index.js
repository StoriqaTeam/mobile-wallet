import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
// import ramda 

const gradients = [
  ['#D09182', '#00B2FF'],
  ['#12236D', '#00B3FF'],
  ['#5E47CD', '#00B3FF'],
  ['#2CAA81', '#00B3FF'],
  ['#CE9A69', '#00B3FF'],
];

const getGradient = index => {
  // const num = Math.floor(Math.random() * 4);
  return gradients[index%5];
}

export default ({ account, onPress, index }) => { //
  return (
    <LinearGradient colors={getGradient(index)} style={styles.container} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <TouchableOpacity onPress={() => onPress(account)}>
        <View style={styles.accountInfoRow}>
          <Text numberOfLines={1} style={styles.addressLabel}>{account.address}</Text>
          <Image source={require('./img/stq_logo.png')} style={styles.stqLogo} />
        </View>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceDescriptionLabel}>Balance</Text>
          <Text style={styles.balanceLabel}>{account.shortBalance} STQ</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
}