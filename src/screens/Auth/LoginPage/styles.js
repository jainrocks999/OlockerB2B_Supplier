import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
    width: wp('14.5%'),
    marginLeft: 14,
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
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
    textShadowOffset: {height: 1, width: 0},
  },
  card: {
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {height: 2, width: 0},
    elevation: 2,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  image: {
    width: 28,
    height: 28,
    marginLeft: -10,
  },
  input1: {
    marginLeft: 0,
    paddingVertical: 5,
    color: '#474747',
    width: '100%',
  },
  input: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    width: wp('60%'),
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
  button: {
    backgroundColor: 'pink',
    alignItems: 'center',
    borderRadius: 45,
    justifyContent: 'center',
    marginTop: 30,
    width: '80%',
    height: 45,
  },
  bottom: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 4,
  },
});
