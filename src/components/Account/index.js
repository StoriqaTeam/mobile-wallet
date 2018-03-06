import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';


export default ({ account, onPress }) => {
  // console.log('*&*&** account: ', account)
  return (
    <TouchableOpacity style={styles.container} onPress={() => {
      onPress(account);
    }}>
      <Text>{account.address}</Text>
      <Text>{account.accountState}</Text>
    </TouchableOpacity>
  );
}