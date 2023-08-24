import React, {useState,useEffect} from 'react';
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

import CheckBox from '@react-native-community/checkbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInput} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Table, TableWrapper, Row} from 'react-native-table-component';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InviteRetailerList = () => {
  const navigation = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [value, setValue] = useState(null);
  const isFetching = useSelector(state => state.Home.isFetching);
  let tableHead = [
    'S.No',
    'Retailer Name',
    'EmailId',
    'Location',
    'Category type',
    'Contact Person Name',
    'Contact Number',
  ];
  let widthArr = [80, 120, 200, 120, 120, 200, 140];

  const selector = useSelector(state => state.Home.inviteRetailer);

  const isFocuse = useIsFocused();
  useEffect(() => {
    RetailerReques();
    
  }, [isFocuse]);

 

  const dispatch = useDispatch();

  const RetailerReques = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    dispatch({
      type: 'Invite_RetailerList',
      url: '/inviteRetailerList',
      userId: user_id,
      role: '6',
    });
  };

  return (
    <View style={{flex: 1}}>
       {isFetching ? <Loader /> : null}
      <View contentContainerStyle={{}}>
     


        <View style={{}}>
          <Text style={{fontSize:22,fontWeight:'800',color:'#032E63',marginLeft:10,marginVertical:10}}>Invite Retailers List</Text>
          <ScrollView horizontal={true}>
            <View>
              <Table>
                <Row
                  data={tableHead}
                  widthArr={widthArr}
                  style={styles.header}
                  textStyle={{
                    fontWeight: '800',
                    fontSize: 16,
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
                          item.CategoryType,
                          item.IsShowInRetailerApp,
                          item.Status,
                          'Remove',
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
      </View>

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
export default InviteRetailerList;

const data = [
  ['01', 'tested', 'supplierTest@gmail.com', 'Indore', 'Category B', 'teste', '123456789'],
  ['01', 'tested', 'supplierTest@gmail.com', 'Indore', 'Category B', 'teste', '123456789'],
  ['01', 'tested', 'supplierTest@gmail.com', 'Indore', 'Category B', 'teste', '123456789'],
 

];

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
