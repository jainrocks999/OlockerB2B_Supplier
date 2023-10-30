import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Path from '../../../components/ImagePath';
import Loader from '../../../components/Loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Banner from '../../../components/Banner';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {ScrollView} from 'react-native-gesture-handler';

const MyCatalogueCopy = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFetching1 = useSelector(state => state.Catalogue.isFetching);
  const selector = useSelector(state => state.Catalogue.Products);
  const bannerList = useSelector(state => state.Home.BannerList);
  const [myproduct, setMyproduct] = useState(true);
  const [mycollection, setMycollection] = useState(false);
  const wishlist = useSelector(state => state.Home.getWishList);
  const [liked, setLiked] = useState([]);
  const [isFetching, setIsFetching] = useState();
  const isFocuse = useIsFocused();

  const handleMyCatalogue = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'Get_Catalogue_Request',
      url: '/listCollection',
      user_id: user_id,
      navigation,
    });
  };

  const handleMyProducts = () => {
    setMyproduct(true);
    setMycollection(false);
  };
  const handlePartnerProducts = () => {
    setMyproduct(false);
    setMycollection(true);
  };

  const manageWishList = async (item, index) => {
    const user_id = await AsyncStorage.getItem('user_id');
    let res;
    if (index) {
      res = await RemoveWhishList(item.productId);
    } else {
      res = await addProductWishList(item.productId);
    }
    console.log('this is res', res);
    if (res.status) {
      dispatch({
        type: 'My_Product_Request',
        url: '/getProductList',
        user_id: user_id,
        start: 0,
        length: 10,
        search: '',
        //navigation,
        btn: '',
      });
    }
  };

  const RemoveWhishList = async (id, liked) => {
    setIsFetching(true);
    const user_id = await AsyncStorage.getItem('user_id');
    const Token = await AsyncStorage.getItem('loginToken');
    var myHeaders = new Headers();
    myHeaders.append('Olocker', `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    let response = fetch(
      `https://olocker.co/api/supplier/removeProductWishlist?productId=${id}&SupplierSrNo=${user_id}&userType=supplier`,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        setIsFetching(false);

        return JSON.parse(result);
      })
      .catch(error => {
        console.log('error', error);
        setIsFetching(false);
      });

    return response;
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
  const addProductWishList = async item => {
    console.log('this is celld');
    setIsFetching(true);
    const Token = await AsyncStorage.getItem('loginToken');
    const user_id = await AsyncStorage.getItem('user_id');
    var myHeaders = new Headers();
    myHeaders.append('Olocker', `Bearer ${Token}`);

    var formdata = new FormData();
    formdata.append('checkProduct', item);
    formdata.append('SupplierSrNo', user_id);
    formdata.append('userType', 'supplier');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    let res = fetch(
      'https://olocker.co/api/supplier/addProductitemWishlist',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        setIsFetching(false);
        setLiked([...liked, item.SrNo]);
        return JSON.parse(result);
      })
      .catch(error => {
        console.log('error', error);
        setIsFetching(false);
      });

    return res;
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {isFetching1 || isFetching ? <Loader /> : null}
      <View
        style={{
          backgroundColor: '#032e63',
          height: 50,
          width: '100%',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{paddingHorizontal: 5}}>
            <Image
              style={{height: 20, width: 14}}
              source={require('../../../assets/L.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontFamily: 'Roboto-Medium',
              marginLeft: 14,
            }}>
            MyCatalogue
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Message')}>
            <Image
              style={{height: 24, width: 28}}
              source={require('../../../assets/Fo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleWishList()}>
            <Image
              style={{height: 22, width: 26, tintColor: '#fff', marginLeft: 15}}
              source={require('../../../assets/Image/dil.png')}
            />
          </TouchableOpacity>
          {/* <Image
            style={{height: 24, width: 28, tintColor: '#fff', marginLeft: 15}}
            source={require('../../../assets/supplierImage/more.png')}
          /> */}
        </View>
      </View>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#032e63',
            paddingVertical: 20,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}>
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 40,
              paddingHorizontal: 40,
            }}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ListOfProduct');
                }}
                style={{
                  height: 120,
                  width: 120,
                  borderRadius: 60,
                  backgroundColor: '#fff',
                }}>
                <Image
                  style={{height: 120, width: 120}}
                  source={require('../../../assets/Image/my.png')}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#fff',
                  marginTop: 10,
                  fontFamily: 'Roboto-Medium',
                  fontSize: 15,
                }}>
                My Product
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() =>
                  // navigation.navigate('MyCatalogue')
                  handleMyCatalogue()
                }
                style={{
                  height: 120,
                  width: 120,
                  borderRadius: 60,
                  backgroundColor: '#fff',
                }}>
                <Image
                  style={{height: 120, width: 120}}
                  source={require('../../../assets/Image/neck.png')}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#fff',
                  marginTop: 10,
                  fontFamily: 'Roboto-Medium',
                  fontSize: 15,
                }}>
                My Collection
              </Text>
            </View>
          </View>
          <View
            style={{alignItems: 'center', paddingVertical: 10, marginTop: 40}}>
            <TouchableOpacity
              //  onPress={() => navigation.navigate('addMore')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  color: '#032e63',
                  fontSize: 20,
                  fontFamily: 'Roboto-Medium',
                }}>
                +
              </Text>
              <Text
                style={{
                  color: '#032e63',
                  fontSize: 16,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 10,
                }}>
                Add More
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingHorizontal: 12, marginTop: 40}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => handleMyProducts()}
              style={{
                borderWidth: 1,
                width: '48%',
                backgroundColor: myproduct == true ? '#032e63' : '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 7,
                borderRadius: 15,
                borderColor: '#032e63',
              }}>
              <Text
                style={{
                  color: myproduct == true ? '#fff' : '#032e63',
                  fontFamily: 'Roboto-Medium',
                }}>
                My Products
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePartnerProducts()}
              style={{
                borderWidth: 1,
                width: '48%',
                borderColor: '#032e63',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: mycollection == true ? '#032e63' : '#fff',
                paddingVertical: 7,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  color: mycollection == true ? '#fff' : '#032e63',
                  fontFamily: 'Roboto-Medium',
                }}>
                Partner Product
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <FlatList
            data={mycollection == true ? [] : selector}
            style={{width: '96%'}}
            numColumns={2}
            // contentContainerStyle={{justifyContent:'center',}}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    width: '46%',
                    margin: 7,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    elevation: 5,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    padding: 10,
                  }}>
                  <View
                    style={{
                      padding: 0,
                      height: hp('5%'),
                      width: '18%',
                      borderWidth: 0,
                      marginTop: 0,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        manageWishList(item, item.is_exist);
                      }}
                      // onPress={() => click(click1)}
                    >
                      <Image
                        style={{
                          height: hp('2.4%'),
                          width: wp('5.8%'),
                          marginLeft: 5,
                          marginVertical: 5,
                          marginTop: 2,
                          tintColor: item?.is_exist ? 'red' : 'grey',
                        }}
                        source={require('../../../assets/Image/dil.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <Image
                    style={{height: 144, width: '100%', borderRadius: 10}}
                    source={{uri: item.images}}
                  />
                  <View style={{marginTop: 10}}>
                    <Text
                      style={{
                        fontFamily: 'Roboto-Medium',
                        fontSize: 14,
                        color: '#030303',
                      }}>
                      {item.productTypeName}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Roboto-Medium',
                        fontSize: 14,
                        color: '#666666',
                      }}></Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default MyCatalogueCopy;
