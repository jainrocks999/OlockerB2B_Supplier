import React, { useEffect } from 'react';
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
import Header from '../../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import BottomTab from '../../../components/StoreButtomTab';
import styles from './styles';
import Loader from '../../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.Pending);
  const data2 = useSelector(state => state.deletData1)
  const isFetching = useSelector(state => state?.isFetching)
  console.log('pendind request on  get daat ', selector);
  const demo = (ind, index2) => {
    console.log('srno ..................', ind);
    const tempData = data2 ? data2 : selector?.list
    var data = tempData.filter((item, index) => {
      return index != index2;

    })


    dispatch({
      type: 'Get_delete1_Success',
      payload: data
    })

  }
  const AcceptMEthod = async (id, index) => {
    const srno = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken')

    const axios = require('axios');
    let data = new FormData();
    data.append('sp_networkId', id);
    data.append('statusId', '1');
    data.append('partnerId', srno);
    data.append('rejectReason', '');

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://olocker.co/api//partners/updateSupplierRequest',
      headers: {
        'Olocker': `Bearer ${Token}`,
        // ...data.getHeaders()
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log('response data ........', (response.data));
        if (response.data.status == true) {
          demo(index)

        }

      })
      .catch((error) => {
        console.log(error);
      });


  }
  const RejectMEthod = async (id, index) => {

    console.log('data iss s', id);
    const srno = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken')

    const axios = require('axios');
    let data = new FormData();
    data.append('sp_networkId', id);
    data.append('statusId', '2');
    data.append('partnerId', srno);
    data.append('rejectReason', '');

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://olocker.co/api//partners/updateSupplierRequest',
      headers: {
        'Olocker': `Bearer ${Token}`,
        // ...data.getHeaders()
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log('response data ........', (response.data));
        if (response.data.status == true) {
          demo(index)

        }

      })
      .catch((error) => {
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
  return (
    <View style={{ flex: 1, backgroundColor: '#f0eeef' }}>
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        source1={require('../../../assets/Fo.png')}
        title={'Pending Request '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('Message')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
      {/* <ScrollView> */}

      <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
        <Text style={{ color: '#565656', fontFamily: 'Acephimere' }}>{`${data2 ? data2?.length : selector?.list.length}${' Pending Requests'}`}</Text>
      </View>
      {isFetching ? <Loader /> : null}
      <FlatList
        data={data2 ? data2 : selector?.list}
        renderItem={({ item, index }) => (
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
              flexDirection: 'row',
            }}>
            {console.log('image shows aaa  ', item.logoImage)}
            <View
              style={{
                width: '38%',
                height: 100,
                backgroundColor: '#fff',
                elevation: 5,
                borderRadius: 8,
              }}>

              <Image
                style={{ height: '100%', width: '100%' }}
                resizeMode={'cover'}
                source={item.logoImage ? { uri: item.logoImage } : require('../../../assets/Image/Not.jpeg')}
              />

            </View>
            <View style={{ marginLeft: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#032e63',
                  fontFamily: 'Acephimere',
                }}>
                {item.SupplierName}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#032e63',
                  fontFamily: 'Acephimere',
                }}>
                {item.CityName}
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
                  onPress={() => AcceptMEthod(item.SrNo, index)}
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
                      fontFamily: 'Acephimere',
                    }}>

                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => RejectMEthod(item.SrNo, index)}
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
                      fontFamily: 'Acephimere',
                    }}>
                    REJECT
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* {console.log('zvvvv',item)} */}
          </View>
        )}
      />
      {/* </ScrollView> */}
      {/* <View style={{bottom:0,position:'absolute',left:0,right:0}}>
      <BottomTab/>
      </View> */}
      <StatusBar />
    </View>
  );
};
export default HomeScreen;
const data = [
  {
    image: '',
    name: 'RC Bafna Jewellers',
    city: 'Mumbai',
    time: '17 Minutes ago',
  },
  {
    image: '',
    name: 'RC Bafna Jewellers',
    city: 'Mumbai',
    time: '17 Minutes ago',
  },
  {
    image: '',
    name: 'RC Bafna Jewellers',
    city: 'Mumbai',
    time: '17 Minutes ago',
  },
];
