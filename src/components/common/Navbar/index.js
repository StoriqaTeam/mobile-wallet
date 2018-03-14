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

const Navbar = ({ title, leftButton, rightButton, back }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftWrapper}>
        {back && (
          <TouchableOpacity style={styles.itemWrapper} onPress={() => Actions.pop()}>
            <View style={styles.backButton} >
              <Image source={require('./img/navbar_back.png')} />
            </View>
          </TouchableOpacity>
        )}
        {leftButton &&
          <TouchableOpacity style={styles.itemWrapper} onPress={leftButton.onPress}>
            {leftButton.component}
          </TouchableOpacity>
        }
      </View>
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>
          {title && title}
        </Text>
      </View>
      <View style={styles.rightWrapper}>
        {rightButton &&
          <TouchableOpacity style={styles.itemWrapper} onPress={rightButton.onPress}>
            {rightButton && rightButton.component}
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: Platform.select({ios: 20, android: 0}),
    height: Platform.select({ios: 64, android: 44}),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelWrapper: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 9,
  },
  rightWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 9,
  },
  itemWrapper: {
    paddingHorizontal: 9,
    height: '100%',
    justifyContent: 'center',
  },
  label: {
    fontSize: 17,
    fontFamily: 'Helvetica',
    alignSelf: 'center',
  },
});

export default Navbar;
