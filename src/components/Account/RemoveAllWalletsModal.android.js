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
import { Button } from '@components/common';


type PropsType = {
  visible: boolean,
  onPressClose: Function,
  onPressDelete: Function,
};


const RemoveModal = (props: PropsType) => {
  const MyModal = (
    <TouchableOpacity activeOpacity={1} style={styles.modalView} onPress={() => {}}>
      <TouchableOpacity style={styles.closeButton} onPress={props.onPressClose}>
        <Image source={require('./img/modal_close.png')} />
      </TouchableOpacity>
      <Text style={styles.label}>
        Do you really want to delete{'\n'}
        all your current wallets?
      </Text>
      <Button
        text="Delete"
        type="default"
        style={{ width: 203, marginTop: 45 }}
        onClick={props.onPressDelete}
      />
      <Button
        text="Cancel"
        type="default"
        isLight
        style={{ width: 203 }}
        onClick={props.onPressClose}
      />
    </TouchableOpacity>
  );
  return (
    <Modal
      style={styles.modal}
      transparent
      visible={props.visible}
      onRequestClose={() => {}}
    >
      <TouchableOpacity activeOpacity={1} style={styles.container} onPress={props.onPressClose}>
        {MyModal}
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
    backgroundColor: '#00000070',
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

export default RemoveModal;
