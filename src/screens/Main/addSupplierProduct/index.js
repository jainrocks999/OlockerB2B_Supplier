import React, {useState} from 'react';
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
import CheckBox from '@react-native-community/checkbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInput} from 'react-native';
import CategoryViewModal from '../Modal/categoryList';
import { useNavigation } from '@react-navigation/native';

const AddSupplierProdcut = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [ViewModal, setViewModal] = useState(false);
  const [value, setValue] = useState(null);
  const [modalData,setModalData] = useState('')
const navigation = useNavigation()
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

  const setModalDetails =(details)=>{
    setModalData(details)
    setViewModal(true)
  }
  return (
    <View style={{flex: 1,backgroundColor:'white'}}>
      <ScrollView contentContainerStyle={{}}>
        <CategoryViewModal  visi={ViewModal} close={() => setViewModal(false)} data={modalData}/>
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
            <Text style={[styles.text, {marginLeft: 15}]}>
              List Of Products
            </Text>
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

        <View style={[styles.searchbar, {marginTop: 20}]}>
          <TextInput placeholder="Search" style={{fontSize: 18}} />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Feather name="search" size={30} />
          </View>
        </View>

        
        <TouchableOpacity

        onPress={()=>{
            
        }}
          style={{
            backgroundColor: '#032E63',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 10,
            height: 50,
            borderRadius: 20,
            
          }}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
            Add Product
          </Text>
        </TouchableOpacity>

        <View style={{flex: 1, width: wp(100),}}>
          {/* Table Rows */}
          <FlatList
            data={Offer}
            renderItem={({item}) => (
              <View style={styles.Card}>
                <View style={{padding:7}}>
                  <Image
                    style={{height: hp(24), width: '100%'}}
                    source={{
                      uri: 'https://as1.ftcdn.net/v2/jpg/02/73/22/74/1000_F_273227473_N0WRQuX3uZCJJxlHKYZF44uaJAkh2xLG.jpg',
                    }}
                  />
                </View>
                <View style={{paddingHorizontal: 20}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      marginTop: 10,
                      color: '#000',
                    }}>
                    ProductsSku:-{' '}
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#707371',
                      }}>
                      {item.ProductSku}
                    </Text>
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      marginTop: 10,
                      color: '#000',
                    }}>
                    Products Uniqueld:-{' '}
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#707371',
                      }}>
                      {item.ProductSku}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      marginTop: 10,
                      color: '#000',
                    }}>
                    Products Type:-{' '}
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#707371',
                      }}>
                      {item.ProductType}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      marginTop: 10,
                      color: '#000',
                    }}>
                    NetWt:-{' '}
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#707371',
                      }}>
                      {item.NetWT}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      marginTop: 10,
                      color: '#000',
                    }}>
                    Price:-{' '}
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#707371',
                      }}>
                      {item.Price}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      marginTop: 10,
                      color: '#000',
                    }}>
                    PreInsured:-{' '}
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#707371',
                      }}>
                      {item.PreInsured}
                    </Text>
                  </Text>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',

                        color: '#000',
                      }}>
                      isBestSeller:-{' '}
                    </Text>
                    <View>
                      <CheckBox
                
                tintColors={({ true: '#032e63' }, { false: '#032e63' })}
                 
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={newValue => setToggleCheckBox(newValue)}
                      />
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      marginTop: 10,
                      color: '#000',
                    }}>
                    ProductsSku:-{' '}
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#707371',
                      }}>
                      {item.ProductSku}
                    </Text>
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                      alignItems: 'center',
                    }}>
                    <View style={{}}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#000',
                        }}>
                        Product Status:
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',

                        width: '58%',
                      }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#032E63',
                          width: 90,
                          height: 30,
                          borderRadius: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: 'white', fontWeight: '700'}}>
                          Catalog
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: 90,
                          height: 30,
                          borderRadius: 20,
                          justifyContent: 'center',
                          borderWidth: 2,
                          borderColor: '#032E63',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontWeight: '800',
                          }}>
                          Live
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                      alignItems: 'center',
                    }}>
                    <View style={{}}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#000',
                        }}>
                        Collection
                      </Text>
                    </View>
                    <TouchableOpacity 

                    onPress={()=>{setModalDetails('Collection')}}
                      style={{
                        backgroundColor: '#032E63',
                        paddingHorizontal: 20,
                        height: 30,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'white'}}>View</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                      alignItems: 'center',
                    }}>
                    <View style={{}}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#000',
                        }}>
                        Categories
                      </Text>
                    </View>
                    <TouchableOpacity
                       onPress={()=>{setModalDetails('Categories')}}
                      style={{
                        backgroundColor: '#032E63',
                        paddingHorizontal: 20,
                        height: 30,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'white'}}>View</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                      alignItems: 'center',
                    }}>
                    <View style={{}}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#000',
                        }}>
                        Action
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#032E63',
                        paddingHorizontal: 20,
                        height: 30,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'white'}}>Activate</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
        <View style={{marginVertical:40,alignItems:'center',
       
        justifyContent:'center'}}>
          <TouchableOpacity style={{backgroundColor:'#032e63',
          paddingHorizontal:15,paddingVertical:10,borderRadius:20}}>
            <Text style={{color:'white'}}>See all</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  );
};
export default AddSupplierProdcut;



const Offer = [
  {
    ProductSku: '10BAI-683',
    ProductUniqueld: '10BAI-683',
    ProductType: 'Lorem Ipsum',
    NetWT: 80000,
    Price: '₹4389015.19',
    PreInsured: 'NO',
    isBestSeller: true,
  },
  {
    ProductSku: -'10BAI-683',
    ProductUniqueld: '10BAI-683',
    ProductType: 'Lorem Ipsum',
    NetWT: 80000,
    Price: '₹4389015.19',
    PreInsured: 'NO',
    isBestSeller: true,
  },
  {
    ProductSku: -'10BAI-683',
    ProductUniqueld: '10BAI-683',
    ProductType: 'Lorem Ipsum',
    NetWT: 80000,
    Price: '₹4389015.19',
    PreInsured: 'NO',
    isBestSeller: true,
  },
];
