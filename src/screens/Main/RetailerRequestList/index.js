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

const RetailerRequestList = () => {
  const navigation = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [value, setValue] = useState(null);
  const isFetching = useSelector(state => state.Home.isFetching);



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
    <View style={{flex: 1}}>
      {isFetching ? <Loader /> : null}
      <ScrollView contentContainerStyle={{}}>
        <View style={styles.searchbar}>
          <TextInput placeholder="Search" style={{fontSize: 18}} />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Feather name="search" size={30} />
          </View>
        </View>

        <View style={{marginHorizontal: 10}}>
          <Text style={{fontSize: 18, fontWeight: '600', color: '#000'}}>
            Show
          </Text>

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={DropData}
            maxHeight={250}
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
              fontSize: 20,
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
                      borderWidth: 1,
                      marginVertical: 10,
                      marginHorizontal:10,
                      padding: 5,
                      borderRadius: 10,
                    }}>
                    <View style={styles.txt}>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        Retailer Name 
                      </Text>
                      <Text>:</Text>
                      <Text style={{width: '60%'}}>{item.CompanyName}</Text>
                    </View>
                    <View style={styles.txt}>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        City
                      </Text>
                      <Text>:</Text>
                      <Text style={{width: '60%'}}>{item.CityName}</Text>
                    </View>
                    <View style={styles.txt}>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        State
                      </Text>
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
                      <Text
                        style={{fontSize: 16, fontWeight: '700', width: '40%'}}>
                        Is products show on Retailer s App{' '}
                      </Text>
                      <Text>:</Text>
                      <Text style={{width: '60%'}}>
                        {item.IsShowInRetailerApp}
                      </Text>
                    </View>
                    <View style={styles.txt}>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        Status 
                      </Text>
                      <Text>:</Text>
                      <Text style={{width: '60%'}}>{item.Status}</Text>
                    </View>
                    <View style={styles.txt}>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        Action 
                      </Text>
                      <Text>:</Text>
                      <TouchableOpacity style={{width: '60%',
                      
                    }}>
                        <Text
                          style={{
                            width: '60%',
                            color: 'blue',
                            fontWeight: '700',
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
            <Text style={{color: 'white'}}>Prev</Text>
          </TouchableOpacity>
          <View style={{}}>
            <FlatList
              data={page}
              horizontal
              renderItem={({item}) => (
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
                  <Text style={{color: 'white'}}>{item.number}</Text>
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
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
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

