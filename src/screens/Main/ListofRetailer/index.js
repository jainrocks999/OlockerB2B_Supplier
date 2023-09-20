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
import CheckBox from '@react-native-community/checkbox';
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
const ListOfRetailer = () => {
  const navigation = useNavigation();

  const isFetching = useSelector(state => state.Home.isFetching);
  const selector = useSelector(state => state.Home.SearchRetailerList);
  const [AssignModal, setAssignModal] = useState(false);
  const [data, setData] = useState(false);
  let SubtableHead = ['S.No', 'Company Name', 'State', 'City'];
  let SubwidthArr = [80, 120, 120, 120];

  const sendData = item => {
    setData(item);
    setAssignModal(true);
  };
  const dispatch = useDispatch();

  const addPatnerTonetwork = async (id) => {
    const user_id = AsyncStorage.getItem('user_id');
    const Token = await AsyncStorage.getItem('loginToken');

    dispatch({
      type: 'Addnetwork_toPatner_Request',
      url: '/addtoNetwork',
      userId: parseInt(user_id._j),
      id:id,
      token: Token,
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
            fontSize: 18,
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
                  borderWidth: 1,
                  marginVertical: 10,
                  marginHorizontal: 10,
                  padding: 5,
                  borderRadius: 10,
                }}>
                <View style={styles.txt}>
                  <Text style={{fontSize: 16, fontWeight: '700'}}>Sr No</Text>
                  <Text>:</Text>
                  <Text style={{width: '60%'}}>{item.SrNo}</Text>
                </View>
                <View style={styles.txt}>
                  <Text style={{fontSize: 16, fontWeight: '700'}}>
                    Retailer Name
                  </Text>
                  <Text>:</Text>
                  <Text style={{width: '60%'}}>{item.CompanyName}</Text>
                </View>
                <View style={styles.txt}>
                  <Text style={{fontSize: 16, fontWeight: '700'}}>City</Text>
                  <Text>:</Text>
                  <Text style={{width: '60%'}}>{item.CityName}</Text>
                </View>
                <View style={styles.txt}>
                  <Text style={{fontSize: 16, fontWeight: '700'}}>State</Text>
                  <Text>:</Text>
                  <Text style={{width: '60%'}}>{item.StateName}</Text>
                </View>
                <View style={styles.txt}>
                  <Text style={{fontSize: 16, fontWeight: '700'}}>
                    Assign Category
                  </Text>
                  <Text>:</Text>
                  <Text style={{width: '60%'}}>{item.CategoryType}</Text>
                </View>
                <View style={styles.txt}>
                  <Text style={{fontSize: 16, fontWeight: '700', width: '35%'}}>
                    Is products show on Retailer s App{' '}
                  </Text>
                  <Text>:</Text>
                  <Text style={{width: '60%'}}>{item.IsShowInRetailerApp}</Text>
                </View>
                <View style={styles.txt}>
                  <Text style={{fontSize: 16, fontWeight: '700'}}>Status</Text>
                  <Text>:</Text>
                  <Text style={{width: '60%'}}>{item.Status}</Text>
                </View>
                <View style={styles.txt}>
                  <Text style={{fontSize: 16, fontWeight: '700'}}>Action</Text>
                  <Text>:</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '60%',
                    }}>
                    <TouchableOpacity
                      style={{width: '50%'}}
                      onPress={() => {
                        sendData(item);
                      }}>
                      <Text
                        style={{
                          color: 'blue',
                          fontWeight: '700',
                        }}>
                        Update Status & Assign Category
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 24,
                        color: '#000',
                        marginHorizontal: 5,
                      }}>
                      |
                    </Text>
                    <TouchableOpacity style={{width: '60%'}}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'blue',
                          fontWeight: '700',
                        }}>
                        Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <View contentContainerStyle={{}}>
        <View
          style={{height: hp(5), justifyContent: 'center', marginTop: hp(3)}}>
          <View
            style={{
              marginLeft: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: '#032E63',
              backgroundColor: '#032E63',
              borderRadius: 30,
              width: wp(42),
              height: hp(6),
            }}>
            <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>
              Add To Network
            </Text>
          </View>
        </View>
        <View style={{marginTop: '5%'}}>
          <View>
            <FlatList
              data={selector?.searchpartner}
              renderItem={({item}) => (
                <View
                  style={{
                    borderWidth: 1,
                    marginVertical: 10,
                    marginHorizontal: 10,
                    padding: 5,
                    borderRadius: 10,
                  }}>
                  <View style={{alignItems:'flex-end'}}>
                    <TouchableOpacity
onPress={()=>{
  addPatnerTonetwork(item.SrNo)
}}

                      style={{
                        backgroundColor: '#51b6f5',
                        height: 48,
                        width: '15%',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Feather name="user-plus" size={35} color={'#fff'} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.txt}>
                    <Text style={{fontSize: 16, fontWeight: '700'}}>Sr No</Text>
                    <Text>:</Text>
                    <Text style={{width: '60%'}}>{item.SrNo}</Text>
                  </View>
                  <View style={styles.txt}>
                    <Text style={{fontSize: 16, fontWeight: '700'}}>
                      Company Name
                    </Text>
                    <Text>:</Text>
                    <Text style={{width: '60%'}}>{item.CompanyName}</Text>
                  </View>
                  <View style={styles.txt}>
                    <Text style={{fontSize: 16, fontWeight: '700'}}>City</Text>
                    <Text>:</Text>
                    <Text style={{width: '60%'}}>{item.city_name}</Text>
                  </View>
                  <View style={styles.txt}>
                    <Text style={{fontSize: 16, fontWeight: '700'}}>State</Text>
                    <Text>:</Text>
                    <Text style={{width: '60%'}}>{item.state_name}</Text>
                  </View>
                </View>
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
