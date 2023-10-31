import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import styles from './style';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';
import axios from 'axios';
import {RadioButton} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import Constants from '../../../Redux/Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const OfferList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false);
  const [template, setTemplate] = useState('');
  const [description, setDescription] = useState('');
  const OfferListData = useSelector(state => state.Offer.OfferListData);
  const isFetching = useSelector(state => state.Offer.isFetching);
  const isFetching2 = useSelector(state => state.Auth.isFetching);
  const modaleOpen = useSelector(state => state.Offer.modaleOpen);
  const detaildata = useSelector(state => state.Offer.offerDetail);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    isClicked ? setIsModalOpen(true) : null;
  }, [modaleOpen]);

  const [temp, setTemp] = useState();

  const addTemp = async item => {
    const Token = await AsyncStorage.getItem('loginToken');
    const user_id = await AsyncStorage.getItem('user_id');
    if (template == '') {
      Toast.show('Please enter template name');
    } else if (description == '') {
      Toast.show('Please enter description name');
    } else {
      try {
        setFetching(true);
        const data = new FormData();
        data.append('offertemplate', template);
        data.append('templatedescription', description);
        const response = await axios({
          method: 'POST',
          data: data,
          headers: {
            'content-type': 'multipart/form-data',
            Olocker: `Bearer ${Token}`,
          },
          url: 'https://olocker.co/api/supplier//addOfferTemplate',
        });
        if (response.data.status) {
          setFetching(false);
          Toast.show(response.data.msg);
          dispatch({
            type: 'Template_Detail_Request',
            url: '/getOfferTemplate',
            userid: user_id,
          });
        } else {
          setFetching(false);
          Toast.show(response.data.msg);
        }
      } catch (error) {
        setFetching(false);
      }
    }
  };

  const removeTemp = async item => {
    const Token = await AsyncStorage.getItem('loginToken');
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setFetching(true);
      // const data= new FormData()
      // data.append('userid',template)
      // data.append('id',description)

      const response = await axios({
        method: 'GET',
        params: data,
        headers: {
          'content-type': 'multipart/form-data',
          Olocker: `Bearer ${Token}`,
        },
        url: 'https://olocker.co/api/supplier//deleteOfferTemplate',
      });
      if (response.data.status) {
        setFetching(false);
        Toast.show(response.data.msg);
        dispatch({
          type: 'Template_Detail_Request',
          url: '/getOfferTemplate',
          userid: user_id,
        });
      } else {
        setFetching(false);
        Toast.show(response.data.msg);
        // console.log('thissi is rresponseelse');
      }
    } catch (error) {
      setFetching(false);
      // console.log('this isi error', error);
    }
  };

  // const handleAddOffer = async () => {
  //   const user_id = await AsyncStorage.getItem('user_id');
  //   dispatch({
  //     type: 'Add_Offer_Request',
  //     url: '/getOfferTemplate',
  //     userid: user_id,
  //     navigation,
  //   });
  // };

  const deleteOffer = item => {
    dispatch({
      type: 'remove_offer_list_request',
      url: 'removeOffer',
      offerId: item.Id,
      page: 'delete',
      navigation,
    });
  };
  const handleOfferList = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    dispatch({
      type: 'Offer_List_Request',
      url: '/getOfferList',
      userid: user_id,
      navigation,
    });
  };

  useEffect(() => {
    tempdata();
  }, []);

  const tempdata = () => {
    const axios = require('axios');

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://olocker.co/api/supplier//getOfferList?start=0&length=9&search=&userid=10',
      headers: {
        Olocker:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTdXBwbGllciBsb2dpbiBKV1QiLCJpYXQiOjE2ODM4MDYwMjMsImV4cCI6MTcxNTM0MjAyMywiZW1haWwiOiJzdXBwbGllclRlc3RAZ21haWwuY29tIiwiaWQiOiIxMyIsInJvbGUiOiJzdXBwbGllciJ9.iHG4lvv1Qb8EgXbECjwik1MittXx3RNEmaa7Q4ZFSjw',
      },
    };

    axios
      .request(config)
      .then(response => {
        setTemp(response.data.data.offerList);
        // console.log(JSON.stringify(response.data.data.offerList));
      })
      .catch(error => {
        // console.log(error);
      });
  };
  const getOfferDetails = async (item, op) => {
    const userId = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'offer_details_request',
      url: 'getOfferDetails',
      userId,
      offerId: item?.Id,
      op: op,
      navigation,
      some: !modaleOpen,
    });
    setIsClicked(true);
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

  console.log('this is prevdata', JSON.stringify(detaildata));

  return (
    <View style={{flex: 1}}>
      <StatusBar />
      {fetching || isFetching || isFetching2 ? <Loader /> : null}
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
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginLeft: 14,
            }}>
            Offers list
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
        <Modal visible={isModalOpen} transparent>
          <View style={{flex: 1}}>
            <View
              style={{
                height: '95%',
                width: '97%',
                backgroundColor: 'white',
                alignSelf: 'center',
                elevation: 2,
                borderRadius: 9,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsModalOpen(false);
                  setIsClicked(false);
                }}
                style={{
                  position: 'absolute',
                  height: hp(5),
                  width: hp(5),
                  borderRadius: hp(10),
                  backgroundColor: '#032e63',
                  alignItems: 'center',
                  right: wp(6),
                  top: wp(3),
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: wp(5),
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  X
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  alignSelf: 'center',
                  marginTop: '3%',
                  fontWeight: '800',
                  fontSize: wp(5),
                  color: 'black',
                }}>
                Proudcts
              </Text>
              <View style={{marginTop: '10%'}}>
                {detaildata?.offerProductList?.length > 0 ? (
                  <FlatList
                    data={detaildata?.offerProductList}
                    renderItem={({item, index}) => (
                      <View
                        style={[
                          styles.some,
                          {
                            width: '95%',
                            alignSelf: 'center',
                            marginVertical: 1,
                          },
                        ]}>
                        <Image
                          style={{
                            height: hp(25),
                            width: '90%',
                            alignSelf: 'center',
                            borderRadius: 9,
                            marginTop: wp(1),
                          }}
                          source={{
                            uri: `https://olocker.co${item?.ImageUrl}${item?.ImageName}`,
                          }}
                        />
                        <View
                          style={{
                            marginTop: hp(2),
                            marginLeft: wp(10),
                          }}>
                          <View style={{flexDirection: 'row', width: '100%'}}>
                            <Text style={[styles.txt, {width: wp(32)}]}>
                              Product name
                            </Text>
                            <Text
                              style={[styles.txt, {width: 25, color: 'grey'}]}>
                              :
                            </Text>
                            <Text style={[styles.txt, {color: 'grey'}]}>
                              {item?.ItemName}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row', width: '100%'}}>
                            <Text style={[styles.txt, {width: wp(32)}]}>
                              ProductSKU
                            </Text>
                            <Text
                              style={[styles.txt, {width: 25, color: 'grey'}]}>
                              :
                            </Text>
                            <Text style={[styles.txt, {color: 'grey'}]}>
                              {item?.ProductSku}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row', width: '100%'}}>
                            <Text style={[styles.txt, {width: wp(32)}]}>
                              Gross Wt
                            </Text>
                            <Text
                              style={[styles.txt, {width: 25, color: 'grey'}]}>
                              :
                            </Text>
                            <Text style={[styles.txt, {color: 'grey'}]}>
                              {item?.GrossWt}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row', width: '100%'}}>
                            <Text style={[styles.txt, {width: wp(32)}]}>
                              Metal Wt.
                            </Text>
                            <Text
                              style={[styles.txt, {width: 25, color: 'grey'}]}>
                              :
                            </Text>
                            <Text style={[styles.txt, {color: 'grey'}]}>
                              {item?.MetalWt != null
                                ? item?.MetalWt + item?.UnitMetalWt != null
                                  ? item?.UnitMetalWt
                                  : ''
                                : ''}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row', width: '100%'}}>
                            <Text style={[styles.txt, {width: wp(32)}]}>
                              Stone Wt.
                            </Text>
                            <Text
                              style={[styles.txt, {width: 25, color: 'grey'}]}>
                              :
                            </Text>
                            <Text style={[styles.txt, {color: 'grey'}]}>
                              {item?.StoneWt != null
                                ? item?.StoneWt + item?.UnitStoneWt != null
                                  ? item?.UnitStoneWt
                                  : ''
                                : ''}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row', width: '100%'}}>
                            <Text style={[styles.txt, {width: wp(32)}]}>
                              Price
                            </Text>
                            <Text
                              style={[styles.txt, {width: 25, color: 'grey'}]}>
                              :
                            </Text>
                            <Text style={[styles.txt, {color: 'grey'}]}>
                              {'₹' + item?.ProductsPrice}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              marginLeft: wp(-10),
                            }}>
                            <TouchableOpacity style={styles.productbtn}>
                              <Text style={[styles.txt, {color: 'white'}]}>
                                View
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[
                                styles.productbtn,
                                {backgroundColor: '#fd3550'},
                              ]}>
                              <Text style={[styles.txt, {color: 'white'}]}>
                                Delete
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.productbtn}>
                              <Text style={[styles.txt, {color: 'white'}]}>
                                Send Message
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    )}
                  />
                ) : (
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: wp(5),
                      fontWeight: '700',
                      color: 'black',
                    }}>
                    Oops no data found!!
                  </Text>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <ScrollView>
        <View style={{paddingHorizontal: 12, marginTop: 10}}>
          <View style={{marginTop: 15}}>
            <Text
              style={{
                fontSize: 15,
                color: '#23233C',
                fontFamily: 'Roboto-Medium',
              }}>
              Offer Template Name
            </Text>
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                marginTop: 5,
                height: 40,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 8,
                paddingHorizontal: 6,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                placeholder="Offer Template Name"
                value={template}
                onChangeText={val => setTemplate(val)}
                style={{color: '#030303'}}
                placeholderTextColor={'#999999'}
              />
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <Text
              style={{
                fontSize: 15,
                color: '#23233C',
                fontFamily: 'Roboto-Medium',
              }}>
              Offer Description
            </Text>
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                marginTop: 5,
                height: 40,
                borderRadius: 8,
                paddingHorizontal: 6,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                placeholder="Offer Discription"
                value={description}
                onChangeText={val => setDescription(val)}
                style={{color: '#030303'}}
                placeholderTextColor={'#999999'}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <TouchableOpacity
              onPress={() => addTemp()}
              style={{
                borderWidth: 1,
                width: '48%',
                backgroundColor: '#032e63',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 7,
                borderRadius: 15,
                flexDirection: 'row',
              }}>
              <Image
                style={{height: 11, width: 11}}
                source={require('../../../assets/supplierImage/addPlus.png')}
              />
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 10,
                }}>
                Add Template
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch({
                  type: 'offer_edit_modal_open',
                  payload1: false,
                  payload2: false,
                });
                navigation?.navigate('AddOffer', {isEdit: false});
              }}
              style={{
                borderWidth: 1,
                width: '48%',
                backgroundColor: '#032e63',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                paddingVertical: 7,
                borderRadius: 15,
              }}>
              <Image
                style={{height: 11, width: 11}}
                source={require('../../../assets/supplierImage/addPlus.png')}
              />
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 10,
                }}>
                Add Offer
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, marginTop: 15}}>
            <Text
              style={{
                color: '#030303',
                fontSize: wp(4),
                fontFamily: 'Roboto-Medium',
                borderBottomWidth: 1,
                borderStyle: 'dashed',
                borderColor: '#030303',
                width: wp(27.6),
                marginLeft: 10,
              }}>
              List Of Offer
            </Text>
            <FlatList
              data={OfferListData?.offerList}
              style={{marginTop: 10}}
              renderItem={({item}) => (
                <View style={styles.some}>
                  <Image
                    source={{
                      uri: `https://olocker.co${OfferListData?.ImageUrl}${item.ImageName}`,
                    }}
                    style={styles.img}
                  />
                  <View
                    style={{
                      marginTop: wp(3),
                      marginLeft: wp(4),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: wp(12),
                        justifyContent: 'space-between',
                        position: 'absolute',
                        right: wp(1),
                        zIndex: 1,
                      }}>
                      <MaterialCommunityIcons
                        name="pencil"
                        size={wp(5.5)}
                        color="grey"
                        onPress={() =>
                          // navigation.navigate('AddOffer', {item, isEdit: true})
                          getOfferDetails(item, 'edit')
                        }
                      />
                      <MaterialCommunityIcons
                        onPress={() => {
                          deleteOffer(item);
                        }}
                        name="delete"
                        color="grey"
                        size={wp(5.5)}
                      />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'black',
                          fontWeight: '600',
                          width: wp(30),
                        }}>
                        Offer Type
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'black',
                          fontWeight: '600',
                          width: wp(3),
                        }}>
                        :
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'grey',
                          fontWeight: '600',
                        }}>
                        {item?.OfferType
                          ? item?.OfferType.substring(0, 20)
                          : ''}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: wp(1)}}>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'black',
                          fontWeight: '600',
                          width: wp(30),
                        }}>
                        StartDate
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'black',
                          fontWeight: '600',
                          width: wp(3),
                        }}>
                        :
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'grey',
                          fontWeight: '600',
                        }}>
                        {item?.StartDate}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: wp(1)}}>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'black',
                          fontWeight: '600',
                          width: wp(30),
                        }}>
                        EndDate
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'black',
                          fontWeight: '600',
                          width: wp(3),
                        }}>
                        :
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'grey',
                          fontWeight: '600',
                        }}>
                        {item?.EndDate}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: wp(1)}}>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'black',
                          fontWeight: '600',
                          width: wp(30),
                        }}>
                        {parseFloat(item?.DiscountAmt) > 0
                          ? 'DiscountAmt'
                          : parseFloat(item?.DiscountPer)
                          ? 'DiscountPer'
                          : parseInt(item.DiscountQty) > 0
                          ? 'DiscountQty'
                          : 'DealDescription'}
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'black',
                          fontWeight: '600',
                          width: wp(3),
                        }}>
                        :
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'grey',
                          fontWeight: '600',
                          textAlign: 'center',
                        }}>
                        {parseFloat(item?.DiscountAmt) > 0
                          ? item?.DiscountAmt
                          : parseFloat(item?.DiscountPer)
                          ? item?.DiscountPer
                          : parseInt(item.DiscountQty) > 0
                          ? item.DiscountQty
                          : item?.DealDescription}
                      </Text>
                    </View>
                    {/* <View style={{flexDirection: 'row', marginTop: wp(1)}}>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'black',
                          fontWeight: '600',
                          width: wp(25),
                        }}>
                        DiscountAmt
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'black',
                          fontWeight: '600',
                          width: wp(3),
                        }}>
                        :
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'grey',
                          fontWeight: '600',
                        }}>
                        {item?.DiscountAmt}
                      </Text>
                    </View> */}
                    <View style={{flexDirection: 'row', marginTop: wp(1)}}>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'black',
                          fontWeight: '600',
                          width: wp(30),
                        }}>
                        DealType
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'black',
                          fontWeight: '600',
                          width: wp(3),
                        }}>
                        :
                      </Text>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'grey',
                          fontWeight: '600',
                        }}>
                        {item?.DealType ? item.DealType?.substring(0, 30) : ''}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '65%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => getOfferDetails(item, 'view')}
                        style={styles.cardbtn}>
                        <Text
                          style={{
                            fontSize: wp(4.5),
                            fontWeight: '600',
                            color: 'black',
                          }}>
                          View
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.cardbtn, {backgroundColor: '#fd3550'}]}>
                        <Text
                          style={{
                            fontSize: wp(4.5),
                            fontWeight: '600',
                            color: 'black',
                          }}>
                          Add
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>

        {/* <Modal transparent={true} visible={false}>
          {false ? (
            <>
              <TouchableOpacity
                onPress={() => setProductModal(false)}
                style={{
                  position: 'absolute',
                  height: hp(6),
                  width: hp(6),
                  backgroundColor: '#032e63',
                  right: wp(10),
                  top: 12,
                  zIndex: 1,
                  borderRadius: hp(6 / 2),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: wp(5.5),
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  X
                </Text>
              </TouchableOpacity>
              <ScrollView contentContainerStyle={{paddingBottom: wp(4)}}>
                <View style={{flex: 1, width: wp(100)}}>
                  <FlatList
                    data={offerProudctList}
                    renderItem={({item}) => (
                      <View style={styles.Card}>
                        <View style={{marginHorizontal: 10, marginTop: 5}}>
                          <CheckBox
                            value={
                              inputs.hdnselectedvalue.includes(item.SrNo)
                                ? true
                                : false
                            }
                            onChange={() => {
                              if (
                                inputs.hdnselectedvalue.includes(item?.SrNo)
                              ) {
                                let newee = hdnselectedvalue.filter(
                                  items => items != item.SrNo,
                                );
                                setInputs(prev => ({
                                  ...prev,
                                  hdnselectedvalue: newee,
                                }));
                              } else {
                                setInputs(prev => ({
                                  ...prev,
                                  hdnselectedvalue: [
                                    ...inputs.hdnselectedvalue,
                                    item.SrNo,
                                  ],
                                }));
                              }
                            }}
                          />
                        </View>
                        <View style={{padding: 7}}>
                          <Image
                            style={{height: hp(20), width: '100%'}}
                            source={{
                              uri: `https://olocker.co/uploads/product/${item?.ImageName}`,
                            }}
                          />
                        </View>
                        <View style={{paddingHorizontal: 20}}>
                          <Text
                            style={{
                              fontSize: wp(4),
                              fontWeight: '700',
                              marginTop: 10,
                              color: '#000',
                            }}>
                            Gross Wt:-{' '}
                            <Text
                              style={{
                                fontSize: wp(4),
                                fontWeight: '700',
                                color: '#707371',
                              }}>
                              {item.GrossWt}
                            </Text>
                          </Text>

                          <Text
                            style={{
                              fontSize: wp(4),
                              fontWeight: '700',
                              marginTop: 3,
                              color: '#000',
                            }}>
                            Metal Wt:-{' '}
                            <Text
                              style={{
                                fontSize: wp(4),
                                fontWeight: '700',
                                color: '#707371',
                              }}>
                              {item?.MetalWt}
                            </Text>
                          </Text>
                          <Text
                            style={{
                              fontSize: wp(4),
                              fontWeight: '600',
                              marginTop: 3,
                              color: '#000',
                            }}>
                            Unit of MetalWt:-{' '}
                            <Text
                              style={{
                                fontSize: wp(4),
                                fontWeight: '700',
                                color: '#707371',
                              }}>
                              {item.UnitMetalWt}
                            </Text>
                          </Text>
                          <Text
                            style={{
                              fontSize: wp(4),
                              fontWeight: '600',
                              marginTop: 3,
                              color: '#000',
                            }}>
                            Stone Wt:-{' '}
                            <Text
                              style={{
                                fontSize: wp(4),
                                fontWeight: '700',
                                color: '#707371',
                              }}>
                              {item.StoneWt}
                            </Text>
                          </Text>
                          <Text
                            style={{
                              fontSize: wp(4),
                              fontWeight: '600',
                              marginTop: 3,
                              color: '#000',
                            }}>
                            Price:-{' '}
                            <Text
                              style={{
                                fontSize: wp(4),
                                fontWeight: '700',
                                color: '#707371',
                              }}>
                              ₹{item.Price}
                            </Text>
                          </Text>

                          <View
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                              marginTop: 3,
                            }}>
                            <Text
                              style={{
                                fontSize: wp(4),
                                fontWeight: '600',
                                color: '#000',
                              }}>
                              Product Name:-{' '}
                            </Text>
                            <View>
                              <Text
                                style={{
                                  fontSize: wp(4),
                                  fontWeight: '600',

                                  color: '#707371',
                                }}>
                                {item?.ItemName}
                              </Text>
                            </View>
                          </View>
                          <Text
                            style={{
                              fontSize: wp(4),
                              fontWeight: '600',
                              marginTop: 3,
                              color: '#000',
                            }}>
                            ProductsSku:-{' '}
                            <Text
                              style={{
                                fontSize: wp(4),
                                fontWeight: '700',
                                color: '#707371',
                              }}>
                              {item.ProductSku}
                            </Text>
                          </Text>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: 3,
                              alignItems: 'center',
                            }}>
                            <View style={{}}>
                              <Text
                                style={{
                                  fontSize: wp(4),
                                  fontWeight: '600',
                                  color: '#000',
                                }}>
                                Collection Name:
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',

                                width: '58%',
                              }}>
                              <Text
                                style={{
                                  fontSize: wp(4),
                                  fontWeight: '700',
                                  color: '#707371',
                                }}>
                                {item?.Name}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                  />
                </View>

                <View style={{alignItems: 'center'}}>
                  <FlatList
                    data={data}
                    horizontal
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => {
                          handlePage(item.num);
                        }}
                        style={styles.circleBtn}>
                        <Text
                          style={{
                            fontWeight: '800',
                            fontSize: 18,
                            color: '#fff',
                          }}>
                          {item.num}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </ScrollView>
            </>
          ) : null}
        </Modal> */}
        <View style={{height: 50}} />
      </ScrollView>
    </View>
  );
};
export default OfferList;

const Status = [
  {label: 'Active', value: 'true'},
  {label: 'In Active', value: 'false'},
];

const data = [
  {
    name: 'Lorem Ipsum',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    name: 'Lorem Ipsum',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    name: 'Lorem Ipsum',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    name: 'Lorem Ipsum',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    name: 'Lorem Ipsum',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    name: 'Lorem Ipsum',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    name: 'Lorem Ipsum',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
];
