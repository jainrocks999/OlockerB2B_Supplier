import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Loader from '../../../components/Loader';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Banner from '../../../components/Banner';
import { FlatListSlider } from 'react-native-flatlist-slider';
import { ScrollView } from 'react-native-gesture-handler';
import SliderBanner from '../HomeScreen/Banner';
import axios from "axios";

const MyCatalogueCopy = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selector1 = useSelector(state => state.Catalogue.Catalogue);
  const fetching = useSelector(state => state.Catalogue.fetching);
  const isFetching1 = useSelector(state => state.Catalogue.isFetching);
  const selector = useSelector(state => state.Catalogue.Products);
  const selectorProductTypeList = useSelector(state => state.Catalogue.productTypeList);
  const bannerList = useSelector(state => state.Home.BannerList);
  const BannerData = [];
  const win = Dimensions.get('window');
  const [productTypeList, setProductTypeList] = useState([])

  bannerList?.map((item) => {
    if (item.ImageSection == "supplierCatalog" && item.isActive == 1) {
      const url = `https://olocker.co/${item.ImageUrl}${item.ImageName
        }`;
      BannerData.push({
        ...item
      });
    }
  })



  const [myproduct, setMyproduct] = useState(true);
  const [mycollection, setMycollection] = useState(false);
  const wishlist = useSelector(state => state.Home.getWishList);
  const [liked, setLiked] = useState([]);
  const [isFetching, setIsFetching] = useState();
  const isFocuse = useIsFocused();


  useEffect(() => {
    if (isFocuse) {
      handleMyCatalogue1();
    }
  }, [isFocuse])

  const handleMyCatalogue1 = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'Get_Catalogue_Request',
      url: '/listCollection',
      user_id: user_id,
    });
    dispatch({
      type: 'product_Type_Request',
      url: '/productTypeList',
      userId: user_id,
      userType: 'supplier',
    });
    // setIsFetching(true)
    // let config = {
    //   method: 'get',
    //   maxBodyLength: Infinity,
    //   url: `https://olocker.co/api/supplier//productTypeList?userId=${user_id}&userType=supplier`,
    //   headers: { 
    //     'Olocker': `Bearer ${Token}`, 
    //   },
    // };

    // axios.request(config)
    // .then((response) => {
    //   if(response.data.status){
    //       setProductTypeList(response.data.data)
    //       setIsFetching(false)
    //       console.log(response.data);
    //   }
    //   else{
    //     setIsFetching(false)
    //     console.log(response);
    //   }
    // })
    // .catch((error) => {
    //   setIsFetching(false)
    //   console.log(error);
    // });



    // dispatch({
    //   type: 'My_Product_Request',
    //   url: '/getProductList',
    //   user_id: user_id,
    //   start: 0,
    //   length: 10,
    //   search: '',
    //   //navigation,
    //   btn: '',
    // });
  };

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
  const scrollViewRef = useRef();
  const getdata = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'My_Product_Request',
      url: '/getProductList',
      user_id: user_id,
      start: 0,
      length: selector?.length + 10,
      search: '',
      // navigation,
      // btn,
    });
  }

  const productTypeListDetails = async (Id, Value) => {
    const Token = await AsyncStorage.getItem('loginToken');
    const user_id = await AsyncStorage.getItem('user_id');

    // dispatch({
    //   type: 'User_ProductList_Request',
    //   url: '/productTypeProducts',
    //   userId: user_id,
    //   userType: 'supplier',
    //   typeId: Id,
    //   Token: Token,
    //   name:Value,
    //   login_user_id: user_id,
    //   login_user_type: 'supplier',

    //   navigation,
    // });
    navigation.navigate('ProductTypeListDetails', {
      id: Id,
      name: Value,
      userType:'supplier',
      productRequestId:user_id
    })
    // dispatch({
    //   type: 'product_detail_request',
    //   url: 'productDetails',
    //   productId: item.productId,
    //   supplierSrNo: user_id,
    //   navigation,
    // });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {fetching || isFetching1 ? <Loader /> : null}
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 5 }}>
            <Image
              style={{ height: 20, width: 14 }}
              source={require('../../../assets/L.png')}
            />
          </TouchableOpacity> */}
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginLeft: 10,
            }}>
            My Catalogue
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Message')}>
            <Image
              style={{ height: 24, width: 28 }}
              source={require('../../../assets/Fo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleWishList()}>
            <Image
              style={{ height: 22, width: 26, tintColor: '#fff', marginLeft: 15 }}
              source={require('../../../assets/Image/dil.png')}
            />
          </TouchableOpacity>
          {/* <Image
            style={{height: 24, width: 28, tintColor: '#fff', marginLeft: 15}}
            source={require('../../../assets/supplierImage/more.png')}
          /> */}
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}
        ref={scrollViewRef}
      >
        <View
          style={{
            backgroundColor: '#032e63',
            // paddingVertical: 20,
            borderBottomLeftRadius: 60,
            borderBottomRightRadius: 60,

            // alignItems:'center'
          }}>
          <View style={{ marginLeft: 16 }}>
            <SliderBanner data={BannerData} bottom={-17} 
            height={6}
            width={6}
            borderRadius={3} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{ alignItems: 'center' }}>

              <View 
              style={{ bottom: -30, height: 32, width: 32, borderRadius: 16, backgroundColor: '#da062f', zIndex: 5, alignSelf: 'flex-end',alignItems:'center',justifyContent:'center' }}
              // style={{ bottom: -20, borderRadius: 100, backgroundColor: '#da062f', zIndex: 5, alignSelf: 'flex-end', paddingHorizontal: 10, paddingVertical: 5 }}
              >
                {/* <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>{selector?.length>0?selector?.length:'0'}</Text> */}
                <Text style={{ fontSize: 16, color: '#fff', textAlign: 'center' }}>{selectorProductTypeList?.length > 0 ? selectorProductTypeList?.length <=99?selectorProductTypeList?.length:'99+' : '0'}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  scrollViewRef.current.scrollTo({ y: 310, animated: true });
                }}
                // onPress={() => {
                //   navigation.navigate('ListOfProduct');
                // }}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  backgroundColor: '#fff',
                }}>

                <Image
                  style={{ height: 100, width: 100 }}
                  source={require('../../../assets/Image/my.png')}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#fff',
                  marginTop: 10,
                  fontFamily: 'Acephimere',
                }}>
                MY PRODUCTS
              </Text>
            </View>
            <View style={{ alignItems: 'center', marginLeft: 40, }}>
              <View
                // style={{ bottom: -20, borderRadius: 100, backgroundColor: '#da062f', zIndex: 5, alignSelf: 'flex-end', paddingHorizontal: 10, paddingVertical: 5 }}
              style={{ bottom: -30, height: 32, width: 32, borderRadius: 16, backgroundColor: '#da062f', zIndex: 5, alignSelf: 'flex-end',alignItems:'center',justifyContent:'center' }}
              >
                <Text style={{ fontSize: 16, color: '#fff', textAlign: 'center' }}>{selector1?.length > 0 ? selector1?.length <= 99?selector1?.length:'99+' : '0'}</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  // navigation.navigate('MyCatalogue')
                  handleMyCatalogue()
                }
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  backgroundColor: '#fff',
                  marginTop: 5,

                }}>
                <Image
                  style={{ height: 100, width: 100 }}
                  source={require('../../../assets/Image/neck.png')}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#fff',
                  marginTop: 10,
                  fontFamily: 'Acephimere',
                }}>
                MY COLLECTIONS
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20, paddingBottom: 20
            }}>

            <TouchableOpacity
              onPress={() =>
                // navigation.navigate('ChooseSupplierProduct',{ productEdit1: false })
                navigation.navigate('SelectOption')
              }>
              <LinearGradient
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 9,
                  borderRadius: 25,
                }}
                colors={['#da062f', '#a90022']}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center', alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                  <Image
                    style={{ height: 18, width: 27, marginLeft: 5, marginBottom: 4 }}
                    source={require('../../../assets/plus.png')}
                  />
                  <Text style={{
                    color: '#fff',
                    marginLeft: 2,
                    fontFamily: 'Roboto-Medium',
                    fontWeight: '700', marginBottom: 2,
                    fontSize: 16,
                  }}>{'ADD'}</Text>
                  <View style={{ width: 15 }} />
                </View>
              </LinearGradient>
            </TouchableOpacity>

          
          </View>
        </View>
        <View style={{ paddingHorizontal: 12, marginTop: 40 }}>
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
                  fontFamily: 'Philosopher-Regular',
                  fontSize: 15
                }}>
                My Products
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <FlatList
            // data={mycollection == true ? [] : selector}
            data={selectorProductTypeList}
            // style={{marginBottom:200}}
            numColumns={3}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    productTypeListDetails(item.Id, item.Value);
                  }}
                  style={{
                    width: '33.3%',
                    alignItems: 'center',
                    // height: 175,
                    backgroundColor: '#fff',
                    borderWidth: 0.5,
                    borderColor: '#807f82',
                    paddingBottom:20
                    // width: '46%',
                    // margin: 7,
                    // shadowColor: '#000',
                    // shadowOffset: { width: 0, height: 2 },
                    // shadowOpacity: 0.2,
                    // shadowRadius: 5,
                    // elevation: 5,
                    // backgroundColor: '#fff',
                    // borderRadius: 10,
                    // padding: 10,
                    // borderWidth:1
                  }}>

                  <View>
                    {item?.ImageName ? <Image
                      style={{
                        width: win.width * 0.33,
                        // height: '74%',
                        height:126,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                      }}
                      resizeMode='stretch'
                      source={{ uri: `https://olocker.co/uploads/product_type/${item.ImageName}` }}
                    /> : <Image
                      style={{
                        width: win.width * 0.33,
                        height:126,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                      }}
                      resizeMode={'stretch'}
                      source={require('../../../assets/logo.png')}
                    />}
                    <View style={{
                      marginTop: 5,
                      alignItems: 'center',
                    }}>
                      <Text
                        style={{
                          color: '#032e63', fontWeight: '700', fontFamily: 'Acephimere',
                          fontSize: 14,
                        }}>
                        {/* {item.productTypeName} */}
                        {item.Value}
                      </Text>
                      <Text
                        style={{
                          color: '#0d0d0d', fontWeight: '700', fontFamily: 'Acephimere',
                          fontSize: 14,
                        }}>
                        {item.pTotal <= 0
                          ? `${item.pTotal} Item`
                          : `${item.pTotal} Items`}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default MyCatalogueCopy;
