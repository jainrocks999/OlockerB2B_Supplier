import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../../../components/Loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Table, TableWrapper, Row} from 'react-native-table-component';
import {TextInput} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AssignCategory from '../Modal/assigncategoryModal';

const RetailerRequestList = () => {
  const navigation = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [value, setValue] = useState(0);
  const isFetching = useSelector(state => state.Home.isFetching);
  const [AssignModal, setAssignModal] = useState(false);
  const [data, setData] = useState(false);
  const AssiGnModal = useSelector(state => state.Supplier.AssiGnModal);
  useEffect(() => {
    setAssignModal(false);
  }, [AssiGnModal]);
  const sendData = item => {
    setData(item);
    setAssignModal(true);
  };

  const selector = useSelector(state => state.Home.RetailerRequestList);
  const isFetching2 = useSelector(state => state.Auth.isFetching);
  const isFocuse = useIsFocused();
  useEffect(() => {
    RetailerReques();
  }, [isFocuse]);
 const Previous =(id)=>{

 let idd=id-1;
 setValue(idd);

 }
  const dispatch = useDispatch();

  const RetailerReques = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    dispatch({
      type: 'Retailer_RequestList',
      url: '/getReatilerRequest',
      userId: user_id,
     userRole:'6',
    });
  };

  const removeRetailer = async(item) => {
    const userId = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'remove_retailerfromnetwork_Request',
      url:'removeNetworkPartner',
      // url: 'removepartner',
      SupplierSrNo: userId,
      partner_id: item?.PartnerSrNo,
      // data2,
      userId: userId,
      reatailer:false
    });
  };

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      {isFetching || isFetching2 ? <Loader /> : null}
      <AssignCategory
        visi={AssignModal}
        data={data}
        close={() => setAssignModal(false)}
      />
      <ScrollView contentContainerStyle={{}}>
        <View style={styles.searchbar}>
          <TextInput
            placeholder="Search"
            style={{fontSize: 18, color: 'black'}}
            placeholderTextColor={'grey'}
          />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Feather name="search" size={wp(6)} color="grey" />
          </View>
        </View>

        <View style={{marginHorizontal: 10}}>
          <Text style={{fontSize: wp(5), fontWeight: '600', color: '#000'}}>
            Show
          </Text>

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={DropData}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            value={DropData[value]}
            onChange={item => {
               setValue(item.value)
            }}
            renderItem={renderItem}
          />
        </View>

        <View style={{}}>
          <Text
            style={{
              fontSize: wp(5),
              fontWeight: '800',
              color: '#032E63',
              marginLeft: 10,
              marginVertical: 15,
            }}>
            Retailer Request List
          </Text>

          <View>
            <FlatList
              data={selector}
              renderItem={({item}) => (
                <View
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 6,
                    },
                    marginVertical: wp(1),
                    shadowOpacity: 0.39,
                    shadowRadius: 8.3,
                    elevation: 13,
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginHorizontal: wp(3),
                    paddingVertical: wp(2),
                    //  paddingLeft: wp(2),
                  }}>
                  <View style={{marginLeft: wp(3)}}>
                    <View style={{flexDirection: 'row'}}>
                     
                      <Text style={styles.txt1}>CompanyName</Text>
                      <Text style={styles.txt2}>
                        {':    '}
                        {item.CompanyName}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.txt1}>City</Text>
                      <Text style={styles.txt2}>
                        {':     '}
                        {item.city_name}{' '}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.txt1}>State</Text>
                      <Text style={styles.txt2}>
                        {':    '}
                        {item.state_name}{' '}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.txt1}>Assign Category</Text>
                      <Text style={styles.txt2}>
                        {':    '} {item.CategoryType}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.txt1}>
                        Is Product Show in RetailerApp{' '}
                      </Text>
                      <Text style={styles.txt2}>
                        {':    '}
                        {item.IsShowInRetailerApp == 1 ? 'Yes' : 'No'}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.txt1}>Status</Text>
                      <Text style={styles.txt2}>
                        {':    '}

                        
  
                        {item.Status == 3 ? 'Pending' : item.Status==1?'Approved':'Reject'}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '60%',
                      }}>
                      <TouchableOpacity
                        style={{width: '80%', marginLeft: 10}}
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
                          fontSize: wp(6),
                          color: '#000',
                          marginHorizontal: 5,
                        }}>
                        |
                      </Text>
                      <TouchableOpacity
                        onPress={()=>removeRetailer(item)}
                      style={{width: '60%', marginLeft: 10}}>
                        <Text
                          style={{
                            fontSize: wp(4.5),
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

        <View
          style={{
            flexDirection: 'row',
            marginBottom: 0,
            marginTop: 50,
            marginHorizontal: 10, alignSelf:'flex-end'
          }}>
          <TouchableOpacity onPress={()=>setValue(value-1)}
            style={{
              borderWidth: 2,
              paddingVertical: 5,
              borderRadius: 15,
              paddingHorizontal: 15,
              borderColor: '#032E63',
              backgroundColor: '#032E63',marginRight:5
            }}>
            <Text style={{color: 'white'}}>Prev</Text>
          </TouchableOpacity>
          {/* <View style={{}}>
            <FlatList
              data={DropData}
              horizontal
              renderItem={({item}) => (
                <View
                  style={{
                    height: 30,
                    width: 30,
                    backgroundColor: '#032E63',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: 5,
                    borderRadius: 15,
                  }}>
                  <Text style={{color: 'white'}}>{item.label}</Text>
                </View>
              )}
            />
          </View> */}
          <TouchableOpacity onPress={()=>setValue(value+1)}
            style={{
              borderWidth: 2,
              paddingVertical: 5,
              borderRadius: 15,
              paddingHorizontal: 15,
              borderColor: '#032E63',
              backgroundColor: '#032E63',
            }}>
            <Text style={{color: 'white'}}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* <TouchableOpacity
        style={{
          position: 'absolute',
          backgroundColor: '#032e63',
          bottom: 15,
          alignItems: 'center',
          justifyContent: 'center',

          borderRadius: 40,
          right: 25,
          height: hp(9),
          width: wp(18),
        }}>
        <Ionicons name="chatbubbles-outline" size={45} color={'white'} />
      </TouchableOpacity> */}
    </View>
  );
};
export default RetailerRequestList;

const DropData = [
  {label: '10', value: '1'},
  {label: '25', value: '2'},
  {label: '50', value: '3'},
  {label: '75', value: '4'},
  {label: '100', value: '5'},
];

const page = [
  {
    number: '1',
  },
  {
    number: '2',
  },
  {
    number: '3',
  },
  {
    number: '4',
  },
  {
    number: '5',
  },
];
