import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  Alert,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Header from '../../../components/CustomHeader';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import BottomTab from '../../../components/StoreButtomTab';
import styles from './styles';
import Loader from '../../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';

const HomeScreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const focus = useIsFocused()
  const [active,setActive]=useState(true)
  const [visiable1, setVisible1] = useState(false);
  const [visiable2, setVisible2] = useState(false);
  const selector = useSelector(state => state?.Home?.RetailerRequestList);
  console.log('dkfmskgmjsg', route.params.partnerSrNo);
  const data2 = useSelector(state => state?.Home?.deletData1)
  const isFetching = useSelector(state => state?.Home?.isFetching)
  const [viewProd, setViewProd] = useState(false)
  const [common, setCommon] = useState('checked');
  const [exclusive, setExclusive] = useState('unchecked');


  const manageCommon = () => {
    setCommon('checked');
    setExclusive('unchecked');
  };

  const manageExclusive = () => {
    setCommon('unchecked');
    setExclusive('checked');
  };


  useEffect(() => {
    if (focus) {
      ApiCallWithUseEffect();
    }
  }, [focus])


  const ApiCallWithUseEffect = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'Retailer_RequestList',
      url: '/getReatilerRequest',
      userId: user_id,
      userRole: '6',
    });
  }





  const demo = (ind, index2) => {

    var data = [...selector].filter((item, index) => {
      return index != index2;

    })
    dispatch({
      type: 'Retailer_RequestList_Success',
      payload: data
    })

  }
  const AcceptMEthod = async (id, index) => {
    console.log('dddddd', index, id);
    const Token = await AsyncStorage.getItem('loginToken');
    setVisible1(true);
    const axios = require('axios');
    let data = new FormData();
    data.append('hSrNo', id?.SrNo);
    data.append('ddlStatus', '1');
    data.append('ddlCategory', id?.CategoryType);
    data.append('txtRejectReason', '');
    data.append('partnerId', id?.PartnerSrNo);
    data.append('supplierId', id?.SupplierSrNo);
    data.append('IsShowInRetailerApp', viewProd == true ? 1 : 0)
    data.append("ddlCategory",common=='checked'?"Category B":"Category A")
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://olocker.co/api/supplier/retailerStatusUpdate',
      headers: {
        'Olocker': `Bearer ${Token}`,
        // ...data.getHeaders()
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log('response,,,,,,,,,,', response.data);
        if (response?.data?.status == "success") {
          setVisible1(false);
          demo(id, index);
          Toast.show(response?.data?.msg);

        }

      })
      .catch((error) => {
        setVisible1(false);
        console.log(error);
      });


  }
  const RejectMEthod = async (id, index) => {

    const Token = await AsyncStorage.getItem('loginToken');
    setVisible2(true)
    const axios = require('axios');
    let data = new FormData();
    data.append('hSrNo', id?.SrNo);
    data.append('ddlStatus', '2');
    data.append('ddlCategory', '');
    data.append('txtRejectReason', '');
    data.append('partnerId', id?.PartnerSrNo);
    data.append('supplierId', id?.SupplierSrNo);
    data.append('IsShowInRetailerApp', viewProd == true ? 1 : 0)
    data.append("ddlCategory",common=='checked'?"Category B":"Category A")
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://olocker.co/api/supplier/retailerStatusUpdate',
      headers: {
        'Olocker': `Bearer ${Token}`,
        // ...data.getHeaders()
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log('response,,,,,,,,,,', response.data);
        if (response.data.status == "success") {
          setVisible2(false);
          demo(id, index);
          // Toast.show(response?.data?.msg);


        }

      })
      .catch((error) => {
        setVisible2(false);
        console.log(error);
      });

    // dispatch({
    //   type: 'Get_updateSupplierRequest1_Request',
    //   url: '/partners/updateSupplierRequest',
    //   sp_networkId: id,
    //   statusId: 2,
    //   partnerId: srno,
    //   rejectReason:'',
    //   Token:Token,

    // }) 

  }
  setTimeout(() => {
    if(route.params.partnerSrNo){
      setActive(false)
    }
  }, 2000);
  return (
    <View style={{ flex: 1, backgroundColor: '#f0eeef' }}>
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        source1={require('../../../assets/Fo.png')}
        title={'Pending Request '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('MessageBox')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
      {isFetching || visiable1 || visiable2 ? <Loader /> : null}
      {selector?.length === 0 ?
        <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', height: '90%', }}>
          <Text style={{ color: 'grey', fontFamily: 'Acephimere', fontSize: 19, fontWeight: '700' }}> {'No Pending Request'} </Text>

        </View>
        :
        <ScrollView>
          <View>
            {/* {data2?.length==1&&selector?.length==1?
         <View> 
                    <Text style={{ color: '#565656', fontFamily: 'Acephimere' ,marginLeft:10,marginTop:15}}>{`${data2 ? data2?.length : selector?.length}${' Pending Request'}`}</Text>
                    </View>
                    :
                    <Text style={{ color: '#565656', fontFamily: 'Acephimere' ,marginLeft:10,marginTop:15}}>{`${data2 ? data2?.length : selector?.length}${' Pending Requests'}`}</Text>


         } */}
            <Text style={{ color: '#565656', fontFamily: 'Acephimere', marginLeft: 10, marginTop: 15 }}>{`${selector?.length == 1 ? `${selector?.length}  Pending Request` : `${selector?.length}  Pending Requests`}`}</Text>
            <FlatList
              // data={selector}
              data={selector}
              renderItem={({ item, index }) => (
                <View style={{
                  marginTop: 10,
                  paddingHorizontal: 20,
                  // height:140,
                  elevation: 5,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  borderRadius: 8,
                  marginBottom:4,
                  backgroundColor:item.PartnerSrNo==route.params.partnerSrNo && active==true?'#a8c6e3':'#fff'
                }}>
                  <View
                    style={{

                      flexDirection: 'row'

                    }}>
                    {console.log(item)}
                    <View
                      style={{
                        width: '38%',
                        height: 100,
                        backgroundColor: '#fff', marginTop: 20,
                        // elevation: 5,
                        // shadowColor: '#000',
                        // shadowOffset: {width: 0, height: 4},
                        // shadowOpacity: 0.6,
                        // shadowRadius: 8,
                        borderRadius: 8,
                      }}>

                      <Image
                        style={{ height: '100%', width: '100%' }}
                        resizeMode={'contain'}
                        source={item.Logo ? { uri: `https://olocker.co/uploads/partner/${item.Logo}` } : require('../../../assets/logo.png')}
                      />

                    </View>
                    <View style={{ marginLeft: 20, marginTop: 20, }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#032e63',
                          fontFamily: 'Acephimere',
                        }}>
                        {item.CompanyName}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#032e63',
                          fontFamily: 'Acephimere',
                        }}>
                        {item.city_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          color: '#575757',
                          fontFamily: 'Acephimere',
                        }}>
                        {item.Timestamp}
                      </Text>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          marginTop: 20,
                        }}>
                        <TouchableOpacity
                          onPress={() => AcceptMEthod(item, index)}
                          style={{
                            backgroundColor: '#5dc95c',
                            paddingHorizontal: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 15,
                            paddingVertical: 5,
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 12,
                              fontFamily: 'Acephimere', textAlign: 'center'
                            }}>
                            Accept
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => RejectMEthod(item, index)}
                          style={{
                            backgroundColor: 'red',
                            paddingHorizontal: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 15,
                            paddingVertical: 5,
                            marginLeft: 10,
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 12,
                              fontFamily: 'Acephimere', textAlign: 'center'
                            }}>
                            Reject
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', marginLeft: -5 }}>
                      <CheckBox
                        disabled={false}
                        value={viewProd}
                        onValueChange={newValue => {
                          setViewProd(newValue)
                        }}
                        tintColors={{ true: '#032e63', false: '#032e63' }}
                        onTintColor="#032e63"
                        onCheckColor="#032e63"
                        boxType="square"
                        style={{ height: 16, width: 18 }}
                      />
                      <Text style={{
                        marginLeft: 16, color: '#000',
                        fontSize: 12,
                        fontFamily: 'Acephimere', textAlign: 'center'
                      }}>Let my jewellery seen by your customers</Text>
                    </View>
                    <View style={{marginTop:10}}>
                      <Text style={{

                        color: '#000',
                        fontSize: 14,
                        fontFamily: 'Roboto-Medium',

                      }}>Category Type</Text>
                      <View style={{flexDirection:'row',alignItems:'center',marginLeft:-7,marginTop:3}}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                          value="first"
                          status={common}
                          onPress={() => manageCommon()}
                          uncheckedColor="#032e63"
                          color="#032e63"
                        />
                        <Text
                          style={{
                            fontSize: 14,
                          color: '#032e63',
                          fontFamily: 'Acephimere',
                          }}>
                          Common
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                          value="first"
                          status={exclusive}
                          onPress={() => manageExclusive()}
                          uncheckedColor="#032e63"
                          color="#032e63"
                        />
                        <Text
                          style={{
                            fontSize: 14,
                          color: '#032e63',
                          fontFamily: 'Acephimere',
                          }}>
                          Exclusive
                        </Text>
                      </View>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
      }

      <StatusBar />
    </View>
  );
};
export default HomeScreen;
const data = [
  {
    image: '',
    SupplierName: 'RC Bafna Jewellers',
    CityName: 'Mumbai',
    Timestamp: '17 Minutes ago',
  },
  {
    image: '',
    SupplierName: 'RC Bafna Jewellers',
    CityName: 'Mumbai',
    Timestamp: '17 Minutes ago',
  },
  {
    image: '',
    SupplierName: 'RC Bafna Jewellers',
    CityName: 'Mumbai',
    Timestamp: '17 Minutes ago',
  },
];
