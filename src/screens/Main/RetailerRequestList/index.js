import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../../../components/Loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { TextInput } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AssignCategory from '../Modal/assigncategoryModal';

const RetailerRequestList = () => {
  const navigation = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [value, setValue] = useState(null);
  const isFetching = useSelector(state => state.Home.isFetching);
  const [AssignModal, setAssignModal] = useState(false);
  const [data, setData] = useState(false);
  const AssiGnModal = useSelector(state => state.Supplier.AssiGnModal)
  useEffect(() => {
    setAssignModal(false)
  }, [AssiGnModal])
  const sendData = item => {
    setData(item);
    setAssignModal(true);
  };


  const selector = useSelector(state => state.Home.RetailerRequestList);

  const isFocuse = useIsFocused();
  useEffect(() => {
    RetailerReques();
  }, [isFocuse]);

  const dispatch = useDispatch();

  const RetailerReques = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    dispatch({
      type: 'Retailer_RequestList',
      url: '/getReatilerRequest',
      userId: user_id,
      role: '6',
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
    <View style={{ flex: 1 }}>
      {isFetching ? <Loader /> : null}
      <AssignCategory
        visi={AssignModal}
        data={data}
        close={() => setAssignModal(false)}
      />
      <ScrollView contentContainerStyle={{}}>
        <View style={styles.searchbar}>
          <TextInput placeholder="Search" style={{ fontSize: 18 }} />
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Feather name="search" size={wp(6)} />
          </View>
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <Text style={{ fontSize: wp(5), fontWeight: '600', color: '#000' }}>
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
            value={value}
            onChange={item => {
              setValue(item.value);
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
              renderItem={({ item }) => (
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
                    marginHorizontal: 5,
                    paddingVertical: wp(2),
                    paddingLeft: wp(2)

                  }}>
                  <View>
                    {console.log(item)}
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: wp(4.5),
                        marginLeft: 10,
                      }}>
                      CompanyName :
                      <Text
                        style={{
                          fontWeight: '500',
                          fontSize: wp(4.5),
                        }}>
                        {' '}
                        {item.CompanyName}
                      </Text>
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 10,
                        marginTop: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: wp(4.5),
                          fontWeight: '700',
                          marginRight: 10,
                        }}>
                        City :
                        <Text style={{ fontWeight: '400' }}> {item.city_name} </Text>
                      </Text>
                      <Text style={{ fontSize: wp(4.5), fontWeight: '700' }}>
                        State :
                        <Text style={{ fontWeight: '400' }}>
                          {' '}
                          {item.state_name}{' '}
                        </Text>
                      </Text>
                    </View>
                    <View style={{ marginLeft: 10, marginTop: 5 }}>
                      <Text style={{ fontSize: wp(4.5), fontWeight: '700' }}>
                        Assign Category :
                        <Text style={{ width: '60%' }}> {item.CategoryType}</Text>
                      </Text>
                    </View>
                    <View style={{ marginLeft: 10, flexDirection: 'row', marginTop: 5 }}>
                      <Text style={{ fontSize: wp(4.5), fontWeight: '700' }}>
                        IsShowInRetailerApp :
                        <Text style={{ width: '60%', fontWeight: '400' }}>
                          {' '}
                          {item.IsShowInRetailerApp}
                        </Text>
                      </Text>
                      <Text
                        style={{ fontSize: wp(4.5), fontWeight: '700', marginLeft: 10 }}>
                        Status :
                        <Text style={{ width: '60%', fontWeight: '400' }}>
                          {' '}
                          {item.Status}
                        </Text>
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 10,
                        marginTop: 5,
                      }}>
                      <Text style={{ fontSize: wp(4.5), fontWeight: '700' }}>
                        Action :{' '}
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: '60%',
                        }}>
                        <TouchableOpacity
                          style={{ width: '80%', marginLeft: 10 }}
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
                        <TouchableOpacity style={{ width: '60%', marginLeft: 10 }}>
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
            marginHorizontal: 10,
          }}>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              paddingVertical: 5,
              borderRadius: 15,
              paddingHorizontal: 15,
              borderColor: '#032E63',
              backgroundColor: '#032E63',
            }}>
            <Text style={{ color: 'white' }}>Prev</Text>
          </TouchableOpacity>
          <View style={{}}>
            <FlatList
              data={page}
              horizontal
              renderItem={({ item }) => (
                <View
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: '#032E63',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: 5,
                    borderRadius: 20,
                  }}>
                  <Text style={{ color: 'white' }}>{item.number}</Text>
                </View>
              )}
            />
          </View>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              paddingVertical: 5,
              borderRadius: 15,
              paddingHorizontal: 15,
              borderColor: '#032E63',
              backgroundColor: '#032E63',
            }}>
            <Text style={{ color: 'white' }}>Next</Text>
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
  { label: '10', value: '1' },
  { label: '25', value: '2' },
  { label: '50', value: '3' },
  { label: '75', value: '4' },
  { label: '100', value: '5' },

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

