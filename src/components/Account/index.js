import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';

export default ({ account }) => (<View>
  <Text>{account.accountState}</Text>
</View>);