import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  FlatList,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import StatusBar from '../../../components/StatusBar';
import styles from './style';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';
import axios from 'axios';
import {RadioButton} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';

const Addproduct = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const isFetching = useSelector(state => state.City.isFetching);
  const stateList1 = useSelector(state => state.State.StateList);
  const stateList = stateList1?.satates;
  const cityList1 = useSelector(state => state.City.CityList);
  const cityList = cityList1?.cities;


  const manageState = val => {
    setState(val);
    console.log('thhis ', val);
    dispatch({
      type: 'City_List_Request',
      url: '/getCities',
      stateId: val,
    });
  };

const reset=()=>{
  setCity('');
  setState('')
  setSearch('')
}
  return (
    <View style={{flex: 1}}>
      <StatusBar />
      {fetching || isFetching ? <Loader /> : null}
      <View
        style={{
          backgroundColor: '#032e63',
          height: 50,
          width: '100%',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{paddingHorizontal: 5}}>
            <Image
              style={{height: 20, width: 14}}
              source={require('../../../assets/L.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontFamily: 'Roboto-Medium',
              marginLeft: 14,
            }}>
            Search Retailer's
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{height: 24, width: 28}}
            source={require('../../../assets/Fo.png')}
          />
          <Image
            style={{height: 22, width: 26, tintColor: '#fff', marginLeft: 15}}
            source={require('../../../assets/Image/dil.png')}
          />
          <Image
            style={{height: 24, width: 28, tintColor: '#fff', marginLeft: 15}}
            source={require('../../../assets/supplierImage/more.png')}
          />
        </View>
      </View>
      <ScrollView>
        <View style={{paddingHorizontal: 12, marginTop: 20}}>
          <View
            style={{
              width: '100%',
              borderWidth: 1,
              marginTop: 15,
              height: 40,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 15,
            }}>
            <TextInput
              placeholder="Enter Retailer Name"
              style={{paddingLeft: 10}}
              placeholderTextColor={'#787676'}
              value={search}
              onChangeText={val => setSearch(val)}
            />
            <Image
              style={{height: 20, width: 28}}
              source={require('../../../assets/Image/serch.png')}
            />
          </View>
          <View style={{marginTop: 15}}>
            <Text
              style={{
                fontSize: 15,
                color: '#23233C',
                fontFamily: 'Roboto-Medium',
              }}>
              State
            </Text>

            <View>
              <Dropdown
                style={[
                  styles.dropdown,
                  {borderWidth: 1, borderColor: '#979998'},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={stateList}
                inputSearchStyle={{
                  borderRadius:10,
                  backgroundColor:'#f0f0f0'
                }}
                searchPlaceholder='search..'
                maxHeight={250}
                search
                labelField="label"
                valueField="value"
                placeholder="state"
                value={state}
                onChange={item => {
                  manageState(item?.value);
                }}
              />
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <Text
              style={{
                fontSize: 15,
                color: '#23233C',
                fontFamily: 'Roboto-Medium',
              }}>
              City
            </Text>

            <View>
              <Dropdown
           
                style={[
                  styles.dropdown,
                  {borderWidth: 1, borderColor: '#979998'},
                ]}
                search
                searchPlaceholder='search..'
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={cityList ? cityList : []}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="City"
                value={city}
                onChange={item => {
                  setCity(item.value);
                }}
                inputSearchStyle={{
                  borderRadius:10,
                  backgroundColor:'#f0f0f0'
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <TouchableOpacity
              // onPress={()=>uploadPhoto()}
              style={{
                borderWidth: 1,
                width: '48%',
                backgroundColor: '#032e63',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 7,
                borderRadius: 15,
              }}>
              <Text style={{color: '#fff', fontFamily: 'Roboto-Medium'}}>
                Search
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
              reset()
            }}
              style={{
                borderWidth: 1,
                backgroundColor: '#032e63',
                width: '48%',
                borderColor: '#032e63',
                alignItems: 'center',
                justifyContent: 'center',
             
                paddingVertical: 7,
                borderRadius: 15,
              }}>
              <Text style={{color: '#fff', fontFamily: 'Roboto-Medium'}}>
                Reset
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={{
                width: '100%',
                borderWidth: 1,
                backgroundColor: '#032E63',
                height: 45,
                borderRadius: 20,
                marginTop: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontFamily: 'Roboto-Bold', color: '#fff'}}>
                Invite retailers to network
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{borderWidth: 0.2, marginTop: 20}} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <TouchableOpacity
               onPress={()=> navigation.navigate('myNetworkBtn',{data:'List'})}
              style={styles.btn}>
              <Text style={{color: '#fff', fontFamily: 'Roboto-Medium'}}>
                List Of Retailer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
                      onPress={()=>navigation.navigate('myNetworkBtn',{data:'Network'})}
              style={styles.btn}>
              <Text style={{color: '#fff', fontFamily: 'Roboto-Medium'}}>
                My Network
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <TouchableOpacity
             onPress={()=>navigation.navigate('myNetworkBtn',{data:'Request'})}
              style={styles.btn}>
              <Text style={{color: '#fff', fontFamily: 'Roboto-Medium'}}>
                Retailer Request List
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
                      onPress={()=>navigation.navigate('myNetworkBtn',{data:'invite'})}
              style={styles.btn}>
              <Text style={{color: '#fff', fontFamily: 'Roboto-Medium'}}>
                Invite Retailers List
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: 50}} />
      </ScrollView>
    </View>
  );
};
export default Addproduct;

const Status = [
  {label: 'Active', value: 'true'},
  {label: 'In Active', value: 'false'},
];

const data = [
  {name: 'narr'},
  {name: 'dgsadf'},
  {name: 'narr'},
  {name: 'dgsadf'},
];
