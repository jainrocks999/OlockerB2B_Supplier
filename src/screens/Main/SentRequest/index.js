import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import BottomTab from '../../../components/StoreButtomTab';
import styles from './styles';
import { types } from '@babel/core';
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
const HomeScreen = () => {
  const navigation = useNavigation();
  const isFetching = useSelector(state => state.Home.isFetching);
  const selector = useSelector(state => state.Home.NetworkList?.networkretailer);
  const data2 = useSelector(state => state.Home.deletData)
  const dispatch = useDispatch();

  const [rejected, setRejected] = useState(false);
  const [pending, setPending] = useState(true);
  const [accepted, setAccepted] = useState(false);
  console.log(selector);
  const demo = (ind, index2) => {

    
    var data = [...selector].filter((item, index) => {

      return ind != item?.PartnerSrNo;
      // console.log(item.PartnerSrNo);

    })
    console.log('thjississi',data.length);

    dispatch({
      type: 'Network_List_Success',
      payload: {networkretailer:data}
    })

  }
 
  const deteleApi = async (id, index2) => {
    console.log('datatatat,,,,', id.PartnerSrNo);
    const user_id = await AsyncStorage.getItem('user_id');
    const Token = await AsyncStorage.getItem('loginToken');
    const axios = require('axios');
    setAccepted(true)
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://olocker.co/api/supplier//removeNetworkRetailer?userRole=6&userId=${user_id}&partnerId=${id?.PartnerSrNo}`,
      headers: {
        'Olocker': `Bearer ${Token}`
      }
    };

    axios.request(config)
      .then((response) => {
       console.log('reject requst for supplier side ',response.data,config);
        if (response.data.status == true) {
          demo(id?.PartnerSrNo, index2)
          setAccepted(false)
        }
      })
      .catch((error) => {
        setAccepted(false)
        console.log(error);
      });
    // demo(id?.PartnerSrNo, index2)


  }



  const DeleteModel = (item, index) => {
    Alert.alert(
      'Are you sure you want to delete sent request?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {
            cancelable: false;
          },
          style: 'cancel',
        },
        { text: 'ok', onPress: () => deteleApi(item, index) },
      ],
      { cancelable: false },
    );
  };



  return (
    <View style={styles.conatiner}>
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        source1={require('../../../assets/Fo.png')}
        title={'Sent Request'}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('MessageBox')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
      {isFetching || accepted ? <Loader /> : null}
      {
        selector?.length == 0 ?
          <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', height: '90%', }}>
            <Text style={styles.tlength}> {'No Request Sent'} </Text>

          </View>
          :
          <ScrollView>
            <View style={{}}>
              <Text
                style={[
                  styles.touchtext,
                  { color: pending == true ? '#032e63' : '#616161', fontSize: 13, marginLeft: 10, marginTop: 5 },
                ]}>
                {  `${selector?.length==1?`${ selector?.length}  Sending Request`:`${ selector?.length}  Sending Requests`}` }
              </Text>
              <View style={{ marginHorizontal: 15, paddingBottom: 100 }}>
                <FlatList style={{}}
                  data={selector}
                  // data={data2 ? data2 : selector?.suppliers}
                  renderItem={({ item, index }) => (
                    <View style={styles.card}>
                      <View style={styles.cardv}>
                        <View style={styles.cardv1}>

                          <View style={styles.cardv2}>
                            <Image
                              style={{ width: 100, height: 80, marginLeft: -10, borderRadius: 10 }}
                              resizeMode="cover"
                              source={item.Logo ? { uri: `${item.url}${item.Logo}` } : require('../../../assets/logo.png')}
                            />
                          </View>
                          <View style={{ marginLeft: 10 }}>
                            <Text style={styles.text}> {item.CompanyName}</Text>
                            <Text style={styles.text1}>{item.CityName}</Text>
                            <Text style={styles.text2}>{item.time}</Text>
                          </View>
                        </View>

                      </View>
                      <View style={{ alignSelf: 'flex-end', marginBottom: 20, paddingHorizontal: 10, marginTop: '-10%' }}>
                      <TouchableOpacity style={[styles.BTouch,{ backgroundColor:item.Status=='Reject'?'red': '#032e63',}]}>
                          <Text style={styles.BTouchtext}>{item.Status}</Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          borderTopWidth: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          borderColor: 'grey',
                        }}>
                        {/* <View style>
                      <Text>Delete Request</Text>
                    </View> */}
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 10,
                          }}>
                        
                          <TouchableOpacity
                            onPress={() => DeleteModel(item, index)}
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                            }}>
                            <Image
                              style={{ height: 25, width: 25 }}
                              source={require('../../../assets/PartnerImage/5.png')}
                            />

                            <Text
                              style={{ marginLeft: 7, fontFamily: 'Acephimere', color: '#000' }}>
                              Delete Request
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )}
                />
              </View>

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
    SupplierName: 'RC Bafna Jewllers',
    city: 'Mumbai',
    time: '17 Minutes ago',
  },
];
const data1 = [
  {
    image: '',
    SupplierName: 'RC Bafna Jewllers1',
    CityName: 'Mumbai',
    time: '17 Minutes ago',
  },
];
const data2 = [
  {
    image: '',
    name: 'RC Bafna Jewllers2',
    city: 'Mumbai',
    time: '17 Minutes ago',
  },
];
