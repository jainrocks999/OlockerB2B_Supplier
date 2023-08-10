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

const ProductsList2 = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [value, setValue] = useState(null);

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
  return (
    <View style={{flex: 1,backgroundColor:'white'}}>
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

        <View style={{marginHorizontal: 10}}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} > 

          <Text
            style={{
              fontSize: 18,
              marginLeft: 5,
              fontWeight: '600',
              color: '#000',
            }}>
            Show
          </Text>
<Text  style={{fontWeight:'600',fontSize:18}}>Entries</Text>
              </View>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={DropData}
            maxHeight={250}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
            renderItem={renderItem}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#032E63',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 10,
            height: 50,
            borderRadius: 20,
            marginVertical: 20,
          }}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
            Excel
          </Text>
        </TouchableOpacity>

        <ScrollView horizontal >
          <View style={{flex: 1,marginHorizontal:10, width: wp(100)}}>
            <View style={styles.row}>
              <Text style={styles.cell}>S.No 
              </Text>
              
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
                  <View style={{flexDirection:'row',alignItems:'center',}}>

                  <Text style={styles.Subcell}>{item.sNo}</Text>
                  <View style={{height:45,marginLeft:10}}>

                  <Image 
              style={{height:40,width:40}}
              source={{uri:'https://m.media-amazon.com/images/I/41DEcqSKIEL._SY300_SX300_QL70_FMwebp_.jpg'}} />
              </View>
              </View>
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

        <View style={{flexDirection:'row',
        marginBottom:40,marginTop:20, marginHorizontal:20}}>
        <TouchableOpacity style={{borderWidth:2,paddingVertical:5,
          borderRadius:15,
          paddingHorizontal:15,alignItems:'center',justifyContent:'center',
            borderColor:'#032E63',backgroundColor:'#032E63'}}>
            <Text style={{color:'white'}}>Prev</Text>
          </TouchableOpacity>
          <View style={{}}>
          <FlatList
              data={page}
              horizontal
              renderItem={({item}) => (
                <View style={{height:40,width:40,backgroundColor:'#032E63',
                alignItems:'center',justifyContent:'center',marginHorizontal:5,
                borderRadius:20}}>
                  
                  <Text style={{color:'white'}}>{item.number}</Text>
                </View>
              )}
            />
          </View>
          <TouchableOpacity style={{borderWidth:2,paddingVertical:5,
          borderRadius:15,alignItems:'center',justifyContent:'center',
          paddingHorizontal:15,
            borderColor:'#032E63',backgroundColor:'#032E63'}}>
            <Text style={{color:'white'}}>Next</Text>
          </TouchableOpacity>
        </View>
      
        <View   
        style={{height:70}}
        />
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
export default ProductsList2;

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

const page =[
  {
number:'1'
  },
  {
number:'2'
  },
  {
number:'3'
  },
  {
number:'4'
  },
  {
number:'5'
  },
]
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
];
