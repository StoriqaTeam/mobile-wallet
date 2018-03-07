// @flow

import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from 'react-native';

type PropsType = {
  text: string,
  type: 'default' | 'danger',
  isLight: boolean,
  onClick: Function,
};

const typesMap = {
  default: 'defaultType',
  danger: 'dangerType',
};

const colorsMap = {
  default: '#03A9FF',
  danger: '#FF62A4',
};

const Button = (props: PropsType) => {
  return (
    <TouchableOpacity
      onPress={props.onClick}
      style={[
        styles.main,
        styles[typesMap[props.type]],
        props.isLight ? {
          backgroundColor: '#00000000',
          borderColor: colorsMap[props.type],
          borderWidth: 1,
        } : {},
      ]}
    >
      <Text style={
        [styles.textStyle, {
          color: props.isLight ? colorsMap[props.type] : '#fff',
        }]}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 44,
    marginLeft: 17,
    marginRight: 17,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  textStyle: {
    fontSize: 17,
  },
  defaultText: {
    color: '#fff',
  },
  defaultType: {
    backgroundColor: '#03A9FF',
  },
  dangerType: {
    backgroundColor: '#FF62A4',
  },
});

export default Button;
