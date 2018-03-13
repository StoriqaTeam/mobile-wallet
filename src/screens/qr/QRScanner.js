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
  Image,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { KEYGENERATOR, PIN } from '@constants';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const CustomMarker = () => (
  <View style={{ width: screenWidth - 120, height: screenWidth - 120 }}>
    <Image
      source={require('./img/qr_top_left.png')}
      style={{ top: 0, left:0, position: 'absolute', }}
    />
    <Image
      source={require('./img/qr_top_right.png')}
      style={{ top: 0, right: 0, position: 'absolute', }}
    />
    <Image
      source={require('./img/qr_bottom_left.png')}
      style={{ bottom: 0, left:0, position: 'absolute', }}
    />
    <Image
      source={require('./img/qr_bottom_right.png')}
      style={{ right: 0, bottom: 0, position: 'absolute', }}
    />
  </View>
);

type PropsType = {
  callback: (v: string) => void,
};

class QRScanner extends React.Component<PropsType> {
  onSuccess = (e) => {
    const { callback } = this.props;
    callback(e.data);
  };

  render() {
    return (
      <View style={styles.container} blurType="light">
        <QRCodeScanner
          onRead={this.onSuccess}
          cameraStyle={styles.qrScanner}
          containerStyle={styles.container}
          showMarker
          customMarker={<CustomMarker />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  qrScanner: {
    height: '100%',
  },
});

export default QRScanner;
