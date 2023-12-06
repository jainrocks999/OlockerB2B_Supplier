import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import Loader from '../../../components/Loader';
import {Table, TableWrapper, Row} from 'react-native-table-component';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AssignCategory from '../Modal/assigncategoryModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
const ListOfRetailer = ({route}) => {
  const navigation = useNavigation();

  const isFetching = useSelector(state => state.Home.isFetching);
  const selector = useSelector(state => state.Home.SearchRetailerList);
  const AssiGnModal = useSelector(state => state.Supplier.AssiGnModal);
  const [AssignModal, setAssignModal] = useState(false);
  const [data, setData] = useState(false);
  const data2 = useSelector(state => state.Home.data2);

  const sendData = item => {
    setData(item);
    setAssignModal(true);
  };
  useEffect(() => {
    setAssignModal(false);
  }, [AssiGnModal]);
  const dispatch = useDispatch();

  const addPatnerTonetwork = async id => {
    const user_id = await AsyncStorage.getItem('user_id');

    dispatch({
      type: 'Addnetwork_toPatner_Request',
      userId: user_id,
      id: id,
    });
  };
  const [check, setCheck] = useState([]);
  const handleOnCheck = SrNo => {
    console.log(SrNo);
    if (check.includes(SrNo)) {
      let formateindex = check.filter((item, index) => item != SrNo);
      setCheck(formateindex);
    } else {
      setCheck([...check, SrNo]);
    }
  };
  const onAddToNetwork = async () => {
    check.map(item => console.log(item));
    const userId = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'add_partner_to_network_request',
      url: 'addtoNetwork',
      id: check,
      userId,
      data2,
    });
  };
  const removeRetailer = async pSrNo => {
    console.log(pSrNo);
    const userId = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'remove_retailer_from_network',
      url: 'removeSuppliertest',
      SupplierSrNo: userId,
      PartnerSrNo: pSrNo,
      data2,
    });
  };
  return (
    <View style={{flex: 1}}>
      {isFetching ? <Loader /> : null}
      <AssignCategory
        visi={AssignModal}
        data={data}
        close={() => setAssignModal(false)}
      />
      <View style={{}}>
        <Text
          style={{
            fontSize: wp(5),
            fontWeight: '800',
            color: '#032E63',
            marginLeft: 10,
            marginVertical: 15,
          }}>
          List of Retailers (Matching your search criteria)
        </Text>
        <View>
          <FlatList
            data={selector?.requestlist}
            renderItem={({item}) => (
              <View
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  marginVertical: 5,
                  shadowOpacity: 0.39,
                  shadowRadius: 8.3,
                  elevation: 5,
                  backgroundColor: 'white',
                  borderRadius: wp(3),
                  marginHorizontal: 5,
                  paddingHorizontal: wp(4),
                  paddingVertical: wp(3),
                }}>
                {console.log('this is itme ', JSON.stringify(item))}
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: wp(4.2),
                      marginLeft: 10,
                      color: 'black',
                      width: wp(36),
                    }}>
                    CompanyName
                  </Text>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: wp(4.2),
                      marginLeft: 10,
                      color: 'black',
                    }}>
                    {': '}
                  </Text>

                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: wp(4.2),
                      color: 'grey',
                    }}>
                    {' '}
                    {item.CompanyName}
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: wp(4.2),
                      marginLeft: 10,
                      color: 'black',
                      width: wp(36),
                    }}>
                    City
                  </Text>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: wp(4.2),
                      marginLeft: 10,
                      color: 'black',
                    }}>
                    {': '}
                  </Text>

                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: wp(4.2),
                      color: 'grey',
                    }}>
                    {' '}
                    {item?.CityName}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: wp(4.2),
                      marginLeft: 10,
                      color: 'black',
                      width: wp(36),
                    }}>
                    State
                  </Text>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: wp(4.2),
                      marginLeft: 10,
                      color: 'black',
                    }}>
                    {': '}
                  </Text>

                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: wp(4.2),
                      color: 'grey',
                    }}>
                    {' '}
                    {item.StateName}
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: wp(4.2),
                      marginLeft: 10,
                      color: 'black',
                      width: wp(36),
                    }}>
                    Assign Category
                  </Text>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: wp(4.2),
                      marginLeft: 10,
                      color: 'black',
                    }}>
                    {': '}
                  </Text>

                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: wp(4.2),
                      color: 'grey',
                    }}>
                    {' '}
                    {item.CategoryType}
                  </Text>
                </View>
                {/* ShowInRetailerApp IsShowInRetailerApp */}

                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: wp(4.2),
                      marginLeft: 10,
                      color: 'black',
                      width: wp(36),
                    }}>
                    ShowInRetailerApp
                  </Text>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: wp(4.2),
                      marginLeft: 10,
                      color: 'black',
                    }}>
                    {': '}
                  </Text>

                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: wp(4.2),
                      color: 'grey',
                    }}>
                    {' '}
                    {item.IsShowInRetailerApp}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: wp(4.2),
                      marginLeft: 10,
                      color: 'black',
                      width: wp(36),
                    }}>
                    Status
                  </Text>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: wp(4.2),
                      marginLeft: 10,
                      color: 'black',
                    }}>
                    {': '}
                  </Text>

                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: wp(4.2),
                      color: 'grey',
                    }}>
                    {' '}
                    {item.Status}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: wp(65),
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={styles.updateBtn}
                    onPress={() => {
                      sendData(item);
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '700',
                        fontSize: wp(3),
                        textAlign: 'center',
                        width: wp(35),
                      }}>
                      Update Status & Assign Category
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      removeRetailer(item.SrNo);
                    }}
                    style={styles.updateBtn}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '700',
                        fontSize: wp(3),
                        textAlign: 'center',
                      }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <View contentContainerStyle={{}}>
        <View
          style={{height: hp(5), justifyContent: 'center', marginTop: hp(3)}}>
          <TouchableOpacity
            onPress={() => {
              onAddToNetwork();
            }}
            style={{
              marginLeft: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: '#032E63',
              backgroundColor:
                selector?.searchpartner.length > 0 ? '#032E63' : 'white',
              borderRadius: 30,
              width: wp(42),
              height: hp(6),
            }}>
            <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>
              Add To Network
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: '5%', flex: 1}}>
          <View style={{flex: 1}}>
            <FlatList
              data={selector?.searchpartner}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    'clal';
                  }}
                  style={styles.list}>
                  <View style={{}}>
                    <View style={{flexDirection: 'row'}}>
                      <CheckBox
                        value={check.includes(item.SrNo)}
                        onChange={() => handleOnCheck(item.SrNo)}
                      />
                      <Text
                        style={{
                          width: '100%',
                          fontWeight: '600',
                          fontSize: 18,
                          marginLeft: 10,
                        }}>
                        {item.CompanyName}
                      </Text>
                    </View>
                    <Text
                      style={{
                        width: '100%',
                        fontWeight: '400',
                        fontSize: 18,
                        marginLeft: 10,
                        marginTop: 5,
                      }}>
                      {item.BillingContactEmail}
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 10,
                        marginTop: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          marginRight: 10,
                        }}>
                        City :{' '}
                        <Text style={{fontWeight: '400'}}>
                          {item.city_name}{' '}
                        </Text>
                      </Text>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        State :{' '}
                        <Text style={{fontWeight: '400'}}>
                          {item.state_name}{' '}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  {/* <View style={{width: '16%', height: 58}}>
                    <TouchableOpacity
                      onPress={() => {
                        addPatnerTonetwork(item.SrNo);
                      }}
                      style={{
                        backgroundColor: '#51b6f5',

                        height: '100%',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Feather name="user-plus" size={35} color={'#fff'} />
                    </TouchableOpacity>
                  </View> */}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>

      {/* <TouchableOpacity
        style={{
          position: 'absolute',
          backgroundColor: '#032e63',
          bottom: 35,
          alignItems: 'center',
          justifyContent: 'center',

          borderRadius: 40,
          right: 25,
          height: hp(10),
          width: wp(20),
        }}>
        <Ionicons name="chatbubbles-outline" size={45} color={'white'} />
      </TouchableOpacity> */}
    </View>
  );
};
export default ListOfRetailer;
