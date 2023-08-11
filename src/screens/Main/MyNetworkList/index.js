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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const MyNetworkList = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
const navigation = useNavigation()

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{}}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => navigation.goBack()}>
              <Image
                style={styles.img}
                source={require('../../../assets/L.png')}
              />
            </TouchableOpacity>
            <Text style={[styles.text, {marginLeft: 15}]}>My Network</Text>
          </View>
          <View style={styles.headertouch}>
            <TouchableOpacity onPress={() => navigation.navigate('Message')}>
              <Image
                style={styles.img1}
                source={require('../../../assets/Fo.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 15}}
              onPress={() => handleWishList()}>
              <Image
                style={styles.img2}
                source={require('../../../assets/Image/dil.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Logout()}>
              <Image
                style={styles.img3}
                source={require('../../../assets/Image/menu-icon.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            height: hp(20),

            marginTop: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 10,
              marginHorizontal: 5,
            }}>
            <TouchableOpacity
               onPress={()=>navigation.navigate('ListOfRetailer')}
               
              style={{
                backgroundColor: '#032E63',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: '#032E63',
                borderRadius: 30,
                width: wp(42),
                height: hp(6),
              }}>
              <Text style={{fontSize: 16, fontWeight: '700',color: 'white'}}>
                List Of Retailer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>navigation.navigate('MyNetworkList')}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: '#032E63',
                
                borderRadius: 30,
                width: wp(42),
                height: hp(6),
              }}>
              <Text style={{fontSize: 16, fontWeight: '700', }}>
                My Network
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 10,
              marginHorizontal: 5,
            }}>
            <TouchableOpacity
          
               onPress={()=>navigation.navigate('RetailerRequestList')}
          
              style={{
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
                Retailer Request List
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
     
                  onPress={()=>navigation.navigate('InviteRetailerList')}
              style={{
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
                Invite Retailers List
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView horizontal>
          <View style={{flex: 1, width: wp(100)}}>
            <View style={styles.row}>
              <Text style={styles.cell}>S.No</Text>
              <Text style={styles.cell}>Retailer Name</Text>
              <Text style={styles.cell}>State</Text>
              <Text style={styles.cell}>City</Text>
              <Text style={styles.cell}>Assign Category</Text>
              <Text style={styles.cell}>Is products</Text>
            </View>

            {/* Table Rows */}
            <FlatList
              data={data}
              renderItem={({item}) => (
                <View style={styles.Subrow}>
                  <Text style={styles.Subcell}>{item.sNo}</Text>
                  <Text style={styles.Subcell}>{item.RName}</Text>
                  <Text style={styles.Subcell}>{item.State}</Text>
                  <Text style={styles.Subcell}>{item.city}</Text>
                  <Text style={styles.Subcell}>{item.ACategory}</Text>
                  <Text style={styles.Subcell}>{item.Iproduct}</Text>
                </View>
              )}
            />
          </View>
        </ScrollView>
     
      </ScrollView>

      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  );
};
export default MyNetworkList;

const data = [
  {
    sNo: '01',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '02',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
];
