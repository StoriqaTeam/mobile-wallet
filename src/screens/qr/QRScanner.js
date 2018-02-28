// @flow
import React from 'react';
import { Linking, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import QRCodeScanner from 'react-native-qrcode-scanner';


class QRScanner extends React.Component {
  constructor() {
    super();
    this.state = {
      text: 'http://facebook.github.io/react-native/',
    };
  }

  onSuccess = (e) => {
    console.error('qr code result ', e);
    Linking.openURL(e.data).catch(err => console.error('An error occured', err));
  }

  render() {
    return (
      <QRCodeScanner onRead={this.onSuccess} />
    );
  }
}

export default QRScanner;
