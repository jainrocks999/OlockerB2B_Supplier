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
  const [temp, setTemp] = useState();
  const isFocuse = useIsFocused();

  console.log('this is offerlistdata', JSON.stringify(OfferListData));

  // useEffect(() => {
  //   handleOfferList();
  // }, [isFocuse]);

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
      const data = {
        userid: user_id,
        id: item.Id,
      };
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
  const getSomedata = id => {
    let obj = {};
    OfferListData?.offertemplate?.map(item => {
      item?.Id == id ? (obj = item) : '';
    });

    return obj;
  };
  const deleteOffer = item => {
    dispatch({
      type: 'offer_list_request',
      url: 'removeOffer',
      productSrNo: '',
    });
    console.log(item);
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

  return (
    <View style={{flex: 1}}>
      <StatusBar />
      {fetching || isFetching ? <Loader /> : null}
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
            Offers list
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{height: 24, width: 28}}
            source={require('../../../assets/Fo.png')}
          />
          <Image
            style={{height: 22, width: 26, tintColor: '#fff', marginLeft: 15}}
            source={require('../../../assets/Image/dil.png')}
          />
          <Image
            style={{height: 24, width: 28, tintColor: '#fff', marginLeft: 15}}
            source={require('../../../assets/supplierImage/more.png')}
          />
        </View>
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
                  {console.log(
                    `https://olocker.co${OfferListData?.ImageUrl}${item.ImageName}`,
                  )}
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
                      <MaterialCommunityIcons name="pencil" size={wp(5.5)} />
                      <MaterialCommunityIcons
                        onPress={() => {
                          deleteOffer(item);
                        }}
                        name="delete"
                        size={wp(5.5)}
                      />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'black',
                          fontWeight: '600',
                          width: wp(25),
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
                          width: wp(25),
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
                          width: wp(25),
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
                          width: wp(25),
                        }}>
                        DiscountPer
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
                        {item?.DiscountPer}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: wp(1)}}>
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
                    </View>
                    <View style={{flexDirection: 'row', marginTop: wp(1)}}>
                      <Text
                        style={{
                          fontSize: wp(4),
                          color: 'black',
                          fontWeight: '600',
                          width: wp(25),
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
                  </View>
                </View>
              )}
            />
          </View>
        </View>
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
