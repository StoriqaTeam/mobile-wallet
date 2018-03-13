// @flow
import React from 'react';
import { Button, View, Image, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode';
import { MainLayout } from '@layouts';
import Navbar from '@components/common/Navbar';


type PropsType = {
  text: string,
};

const QRGenerator = (props: PropsType) => (
  <MainLayout
    navbar={
      <Navbar title="Pin-code" back />
    }
  >
    <View style={styles.container}>
      <Image style={styles.image} source={require('./img/QR.png')} />
      <Text style={styles.label}>
        Scan this Qr-code within wallet supporting{'\n'}
        QR-scanning to receive money{'\n'}
        to your wallet
    </Text>
      <View style={styles.qr}>
        <QRCode
          value={props.text}
          size={200}
          bgColor="black"
          fgColor="white"
        />
      </View>
      {/* <Button title="go to scan" onPress={() => Actions.push(QRSCANNER)} /> */}
    </View>
  </MainLayout>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    marginTop: 34,
  },
  qr: {
    marginBottom: 66,
  },
  label: {
    textAlign: 'center',
    opacity: 0.5,
  },
});

export default QRGenerator;
