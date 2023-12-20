// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   FlatList,
// } from 'react-native';
// import TabView from '../../../components/StoreButtomTab';
// import Header from '../../../components/CustomHeader';
// import {useNavigation} from '@react-navigation/native';
// import {
//   VictoryBar,
//   VictoryChart,
//   VictoryAxis,
//   VictoryTheme,
// } from 'victory-native';
// import RNPickerSelect from 'react-native-picker-select';
// import styles from './styles';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const MyCatalogue = () => {
//   const navigation = useNavigation();
//   const [status, setStatus] = useState('');
//   const [data1, setUserdata] = useState(false);
//   const [data2, setUserdata1] = useState('');
//   const date = new Date();
//   let ToDAY = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
//   // console.log('change formate', ToDAY);

//   const data = [
//     {quarter: 1, earnings: 500},
//     {quarter: 2, earnings: 1000},
//     {quarter: 3, earnings: 2000},
//     {quarter: 4, earnings: 3000},
//     {quarter: 5, earnings: 4000},
//     {quarter: 6, earnings: 5000},
//     {quarter: 7, earnings: 6000},
//     {quarter: 8, earnings: 7000},
//     {quarter: 9, earnings: ''},
//     {quarter: 10, earnings: ''},
//     {quarter: 11, earnings: ''},
//     {quarter: 12, earnings: ''},
//   ];
//   return (
//     <View style={{flex: 1}}>
//       <Header
//         source1={require('../../../assets/Fo.png')}
//         source2={require('../../../assets/Image/dil.png')}
//         title={'My Customers '}
//         onPress={() => navigation.goBack()}
//         onPress1={() => navigation.navigate('Message')}
//         onPress2={() => navigation.navigate('FavDetails')}
//       />

//       <ScrollView>
//         <View style={styles.main}>
//           <View style={{height: 150}} />
//         </View>
//         <View style={styles.card}>
//           <View style={styles.cardV}>
//             <View style={styles.cardV1}>
//               <Text style={styles.cardV1t}>{123}</Text>
//               <Text style={styles.cardV1tt}>Today Downloads</Text>
//             </View>
//             <View style={styles.cardV1}>
//               <Text style={styles.cardV1t}>{1234}</Text>
//               <Text style={styles.cardV1tt}>Total Downloads</Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.card2}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('Mycustomer')}
//             style={{alignItems: 'center'}}>
//             <View style={{}}>
//               <Image
//                 style={styles.card2img}
//                 source={require('../../../assets/Image/myCustomerImage.png')}
//               />
//             </View>
//             <Text style={styles.card2t}>{'My Customers'}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('Feedback')}
//             style={{alignItems: 'center'}}>
//             <View style={{}}>
//               <Image
//                 style={styles.card2img}
//                 source={require('../../../assets/Image/feedbackI.png')}
//               />
//             </View>
//             <Text style={styles.card2t}>{'Feedback'}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('Loyalty1')}
//             style={{alignItems: 'center'}}>
//             <View style={{}}>
//               <Image
//                 style={styles.card2img}
//                 source={require('../../../assets/Image/heart.png')}
//               />
//             </View>
//             <Text style={styles.card2t}>{'Loyalty'}</Text>
//           </TouchableOpacity>
//         </View>
//         {/* <View style={styles.blog}>
//           <Image style={{ height: 13, width: 20 }} resizeMode={'contain'}
//             source={require('../../../assets/Image/serch.png')}
//           />
//           <TextInput
//             //  style={{marginLeft: 10}}
//             placeholder="Search by Name or Phone Number"
//             placeholderTextColor='9a9a9a'
//             style={{ color: '9a9a9a', width: '100%', marginLeft: 10, fontFamily: 'Roboto-Regular' }}
//             returnKeyType="done"
//              value={search}
//             onChangeText={(val) => searchFilterFunction(val)}
//           />
//         </View> */}

//         <View style={styles.bottom}>
//           <Text style={styles.bottomt}>Recents downloads</Text>
//         </View>
//         <View>
//           <FlatList
//             data={User}
//             renderItem={({item}) => (
//               <TouchableOpacity
//                 // onPress={() => userProfile(item.SrNo)}
//                 //  onPress={()=>navigation.navigate('MyCustomerDetail')}
//                 style={styles.cardView}>
//                 {// console.log('item233', item)}
//                 <View style={styles.carditem}>
//                   <Image
//                     style={styles.carditemimg}
//                     source={require('../../../assets/user.jpeg')}
//                   />
//                   <Text style={styles.carditemt}>{item.title}</Text>
//                 </View>
//                 <View>
//                   <Text style={styles.carditemtt}>{item.mobile}</Text>
//                 </View>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//         <View style={{height: 140}} />
//       </ScrollView>
//       {/* <View style={{backgroundColor:'#032e63',width:60,height:60,
//           position:'absolute',bottom:80,right:15,borderRadius:30,
//           alignItems:'center',
//           justifyContent:'center'
//         }}>
//           <Image style={{height:30,width:30}} source={require('../../../assets/plus.png')}/>
//         </View> */}
//       {/* <View style={{bottom: 0, position: 'absolute', left: 0, right: 0}}>
//         <TabView />
//       </View> */}
//     </View>
//   );
// };
// export default MyCatalogue;
// const data = [
//   {title: 'Hello'},
//   {title: 'Hello'},
//   {title: 'Hello'},
//   {title: 'Hello'},
//   {title: 'Hello'},
//   {title: 'Hello'},
//   {title: 'Hello'},
//   {title: 'Hello'},
//   {title: 'Hello', type: 'add'},
// ];
// const Data = [
//   {label: 'Today Downloads', value: 'Today Downloads'},
//   {label: 'Total Downloads', value: 'Total Downloads'},
//   // { label: 'Last 3 year', value: '3' },
// ];
// const User = [
//   {
//     image: require('../../../assets/user.jpeg'),
//     title: 'Milind Shethiya',
//     mobile: '+918765457324',
//   },
//   {
//     image: require('../../../assets/user.jpeg'),
//     title: 'Milind Shethiya',
//     mobile: '+918765457324',
//   },
//   {
//     image: require('../../../assets/user.jpeg'),
//     title: 'Milind Shethiya',
//     mobile: '+918765457324',
//   },
//   {
//     image: require('../../../assets/user.jpeg'),
//     title: 'Milind Shethiya',
//     mobile: '+918765457324',
//   },
//   {
//     image: require('../../../assets/user.jpeg'),
//     title: 'Milind Shethiya',
//     mobile: '+918765457324',
//   },
//   {
//     image: require('../../../assets/user.jpeg'),
//     title: 'Milind Shethiya',
//     mobile: '+918765457324',
//   },
// ];

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
  Alert,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import BottomTab from '../../../components/StoreButtomTab';
import Stars from 'react-native-stars';
import styles from './styles';
import Catalogue from '../../../components/Catalogue';
import Profile from '../../../components/Profile';
import Setting from '../../../components/Settings';
import Loader from '../../../components/Loader';
import ImagePath from '../../../components/ImagePath';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';

let productImage = [];
let showroomImage = [];
let supplierLogo = '';
let ownerImage = [];
let goldSpecilization = [];
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selector1 = useSelector(state => state.Supplier.SupplierDetail);
  const selector = selector1?.data;
  const ownerImagePath = 'https://olocker.co/uploads/supplier/';
  // console.log('this is selector');
  const isFetching = useSelector(state => state.Supplier.isFetching);
  const isFetching1 = useSelector(state => state.City.isFetching);
  const [profile, setProfile] = useState(true);
  const [message, setMessage] = useState(false);
  const [catalogue, setCatalogue] = useState(false);
  const [setting, setSetting] = useState(false);
  const [rating1, setRatting1] = useState(0);
  const BannerWidth = (Dimensions.get('window').width * 15) / 16;
  const BannerHeight = 140;
  const share = async () => {
    await Share.share({
      message: `Supplier Name :   Email Address : virendramishra252@gmail.com `,
    });
  };

  const manageTab = () => {
    setProfile(true);
    setMessage(false);
    setCatalogue(false);
    setSetting(false);
  };
  const manageTab1 = () => {
    setProfile(false);
    setMessage(true);
    setCatalogue(false);
    setSetting(false);
  };
  const manageTab2 = () => {
    setProfile(false);
    setMessage(false);
    setCatalogue(true);
    setSetting(false);
  };
  const manageTab3 = () => {
    setProfile(false);
    setMessage(false);
    setCatalogue(false);
    setSetting(true);
  };

  const manageUpdate = () => {
    dispatch({
      type: 'City_List_Request',
      url: '/getCities',
      stateId: selector.supplierdetails[0].StateId,
      selector: selector,
      productImage: productImage,
      ownerImage: ownerImage,
      supplierLogo: supplierLogo,
      showroomImage: showroomImage,
      navigation,
    });
  };

  const Logout = () => {
    Alert.alert(
      'Are you want to logout ?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {
            cancelable: false;
          },
          style: 'cancel',
        },
        {text: 'ok', onPress: () => LogoutApp()},
      ],
      {cancelable: false},
    );
  };

  const LogoutApp = async () => {
    await AsyncStorage.setItem('loginToken', '');
    navigation.navigate('Login');
  };
  const handleWishList = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'Get_wishListProduct_Request',
      url: '/wishListProduct',
      user_id: user_id,
      navigation,
    });
  };
  useEffect(() => {
    selector?.supplierimagedetails.map(item => {
      if (item.Type == 'Product Image') {
        productImage.push(item);
        if (productImage.length > 0) {
          if (!productImage.includes(item)) {
            productImage.push(item);
          }
        } else {
          productImage.push(item);
        }
      }
    });
    selector?.supplierimagedetails.map(item => {
      if (item.Type == 'ShowRoom Image') {
        showroomImage.push(item);
        if (showroomImage.length > 0) {
          if (!showroomImage.includes(item)) {
            showroomImage.push(item);
          }
        } else {
          showroomImage.push(item);
        }
      }
    });
    selector?.supplierimagedetails.map(item => {
      if (item.Type == 'Owner Image') {
        if (ownerImage.length > 0) {
          if (!ownerImage.includes(item)) {
            ownerImage.push(item);
          }
        } else {
          ownerImage.push(item);
        }
      }
    });
    selector?.supplierimagedetails.map(item => {
      if (item.Type == 'Logo') {
        supplierLogo = item.ImageName;
      }
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#f0eeef'}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            delayPressIn={0}
            onPress={() => navigation.goBack()}>
            <Image
              style={styles.img}
              source={require('../../../assets/L.png')}
            />
          </TouchableOpacity>
          <Text style={[styles.text, {marginLeft: 15}]}> Profile</Text>
        </View>
        <View style={styles.headertouch}>
          <TouchableOpacity onPress={() => navigation.navigate('Message')}>
            <Image
              style={styles.img1}
              source={require('../../../assets/Fo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 15}}
            onPress={() => handleWishList()}>
            <Image
              style={styles.img2}
              source={require('../../../assets/Image/dil.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {isFetching || isFetching1 ? <Loader /> : null}
        <View
          style={{
            backgroundColor: '#032e63',
          }}>
          <View style={{flexDirection: 'row', padding: 15, width: '100%'}}>
            <View
              style={{
                backgroundColor: '#fff',
                height: 100,
                width: '30%',
                borderRadius: 10,
              }}>
              <Image
                style={{width: '100%', height: '100%', borderRadius: 10}}
                source={
                  supplierLogo
                    ? {uri: `${ownerImagePath}${supplierLogo}`}
                    : require('../../../assets/Image/Not.jpeg')
                }
              />
            </View>
            <View style={{marginLeft: 10, width: '60%', marginTop: -4}}>
              <Text
                style={{color: '#fff', fontSize: 19, fontFamily: 'Acephimere'}}>
                {selector?.supplierdetails[0]?.SupplierName}
              </Text>
              <Text
                style={{color: '#fff', fontSize: 12, fontFamily: 'Acephimere'}}>
                {selector?.supplierdetails[0]?.ContactPersonName}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Stars
                  half={true}
                  default={0}
                  // display={3}
                  spacing={5}
                  update={val => setRatting1(val)}
                  count={5}
                  starSize={16}
                  fullStar={require('../../../assets/Image/star.png')}
                  emptyStar={require('../../../assets/Image/star1.png')}
                />

                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${'999320456'}`)}
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                      style={{width: 30, height: 30}}
                      source={require('../../../assets/PartnerImage/16.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => share()}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: 10,
                    }}>
                    <Image
                      style={{width: 30, height: 30}}
                      source={require('../../../assets/PartnerImage/15.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: 10,
              alignSelf: 'flex-end',
              flexDirection: 'row',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => manageUpdate()}
              style={{
                backgroundColor: '#ea056c',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
              }}>
              <Text
                style={{color: '#fff', fontSize: 12, fontFamily: 'Acephimere'}}>
                {'Edit Profile'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChangePassword')}
              style={{
                backgroundColor: '#ea056c',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
              }}>
              <Text
                style={{color: '#fff', fontSize: 12, fontFamily: 'Acephimere'}}>
                {'Change Password'}
                {/* Added To Network */}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={()=>addToNetwork()}
              onPress={() => {
                Logout();
              }}
              style={{
                backgroundColor: '#ea056c',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
              }}>
              <Text
                style={{color: '#fff', fontSize: 12, fontFamily: 'Acephimere'}}>
                {'Logout'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{alignItems: 'center', height: 0, marginTop: 15}}></View>

          <View style={{height: 20}} />
        </View>
        <View style={styles.tabContainer}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => manageTab()}
              style={styles.tabStyle}>
              {profile ? (
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../../../assets/PartnerImage/10.png')}
                />
              ) : (
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../../../assets/PartnerImage/pro_uncolor.png')}
                />
              )}
            </TouchableOpacity>
            <Text
              style={{marginTop: 3, fontFamily: 'Acephimere', fontSize: 13}}>
              Profile
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Message')}
              style={styles.tabStyle}>
              {message ? (
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../../../assets/PartnerImage/msg_active.png')}
                />
              ) : (
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../../../assets/PartnerImage/11.png')}
                />
              )}
            </TouchableOpacity>
            <Text
              style={{marginTop: 3, fontFamily: 'Acephimere', fontSize: 13}}>
              Message
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => manageTab2()}
              style={styles.tabStyle}>
              {catalogue ? (
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../../../assets/PartnerImage/nackactive.png')}
                />
              ) : (
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../../../assets/PartnerImage/8.png')}
                />
              )}
            </TouchableOpacity>
            <Text
              style={{marginTop: 3, fontFamily: 'Acephimere', fontSize: 13}}>
              Catalogue
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => manageTab3()}
              style={styles.tabStyle}>
              {setting ? (
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../../../assets/PartnerImage/setting_active.png')}
                />
              ) : (
                <Image
                  style={{width: 50, height: 50, alignSelf: 'center'}}
                  source={require('../../../assets/PartnerImage/7.png')}
                />
              )}
            </TouchableOpacity>
            <Text
              style={{marginTop: 3, fontFamily: 'Acephimere', fontSize: 13}}>
              Settings
            </Text>
          </View>
        </View>
        <View style={{marginTop: 10}}>
          {profile == true ? <Profile /> : null}
          {catalogue == true ? <Catalogue /> : null}
          {setting == true ? <Setting /> : null}
        </View>
      </ScrollView>
      <StatusBar />
    </View>
  );
};
export default HomeScreen;
