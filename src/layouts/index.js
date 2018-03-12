// @flow

import type { Node, Element } from 'react';
import React from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import store from '@store';
import styles from './styles';


export const MainLayout = ({ children, style = {}, navbar }) => {
  if (store.isLoading) {
    return (
      <View style={[styles.containerSpinner, style && style]}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={[styles.container, style && style]}>
      {navbar && navbar}
      {children}
    </View>
  );
}
