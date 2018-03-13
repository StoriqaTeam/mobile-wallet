import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 13,
    marginLeft: 17,
    marginRight: 17,
    marginBottom: 16,
    height: 103,
    borderRadius: 4,
    backgroundColor: '#00f',
  },
  accountInfoRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addressLabel: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Helvetica',flex: 1, flexWrap: 'wrap'
  },
  stqLogo: {
    width: 49,
    height: 12,
    display: 'flex',
    marginLeft: 15,
  },
  balanceRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    // marginBottom: 16,
  },
  balanceDescriptionLabel: {
    fontSize: 13,
    fontFamily: 'Helvetica',
    color: '#fff',
  },
  balanceLabel: {
    fontSize: 30,
    fontFamily: 'Helvetica',
    color: '#fff',
  },
});
