// @flow
import React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import QRCode from 'react-native-qrcode';
import { QRSCANNER } from '../../constants';


class QRGenerator extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     text: 'http://facebook.github.io/react-native/',
  //   };
  // }

  render() {
    const { text } = this.props;
    return (
      <View style={{ margin: 16 }}>
        <Text>QRGenerator</Text>
        <QRCode
          value={text}
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
