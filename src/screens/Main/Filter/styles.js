import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  root: {
    alignItems: 'stretch',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  slider: {
    height: 20,
  },
  button: {},
  header: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 12,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  valueText: {
    width: 50,
    color: 'white',
    fontSize: 20,
  },
});
