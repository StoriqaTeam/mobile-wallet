// @flow
import React from 'react';
import {
  Button,
  Linking,
  View,
  Text,
  AppRegistry,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { KEYGENERATOR, PIN } from '@constants';


type PropsType = {
  callback: (v: string) => void,
};

class QRScanner extends React.Component<PorpsType> {
  onSuccess = (e) => {
    const { callback } = this.props;
    Actions.push(PIN, {
      callback: pin => {
        callback(e.data, pin)
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 30 }}>
        <Button
          onPress={Actions.pop}
          title="back"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <QRCodeScanner
          onRead={this.onSuccess}
        />
      </View>
    );
  }
}

export default QRScanner;
