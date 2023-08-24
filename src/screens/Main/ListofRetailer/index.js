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

  let SubtableHead = ['S.No', 'Company Name', 'State', 'City'];
  let SubwidthArr = [80, 120, 120, 120];
  let tableHead = [
    'S.No',
    'Retailer Name',
    'State',
    'City',
    'Assign Category',
    'Is products show on Retailer s App',
    'Status',
    'Action',
  ];
  let widthArr = [80, 120, 120, 120, 120, 200, 120, 120];
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
        <ScrollView horizontal={true}>
          <View>
            <Table>
              <Row
                data={tableHead}
                widthArr={widthArr}
                style={styles.header}
                textStyle={{
                  fontWeight: '800',
                  fontSize: 18,
                  color: '#fff',
                  marginLeft: 15,
                }}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <FlatList
                data={selector}
                renderItem={({item}) => (
                  <Table
                    borderStyle={{borderWidth: 1}}
                    style={{alignItems: 'center'}}>
                    <Row
                      data={[
                        item.SrNo,
                        item.CompanyName,
                        item.state_name,
                        item.city_name,
                      ]}
                      widthArr={widthArr}
                      style={{height: 45}}
                      textStyle={{
                        fontWeight: '700',
                        fontSize: 16,
                        marginLeft: 15,
                      }}
                    />
                  </Table>
                )}
              />
            </ScrollView>
          </View>
        </ScrollView>
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
          <ScrollView horizontal={true}>
            <View>
              <Table>
                <Row
                  data={SubtableHead}
                  widthArr={SubwidthArr}
                  style={styles.header}
                  textStyle={{
                    fontWeight: '800',
                    fontSize: 18,
                    color: '#fff',
                    marginLeft: 15,
                  }}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <FlatList
                  data={selector}
                  renderItem={({item}) => (
                    <Table
                      borderStyle={{borderWidth: 1}}
                      style={{alignItems: 'center'}}>
                      <Row
                        data={[
                          item.SrNo,
                          item.CompanyName,
                          item.state_name,
                          item.city_name,
                        ]}
                        widthArr={SubwidthArr}
                        //style={styles.header}
                        textStyle={{
                          fontWeight: '700',
                          fontSize: 16,
                          marginLeft: 15,
                        }}
                      />
                    </Table>
                  )}
                />
              </ScrollView>
            </View>
          </ScrollView>
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
