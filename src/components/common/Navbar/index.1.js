// @flow

import React, { Fragment } from 'react';
import {
  Platform,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

type PropsType = {
  title: string,
  back?: boolean,
  children: any,
};

const Navbar = (props: PropsType) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {props.title}
      </Text>
      <Fragment>
        {props.back && (
          <TouchableOpacity style={styles.backButton} onPress={() => Actions.pop()}>
            <Image source={require('./img/navbar_back.png')} />
          </TouchableOpacity>
        )}
        {props.children}
      </Fragment>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: Platform.select({ios: 64, android: 44}),
  },
  label: {
    fontSize: 17,
    fontFamily: 'Helvetica',
    alignSelf: 'center',
    marginTop: Platform.select({ ios: 33, android: 13}),
  },
  addIcon: {
    height: 26,
    width: 26,
    position: 'absolute',
    right: 16,
    bottom: 8,
  },
  backButton: {
    position: 'absolute',
    top: Platform.select({ ios: 31, android: 11 }),
    left: 8,
  },
});

export default Navbar;