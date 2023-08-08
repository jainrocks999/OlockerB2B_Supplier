import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  // container: {
  //     width: '100%',
  //     backgroundColor: '#032e63',
  //     justifyContent: 'space-between',
  //     paddingHorizontal: 10,
  //     flexDirection: 'row',
  //     paddingVertical: 20,
  // },
  container1: {
    flex: 1,
    backgroundColor: '#f0eeee',
  },

  Text1: {
    fontWeight: '400',
    // color: '#032e63',
    fontSize: 13,
    fontFamily: 'Acephimere',
  },
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {height: 2, width: 0},
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  card1: {
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {height: 2, width: 0},
    elevation: 5,
    borderRadius: 6,
    backgroundColor: '#E5E5E5E6',
    marginBottom: 0,
    paddingHorizontal: 35,
    paddingVertical: 25,
    marginHorizontal: 11,
    marginBottom: 20,
  },
  img: {
    height: 25,
    width: 25,
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 25,
    marginTop: 17,
    fontWeight: '700',
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  main1: {
    borderWidth: 1,
    borderRadius: 40,
    // height: 50,
    width: '40%',
    alignItems: 'center',
    borderColor: 'grey',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  bottomV: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.5,
  },
  textB: {
    fontSize: 23,
    color: 'grey',
    fontWeight: '500',
    marginTop: 15,
  },
  textC: {
    fontSize: 13,
    color: 'grey',
    fontWeight: '500',
    marginTop: 3,
  },
  button: {
    backgroundColor: '#e9056b',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal:5,
  },
  textbt: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Acephimere',
  },
  rnimg: {
    marginLeft: 2,
    width: 20,
    height: 13,
    marginTop: Platform.OS == 'android' ? 14 : 4,
    //tintColor:'grey'
  },
  container: {
    flex: 1,
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
});

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Platform,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import StatusBar from '../../../components/StatusBar';
// import styles from './styles';
// import RNPickerSelect from 'react-native-picker-select';
// import Bottum from "../../../components/StoreButtomTab";
// import Header from '../../../components/CustomHeader';
// const Feedback = () => {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.container1}>
//      <Header
//       source={require('../../../assets/L.png')}
//       source2={require('../../../assets/La.png')}
//       source1={require('../../../assets/Fo.png')}
//       title={'Feedback '}
//       onPress={() => navigation.goBack()}
//       />
//       <ScrollView style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 0 }}>
//       <View style={styles.main}>

//             <View style={[styles.main1,{borderColor:'#032e63'}]}>
//             <Text style={[styles.Text1,{color:'#032e63'}]}>Pending Reply</Text>
//             </View>
//         <View style={[styles.main1,{marginLeft:10}]}>
//           <Text style={styles.Text1}>Replied</Text>
//             </View>

//           </View>
//         <View style={styles.card}>

//           <View style={{
//             flexDirection:'row',
//             paddingHorizontal:17,
//             alignItems:'center'
//             }}>
//          <Text style={{fontSize:15,color:'#032e63'}}>Milind Shethia</Text>
//           <View
//           style={{
//             width:80,
//             backgroundColor:'#918f90',
//             borderRadius:20,
//             alignItems:'center',
//             justifyContent:'center',
//             marginLeft:10,
//             paddingVertical:2
//             }}>
//               <Text style={{color:'#fff',fontSize:12}}>PLATINUM</Text>
//           </View>
//           </View>
//           <View style={{
//             flexDirection:'row',
//             alignContent:'center',
//             justifyContent:'space-between',
//             paddingHorizontal:17,
//             marginTop:5
//             }}>
//           <Text>+918765467834</Text>
//           <Text>23 Sep 2021</Text>
//               </View>
//          <View style={{ borderWidth:1, marginTop:15, borderColor:'#DDDDDD',}}/>
//            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:7}}>
//            <Text>How was our Jewellery collection</Text>
//           <Text style={{color:'#032e63',fontSize:12}}>Excellent</Text>

//            </View>

//            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:4}}>
//            <Text>Staff behavior</Text>
//           <Text style={{color:'#032e63',fontSize:12}}>Well Behaved</Text>

//            </View>

//            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:4}}>
//            <Text>Showroom ambience</Text>
//           <Text style={{color:'#032e63',fontSize:12}}>Proper Jewellery displyed</Text>

//            </View>

//            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:4}}>
//            <Text>Will vou refer us</Text>
//           <Text style={{color:'#032e63',fontSize:12}}>Yes</Text>

//            </View>
//           <View style={{ marginTop: 20, marginHorizontal: 10, }}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('Messagebox')}
//             style={styles.button}>
//             <Text style={styles.textbt}>{'Reply'}</Text>
//           </TouchableOpacity>
//         </View>

//         </View>
//         <View style={[styles.card,{marginTop:10}]}>
//         <View style={{
//           flexDirection:'row',
//           paddingHorizontal:17,
//           alignItems:'center'
//           }}>
//          <Text style={{fontSize:15,color:'#032e63'}}>Milind Shethia</Text>
//           <View
//           style={{
//             backgroundColor:'#da9401',
//             borderRadius:20,
//             alignItems:'center',
//             justifyContent:'center',
//             marginLeft:10,
//             paddingVertical:2,paddingHorizontal:17
//             }}>
//               <Text style={{color:'#fff',fontSize:10}}>GOLD</Text>
//           </View>
//           </View>
//           <View style={{
//             flexDirection:'row',
//             alignContent:'center',
//             justifyContent:'space-between',
//             marginTop:5,
//             paddingHorizontal:17
//             }}>
//           <Text>+918765467834</Text>
//           <Text>23 Sep 2021</Text>
//               </View>

//        </View>
//       < View style={[styles.card,{marginTop:10}]}>
//       <View style={{flexDirection:'row',paddingHorizontal:17}}>
//          <Text style={{fontSize:15,color:'#032e63'}}>Avishek Tarafdar</Text>
//           <View style={{
//             backgroundColor:'#918f90',
//             borderRadius:20,
//             alignItems:'center',
//             justifyContent:'center',
//             marginLeft:10,
//             paddingVertical:2,paddingHorizontal:17
//             }}>
//               <Text style={{color:'#fff',fontSize:10}}>SILVER</Text>
//           </View>

//           </View>
//           <View style={{
//             flexDirection:'row',
//             alignContent:'center',
//             justifyContent:'space-between',
//             marginTop:5,
//             paddingHorizontal:17}}>
//           <Text>+918765467834</Text>
//           <Text>23 Sep 2021</Text>
//           </View>

//        </View>
//        <View style={{height:30}}/>
//        <View/>
//       </ScrollView>
//       <StatusBar />
//       <Bottum />
//     </View>
//   );
// };
// export default Feedback;

// Data = [
//   { label: 'Football', value: 'football' },
//   { label: 'Baseball', value: 'baseball' },
//   { label: 'Hockey', value: 'hockey' },
// ]
