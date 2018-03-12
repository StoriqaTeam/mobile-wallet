// @flow

import {
  StyleSheet,
} from 'react-native';

export const commonStyles = StyleSheet.create({
  containerView: {
    backgroundColor: '#fff',
    height: '100%',
    display: 'flex',
  },
  view: {
    marginTop: 13,
  },
  viewTitle: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  addIcon: {
    height: 26,
    width: 26,
    position: 'absolute',
    right: 16,
    bottom: 8,
  },
  removeIcon: {
    position: 'absolute',
    top: 31,
    right: 22,
  },
});
