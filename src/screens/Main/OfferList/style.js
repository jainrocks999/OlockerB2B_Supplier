import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  some: {
    marginVertical: 7,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#fff',
    minHeight: 100,
    width: '99%',
    paddingVertical: 10,
    borderRadius: 10,
  },
  img: {width: '92%', height: hp(20), alignSelf: 'center', borderRadius: wp(3)},
  name: {},
});
