import React, {useState, useCallback, useMemo, useEffect} from 'react';
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
import {Dropdown} from 'react-native-element-dropdown';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';
import axios from 'axios';
import {Modal, RadioButton} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import RNDateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OfferProductModal from './offerProductModal';

const AddOffer = ({route}) => {
  const navigation = useNavigation();
  const [show, setShow] = useState({
    show1: false,
    show2: false,
  });
  const [iseSelected, setIsselect] = useState({
    one: false,
    two: false,
  });
  const previtem = useSelector(state => state.Offer.offerDetail);
  const isEdit = useSelector(state => state.Offer.isEdit);
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();
  const selector = useSelector(state => state.Offer.OfferTempList);
  const isFetching = useSelector(state => state.Offer.isFetching);
  const offerTypeList = useSelector(state => state.Offer.offerTypeList);
  const modal = useSelector(state => state.Offer.modal);
  const isFetching2 = useSelector(state => state.Auth.isFetching);

  useEffect(() => {
    getOffertypeList();
  }, []);
  // const manageOfferList = async () => {
  //   const user_id = await AsyncStorage.getItem('user_id');

  // };
  useEffect(() => {
    isEdit ? setUpdateData() : null;
  }, [previtem]);
  const prevdata = previtem?.offer;
  const setUpdateData = () => {
    setInputs(prev => ({
      ...prev,
      ddloffertemplate: prevdata?.OfferType,
      dealtype: prevdata?.DealType,
      StartDate: prevdata?.StartDate?.toString()?.substring(0, 10),
      EndDate: prevdata?.EndDate?.toString()?.substring(0, 10),
      ImageName: {
        uri: `https://olocker.co${prevdata?.ImageLocation}${prevdata?.ImageName}`,
        name: prevdata?.ImageName,
        type: 'image/jpg',
      },
    }));
    setIsselect({
      one: true,
      two: true,
    });
    handleDealype(prevdata?.DealType, true);
    let newarr = [];
    previtem?.offerProduct
      ? previtem.offerProduct?.map(item => {
          newarr.push(item.SrNo);
        })
      : null;
    setInputs(prev => ({...prev, hdnselectedvalue: newarr}));
  };

  const [inputs, setInputs] = useState(prev => ({
    ...prev,
    ddloffertemplate: '',
    dealtype: '',
    txtdiscountper: '',
    hdnselectedvalue: [],
    // StartDate: new Date(),
    // EndDate: new Date(),
    txtdiscountamount: '',
    txtquantity: '',
    txtdealdescription: '',
    ImageName: '',
  }));
  const resetData = () => {
    setInputs({
      ddloffertemplate: '',
      dealtype: '',
      txtdiscountper: '',
      hdnselectedvalue: [],
      StartDate: new Date(),
      EndDate: new Date(),
      txtdiscountamount: '',
      txtquantity: '',
      txtdealdescription: '',
      ImageName: '',
    });
    setShow({
      show1: false,
      show2: false,
    });
  };
  const [visible, setVisble] = useState({
    one: false,
    two: false,
    three: true,
    four: false,
    five: false,
  });

  console.log('this si previtem', JSON.stringify(previtem));
  // handleWishList = async () => {
  //   const user_id = await AsyncStorage.getItem('user_id');
  //   dispatch({
  //     type: 'Get_wishListProduct_Request',
  //     url: '/wishListItem',
  //     user_id: user_id,
  //     navigation,
  //   });
  // };
  const createOffer = data => {
    console.log('called');
    dispatch({
      type: 'createOffer_request',
      data,
      url: !isEdit ? 'createOffer' : 'updateOffer',
      navigation,
    });
  };
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.Value}</Text>
        {/* {item.Value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )} */}
      </View>
    );
  };

  const setInputs2 = value => {
    if (visible.one) {
      setInputs(prev => ({
        ...prev,
        txtdiscountper: value,
        txtquantity: '',
        txtdiscountamount: '',
        txtdealdescription: '',
      }));
    } else if (visible.two) {
      setInputs(prev => ({
        ...prev,
        txtdiscountamount: value,
        txtquantity: '',
        txtdiscountper: '',
        txtdealdescription: '',
      }));
    } else if (visible.three) {
      setInputs(prev => ({
        ...prev,
        txtquantity: value,
        txtdiscountper: '',
        txtdiscountamount: '',
        txtdealdescription: '',
      }));
    } else if (visible.four) {
      setInputs(prev => ({
        ...prev,
        txtquantity: value,
        txtdiscountper: '',
        txtdiscountamount: '',
        txtdealdescription: value,
      }));
    }
  };
  const handleDealype = (value, data) => {
    console.log(value);
    let arr = ['1', '6', '7'];
    let arr2 = ['2', '3', '5'];
    if (arr.includes(value)) {
      setVisble({
        one: true,
        two: false,
        three: false,
        four: false,
      });
      setInputs(prev => ({
        ...prev,
        txtdiscountper: data ? prevdata.DiscountPer : '',
      }));
    } else if (arr2.includes(value)) {
      setVisble({
        one: false,
        two: true,
        three: false,
        four: false,
      });
      setInputs(prev => ({
        ...prev,
        txtdiscountamount: data ? prevdata.DiscountAmt : '',
      }));
    } else if (value == '4') {
      console.log('this is called');
      setVisble({
        one: false,
        two: false,
        three: true,
        four: false,
      });
      setInputs(prev => ({
        ...prev,
        txtquantity: data ? prevdata.DiscountQty : '',
      }));
    } else {
      setVisble({
        one: false,
        two: false,
        three: false,
        four: true,
      });
      setInputs(prev => ({
        ...prev,
        txtdealdescription: data ? prevdata.DealDescription : '',
      }));
    }
  };
  const renderItem2 = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.Value === inputs.dealtype && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
  const uploadImage = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });

      setInputs(prev => ({
        ...prev,
        ImageName: {uri: res.uri, name: res.name, type: res.type},
      }));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const getOffertypeList = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const data = {userid: user_id};
    dispatch({
      type: 'get_offer_type_list_request',
      url: 'getOfferTypeList',
      data,
    });
  };
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  useEffect(() => {
    setPrevModal(modal);
  }, [modal]);
  const offerProductList = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'Get_OfferProductList_Request',
      userId: user_id,
      url: 'getOfferProductList',
      start: startpage,
      limit: endpage,
      modal: true,
    });
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
  const handlePage = async num => {
    setStartPage(num === 1 ? 0 : endpage - 10);
    setEndpage(startpage + 10);
    console.log(startpage, endpage);
  };
  const [startpage, setStartPage] = useState(0);
  const [endpage, setEndpage] = useState(10);
  const handleOnSubmit = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const new_data = {...inputs, supplierId: user_id, offerid: prevdata?.Id};
    let data = new FormData();
    let valid = true;
    if (inputs.ImageName == '') {
      Toast.show('Please select image');
      valid = false;
    } else if (inputs.ddloffertemplate == '') {
      Toast.show('please select offer type');
      valid = false;
    } else if (inputs.dealtype == '') {
      Toast.show('please select deal type');
      valid = false;
    } else {
      Object.keys(new_data).map(item => {
        switch (item) {
          case 'hdnselectedvalue':
            inputs[item].map((items, index) => {
              data.append(`hdnselectedvalue[${index}]`, items);
            });
            break;
          case 'StartDate':
            data.append(item, inputs.StartDate);
            break;
          case 'EndDate':
            data.append(item, inputs.EndDate);
            break;
          case 'offerid':
            isEdit ? data.append(item, new_data[item]) : null;
            break;
          default:
            data.append(item, new_data[item]);
        }
      });
      console.log(valid);
      if (valid) {
        createOffer(data);
      }
    }
  };
  const [prevModal, setPrevModal] = useState(false);
  const datafromChild = data => {
    setInputs(prev => ({
      ...prev,
      hdnselectedvalue: data,
    }));
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar />
      <OfferProductModal
        prevModal={prevModal}
        snedDataToparent={datafromChild}
      />
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
            {!isEdit ? 'Add Offer' : 'Update Offer'}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
      <ScrollView contentContainerStyle={{padding: 12}}>
        <Text
          style={{
            color: '#030303',
            fontSize:16,
            fontFamily: 'Roboto-Medium',
            borderBottomWidth: 1,
            alignSelf: 'flex-start',
            borderStyle: 'dashed',
          }}>
          Offer
        </Text>

        <View style={{}}>
          {offerTypeList?.offertype && (
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={offerTypeList?.offertype}
              itemTextStyle={{color: 'grey'}}
              maxHeight={250}
              labelField="Value"
              valueField="Id"
              placeholder="Select Offer type"
              value={inputs.ddloffertemplate}
              onChange={item => {
                setInputs(prev => ({...prev, ddloffertemplate: item.Id}));
              }}
              renderItem={renderItem}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: hp(1),
            justifyContent: 'space-between',
          }}>
          <View style={{width: '48%'}}>
            <Text style={{color: '#23233C', fontSize: 15, fontFamily: 'Roboto-Medium',}}>
              Start Date
            </Text>
            <TouchableOpacity
              onPress={() =>
                setShow({
                  show1: true,
                  show2: false,
                })
              }
              style={{
                width: '100%',
                borderWidth: 1,
                height: 43,
                alignItems: 'center',
                borderRadius: 8,
                paddingHorizontal: 6,
                marginTop: 4,
                justifyContent: 'center',
              }}>
              {show.show1 ? (
                <RNDateTimePicker
                  value={start}
                  onChange={(val, selecdate) => {
                    setShow({
                      show1: false,
                      show2: false,
                    });
                    setInputs(prev => ({
                      ...prev,
                      StartDate:
                        selecdate?.getFullYear() +
                        '-' +
                        (selecdate?.getMonth() + 1)
                          .toString()
                          .padStart(2, '0') +
                        '-' +
                        selecdate?.getDate().toString().padStart(2, '0'),
                    }));
                    setIsselect(prev => ({...prev, one: true}));
                    setStart(selecdate);
                  }}
                  //mode="datetime"
                  dateFormat="day month year"
                  minimumDate={new Date()}
                  maximumDate={new Date(2300, 12, 31)}
                  style={{borderWidth: 1, height: 20, width: 40}}
                />
              ) : (
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: wp(4),
                    color: iseSelected.one ? 'black' : 'grey',
                    fontWeight: '600',
                  }}>
                  {iseSelected.one && inputs.StartDate != ''
                    ? inputs.StartDate
                    : 'select start date'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={{width: '48%'}}>
            <Text style={{color: '#23233C', fontSize: 15, fontFamily: 'Roboto-Medium',}}>End Date</Text>
            <TouchableOpacity
              onPress={() => {
                setShow({
                  show1: false,
                  show2: true,
                });
              }}
              style={{
                width: '100%',
                borderWidth: 1,
                height: 43,
                alignItems: 'center',
                borderRadius: 8,
                paddingHorizontal: 6,
                marginTop: 4,
                justifyContent: 'center',
              }}>
              {show.show2 ? (
                <RNDateTimePicker
                  value={end}
                  onChange={(val, end) => {
                    setShow({
                      show1: false,
                      show2: false,
                    });
                    setInputs(prev => ({
                      ...prev,
                      EndDate:
                        end?.getFullYear() +
                        '-' +
                        +(end?.getMonth() + 1).toString().padStart(2, '0') +
                        '-' +
                        end?.getDate().toString().padStart(2, '0'),
                    }));
                    setIsselect(prev => ({...prev, two: true}));
                    setEnd(end);
                  }}
                  mode="datetime"
                  minimumDate={new Date()}
                  style={{borderWidth: 1, height: 20, width: 40}}
                />
              ) : (
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 15,
                    color: iseSelected.two ? 'black' : 'grey',
                    fontWeight: '600',
                  }}>
                  {iseSelected.two && inputs.EndDate != ''
                    ? inputs.EndDate
                    : 'select end date'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            marginTop: hp(1.5),
            color: '#030303',
            fontFamily: 'Roboto-Medium',
            fontSize: 15,
          }}>
          Deal Type
        </Text>
        <View style={{}}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={DropData}
            maxHeight={250}
            labelField="label"
            valueField="value"
            placeholder="Select Offer type"
            value={inputs.dealtype}
            itemTextStyle={{color: 'grey'}}
            onChange={item => {
              console.log(item);
              setInputs(prev => ({...prev, dealtype: item.value}));
              handleDealype(item.value);
            }}
            renderItem={renderItem2}
          />
        </View>
        <Text
          style={{
            marginTop: 10,
            color: '#030303',
            fontFamily: 'Roboto-Medium',
            fontSize: 15,
          }}>
          {visible.one
            ? 'Discount Percentage'
            : visible.two
            ? 'Discount Amount'
            : visible.three
            ? 'Discount Quanity'
            : 'Difine deal'}
        </Text>
        <View
          style={{
            width: '100%',
            borderWidth: 1,
            height: 43,
            borderRadius: 8,
            paddingHorizontal: 6,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 4,
          }}>
          <TextInput
            style={{fontSize: 15, color: 'black'}}
            placeholderTextColor={'grey'}
            value={
              visible.one
                ? inputs.txtdiscountper
                : visible.two
                ? inputs.txtdiscountamount
                : visible.three
                ? inputs.txtquantity
                : inputs.txtdealdescription
            }
            placeholder={
              visible.one
                ? 'Discount Percentage'
                : visible.two
                ? 'Discount Amount'
                : visible.three
                ? 'Discount Quanity'
                : 'Difine deal'
            }
            onChangeText={inputs => {
              setInputs2(inputs);
            }}
          />
        </View>
        {true ? (
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              // marginHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                offerProductList();
              }}
              style={{
                backgroundColor: '#032e63',
                borderRadius: wp(4.5),
                alignItems: 'center',
                height: 43,
                paddingHorizontal: 5,
                justifyContent: 'center',
                marginTop: 15,
                width: '48%',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Roboto-Medium',
                  fontSize:15,
                  textAlign: 'center',
                }}>
                Add Products to Offer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#032e63',
                borderRadius: wp(4.5),
                alignItems: 'center',
                height: 43,
                paddingHorizontal: 5,
                justifyContent: 'center',
                marginTop: 15,
                width: '48%',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Roboto-Medium',
                  fontSize: 15,
                  textAlign: 'center',
                }}>
                Add Customer to Offers
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={{marginTop: 10}}>
          <TouchableOpacity
            onPress={() => uploadImage()}
            style={{
              borderColor: '#032e63',
              borderRadius: wp(5),
              alignItems: 'center',
              height: 43,
              justifyContent: 'center',
              marginTop: 15,
              borderWidth: 1,
            }}>
            <Text
              style={{
                color: '#032e63',
                fontFamily: 'Roboto-Medium',
                fontSize: 15,
              }}>
              Choose file
            </Text>
          </TouchableOpacity>
          {inputs.ImageName?.uri && (
            <Image
              style={{
                height: hp(20),
                width: wp(45),
                alignSelf: 'center',
                marginTop: wp(2),
              }}
              source={{uri: inputs.ImageName?.uri}}
            />
          )}
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => handleOnSubmit()}
            style={{
              backgroundColor: '#032e63',
              borderRadius: wp(5),
              alignItems: 'center',
              height: 43,
              justifyContent: 'center',
              marginTop: 15,
              width: '48%',
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Medium',
                fontSize: wp(4),
              }}>
              {!isEdit ? 'Add' : 'Update'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              resetData();
            }}
            style={{
              backgroundColor: '#032e63',
              borderRadius: wp(5),
              alignItems: 'center',
              height:43,
              justifyContent: 'center',
              marginTop: 15,
              width: '48%',
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Medium',
                fontSize: wp(4),
              }}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{height: 50}} />
      </ScrollView>
    </View>
  );
};
export default AddOffer;

const DropData = [
  {label: 'Discount on making', value: '1'},
  {label: 'Discount on Gold price', value: '2'},
  {label: 'Discount on diamond price', value: '3'},
  {label: 'Get Silver free on Gold Jewellery', value: '4'},
  {label: 'Get flat…...Rs. Off on every purchase', value: '5'},
  {label: 'Get product on interest free EMIs', value: '6'},
  {label: 'Products on ZERO Making', value: '7'},
  {label: 'Create your deal', value: '8'},
];
const Offer = [
  {
    ProductSku: '10BAI-683',
    ProductName: '10BAI-683',
    CollectionName: 'Lorem Ipsum',
    GrossWT: 80000,
    MetalWT: 80000,
    StoneWT: 80000,
    Price: '₹4389015.19',
  },
  {
    ProductSku: '10BAI-683',
    ProductName: '10BAI-683',
    CollectionName: 'Lorem Ipsum',
    GrossWT: 80000,
    MetalWT: 80000,
    StoneWT: 80000,
    Price: '₹4389015.19',
  },
  {
    ProductSku: '10BAI-683',
    ProductName: '10BAI-683',
    CollectionName: 'Lorem Ipsum',
    GrossWT: 80000,
    MetalWT: 80000,
    StoneWT: 80000,
    Price: '₹4389015.19',
  },
];
