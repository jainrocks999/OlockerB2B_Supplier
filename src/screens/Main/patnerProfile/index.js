import React, { useState, useEffect } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import BottomTab from '../../../components/StoreButtomTab';
import Stars from 'react-native-stars';
import styles from './styles';
import Catalogue from '../../../components/Catalogue';
import Profile from '../../../components/Profile/index2';
import Setting from '../../../components/Settings';
import Loader from '../../../components/Loader';
import ImagePath from '../../../components/ImagePath';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import Toast from "react-native-simple-toast";
import CheckBox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';

let productImage = [];
let showroomImage = [];
let supplierLogo = '';
let ownerImage = [];
let goldSpecilization = [];

const PatnerProfile = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const sentnetworkr = useSelector(state => state.Home.NetworkList?.networkretailer);
  const selector3 = useSelector(state => state.Home?.partnerData)
  const isFetchin = useSelector(state => state.Auth.isFetching1)
  const [id1, setId] = useState('');
  const [pending, setPending] = useState('');

  const pendingrequst = useSelector(state => state?.Home?.RetailerRequestList);

  const selector1 = useSelector(state => state.Supplier.SupplierDetail);
  const selector = selector1?.data;
  const ownerImagePath = 'https://olocker.co/uploads/partner/';
  const [visiable1, setVisible1] = useState(false);
  const [visiable2, setVisible2] = useState(false);
  const isFetching = useSelector(state => state.Supplier.isFetching);
  const isFetching1 = useSelector(state => state.City.isFetching);
  const [profile, setProfile] = useState(true);
  const [message, setMessage] = useState(false);
  const [catalogue, setCatalogue] = useState(false);
  const [setting, setSetting] = useState(false);
  const [rating1, setRatting1] = useState(0);
  const [loader, setLoader] = useState(false)
  const [viewProd, setViewProd] = useState(false)
  const [common, setCommon] = useState('checked');
  const [exclusive, setExclusive] = useState('unchecked');


  console.log('this is partner data',selector3);

  const BannerWidth = (Dimensions.get('window').width * 15) / 16;
  const BannerHeight = 140;

  const share = async () => {
    await Share.share({
      message: `Name : ${selector3?.partnerBranchdetails?.BillingContactName}   \nEmail Address : ${selector3?.partnerBranchdetails?.BillingContactEmail} `,
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

  const manageCommon = () => {
    setCommon('checked');
    setExclusive('unchecked');
  };

  const manageExclusive = () => {
    setCommon('unchecked');
    setExclusive('checked');
  };

  manageUpdate = () => {
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
  const getStatus = () => {
    const data = selector3?.partnerdetails
    return (
      <View style={{ width: '80%', }}>
        <View style={{ flexDirection: 'row', justifyContent: data?.IsPartnerSend == 1 ? 'space-evenly' : 'center' }}>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: data.network_status == 'Reject' ? 'red' : data?.IsSupplierSend == 1 ? '#FFF' : data?.IsPartnerSend == 1 ? 'green' : '#ea056c' }]}
            disabled={data?.IsSupplierSend == 1 || data.network_status == 'Reject'}
            onPress={addToNetwork}
          >
            <Text style={[styles.text1, { color: data?.IsSupplierSend == 1 ? '#032e63' : '#FFF', fontWeight: data?.IsSupplierSend === 1 ? '900' : '500' }]}>
              {data.network_status == 'Reject' ? "Rejected" : data?.IsSupplierSend == 1 ? "Requested" : data?.IsPartnerSend == 1 ? "Confirm" : "Add To Network"}
            </Text>
          </TouchableOpacity>
          {data?.IsPartnerSend == 1 && data.network_status != 'Reject' ?
            <TouchableOpacity style={[styles.addButton, { backgroundColor: 'red' }]} onPress={RejectMEthod}>
              <Text style={styles.text1}>
                {"Reject"}
              </Text>
            </TouchableOpacity> : null
          }
        </View>
      {data?.IsPartnerSend == 1?  <View style={{ marginTop: 20, marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', marginLeft: -5 }}>
            <CheckBox
              disabled={false}
              value={viewProd}
              onValueChange={newValue => {
                setViewProd(newValue)
              }}
              tintColors={{ true: '#fff', false: '#fff' }}
              onTintColor="#000"
              onCheckColor="#000"
              boxType="square"
              style={{ height: 16, width: 18 }}
            />
            <Text style={{
              marginLeft: 16, color: '#fff',
              fontSize: 12,
              fontFamily: 'Acephimere', textAlign: 'center'
            }}>Let my jewellery seen by your customers</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{

              color: '#fff',
              fontSize: 14,
              fontFamily: 'Roboto-Medium',

            }}>Category Type</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -7, marginTop: 3 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  value="first"
                  status={common}
                  onPress={() => manageCommon()}
                  uncheckedColor="#fff"
                  color="#fff"
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#fff',
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
                  uncheckedColor="#fff"
                  color="#fff"
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#fff',
                    fontFamily: 'Acephimere',
                  }}>
                  Exclusive
                </Text>
              </View>
            </View>
          </View>
        </View>:null}
      </View>
    )
  }

  const supplierprofile = async (id) => {
    const user_id = await AsyncStorage.getItem('user_id');
    console.log('gssjfhsfhskjf', id.isAdd);
    dispatch({
      type: 'get_networkretailerdetail_request',
      partnerId: id,
      url: 'getNetworkRetailerDeatils',
      supplierId: user_id,
      isAdd: id.isAdd,
      navigation,
    });
  };






  const RejectMEthod = async () => {
    const data1 = selector3?.partnerdetails;

    const userId = await AsyncStorage.getItem('user_id')
    const Token = await AsyncStorage.getItem('loginToken');
    setVisible2(true)
    const axios = require('axios');
    let data = new FormData();
    data.append('ddlStatus', '2');
    data.append('partnerId', data1?.SrNo);
    data.append('supplierId', userId);
    data.append('IsShowInRetailerApp', viewProd == true ? 1 : 0)
    data.append("ddlCategory", common == 'checked' ? "Category B" : "Category A")
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
        if (response.data.status == "success") {
          setVisible2(false);
          supplierprofile(data1?.SrNo)
          // Toast.show(response?.data?.msg);


        }

      })
      .catch((error) => {
        setVisible2(false);
        console.log(error);
      });
  }




  const addToNetwork = async () => {

    const data = selector3?.partnerdetails
    const userId = await AsyncStorage.getItem('user_id');
    if (data.IsPartnerSend == 1) {
      const Token = await AsyncStorage.getItem('loginToken');
      setVisible1(true);
      const axios = require('axios');
      let data = new FormData();
      data.append('ddlStatus', '1');
      data.append('partnerId', data.SrNo,);
      data.append('supplierId', userId);
      data.append('IsShowInRetailerApp', viewProd == true ? 1 : 0)
      data.append("ddlCategory", common == 'checked' ? "Category B" : "Category A")
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
          if (response?.data?.status == "success") {
            setVisible1(false);
            supplierprofile(data?.SrNo);
            Toast.show(response?.data?.msg);

          }

        })
        .catch((error) => {
          setVisible1(false);
          console.log(error);
        });





    }
    else if (data.IsPartnerSend == 0 && data.IsSupplierSend == 0) {

      dispatch({
        type: 'add_partner_to_network_request',
        url: 'addtoNetwork',
        id: data.SrNo,
        userId: userId,
        navigation,

      })
    }

    // if (data.IsPartnerSend == 1 || data.network_status != 'Reject') {
    //   Alert.alert('accept')

    // } else if (data.IsSupplierSend == 1) {
    //   alert('requested')
    // } else {
    //   alert('add to netwoklr')
    // }
  }


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


  const handleRating = async (value) => {
    const data = selector3?.partnerdetails
    const userId = await AsyncStorage.getItem('user_id');
    const Token = await AsyncStorage.getItem('loginToken')
    setRatting1(value)
    setLoader(true)
    const axios = require('axios');
    let config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: `https://olocker.co/api/supplier//partnerRating?partnerId=${data.SrNo}&supplierId=${userId}&rating=${value}`,
      headers: {
        'Olocker': `Bearer ${Token}`,
      },
    };

    axios.request(config)
      .then((response) => {
        if (response.data.status == true) {
          setLoader(false)
          Toast.show(response.data.msg)
        }
        else {
          setLoader(false)
        }
      })
      .catch((error) => {
        setLoader(false)
        console.log(error);
      });
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#f0eeef' }}>
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        source1={require('../../../assets/Fo.png')}
        title={'Partner Profile  '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('Message')}
        onPress2={() => navigation.navigate('FavDetails')}
      />

      <ScrollView>
        {isFetching || isFetching1 || visiable1 || visiable2 || loader || isFetchin ? <Loader /> : null}
        <View
          style={{
            backgroundColor: '#032e63',
          }}>
          <View style={{ flexDirection: 'row', padding: 15, width: '100%' }}>
            <View
              style={{
                backgroundColor: '#fff',
                height: 100,
                width: '30%',
                borderRadius: 10,
              }}>

              <Image
                style={{ width: '100%', height: '100%', borderRadius: 10 }}
                source={
                  selector3?.partnerdetails?.Logo
                    ? { uri: `${ownerImagePath}${selector3?.partnerdetails?.Logo}` }
                    : require('../../../assets/logo.png')
                }
              />
            </View>
            <View style={{ marginLeft: 10, width: '60%', marginTop: -4 }}>
              <Text
                style={{ color: '#fff', fontSize: 19, fontFamily: 'Acephimere' }}>
                {selector3?.partnerBranchdetails?.DisplayName}
              </Text>
              <Text
                style={{ color: '#fff', fontSize: 12, fontFamily: 'Acephimere',marginTop:4,marginLeft:4 }}>
                {selector3?.partnerBranchdetails?.Location}
              </Text>
             
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                  alignItems: 'center',
                  width: '100%',
                }}>
                {selector3?.partnerdetails?.isAdd == 1 ?
                  <Stars
                    half={true}
                    // default={parseFloat('4.5')}
                    default={selector3?.partnerdetails?.rating ? parseFloat(selector3?.partnerdetails?.rating) : rating1}
                    spacing={5}
                    update={val => handleRating(val)}
                    count={5}
                    starSize={16}
                    fullStar={require('../../../assets/Image/star.png')}
                    emptyStar={require('../../../assets/Image/star1.png')}
                    halfStar={require('../../../assets/Image/star2.png')}
                  />
                  : null}

                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${selector3?.partnerBranchdetails?.Mobile}`)}
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      style={{ width: 30, height: 30 }}
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
                      style={{ width: 30, height: 30 }}
                      source={require('../../../assets/PartnerImage/15.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              alignSelf: 'flex-end',
              flexDirection: 'row',
              width: '71%',
            }}>
            {console.log('partnerDetail,,,,,,,ddddddD23334', selector3?.partnerdetails.isAdd, id1)}
            {selector3?.partnerdetails?.isAdd == 0 ?

              getStatus()
              : <View style={styles.addButton}>
                <Text style={[styles.text1, { fontSize: 12 }]}>
                  {'Added To Network'}
                </Text>
              </View>
            }
          </View>

          <View style={{ alignItems: 'center', height: 0, marginTop: 15 }}></View>

          <View style={{ height: 20 }} />
        </View>
        <View>
          {selector3?.partnerdetails?.isAdd == 0 ? null :
            <View style={styles.tabContainer}>
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => manageTab()}
                  style={styles.tabStyle}>
                  {profile ? (
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={require('../../../assets/PartnerImage/10.png')}
                    />
                  ) : (
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={require('../../../assets/PartnerImage/pro_uncolor.png')}
                    />
                  )}
                </TouchableOpacity>
                <Text
                  style={{ marginTop: 3, fontFamily: 'Acephimere', fontSize: 13, color: '#000' }}>
                  Profile
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                 onPress={() => navigation.navigate('ChatScreen', { item: selector3?.partnerdetails })}
                  // onPress={() => navigation.navigate('Message')}
                  style={styles.tabStyle}>
                  {message ? (
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={require('../../../assets/PartnerImage/msg_active.png')}
                    />
                  ) : (
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={require('../../../assets/PartnerImage/11.png')}
                    />
                  )}
                </TouchableOpacity>
                <Text
                  style={{ marginTop: 3, fontFamily: 'Acephimere', fontSize: 13, color: '#000' }}>
                  Message
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => manageTab2()}
                  style={styles.tabStyle}>
                  {catalogue ? (
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={require('../../../assets/PartnerImage/nackactive.png')}
                    />
                  ) : (
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={require('../../../assets/PartnerImage/8.png')}
                    />
                  )}
                </TouchableOpacity>
                <Text
                  style={{ marginTop: 3, fontFamily: 'Acephimere', fontSize: 13, color: '#000' }}>
                  Catalogue
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => manageTab3()}
                  style={styles.tabStyle}>
                  {setting ? (
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={require('../../../assets/PartnerImage/setting_active.png')}
                    />
                  ) : (
                    <Image
                      style={{ width: 50, height: 50, alignSelf: 'center' }}
                      source={require('../../../assets/PartnerImage/7.png')}
                    />
                  )}
                </TouchableOpacity>
                <Text
                  style={{ marginTop: 3, fontFamily: 'Acephimere', color: '#000', fontSize: 13 }}>
                  Settings
                </Text>
              </View>
            </View>
          }
        </View>
        <View style={{ marginTop: 10 }}>
          {profile == true ? <Profile /> : null}
          {catalogue == true ? <Catalogue /> : null}
          {setting == true ? <Setting /> : null}
        </View>
      </ScrollView>
      <StatusBar />
    </View>
  );
};
export default PatnerProfile;
