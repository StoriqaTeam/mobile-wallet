// @flow

import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

type PropsType = {
  text: string,
  type: 'default' | 'danger',
  isLight: boolean,
  onClick: Function,
  disabled?: boolean,
  style?: {},
  icon?: string,
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
  let icon;
  switch (props.icon) {
    case 'add': icon = (<Image style={{ backgroundColor: 'transparent', position: 'absolute', top: 10, left: 13 }} source={require('./icons/button_icon_add.png')} />); break;
    case 'import': icon = (<Image style={{ backgroundColor: 'transparent', position: 'absolute', top: 10, left: 13 }} source={require('./icons/button_icon_import.png')} />); break;
    case 'arrow_down': icon = (<Image style={{ backgroundColor: 'transparent', position: 'absolute', top: 10, left: 13 }} source={require('./icons/button_icon_arrow_down.png')} />); break;
    case 'arrow_up': icon = (<Image style={{ backgroundColor: 'transparent', position: 'absolute', top: 10, left: 13 }} source={require('./icons/button_icon_arrow_up.png')} />); break;
  }
  return (
    <TouchableOpacity
      onPress={!props.disabled ? props.onClick : () => {}}
      style={[
        styles.main,
        styles[typesMap[props.type]],
        props.isLight ? {
          backgroundColor: '#00000000',
          borderColor: colorsMap[props.type],
          borderWidth: 1,
        } : {},
        props.style && props.style,
      ]}
    >
      {props.icon && (icon)}
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
