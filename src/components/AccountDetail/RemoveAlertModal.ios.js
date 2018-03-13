// @flow

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';

type PropsType = {
  visible: boolean,
  onPressClose: Function,
  onPressYes: Function,
  onPressCancel: Function,
};
import { BlurView } from 'react-native-blur';

import { Button } from '@components/common';

const RemoveAlertModal = (props: PropsType) => {
  return (
    <Modal
      style={styles.modal}
      transparent
      visible={props.visible}
      onRequestClose={() => {}}
    >
      <TouchableOpacity activeOpacity={1} style={styles.container} onPress={props.onPressClose}>
        <BlurView blurType="dark" style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, justifyContent: 'center' }}>
          <TouchableOpacity activeOpacity={1} style={styles.modalView} onPress={() => {}}>
            <TouchableOpacity style={styles.closeButton} onPress={props.onPressClose}>
              <Image source={require('../Account/img/modal_close.png')} />
            </TouchableOpacity>
            <Text style={styles.label}>
              Do you really want to{'\n'}
              your wallet?
            </Text>
            <Button
              text="Yes"
              type="default"
              style={{ width: 203, marginTop: 45 }}
              onClick={props.onPressYes}
              icon="add"
            />
            <Button
              text="Cancel"
              type="default"
              isLight
              style={{ width: 203 }}
              onClick={props.onPressCancel}
              icon="import"
            />
          </TouchableOpacity>
        </BlurView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    display: 'flex',
    flex: 1,
    height: '100%',
  },
  container: {
    display: 'flex',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 12,
    paddingBottom: 46,
    alignItems: 'center',
  },
  label: {
    marginTop: 34,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Helvetica',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 15,
    height: 16,
    width: 16,
  },
});

export default RemoveAlertModal;
