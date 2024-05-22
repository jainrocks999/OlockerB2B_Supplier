import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  text: {
    color: '#000',
    fontFamily: 'Acephimere',
    fontSize:15,
    fontWeight:'700'
  },
  dropdown: {
    marginVertical: 10,
    height: 45,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 12,
  
  },
  placeholderStyle: {
    fontSize: 15,
    color: 'grey',
  },
  selectedTextStyle: {
    fontSize:15,
    color: 'black',
  },

  uploadView: {
    borderWidth: 1,
    marginTop: 4,
    height: 40,
    borderRadius: 6,
    borderColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
  },
  grey: {
    backgroundColor: 'grey',
    height: 40,
    width: '30%',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  multiline: {
    borderWidth: 1,
    marginTop: 4,
    borderRadius: 6,
    borderColor: 'grey',
    height: 100,
  },
  input: {
    paddingLeft: 10,
    fontSize: 14,
    includeFontPadding: false,
    padding: 0,
    margin: 0,
  },
  sView: {
    borderWidth: 1,
    marginTop: 4,
    height: 40,
    borderRadius: 6,
    borderColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sTouch: {
    backgroundColor: 'grey',
    height: 40,
    width: '30%',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
