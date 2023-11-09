import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Alert,
  BackHandler,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/Loader';
import {FlatListSlider} from 'react-native-flatlist-slider';
import Banner from '../../../components/Banner';
import ImagePath from '../../../components/ImagePath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import Catalogue from '../../../Redux/Reducer/Catalogue';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Offer from '../../../assets/supplierImage/Offer.svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Svg, {Path} from 'react-native-svg';

let backPress = 0;
const HomeScreen = () => {
  const navigation = useNavigation();
  const isFetching = useSelector(state => state?.isFetching);
  const isFetching1 = useSelector(state => state.Catalogue.isFetching);
  const isFetching3 = useSelector(state => state.Home.isFetching);
  const selector1 = useSelector(state => state.Home.NetworkList);
  const bannerList = useSelector(state => state.Home.BannerList);
  const isFetching4 = useSelector(state => state.State.BannerList);
  const fetching = useSelector(state => state.Home.isFetching);
  const win = Dimensions.get('window');

  const date = new Date();
  let ToDAY = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

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

  const dispatch = useDispatch();

  useEffect(() => {
    ApiCallWithUseEffect();
  }, []);

  const MyNetwork = async () => {
    const Token = await AsyncStorage.getItem('loginToken');
  };
  const ApiCallWithUseEffect = async () => {
    const Token = await AsyncStorage.getItem('loginToken');
    const Id = await AsyncStorage.getItem('Partnersrno');
    const user_id = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'Banner_List_Request',
      url: '/getBannerList',
    });

    dispatch({
      type: 'Network_List_Request',
      url: '/getNetworkRetailer',
      userId: user_id,
      userRole: 6,
    });

    dispatch({
      type: 'Supplier_Profile_Request',
      url: '/editProfile',
      userId: user_id,
      userType: 'supplier',
      role: 6,
    });
    dispatch({
      type: 'State_List_Request',
      url: '/getStateList',
    });

    dispatch({
      type: 'User_SupplierCategories_Request',
      url: '/categories',
    });
  };

  const supplierprofile = async id => {
    const Token = await AsyncStorage.getItem('loginToken');

    AsyncStorage.setItem('supplierID', id);
    dispatch({
      type: 'User_supplierDetail_Request',
      url: '/partners/supplierDetail',
      supplierId: id,
      Token: Token,
      navigation,
    });
    dispatch({
      type: 'User_SupplierCategories_Request',
      url: 'partners/productTypeList',
      userId: id,
      userType: 'supplier',
      Token: Token,
    });
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => backHandler.remove();
  }, []);

  const handleBackButtonClick = () => {
    if (navigation.isFocused()) {
      if (backPress > 0) {
        BackHandler.exitApp();
        backPress = 0;
      } else {
        backPress++;
        Toast.show('Press again to exit app');
        setTimeout(() => {
          backPress = 0;
        }, 2000);
        BackHandler.removeEventListener('hardwareBackPress');
      }
      return true;
    }
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

  const handleMyCatalogue = async btn => {
    const user_id = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'My_Product_Request',
      url: '/getProductList',
      user_id: user_id,
      start: 0,
      length: 10,
      search: '',
      navigation,
      btn,
    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {isFetching || isFetching1 || fetching || isFetching3 || isFetching4 ? (
          <Loader />
        ) : null}
        <ImageBackground
          style={styles.imgback}
          source={require('../../../assets/Image/1.png')}>
          <View style={styles.container}>
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
              {/* <TouchableOpacity onPress={() => Logout()}>
                <Image
                  style={styles.img3}
                  source={require('../../../assets/Image/menu-icon.png')}
                />
              </TouchableOpacity> */}
            </View>
          </View>
          <View style={{paddingHorizontal: 10}}>
            <Text style={styles.text1}>Welcome to MyJeweller</Text>
            <Text style={styles.text2}>{'Onestop solution\nfor you'}</Text>
          </View>
        </ImageBackground>
        <View style={styles.main}>
          <FlatListSlider
            data={bannerList}
            height={170}
            timer={3000}
            contentContainerStyle={{
              marginVertical: 0,
              paddingHorizontal: 30,
            }}
            indicatorContainerStyle={{position: 'absolute', bottom: 10}}
            indicatorActiveColor={'#032e63'}
            indicatorInActiveColor={'#ffffff'}
            indicatorActiveWidth={5}
            animation
            component={<Banner />}
            separatorWidth={15}
            width={300}
            autoscroll={false}
            loop={false}
          />
        </View>
        <View style={styles.itemview}>
          <View style={styles.itemview1}>
            <Image
              style={{
                width: 102,
                height: 22,
                tintColor: '#032e63',
                marginLeft: 5,
              }}
              source={require('../../../assets/Image/myjewlery.png')}
            />
            <TouchableOpacity
            //  onPress={()=>updateFieldChanged('1')}
            >
              <Text style={styles.text4}>Network</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={selector1}
            style={{marginTop: 7}}
            renderItem={({item}) => (
              <View style={{width: win.width * 0.37, alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => supplierprofile(item.SupplierSrNo)}
                  style={[styles.cardview]}>
                  <Image
                    style={{
                      width: win.width * 0.33,
                      height: '100%',
                      resizeMode: 'contain',
                      borderRadius: 15,
                    }}
                    source={
                      item.Logo
                        ? {uri: `${item.Logo}`}
                        : require('../../../assets/Image/Not.jpeg')
                    }
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    textAlign: 'center',
                    width: '90%',
                    fontFamily: 'Acephimere',
                    color: 'grey',
                  }}>
                  {item.CompanyName}
                </Text>
              </View>
            )}
          />
        </View>
        {/* <View style={styles.middle1}> */}
        <ScrollView
          horizontal={true}
          scrollEnabled={false}
          contentContainerStyle={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          {/* <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingVertical: 10,
              }}> */}
          <TouchableOpacity
            onPress={() => handleMyCatalogue('cat')}
            style={{alignItems: 'center', width: 120}}>
            <Image
              resizeMode="contain"
              style={{width: 110, height: 110}}
              source={require('../../../assets/Image/services.png')}
            />
            <Text style={styles.textc}>{'Catalogue'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SearchRetailer');
            }}
            style={{alignItems: 'center', width: 120}}>
            <Image
              resizeMode="contain"
              style={{width: 110, height: 110}}
              source={require('../../../assets/Image/partner.png')}
            />
            <Text style={styles.textc}>{'My Network'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('OfferTemplate');
            }}
            style={{alignItems: 'center', width: 120}}>
            <Image
              resizeMode="contain"
              style={{width: 110, height: 110}}
              source={require('../../../assets/Image/Offer.png')}
            />
            <Text style={styles.textc}>{'Offers'}</Text>
          </TouchableOpacity>

          {/* 
            <TouchableOpacity
              onPress={() => handleMyCatalogue('')}
              style={{alignItems: 'center', width: '45%'}}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: '#032e63',
                  borderRadius: 75,
                }}>
                <Image
                  style={{width: '100%', height: 150, resizeMode: 'center'}}
                  source={require('../../../assets/supplierImage/person.png')}
                />
              </View>
              <Text style={styles.textc}>{'App Product'}</Text>
            </TouchableOpacity> */}
          {/* </View> */}
        </ScrollView>
        <View style={{height: 40}} />
        {/* </View> */}

        {/* <View style={styles.bottom}>
            <View style={styles.Gold}>
              <Image
                style={styles.Goldimg}
                source={require('../../../assets/Image/gold.png')}
              />
              <View style={styles.Goldview}>
                <Text style={styles.Goldt}>{'Gold '}</Text>
                <Text style={styles.Goldtt}>{'Price '}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('MyProducts')}
              style={styles.touch}>
              <Text style={{ color: '#fff', fontSize: 12 }}>MORE</Text>
            </TouchableOpacity>
          </View> */}

        {/* <View style={styles.bottomv}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={selector?.slice(0, 3)}
            renderItem={({ item }) => (
              <ImageBackground
                source={require('../../../assets/PartnerImage/goldIcon.png')}
                style={styles.Bimg}>
                <Text style={styles.Bt}>{`${((item.Purity * 24) / 1000).toFixed(
                  0,
                )} K`}</Text>
                <View style={styles.Bv}>
                  <Image
                    style={{ height: 16, width: 20 }}
                    source={require('../../../assets/Image/rupay.png')}
                  />
                  <Text style={styles.Btt}>{item.PM}</Text>
                </View>
              </ImageBackground>
            )}
          />+
        </View> */}
      </ScrollView>
      {/* <TabView /> */}
    </SafeAreaView>
  );
};
export default HomeScreen;

const images = [
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image: 'https://devappapi.olocker.in/images/rss/no-image.jpg',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
];

var object = {
  dataAttribute: [
    {
      id: 1,
      title: 'A',
      data: [
        {id: '1', name: 'First Name', type: 'text'},
        {id: '2', name: 'Last Name', type: 'text'},
      ],
    },
    {
      id: 2,
      title: 'B',
      data: [
        {id: '1', name: 'Twitter', type: 'text'},
        {id: '2', name: 'Twitter follower', type: 'number'},
      ],
    },
  ],
};
object.dataAttribute[0].data[0].statusSelected = true;
