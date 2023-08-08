import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import TabView from '../../../components/StoreButtomTab';
import {useNavigation} from '@react-navigation/native';
import ImagePath from '../../../components/ImagePath';
import Loader from '../../../components/Loader';
const MyProducts = ({route}) => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#f0eeef'}}>
      <Header
        source={require('../../../assets/L.png')}
        source1={require('../../../assets/Fo.png')}
        source2={require('../../../assets/Image/dil.png')}
        title={'Category List'}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('Message')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
      <ScrollView>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            marginTop: 20,
          }}>
          <View>
            <Text style={{color: '#565656', fontFamily: 'Acephimere'}}>
              87 Items
            </Text>
          </View>
          <View>
            {/* <TouchableOpacity
              onPress={()=>navigation.navigate('Filter')}
               style={{width:20,height:20}}>
              <Image style={{width:20,height:20,tintColor:'#2c2e2c'}} source={require('../../../assets/Image/karni.png')}/>
              </TouchableOpacity> */}
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <FlatList
            data={data}
            numColumns={2}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('SubCategory')}
                style={{
                  height: 190,
                  backgroundColor: '#fff',
                  flex: 1,
                  margin: 6,
                  borderRadius: 10,
                  elevation: 3,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{padding: 15}}>
                    <Image
                      style={{width: 20, height: 17, tintColor: '#ea056c'}}
                      source={require('../../../assets/Image/dil.png')}
                    />
                    <Image
                      style={{width: 20, height: 14, marginTop: 10}}
                      source={require('../../../assets/Image/share1.png')}
                    />
                  </View>
                  <View
                    style={{
                      borderTopRightRadius: 10,
                      borderBottomLeftRadius: 10,
                      paddingHorizontal: 10,
                      backgroundColor: '#24a31e',
                      paddingVertical: 2,
                      alignSelf: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Roboto-Regular',
                        fontSize: 12,
                        color: '#fff',
                      }}>{`2412 GM`}</Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: -40,
                  }}>
                  <Image
                    style={{height: 100, width: 120, marginLeft: 30}}
                    resizeMode="stretch"
                    source={require('../../../assets/Not.png')}
                  />
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    bottom: 10,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{paddingHorizontal: 10, marginLeft: -6}}>
                    <Text
                      style={{
                        color: '#050505',
                        fontSize: 13,
                        fontFamily: 'Acephimere',
                      }}>
                      {`ID# 9311`}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: -5,
                      }}>
                      <Image
                        style={{width: 16, height: 20}}
                        source={require('../../../assets/Image/rupay.png')}
                      />
                      <Text
                        style={{
                          color: '#050505',
                          fontFamily: 'Acephimere',
                          fontSize: 13,
                        }}>
                        {'23000'}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 17,
                        backgroundColor: '#ea056c',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{height: 22, width: 22}}
                        source={require('../../../assets/plus.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{height: 70}} />
      </ScrollView>
      <View style={{bottom: 0, left: 0, right: 0, position: 'absolute'}}>
        <TabView />
      </View>
    </View>
  );
};
export default MyProducts;
const data = [
  {title: require('../../../assets/Image/myjewlery.png')},
  {title: require('../../../assets/Image/myjewlery.png')},
  {title: require('../../../assets/Image/myjewlery.png')},
  {title: require('../../../assets/Image/myjewlery.png')},
  {title: require('../../../assets/Image/myjewlery.png')},
  {title: require('../../../assets/Image/myjewlery.png')},
  {title: require('../../../assets/Image/myjewlery.png')},
  {title: require('../../../assets/Image/myjewlery.png'), type: 'add'},
];
