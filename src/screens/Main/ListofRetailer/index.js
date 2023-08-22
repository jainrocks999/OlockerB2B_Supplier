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
import {Table, TableWrapper, Row} from 'react-native-table-component';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const ListOfRetailer = () => {
  const navigation = useNavigation();
  const [arr, setArr] = useState([]);

  const selector = useSelector(state => state.Home.SearchRetailerList);

  const isFocuse = useIsFocused();
  useEffect(() => {
    getDetails();
  }, [isFocuse]);

  const getDetails = () => {
    selector?.map(item => {
      arr.push([item.SrNo, item.CompanyName, item.state_name, item.city_name]);
    });
  };

  let SubtableHead = ['S.No', 'Company Name', 'State', 'City'];
  let SubwidthArr = [80, 120, 120, 120];

  return (
    <View style={{flex: 1}}>
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
                  data={arr}
                  renderItem={({item}) => (
                    <Table
                      borderStyle={{borderWidth: 1}}
                      style={{alignItems: 'center'}}>
                      <Row
                        data={item}
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
