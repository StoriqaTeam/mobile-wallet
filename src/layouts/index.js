// @flow

import type { Node, Element } from 'react';
import React from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import {observer} from "mobx-react";
import store from '@store';
import styles from './styles';


@observer
export class MainLayout extends React.Component {
  render() {
    const { children, navbar, style } = this.props;
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
}
