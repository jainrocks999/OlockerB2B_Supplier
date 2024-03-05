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

  const RemovePatner = async id => {
    const user_id = await AsyncStorage.getItem('user_id');

    dispatch({
      type: 'RemovePatner_Request',
      url: '/removepartner',
      Id: id,
    });
  };


  const supplierprofile = async( id) => {
    dispatch({
      type: 'get_networkretailerdetail_request',
      partnerId: id,
      url: 'getNetworkRetailerDeatils',
       navigation,
    });
  };

  return (
    <View style={{flex: 1}}>
      {isFetching ? <Loader /> : null}
      {selector != '' && (
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
                <TouchableOpacity
                  onPress={() =>supplierprofile(item?.PartnerSrNo) }
                    
                     
                    //  navigation.navigate('PatnerProfile')
                  
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
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        width: '35%',
                        color: 'black',
                      }}>
                      Retailer Name
                    </Text>
                    <Text style={{marginHorizontal: 10, color: 'grey'}}>:</Text>
                    <Text style={{width: '60%', fontSize: 16, color: 'grey'}}>
                      {item.CompanyName}
                    </Text>
                  </View>
                  <View style={styles.txt}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        width: '35%',
                        color: 'black',
                      }}>
                      City
                    </Text>
                    <Text style={{marginHorizontal: 10, color: 'grey'}}>:</Text>
                    <Text style={{width: '60%', fontSize: 16, color: 'grey'}}>
                      {item.CityName}
                    </Text>
                  </View>
                  <View style={styles.txt}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        width: '35%',
                        color: 'black',
                      }}>
                      State
                    </Text>
                    <Text style={{marginHorizontal: 10, color: 'grey'}}>:</Text>
                    <Text style={{width: '60%', fontSize: 16, color: 'grey'}}>
                      {item.StateName}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      )}
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
