import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';


export default ({ account, onPress }) => { //
  return (
    <LinearGradient colors={['#812336', '#00B2FF']} style={styles.container} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <TouchableOpacity onPress={() => onPress(account)}>
        <View style={styles.accountInfoRow}>
          <Text numberOfLines={1} style={styles.addressLabel}>{account.address}</Text>
          <Image source={require('./img/stq_logo.png')} style={styles.stqLogo} />
        </View>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceDescriptionLabel}>Money on{'\n'}balance</Text>
          <Text style={styles.balanceLabel}>{account.balance} STQ</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
}