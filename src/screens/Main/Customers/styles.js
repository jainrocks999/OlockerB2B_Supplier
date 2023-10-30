// import {StyleSheet} from 'react-native';
// export default StyleSheet.create({
//   rnimg: {
//     marginLeft: 2,
//     width: 16,
//     height: 13,
//     marginTop: Platform.OS == 'android' ? 12 : 4,
//     //tintColor:'grey'
//   },
//   main: {
//     backgroundColor: '#032e63',
//     width: '100%',
//     borderBottomRightRadius: 60,
//     borderBottomLeftRadius: 60,
//   },
//   card: {
//     paddingHorizontal: 10,
//     paddingVertical: 20,
//     elevation: 5,
//     backgroundColor: '#fff',
//     marginHorizontal: 20,
//     borderRadius: 10,
//     marginTop: -75,
//   },
//   cardV: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   cardV1: {
//     width: '49%',
//     alignItems: 'center',
//   },
//   cardV1t: {
//     fontSize: 35,
//     fontFamily: 'Acephimere',
//     color: '#032e63',
//     fontWeight: '700',
//   },
//   cardV1tt: {
//     fontSize: 13,
//     marginTop: 0,
//     fontFamily: 'Acephimere',
//     color: '#222027',
//   },
//   card2: {
//     backgroundColor: '#fff',
//     marginTop: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   card2img: {
//     height: 60,
//     width: 60,
//   },
//   card2t: {
//     fontSize: 13,
//     marginTop: 5,
//     fontFamily: 'Acephimere',
//     color: '#222027',
//   },
//   bottom: {
//     paddingVertical: 10,
//     marginLeft: 20,
//     marginTop: 10,
//   },
//   bottomt: {
//     fontSize: 15,
//     fontFamily: 'Acephimere',
//     color: '#222027',
//   },
//   cardView: {
//     backgroundColor: '#fff',
//     marginTop: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   carditem: {
//     height: 40,
//     borderRadius: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   carditemimg: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   carditemt: {
//     marginLeft: 20,
//     color: '#032e63',
//     fontFamily: 'Acephimere',
//     fontSize: 14,
//     width: '50%',
//   },
//   carditemtt: {
//     fontFamily: 'Roboto-Regular',
//     color: '#313131',
//     fontSize: 14,
//   },
//   blog: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     borderRadius: 30,
//     borderWidth: 0.5,
//     marginVertical: 10,
//     marginHorizontal: 15,
//     paddingHorizontal: 10,
//     height: 45,
//   },
//   img1: {
//     width: 25,
//     height: 24,
//     marginLeft: 10,
//   },
// });

import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  tabStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
  },
  container: {
    width: '100%',
    backgroundColor: '#032e63',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row',
    paddingVertical: 15,
  },
  img: {
    height: 18,
    width: 12,
  },
  img1: {
    height: 20,
    width: 25,
  },
  img2: {
    height: 22,
    width: 26,
    tintColor: '#fff',
  },
  headertouch: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  img3: {
    width: hp(3.6),
    height: hp(3.6),
    marginLeft: 15,
    tintColor: 'white',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
