// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
} from 'react-native';

type PropsType = {
  //
};

type StateType = {
  isFocused: boolean,
  value: string,
};

class TextInput extends Component<PropsType, StateType> {
  state: StateType = {
    isFocused: false,
    value: '',
  };

  render() {
    const { placeholder, onChangeText, style: propsStyle } = this.props;
    const { isFocused, value } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{(isFocused || (value && value.length > 0)) ? placeholder : ''}</Text>
        <RNTextInput
          {...this.props}
          value={value}
          placeholder={isFocused ? ' ' : placeholder}
          placeholderTextColor="#BCBCBC"
          style={[
            styles.main,
            isFocused ? styles.inputActive : styles.inputInactive,
            propsStyle,
          ]}
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={() => this.setState({ isFocused: false })}
          onChangeText={(text) => {
            this.setState({ value: text });
            onChangeText && onChangeText(text);
          }}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    height: 47,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingLeft: 17,
    paddingRight: 17,
  },
  main: {
    borderWidth: 0,
    fontSize: 15,
    paddingBottom: 5,
  },
  label: {
    color: '#BCBCBC',
    fontSize: 13,
  },
  inputInactive: {
    borderBottomWidth: 1,
    borderBottomColor: '#BCBCBC',
  },
  inputActive: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
});

export default TextInput;
