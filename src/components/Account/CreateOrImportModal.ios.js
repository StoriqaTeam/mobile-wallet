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
import { BlurView } from 'react-native-blur';
import { Button } from '@components/common';

type PropsType = {
  visible: boolean,
  onPressClose: Function,
  onPressCreate: Function,
  onPressImport: Function,
};


const CreateOrImportModal = (props: PropsType) => {
  const MyModal = (
    <TouchableOpacity activeOpacity={1} style={styles.modalView} onPress={() => {}}>
      <TouchableOpacity style={styles.closeButton} onPress={props.onPressClose}>
        <Image source={require('./img/modal_close.png')} />
      </TouchableOpacity>
      <Text style={styles.label}>
        Create a new wallet or{'\n'}
        just import an existed one
      </Text>
      <Button
        text="Create new"
        type="default"
        style={{ width: 203, marginTop: 45 }}
        onClick={props.onPressCreate}
        icon="add"
      />
      <Button
        text="Import"
        type="default"
        isLight
        style={{ width: 203 }}
        onClick={props.onPressImport}
        icon="import"
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
        <BlurView blurType="dark" style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, justifyContent: 'center' }}>
          {MyModal}
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
    backgroundColor: 'transparent',
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

export default CreateOrImportModal;
