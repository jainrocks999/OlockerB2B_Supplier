import React, {useEffect, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import BottomTab from '../../../components/StoreButtomTab';
import styles from './styles';
import {types} from '@babel/core';
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
const HomeScreen = () => {
  const navigation = useNavigation();
  const selector = useSelector(state => state.sentRequest);
  const data2=useSelector(state=>state.deletData)
  const dispatch = useDispatch();
 

 const isFetching =useSelector(state => state.isFetching)
  const [rejected, setRejected] = useState(false);
  const [pending, setPending] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const demo = (ind ,index2) => {
    // console.log('srno ..................', ind);
    const tempData=data2?data2:selector?.suppliers
    var data= tempData.filter((item, index) => {
      return index != index2;

    })

  
    dispatch({
      type: 'Get_delete_Success',
      payload:data
     })
    
  }
  const deteleApi = async (id ,index2 ) => {
    const Token = await AsyncStorage.getItem('loginToken')
    const axios = require('axios');


let config = {
  method: 'delete',
  maxBodyLength: Infinity,
  url: `https://olocker.co/api//partners/removeSupplier/${id}`,
  headers: { 
    'Olocker': `Bearer ${Token}`
  } 
};

axios.request(config)
.then((response) => {
  // console.log(' delete data from api', JSON.stringify(response.data));
  if (response.data.status == true) {
    demo(id,index2)
  }
})
.catch((error) => {
  // console.log(error);
});

   
 }

  const manageRequest = () => {
    setPending(true);
    setAccepted(false);
    setRejected(false);
  };

  const manageRequest1 = () => {
    setPending(false);
    setAccepted(true);
    setRejected(false);
  };

  const manageRequest2 = () => {
    setPending(false);
    setAccepted(false);
    setRejected(true);
  };
  return (
    <View style={styles.conatiner}>
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        source1={require('../../../assets/Fo.png')}
        title={'Sent Requests '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('Message')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
      <ScrollView>

        {isFetching?<Loader/>:null}
        <View style={styles.main}>
          <TouchableOpacity
            onPress={() => manageRequest()}
            style={[
              styles.touch,
              {borderColor: pending == true ? '#032e63' : '#616161'},
            ]}>
            <Text
              style={[
                styles.touchtext,
                {color: pending == true ? '#032e63' : '#616161'},
              ]}>
             {`${data2?data2?.length:selector?.suppliers?.length} Pending Approval`}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity 
                onPress={()=>manageRequest1()}
                style={{
                    paddingVertical:8,
                    borderRadius:15,
                    borderWidth:1,
                    width:'30%',
                    alignItems:'center',
                    justifyContent:'center',
                    borderColor:accepted==true?'#032e63':'#616161'
                    }}>
                <Text style={{fontSize:11,color:accepted==true?'#032e63':'#616161',fontFamily:'Acephimere'}}>Accepted</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>manageRequest2()}
                style={{
                    paddingVertical:8,
                    borderRadius:15,
                    borderWidth:1,
                    width:'30%',
                    alignItems:'center',
                    justifyContent:'center',
                    borderColor:rejected==true?'#032e63':'#616161'
                    }}>
                <Text style={{fontSize:11,color:rejected==true?'#032e63':'#616161',fontFamily:'Acephimere'}}>Rejected</Text>
                </TouchableOpacity> */}
        </View>
        {pending == true ? (
          <View>
            {/* <View style={{paddingHorizontal: 15,}}>
              <Text style={styles.tlength}>{`${data2?data2?.length:selector?.suppliers?.length} Pending Approval`}</Text>
            </View> */}
            <View style={{marginHorizontal: 15,marginBottom:60}}>
              <FlatList
                data={data2?data2:selector?.suppliers}
                renderItem={({item ,index}) => (
                  <View style={styles.card}>
                    <View style={styles.cardv}>
                      <View style={styles.cardv1}>
                        <View style={styles.cardv2}>
                          <Image
                            style={{width: 100, height: 80, marginLeft: -10}}
                            resizeMode="cover"
                            source={ item.logoImage? {uri:`${item.logoImage}`} :  require('../../../assets/Image/Not.jpeg')}
                          />
                        </View>
                        <View style={{marginLeft: 10}}>
                          <Text style={styles.text}>{item.SupplierName}</Text>
                          <Text style={styles.text1}>{item.CityName}</Text>
                          <Text style={styles.text2}>{item.time}</Text>
                        </View>
                      </View>
                     
                    </View>
                     <View style={{alignSelf: 'flex-end',marginBottom:20,paddingHorizontal:10,marginTop:'-10%'}}>
                        <TouchableOpacity style={styles.BTouch}>
                          <Text style={styles.BTouchtext}>Pending</Text>
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
                          onPress={() =>deteleApi(item.SrNo,index)}
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                          }}>
                          <Image
                            style={{height: 25, width: 25}}
                            source={require('../../../assets/PartnerImage/5.png')}
                          />

                          <Text
                            style={{marginLeft: 7, fontFamily: 'Acephimere'}}>
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
        ) : null}

        {accepted == true ? (
          <View>
            <View style={{paddingHorizontal: 15}}>
              {selector1.length > 0 ? (
                <Text
                  style={{
                    fontFamily: 'Acephimere',
                    fontSize: 13,
                    color: '#565656',
                  }}>{`${selector1.length} Pending Approval`}</Text>
              ) : null}
            </View>
            <View style={{marginHorizontal: 15}}>
              <FlatList
                data={selector1}
                renderItem={({item}) => (
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: '#fff',
                      marginTop: 10,
                      elevation: 5,
                      borderRadius: 10,
                      marginBottom: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingVertical: 15,
                        justifyContent: 'space-between',
                        paddingHorizontal: 15,
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View
                          style={{
                            width: 100,
                            borderWidth: 1,
                            height: 80,
                          }}></View>
                        <View style={{marginLeft: 10}}>
                          <Text
                            style={{
                              color: '#032e63',
                              fontFamily: 'Acephimere',
                              fontSize: 15,
                            }}>
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'Acephimere',
                              fontSize: 13,
                              color: '#000',
                            }}>
                            {item.city}
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              marginTop: 10,
                              fontFamily: 'Acephimere',
                              color: '#656565',
                            }}>
                            {item.time}
                          </Text>
                        </View>
                      </View>
                      <View style={{justifyContent: 'flex-end'}}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: 'grey',
                            paddingHorizontal: 5,
                            paddingVertical: 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontFamily: 'Acephimere',
                              fontSize: 12,
                            }}>
                            Pending
                          </Text>
                        </TouchableOpacity>
                      </View>
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
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Image
                            style={{height: 25, width: 25}}
                            source={require('../../../assets/PartnerImage/5.png')}
                          />
                        </TouchableOpacity>
                        <Text style={{marginLeft: 7, fontFamily: 'Acephimere'}}>
                          Delete Request
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        ) : null}

        {rejected == true ? (
          <View>
            <View style={{paddingHorizontal: 15}}>
              {selector2.length > 0 ? (
                <Text
                  style={{
                    fontFamily: 'Acephimere',
                    fontSize: 13,
                    color: '#565656',
                  }}>{`${selector2.length} Pending Approval`}</Text>
              ) : null}
            </View>
            <View style={{marginHorizontal: 15}}>
              <FlatList
                data={selector2}
                renderItem={({item}) => (
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: '#fff',
                      marginTop: 10,
                      elevation: 5,
                      borderRadius: 10,
                      marginBottom: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingVertical: 15,
                        justifyContent: 'space-between',
                        paddingHorizontal: 15,
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View
                          style={{
                            width: 100,
                            borderWidth: 1,
                            height: 80,
                          }}></View>
                        <View style={{marginLeft: 10}}>
                          <Text
                            style={{
                              color: '#032e63',
                              fontFamily: 'Acephimere',
                              fontSize: 15,
                            }}>
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'Acephimere',
                              fontSize: 13,
                              color: '#000',
                            }}>
                            {item.city}
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              marginTop: 10,
                              fontFamily: 'Acephimere',
                              color: '#656565',
                            }}>
                            {item.time}
                          </Text>
                        </View>
                      </View>
                      <View style={{justifyContent: 'flex-end'}}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: 'grey',
                            paddingHorizontal: 5,
                            paddingVertical: 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontFamily: 'Acephimere',
                              fontSize: 12,
                            }}>
                            Pending
                          </Text>
                        </TouchableOpacity>
                      </View>
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
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Image
                            style={{height: 25, width: 25}}
                            source={require('../../../assets/PartnerImage/5.png')}
                          />
                        </TouchableOpacity>
                        <Text style={{marginLeft: 7, fontFamily: 'Acephimere'}}>
                          Delete Request
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        ) : null}
      </ScrollView>
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
    name: 'RC Bafna Jewllers',
    city: 'Mumbai',
    time: '17 Minutes ago',
  },
];
const data1 = [
  {
    image: '',
    name: 'RC Bafna Jewllers1',
    city: 'Mumbai',
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
