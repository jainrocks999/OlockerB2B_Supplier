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
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import Loader from '../../../components/Loader';
import {Table, TableWrapper, Row} from 'react-native-table-component';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const ListOfRetailer = () => {
  const navigation = useNavigation();

  const isFetching = useSelector(state => state.Home.isFetching);
  const selector = useSelector(state => state.Home.SearchRetailerList);
console.log(selector);
  let SubtableHead = ['S.No', 'Company Name', 'State', 'City'];
  let SubwidthArr = [80, 120, 120, 120];


  return (
    <View style={{flex: 1}}>
      {isFetching ? <Loader /> : null}

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
                        Sr No 
                      </Text>
                      <Text>:</Text>
                      <Text style={{width: '60%'}}>{ item.SrNo}</Text>
                    </View>
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
                      <Text style={{width: '60%'}}>{item.city_name}</Text>
                    </View>
                    <View style={styles.txt}>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        State
                      </Text>
                      <Text>:</Text>
                      <Text style={{width: '60%'}}>{ item.state_name}</Text>
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
      <View contentContainerStyle={{}}>
        <View
          style={{height: hp(5), justifyContent: 'center', marginTop: hp(3)}}>
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
        <View style={{marginTop: '5%'}}>
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
                      <View>
                        <CheckBox />
                      </View>
                    <View style={styles.txt}>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        Sr No 
                      </Text>
                      <Text>:</Text>
                      <Text style={{width: '60%'}}>{ item.SrNo}</Text>
                    </View>
                    <View style={styles.txt}>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        Company Name 
                      </Text>
                      <Text>:</Text>
                      <Text style={{width: '60%'}}>{item.CompanyName}</Text>
                    </View>
                    <View style={styles.txt}>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        City
                      </Text>
                      <Text>:</Text>
                      <Text style={{width: '60%'}}>{item.city_name}</Text>
                    </View>
                    <View style={styles.txt}>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        State
                      </Text>
                      <Text>:</Text>
                      <Text style={{width: '60%'}}>{ item.state_name}</Text>
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

const data = [
  ['01', 'Rohan sahu', 'MP', 'Indore', 'Lorem', 'lorem', 'pending', 'pending'],
  ['01', 'Rohan sahu', 'MP', 'Indore', 'Lorem', 'lorem', 'pending', 'pending'],
  ['01', 'Rohan sahu', 'MP', 'Indore', 'Lorem', 'lorem', 'pending', 'pending'],
  ['01', 'Rohan sahu', 'MP', 'Indore', 'Lorem', 'lorem', 'pending', 'pending'],
];
