import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Loader from '../../../components/Loader';
import styles from './styles';
import {Table, TableWrapper, Row} from 'react-native-table-component';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyNetworkList = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const navigation = useNavigation();
  const selector = useSelector(state => state.Home.SearchMyNetworkList);
  const isFetching = useSelector(state => state.Home.isFetching);
  const [arr, setArr] = useState([]);
  const isFocuse = useIsFocused();
  useEffect(() => {
    myNetworkList();
  }, [isFocuse]);

  const dispatch = useDispatch();

  const myNetworkList = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    dispatch({
      type: 'Search_MyNetwork_Request',
      url: '/getNetworkRetailer',
      userId: user_id,
      role: '6',
    });
  };

  return (
    <View style={{flex: 1}}>
      {isFetching ? <Loader /> : null}

      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '800',
            color: '#032E63',
            marginLeft: 10,
            marginVertical: 10,
          }}>
          My Network
        </Text>

        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={selector}
            renderItem={({item}) => (
              <View
                style={{
                  backgroundColor: '#F4F5FC',
                  marginHorizontal: 10,
                  marginVertical: 10,

                  padding: 5,
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.34,
                  shadowRadius: 6.27,

                  elevation: 10,
                }}>
                <View style={styles.txt}>
                  <Text style={{fontSize: 16, fontWeight: '700', width: '35%'}}>
                    Retailer Name
                  </Text>
                    <Text style={{marginHorizontal:10}}>:</Text>
                  <Text style={{width: '60%', fontSize: 16}}>
                    {item.CompanyName}
                  </Text>
                </View>
                <View style={styles.txt}>
                  <Text style={{fontSize: 16, fontWeight: '700', width: '35%'}}>
                    City
                  </Text>
                    <Text style={{marginHorizontal:10}}>:</Text>
                  <Text style={{width: '60%', fontSize: 16}}>
                    {item.CityName}
                  </Text>
                </View>
                <View style={styles.txt}>
                  <Text style={{fontSize: 16, fontWeight: '700', width: '35%'}}>
                    State
                  </Text>
                    <Text style={{marginHorizontal:10}}>:</Text>
                  <Text style={{width: '60%', fontSize: 16}}>
                    {item.StateName}
                  </Text>
                </View>
                <View style={styles.txt}>
                  <Text style={{fontSize: 16, fontWeight: '700', width: '35%'}}>
                    Assign Category
                  </Text>
                    <Text style={{marginHorizontal:10}}>:</Text>
                  <Text style={{width: '60%', fontSize: 16}}>
                    {item.CategoryType}
                  </Text>
                </View>
                <View style={styles.txt}>
                  <Text style={{fontSize: 16, fontWeight: '700', width: '35%'}}>
                    Is products show on Retailer s App{' '}
                  </Text>
                    <Text style={{marginHorizontal:10}}>:</Text>
                  <Text style={{width: '60%', fontSize: 16}}>
                    {item.IsShowInRetailerApp}
                  </Text>
                </View>
                <View style={styles.txt}>
                  <Text style={{fontSize: 16, fontWeight: '700', width: '35%'}}>
                    Status
                  </Text>
                    <Text style={{marginHorizontal:10}}>:</Text>
                  <Text style={{width: '60%', fontSize: 16}}>
                    {item.Status}
                  </Text>
                </View>
                <View style={styles.txt}>
                  <Text style={{fontSize: 16, fontWeight: '700', width: '35%'}}>
                    Action
                  </Text>
                    <Text style={{marginHorizontal:10}}>:</Text>
                  <TouchableOpacity style={{width: '60%'}}>
                    <Text
                      style={{
                        width: '60%',
                        color: 'blue',
                        fontWeight: '700',
                        fontSize: 16,
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
export default MyNetworkList;
