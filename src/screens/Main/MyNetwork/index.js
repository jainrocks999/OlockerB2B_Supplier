import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import TabView from '../../../components/StoreButtomTab';
import Header from '../../../components/CustomHeader';
import Carousel from 'react-native-banner-carousel';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../../components/Loader';
import RNPickerSelect from 'react-native-picker-select';
import Banner from '../../../components/Banner';
import {FlatListSlider} from 'react-native-flatlist-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import colors from '../../../components/colors';
import Toast from 'react-native-simple-toast';
import PickerModel from '../../../components/PickerModel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const MyCatalogue = () => {
  const navigation = useNavigation();
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.State.StateList?.satates);
  console.log('this is state list', selector);
  const isFetching = useSelector(state => state?.isFetching);
  const [data, setData1] = useState('');
  const BannerWidth = (Dimensions.get('window').width * 15) / 16;
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [metal, setMetal] = useState('');
  const [supplier, setSupplier] = useState('');
  const [list, setList] = useState();
  const [show, setShow] = useState(false);
  const BannerHeight = 140;
  const [visiable1, setVisible1] = useState(false);
  const [data2, setData2] = useState('');
  const [visible, setVisible] = useState(false);
  const state2 = async () => {
    const Token = await AsyncStorage.getItem('loginToken');
    //setShow(true)
    dispatch({
      type: 'Get_State_Request',
      url: '/partners/getStateList',
      Token: Token,
    });
  };

  useEffect(() => {
    setState(''), setCity(''), setMetal('');
    setShow(true);
    setVisible1(false);
    //  show
  }, [focus]);

  const getSupplier = async () => {
    // window.location.reload(false);
    setVisible1(true);
    const Token = await AsyncStorage.getItem('loginToken');
    const Id = await AsyncStorage.getItem('Partnersrno');
    const axios = require('axios');

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://olocker.co/api//partners/searchSupplier',
      headers: {
        Olocker: `Bearer ${Token}`,
      },
      params: {
        partnerId: Id,
        supplierName: supplier,
        stateId: state,
        city: city,
        metalType: metal,
      },
    };

    axios
      .request(config)
      .then(response => {
        if (response.data.status == true) {
          setData1(response.data.list);
          setVisible1(false);
          console.log('seach api data ', JSON.stringify(response.data.list));

          if (Object.keys(response.data.list).length) {
            setShow(false);
            console.log('data log view on...', show);
          } else {
            setShow(true);
            console.log('data log view of...', show);
          }
        }
      })
      .catch(error => {
        Toast.show('Server not responding');
        setVisible1(false);
        console.log(error);
      });
  };

  const AcceptMEthod = SupplierSrNo => {
    dispatch({
      type: 'Get_Accepted_Request',
      url: 'AcceptSupplierRequest',
      SrNo: SupplierSrNo,
      IsShowinRetailerApp: true,
    });
  };

  const Reject = SupplierSrNo => {
    dispatch({
      type: 'Get_Rejected_Request',
      url: 'RejectSupplierRequest',
      SrNo: SupplierSrNo,
      RejectReason: 'string',
    });
  };
  const pendingRequest = async () => {
    const srno = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'Get_Pending_Request',
      url: '/partners/pendingSupplierRequest',
      partnerId: srno,
      Token: Token,
      navigation,
    });
    dispatch({
      type: 'Get_delete1_Success',
      payload: undefined,
    });
  };
  const SentRequest = async () => {
    const srno = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');

    dispatch({
      type: 'Get_Sent_Request',
      url: '/partners/requestedSupplierList',
      partnerId: srno,
      Token: Token,
      navigation,
    });
    dispatch({
      type: 'Get_delete_Success',
      payload: undefined,
    });
  };

  const searchJeweller = () => {
    dispatch({
      type: 'Search_Jewellers_Request',
      url: 'RejectSupplierRequest',
      data: {
        SrNo: 1,
        RejectReason: 'string',
      },
    });
  };
  const partnerDetaitl = id => {
    dispatch({
      type: 'Get_Profile_Request',
      url: 'GetSupplierProfile',
      supplierSrno: id,
      navigation,
    });
  };
  console.log('this is data on Heart', selector);

  const citySearch = async value => {
    setState(value);

    const Token = await AsyncStorage.getItem('loginToken');
    setVisible1(true);

    const axios = require('axios');

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://olocker.co/api//partners/getCities`,
      headers: {
        Olocker: `Bearer ${Token}`,
      },
      params: {
        stateId: state,
      },
    };

    axios
      .request(config)
      .then(response => {
        if (response.data.status == true) {
          setData2(response.data.cities);
          setVisible1(false);
        }
      })
      .catch(error => {
        console.log(error);

        Toast.show('Server not responding');
        setVisible1(false);
      });
  };

  const [visiable2, setVisible2] = useState(false);
  const manageOption2 = val => {
    setVisible2(false);
  };
  const [visiable3, setVisible3] = useState(false);
  const manageOption3 = val => {
    setVisible3(false);
    setMetal(val);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f0eeef'}}>
      <Header
        source1={require('../../../assets/Fo.png')}
        source2={require('../../../assets/Image/dil.png')}
        title={'My Network '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('Message')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
      <ScrollView>
        {isFetching ? <Loader /> : null}
        <View
          style={{
            backgroundColor: '#032e63',
            // height: 150,
            width: '100%',
            borderBottomRightRadius: 60,
            borderBottomLeftRadius: 60,
          }}>
          <View style={{alignItems: 'center', height: 160, marginTop: 0}}>
            <FlatListSlider
              data={images}
              height={160}
              timer={5000}
              contentContainerStyle={{marginVertical: 0, paddingHorizontal: 15}}
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

          <View style={{height: 150}} />
        </View>
        <View style={{marginTop: -135, paddingHorizontal: 15}}>
          <Text
            style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 16,
              fontFamily: 'Philosopher-Regular',
            }}>
            Search Jeweller Partner
          </Text>
          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              marginTop: 15,
              elevation: 5,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{paddingTop: 10}}>
                <Text
                  style={{
                    fontFamily: 'Acephimere',
                    fontSize: 12,
                    color: '#595959',
                  }}>
                  Search by name of jeweller partner
                </Text>
                <TextInput
                  style={{
                    height: 40,
                    marginTop: -5,
                    fontFamily: 'Acephimere',
                    fontSize: 15,
                    color: '#032e63',
                    marginRight: 5,
                    width: '100%',
                  }}
                  value={supplier}
                  onChangeText={val => setSupplier(val)}
                  placeholder="Enter Jeweller Partner Name"
                />
              </View>
              {/* <View style={{}}>
                <Image
                  style={{height: 40, width: 40}}
                  source={require('../../../assets/PartnerImage/1.png')}
                />
              </View> */}
            </View>
            <View style={{borderWidth: 0.5, borderColor: 'grey'}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 100,
              }}>
              <View
                style={{
                  padding: 0,
                  justifyContent: 'center',
                  width: '42%',
                  alignItems: 'flex-start',
                }}>
                <View
                  style={{
                    height: 45,
                    width: '100%',
                    borderWidth: 0,
                    marginLeft: 10,
                    borderWidth: 0,
                    marginBottom: 5,
                  }}>
                  {/* <PickerModel
                    visi={visiable1}
                    close={() => setVisible1(false)}
                    data={City}
                    onPress1={manageOption1}
                    styles={{
                      height: 250,
                      width: '55%',
                      alignSelf: 'flex-start',
                      // marginLeft: Platform.OS == 'android' ? '0%' : '3%',
                      marginTop: Platform.OS == 'android' ? '65%' : '68%',
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => setVisible1(true)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 0,
                    }}>
                    <Text
                      style={{
                        color: '#032e63',
                        width: '100%',
                        fontSize: 14,
                        marginBottom: -1,
                        // fontFamily: 'Acephimere',
                        fontWeight: '700',
                        marginTop: 8,
                        marginLeft: 20,
                      }}>{`${state}`}</Text>
                  </TouchableOpacity> */}
                  {/* <RNPickerSelect
                    // items={selector}
                    items={selector != undefined ? selector : undefined}
                    onValueChange={value => citySearch(value)}
                    style={{
                      inputAndroid: {
                        padding: 0,
                        color: '#032e63',
                        width: '100%',
                        fontSize: 14,
                        marginBottom: -1,
                        fontFamily: 'Acephimere',
                        fontWeight: '700',
                        height: 40,
                        marginTop: 5,
                        borderWidth: 0,
                      },
                      inputIOS: {
                        color: '#032e63',
                        fontSize: 14,
                        width: '100%',
                        marginBottom: 0,
                        fontFamily: 'Acephimere',
                        fontWeight: '700',
                        height: 40,
                        marginTop: 5,
                      },
                      placeholder: {
                        color: '#032e63',
                        width: '100%',
                        alignSelf: 'center',
                        fontFamily: 'Acephimere',
                      },
                    }}
                    value={state}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{label: 'Select State', value: ''}}
                  /> */}
                </View>

                <View
                  style={{
                    height: 45,
                    width: '100%',
                    borderWidth: 0,
                    marginLeft: 10,
                  }}>
                  {/* <PickerModel
                    visi={visiable2}
                    close={() => setVisible2(false)}
                    data={City}
                    onPress1={manageOption2}
                    styles={{
                      height: 250,
                      width: '55%',
                      alignSelf: 'flex-start',
                      // marginLeft: Platform.OS == 'android' ? '0%' : '3%',
                      marginTop: Platform.OS == 'android' ? '75%' : '77%',
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => setVisible2(true)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 0,
                    }}>
                    <Text
                      style={{
                        color: '#032e63',
                        width: '100%',
                        fontSize: 14,
                        marginBottom: -1,
                        // fontFamily: 'Acephimere',
                        fontWeight: '700',
                        marginTop: -4,
                        marginLeft: 20,
                      }}>{`${city}`}</Text>
                  
                  </TouchableOpacity> */}

                  {/* <RNPickerSelect
                    items={data2}
                    // items={data2!=undefined?data2:undefined}
                    onValueChange={value => setCity(value)}
                    style={{
                      inputAndroid: {
                        padding: -14,
                        color: '#032e63',
                        width: '100%',
                        fontSize: 14,
                        marginBottom: 0,
                        fontFamily: 'Acephimere',
                        fontWeight: '700',
                        height: 40,
                        marginTop: -5,
                        borderWidth: 0,
                      },
                      inputIOS: {
                        color: '#032e63',
                        fontSize: 14,
                        width: '100%',
                        marginBottom: 0,
                        fontFamily: 'Acephimere',
                        fontWeight: '700',
                        height: 40,
                        marginTop: 5,
                      },
                      placeholder: {
                        color: '#032e63',
                        width: '100%',
                        alignSelf: 'center',
                        fontFamily: 'Acephimere',
                      },
                    }}
                    value={city}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{label: 'Select City', value: ''}}
                  /> */}
                </View>
              </View>

              <View
                style={{
                  borderWidth: 0.5,
                  height: 90,
                  borderColor: 'grey',
                  marginTop: 0,
                }}
              />
              <View
                style={{
                  padding: 0,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  width: '42%',
                }}>
                {/* <View style={{alignItems:'center',justifyContent:'center'}}> */}
                <View
                  style={{
                    height: 45,
                    width: '100%',
                    borderWidth: 0,
                    marginRight: 0,
                  }}>
                  {/* <PickerModel
                    visi={visiable3}
                    close={() => setVisible3(false)}
                    data={Metal}
                    onPress1={manageOption3}
                    styles={{
                      height: 250,
                      width: '55%',
                      alignSelf: 'flex-end',
                      // marginLeft: Platform.OS == 'android' ? '0%' : '3%',
                      marginTop: Platform.OS == 'android' ? '69%' : '71%',
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => setVisible3(true)}
                    style={{
                      // flexDirection: 'row',
                      // justifyContent: 'space-between',
                      paddingHorizontal: 0,
                    }}>
                    <Text
                      style={{
                        color: '#032e63',
                        width: '100%',
                        fontSize: 14,
                        marginBottom: -1,
                        // fontFamily: 'Acephimere',
                        fontWeight: '700',
                        marginTop: -4,
                        marginLeft: 15,
                      }}>{`${metal}`}</Text> */}
                  {/* <Image
                      style={styles.rnimg}
                      source={require('../../../assets/F.png')}
                    /> */}
                  {/* </TouchableOpacity> */}
                  {/* <RNPickerSelect
                    items={Metal}
                    //     MetalType != undefined ?MetalType.map((item) => ({
                    //    label:item.Value,
                    //     value:item.Value
                    //  })):undefined}
                    onValueChange={Value => setMetal(Value)}
                    style={{
                      inputAndroid: {
                        color: '#032e63',
                        width: '100%',
                        fontSize: 14,
                        marginBottom: -1,
                        fontFamily: 'Acephimere',
                        fontWeight: '700',
                        height: 40,
                        marginLeft: 30,
                        padding: 10,
                        borderWidth: 0,
                      },
                      inputIOS: {
                        color: '#032e63',
                        fontSize: 14,
                        width: '100%',
                        marginBottom: 0,
                        fontFamily: 'Acephimere',
                        fontWeight: '700',
                        height: 40,
                        marginTop: 5,
                      },
                      placeholder: {
                        color: '#032e63',
                        width: '100%',
                        alignSelf: 'center',
                        fontFamily: 'Acephimere',
                      },
                    }}
                    value={metal}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{label: 'Select Metal', value: ''}}
                  /> */}
                  {/* </View> */}
                  {/* {console.log('resssmish',metal)} */}

                  {/* <RNPickerSelect
                  
                     items={id3}
                      onValueChange={val =>setId(val)}
                      style={ {
                        inputAndroid: { color: '#032e63', width: '100%', fontSize: 14, marginBottom: -1,fontFamily:'Acephimere',fontWeight:'700',height:40,marginTop:-20,padding:-10 },
                        inputIOS: { color: '#032e63', width: '100%', fontSize: 14, marginBottom:10,fontFamily:'Acephimere' },
                        placeholder: { color: '#032e63', width: '100%', alignSelf: 'center',fontFamily:'Acephimere' },
                    }}
                      value={id}
                      useNativeAndroidPickerStyle={false}
                      placeholder={{ label: 'Select Metal', value: '' }}
                    /> */}
                  {/* <Text style={{color:'#032e63',fontFamily:'Acephimere',fontWeight:'700'}}>{'Gold '}</Text> */}
                  {/* <Text style={{fontSize:12,color:'#595959',fontFamily:'Acephimere',marginTop:-6}}>Select Metal</Text> */}
                </View>
              </View>
            </View>
          </View>
          <View style={{alignItems: 'center', marginTop: -20}}>
            <TouchableOpacity
              onPress={() => getSupplier()}
              style={{
                height: 40,
                width: 130,
                backgroundColor: '#e9056b',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{color: '#fff', fontFamily: 'Acephimere', fontSize: 15}}>
                Search
              </Text>
            </TouchableOpacity>
          </View>
          {show ? (
            <Text
              style={{
                alignSelf: 'flex-start',
                marginTop: 10,
                fontSize: 13,
                color: 'red',
              }}>
              {'No Records found!'}
            </Text>
          ) : (
            <View style={{paddingVertical: 10}}>
              <FlatList
                data={data}
                renderItem={({item}) => (
                  <TouchableOpacity
                    // onPress={() => partnerDetaitl(item.SrNo)}
                    style={{
                      elevation: 5,
                      backgroundColor: '#fff',
                      paddingVertical: 15,
                      paddingHorizontal: 10,
                      marginTop: 10,
                      borderRadius: 8,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      {/* <Text style={{ fontSize: 16, color: '#000', fontFamily: 'Acephimere' }}>{item.SrNo}</Text> */}
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#000',
                          fontFamily: 'Acephimere',
                        }}>
                        {item.SupplierName}
                      </Text>
                      <View style={{}}>
                        <Text
                          style={{
                            color: '#595959',
                            fontFamily: 'Acephimere',
                            fontSize: 11,
                          }}>
                          {item.CityName}
                        </Text>
                        <Text
                          style={{
                            color: '#595959',
                            fontFamily: 'Acephimere',
                            fontSize: 11,
                          }}>
                          {item.StateName}
                        </Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      {/* <Image style={{height:20,width:40}} resizeMode='center' source={require('../../../assets/Image/eye.png')}/> */}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              marginTop: 0,
              elevation: 5,
              borderRadius: 10,
            }}>
            <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Philosopher-Regular',
                  color: '#032e63',
                }}>
                My Network{' '}
              </Text>
            </View>
            <View style={{borderWidth: 0.5, borderColor: 'grey'}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('MyNetworks')}
                style={{
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '33%',
                }}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    style={{height: 40, width: 42, tintColor: '#032e63'}}
                    source={require('../../../assets/PartnerImage/4.png')}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 11,
                    marginTop: 5,
                    color: '#343434',
                    fontFamily: 'Acephimere',
                  }}>
                  My Network
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderWidth: 0.3,
                  height: '100%',
                  borderColor: 'grey',
                  marginTop: 0,
                }}
              />
              <TouchableOpacity
                onPress={() => pendingRequest()}
                style={{
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '33%',
                }}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    style={{height: 42, width: 50}}
                    source={require('../../../assets/PartnerImage/2.png')}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 11,
                    marginTop: 5,
                    color: '#343434',
                    fontFamily: 'Acephimere',
                  }}>
                  Pending Request
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderWidth: 0.3,
                  height: '100%',
                  borderColor: 'grey',
                  marginTop: 0,
                }}
              />

              <TouchableOpacity
                onPress={() => SentRequest()}
                style={{
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '33%',
                }}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    style={{height: 42, width: 52}}
                    source={require('../../../assets/PartnerImage/3.png')}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 11,
                    marginTop: 5,
                    color: '#343434',
                    fontFamily: 'Acephimere',
                  }}>
                  Send Request
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{paddingVertical: 10}}>
            <Text
              style={{
                fontFamily: 'Acephimere',
                fontSize: 16,
                color: '#383838',
              }}>
              Notifications
            </Text>
            <FlatList
              data={data1}
              renderItem={({item}) => (
                <View
                  style={{
                    elevation: 5,
                    backgroundColor: '#fff',
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    marginTop: 10,
                    borderRadius: 8,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000',
                        fontFamily: 'Acephimere',
                      }}>
                      {item.SupplierName}
                    </Text>
                    <Text
                      style={{
                        color: '#000',
                        fontFamily: 'Acephimere',
                        fontSize: 13,
                      }}>
                      {item.Location}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => AcceptMEthod(item.SupplierSrNo)}
                      style={{height: 40, width: 40}}>
                      <Image
                        style={{height: '100%', width: '100%'}}
                        source={require('../../../assets/PartnerImage/6.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => Reject(item.SupplierSrNo)}
                      style={{height: 40, width: 40, marginLeft: 10}}>
                      <Image
                        style={{height: '100%', width: '100%'}}
                        source={require('../../../assets/PartnerImage/5.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </View>

        <View style={{height: 70}} />
      </ScrollView>
      <View
        style={{
          marginVertical: hp('2.5%'),
          position: 'absolute',
          top: '50%',
          right: '50%',
        }}>
        <ActivityIndicator
          size="large"
          animating={visiable1}
          color={colors.bc}
        />
      </View>
    </View>
  );
};
export default MyCatalogue;
const data = [
  {title: 'Hello'},
  {title: 'Hello'},
  {title: 'Hello'},
  {title: 'Hello'},
  {title: 'Hello'},
  {title: 'Hello'},
  {title: 'Hello'},
  {title: 'Hello'},
  {title: 'Hello', type: 'add'},
];
const data1 = [
  {name: 'Milind Jeweller', city: 'Mumbai'},
  {name: 'Milind Jeweller', city: 'Mumbai'},
  {name: 'Milind Jeweller', city: 'Mumbai'},
];

const City = [
  {label: 'Mumbai', value: 'Mumbai'},
  {label: 'Indore', value: 'Indore'},
  {label: 'Bangalore', value: 'Bangalore'},
  {label: 'Mumbai', value: 'Mumbai'},
  {label: 'Indore', value: 'Indore'},
  {label: 'Bangalore', value: 'Bangalore'},
];
const Metal = [
  {label: 'Diamond', value: 'Diamond'},
  {label: 'Gold', value: 'Gold'},
  {label: 'Platinum', value: 'Platinum'},
  {label: 'Silver', value: 'Silver'},
];

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
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
];
