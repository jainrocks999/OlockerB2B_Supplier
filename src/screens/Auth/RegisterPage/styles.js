import {Platform, StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  headerimg: {
    backgroundColor: '#052a47',
    paddingVertical: 50,
    alignItems: 'center',
    borderBottomEndRadius: 100,
    borderBottomStartRadius: 100,
  },
  line: {
    borderBottomWidth: 1,
    marginHorizontal: Platform.OS == 'android' ? 240 : 270,
    marginLeft: 12,
  },
  view: {
    paddingVertical: 10,
    borderWidth: 1,
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 200,
  },
  main: {
    marginTop: 0,
    marginLeft: 13,
    paddingHorizontal: -5,
  },
  text: {
    fontSize: 20,
    color: '#474747',
    // marginTop:-100,
  },
  card: {
    // shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {height: 2, width: 0},
    elevation: 2,
    // borderRadius: 10,
    //backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    //marginTop: 10,
    //borderWidth: 1,
  },
  image: {
    width: 34,
    height: 34,
    marginLeft: -10,
  },
  input1: {
    marginLeft: 0,
    paddingVertical: 10,
    width: '100%',
    color: '#474747',
    //color: colors.textColor,
  },
  input: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    width: '67%',
    marginLeft: 20,
  },
  error: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 22,
    marginTop: 6,
  },
  warn: {
    fontSize: 12,
    color: 'red',
  },
});
