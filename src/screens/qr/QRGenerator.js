// @flow
import React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import QRCode from 'react-native-qrcode';
import { QRSCANNER } from '../../constants';


class QRGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      text: 'http://facebook.github.io/react-native/',
    };
  }

  render() {
    return (
      <View>
        <Text>QRGenerator</Text>
        <TextInput
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <QRCode
          value={this.state.text}
          size={200}
          bgColor="purple"
          fgColor="white"
        />
        {/* <Button title="go to scan" onPress={() => Actions.push(QRSCANNER)} /> */}
      </View>
    );
  }
}

export default QRGenerator;
