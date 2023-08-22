import React, {useState} from 'react';
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
import {Table, TableWrapper, Row} from 'react-native-table-component';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const MyNetworkList = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const navigation = useNavigation();
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
      <View >
      

       
        <View style={{}}>
        <Text style={{fontSize:20,fontWeight:'800',color:'#032E63',marginLeft:10,marginVertical:10}}>My Network</Text>
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
                  data={data}
                  renderItem={({item}) => (
                    <Table
                      borderStyle={{borderWidth:1}}
                      style={{alignItems: 'center'}}>
                      <Row
                        data={item}
                        widthArr={widthArr}
                        style={{height:45}}
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
export default MyNetworkList;

const data = [
  [
  '01',
   'Rohan sahu',
     'MP',
  'Indore',
   'Lorem',
    'lorem',
    'pending',
    'pending'
],
  [
  '01',
   'Rohan sahu',
     'MP',
  'Indore',
   'Lorem',
    'lorem',
    'pending',
    'pending'
],
  [
  '01',
   'Rohan sahu',
     'MP',
  'Indore',
   'Lorem',
    'lorem',
    'pending',
    'pending'
],
  [
  '01',
   'Rohan sahu',
     'MP',
  'Indore',
   'Lorem',
    'lorem',
    'pending',
    'pending'
],
 

 
];
