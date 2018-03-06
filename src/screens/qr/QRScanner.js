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
import { KEYGENERATOR } from '../../constants';


class QRScanner extends React.Component {
  constructor() {
    super();
    this.state = {
      text: 'http://facebook.github.io/react-native/',
    };
  }

  onSuccess = (e) => {
    console.error('qr code result ', e);
    // Linking.openURL(e.data).catch(err => console.error('An error occured', err));
    this.goBack(e.data);
  }

  goBack = (data) => {
    Actions.popTo(KEYGENERATOR);
    // Actions.refresh({ qrtext: data });
    Actions.refresh({ qrtext: data });
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

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 30,
  },
  cameraStyle: {
    flex: 1,
    backgroundColor: '#333333',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },

  textBold: {
    fontWeight: '500',
    color: '#000',
  },

  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },

  buttonTouchable: {
    padding: 16,
  },
});


export default QRScanner;
