import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import Header from '../../../components/CustomHeader';
import BottomTab from '../../../components/StoreButtomTab';
import ImagePath from '../../../components/ImagePath';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Mycustomer = () => {
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(Data);
  const [masterDataSource, setMasterDataSource] = useState(Data);

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = `${item.FirstName} ${item.LastName} ${item.Mobile}`
          ? `${item.FirstName} ${item.LastName} ${item.Mobile}`.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const handleSearch = () => {
    setSearch('');
    setFilteredDataSource(masterDataSource);
  };

  return (
    <View style={styles.container1}>
      <Header
        source={require('../../../assets/L.png')}
        source1={require('../../../assets/Fo.png')}
        source2={require('../../../assets/Image/dil.png')}
        title={'My Customers '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('Message')}
        onPress2={() => navigation.navigate('FavDetails')}
      />

      <View style={styles.blog}>
        <Image
          style={{height: 13, width: 20, tintColor: '#474747'}}
          resizeMode={'contain'}
          source={require('../../../assets/Image/serch.png')}
        />
        <TextInput
          // style={{marginLeft: 10}}
          placeholder="Search by Name or Phone Number"
          placeholderTextColor="grey"
          style={{
            color: '#474747',
            width: '100%',
            marginLeft: 10,
            fontFamily: 'Roboto-Regular',
          }}
          returnKeyType="done"
          value={search}
          onChangeText={val => searchFilterFunction(val)}
        />
      </View>
      <View>
        <FlatList
          data={filteredDataSource}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('MyCustomerDetail')}
              style={{
                backgroundColor: '#fff',
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              {/* {console.log(
                'image......hhh',
                `${ImagePath.Path}${item.ProfilePic}`,
              )} */}
              <View
                style={{
                  height: 40,
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 40, height: 40, borderRadius: 20}}
                  source={require('../../../assets/user.jpeg')}
                />

                <Text
                  style={{
                    marginLeft: 20,
                    color: '#032e63',
                    fontFamily: 'Acephimere',
                    fontSize: 14,
                    width: '50%',
                  }}>
                  {item.label}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    color: '#313131',
                    fontSize: 15,
                  }}>
                  {'+918878232121'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* <View style={{backgroundColor:'#032e63',width:60,height:60,
          position:'absolute',bottom:80,right:15,borderRadius:30,
          alignItems:'center',
          justifyContent:'center'
        }}>
        <Image style={{height:30,width:30}} source={require('../../../assets/plus.png')}/>
        </View> */}
      {/* <View style={{bottom: 0, position: 'absolute', left: 0, right: 0}}>
        <BottomTab />
      </View> */}
    </View>
  );
};
export default Mycustomer;
Data = [
  {label: 'Milind Sethia', value: '+918765467834'},
  {label: 'Manish Ranka', value: '+918765467834'},
  {label: 'Atul Bhargawa', value: '+918765467834'},
];
