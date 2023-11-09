import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {RadioButton} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import MultiSelect from 'react-native-multiple-select';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../components/Loader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
import {Image} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FlatList} from 'react-native';
let goldSpecilization = [];
let diamondSpecilization = [];
let silverSpecilization = [];
let platinumSpecilization = [];
const EditSupplierProfile = ({route}) => {
  const navigation = useNavigation();
  const supplierProfile = useSelector(
    state => state.Supplier?.SupplierDetail?.data,
  );

  const details = route.params.selector.supplierdetails[0];
  const [fetching, setFetching] = useState(false);
  const getImages = type => {
    const newArr = supplierProfile?.supplierimagedetails?.filter(
      item => item.Type == type,
    );

    return newArr;
  };
  const productImage = getImages('Product Image');

  const showroomImage = getImages('ShowRoom Image');
  const supplierLogo = route.params.supplierLogo;
  const ownerImage = getImages('Owner Image');
  // console.log('ownerName1,productImage',productImage,ownerImage);
  console.log(JSON.stringify(ownerImage));
  const [customPurityDia, setCustomPurityDia] = useState(false);
  const [customPurityGo, setCustomPurityGo] = useState(false);
  const [customPurityPla, setCustomPurityPla] = useState(false);
  const [customPuritySil, setCustomPuritySil] = useState(false);

  const stateList1 = useSelector(state => state.State.StateList);
  const stateList = stateList1?.satates;
  const cityList1 = useSelector(state => state.City.CityList);
  const cityList = cityList1?.cities;

  useEffect(() => {
    route.params.selector.specialisation.map(item => {
      if (item.metaltype == 'Gold') {
        if (goldSpecilization.length > 0) {
          if (!goldSpecilization.includes(item)) {
            goldSpecilization.push(item);
          }
        } else {
          goldSpecilization.push(item);
        }
      } else if (item.metaltype == 'Diamond') {
        if (diamondSpecilization.length > 0) {
          if (!diamondSpecilization.includes(item)) {
            diamondSpecilization.push(item);
          }
        } else {
          diamondSpecilization.push(item);
        }
      } else if (item.metaltype == 'Platinum') {
        if (platinumSpecilization.length > 0) {
          if (!platinumSpecilization.includes(item)) {
            platinumSpecilization.push(item);
          }
        } else {
          platinumSpecilization.push(item);
        }
      } else if (item.metaltype == 'Silver') {
        if (silverSpecilization.length > 0) {
          if (!silverSpecilization.includes(item)) {
            silverSpecilization.push(item);
          }
        } else {
          silverSpecilization.push(item);
        }
      }
    });
  }, []);

  const [inputs, setInputs] = useState({
    SupplierName: details?.SupplierName,
    ContactPersonName: details?.ContactPersonName,
    MobileNo: details?.MobileNo,
    Address: details?.Address,
    StateId: details?.StateId,
    CityId: details?.CityId,
    Pincode: details?.Pincode,
    Website: details?.Website,
    SupplierType: details?.SupplierType,
    IsAnyBranch: details?.IsAnyBranch == 'on' ? true : false,
    JTyped: '',
    JTypeg: '',
    JTypep: '',
    JTypes: '',
    diamond_purity: [],
    diamond_specialisation: [],
    gold_purity: [],
    gold_specialisation: [],
    silver_purity: [],
    silver_specialisation: [],
    platinum_specialisation: [],
    platinum_purity: [],
    goldcustom_purity: '',
    diamondcustom_purity: '',
    platinumcustom_purity: '',
    silvercustom_purity: '',
    DiamondQuality: '',
    IsActive: false,
    IsDefaultSupplier: false,
    logo: {
      name: '',
      type: '',
      uri: '',
    },
    product_name1: '',
    product_name2: '',
    product_name3: '',
    hiddenproduct_image1: '',
    hiddenproduct_image2: '',
    hiddenproduct_image3: '',
    // product_image3: {
    //   name: '',
    //   type: '',
    //   uri: '',
    // },
    aboutus: '',
    NoofEmployee: 0,
    showroom_image: [],

    owner_name1: '',
    owner_description1: '',
    // owner_image2: {
    //   name: '',
    //   type: '',
    //   uri: '',
    // },
    owner_name2: '',
    owner_description2: '',
    // owner_image3: {
    //   name: '',
    //   type: '',
    //   uri: '',
    // },
    owner_name3: '',
    owner_description3: '',
    hiddenowner_image1: '',
    hiddenowner_id1: 434,
    owner_description1: '',
    hiddenowner_image2: '',
    hiddenowner_id2: 435,
    owner_description2: '',
    hiddenowner_image3: '',
    hiddenowner_id3: 436,
    owner_description3: '',
    hiddenproduct_id1: 428,
    hiddenproduct_id2: 429,
    hiddenproduct_id3: 430,

    EmailId: 'tested@gmail.com',
  });

  const handleInputs = (key, value) => {
    setInputs(prev => ({...prev, [key]: value}));
  };
  const handleOnSumit = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const Token = await AsyncStorage.getItem('loginToken');
    const newdata = {...inputs, SrNo: user_id};
    let data = new FormData();
    Object.keys(newdata).map(item => {
      setFetching(true);
      switch (item) {
        case 'logo':
          data.append(item, newdata[item]);
          break;
        case 'SupplierName': {
          if (newdata[item] == '') {
            Toast.show('Please enter supplier name');
            return;
          }
          data.append(item, newdata[item]);
          break;
        }
        case 'ContactPersonName': {
          if (newdata[item] == '') {
            Toast.show('Please enter contact person name');
            return;
          }
          data.append(item, newdata[item]);
          break;
        }
        case 'Address': {
          if (newdata[item] == '') {
            Toast.show('Please enter full address');
            return;
          }
          data.append(item, newdata[item]);
          break;
        }
        case 'MobileNo': {
          if (newdata[item] == '') {
            Toast.show('Please enter mobile number');
            return;
          }
          data.append(item, newdata[item]);
          break;
        }
        case 'StateId': {
          if (newdata[item] == '') {
            Toast.show('Please select State name');
            return;
          }
          data.append(item, newdata[item]);
          break;
        }
        case 'StateId': {
          if (newdata[item] == '') {
            Toast.show('Please select State name');
            return;
          }
          data.append(item, newdata[item]);
          break;
        }
        case 'CityId': {
          if (newdata[item] == '') {
            Toast.show('Please select city name');
            return;
          }
          data.append(item, newdata[item]);
          break;
        }
        case 'IsActive':
          data.append(item, newdata[item] ? 'on' : 'off');
          break;
        case 'IsDefaultSupplier':
          data.append(item, newdata[item] ? 'on' : 'off');
          break;
        case 'diamond_purity':
          newdata[item].map((items, index) => {
            data.append(`diamond_purity[${index}]`, items);
          });
          break;
        case 'diamond_specialisation':
          newdata[item].map((items, index) => {
            data.append(`diamond_specialisation[${index}]`, items);
          });
          break;
        case 'diamondcustom_purity':
          data.append(`diamondcustom_purity`, newdata[item]);
          break;
        case 'gold_purity':
          newdata[item].map((items, index) => {
            data.append(`gold_purity[${index}]`, items);
          });
          break;
        case 'silver_purity':
          newdata[item].map((items, index) => {
            data.append(`silver_purity[${index}]`, items);
          });
          break;
        case 'platinum_purity':
          newdata[item].map((items, index) => {
            data.append(`platinum_purity[${index}]`, items);
          });

          break;
        case 'gold_specialisation':
          newdata[item].map((items, index) => {
            data.append(`gold_specialisation[${index}]`, items);
          });
          break;
        case 'silver_specialisation':
          newdata[item].map((items, index) => {
            data.append(`silver_specialisation[${index}]`, items);
          });
          break;
        case 'platinum_specialisation':
          newdata[item].map((items, index) => {
            data.append(`platinum_specialisation[${index}]`, items);
          });
          break;
        case 'showroom_image':
          newdata[item].map((items, index) => {
            data.append(`showroom_image[${index}]`, items);
          });
          break;
        case 'JTyped':
          data.append(item, newdata[item] ? 'Diamond' : '');
          break;
        case 'JTypep':
          data.append(item, newdata[item] ? 'Platinum' : '');
          break;
        case 'JTypeg':
          data.append(item, newdata[item] ? 'Gold' : '');
          break;
        case 'JTypes':
          data.append(item, newdata[item] ? 'Silver' : '');
          break;
        case 'IsAnyBranch':
          data.append(item, newdata[item] ? 'on' : 'off');
          break;

        default:
          data.append(item, newdata[item]);
      }
    });
    // validateUser(data);
    console.log('this is diamond specialization', inputs.product_name1);
  };
  const validateUser = async data => {
    const Token = await AsyncStorage.getItem('loginToken');
    console.log('called');
    try {
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Olocker: `Bearer ${Token}`,
        },
        url: 'https://olocker.co/api/supplier//updateProfile',
      });
      console.log('this is iresponae', response.data);
      if (response.data.status) {
        setFetching(false);
        Toast.show(response.data.msg);
      } else {
        setFetching(false);
        Toast.show(response.data.msg);
        // console.log('this is iresponae',response);
      }
    } catch (error) {
      // // console.log("err->", error.response.data)
      Toast.show('Something went wrong');
      setFetching(false);
      console.log('this is iresponae', error);
    }
  };

  // console.log('thjios isi isisisi', inputs.showroom_image);

  const handleImageUpload = type => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      selectionLimit: type == 'showroom_image' ? 3 : 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        return;
      } else if (response.errorCode == 'permission') {
        return;
      } else if (response.errorCode == 'others') {
        return;
      }

      const obj = {
        name: response?.assets[0]?.fileName?.replace(
          /^rn_image_picker_lib_temp_/,
          '',
        ),
        type: response?.assets[0]?.type,
        uri: response.assets[0].uri,
      };
      let arr = [];

      switch (type) {
        case 'logo':
          handleInputs('logo', obj);
          break;
        case 'hiddenproduct_image1':
          handleInputs('hiddenproduct_image1', obj);
          break;
        case 'hiddenproduct_image2':
          handleInputs('hiddenproduct_image2', obj);
          break;
        case 'hiddenproduct_image3':
          handleInputs('hiddenproduct_image3', obj);
          break;
        case 'showroom_image': {
          response.assets.map(item => {
            let obj2 = {
              name: item.fileName?.replace(/^rn_image_picker_lib_temp_/, ''),
              type: item.type,
              uri: item.uri,
            };

            arr.push(obj2);
            console.log(item);
          });
          handleInputs('showroom_image', arr);
          break;
        }
        case 'hiddenowner_image1':
          handleInputs('hiddenowner_image1', obj);
          break;
        case 'hiddenowner_image2':
          handleInputs('hiddenowner_image2', obj);
          break;
        case 'hiddenowner_image3':
          handleInputs('hiddenowner_image3', obj);
          break;
        default:
          return;
      }
    });
  };

  const getSpecilization = data => {
    let arr = [];
    data?.map((item, index) => {
      let obj = {id: index.toString(), name: item?.name};
      arr.push(obj);
    });
    return arr;
  };

  // useEffect(() => {
  //   setInputs(prev => ({
  //     ...prev,
  //     hiddenowner_image1: getOwnerImage(ownerImage[0]),
  //     hiddenowner_image2: getOwnerImage(ownerImage[1]),
  //     hiddenowner_image3: getOwnerImage(ownerImage[2]),
  //   }));
  // }, [ownerImage]);
  const getOwnerImage = data => {
    const obj = {
      name: data?.ImageName,
      type: 'image/jpg',
      uri: `https://olocker.co/uploads/supplier/${data?.ImageName}`,
    };
    return obj;
  };
  useEffect(() => {
    handlePrevImages();
  }, []);
  const handlePrevImages = index => {
    productImage.map(item => {
      console.log('ghus gya');
      const obj = {
        name: item?.ImageName,
        type: 'image/jpg',
        uri: `https://olocker.co/uploads/supplier/${item?.ImageName}`,
      };
      let ImagePrams = `hiddenproduct_image${index + 1}`;
      let NameParams = `product_name${index + 1}`;
      setInputs(prev => ({
        ...prev,
        [ImagePrams]: obj,
        [NameParams]: item?.OwnerName,
      }));
    });
  };
  console.log('this is hidden image 1', inputs.hiddenowner_image1?.name);
  const renderScreen = () => {
    return (
      <ScrollView style={{paddingHorizontal: 10, paddingVertical: 10}}>
        <View>
          <Text style={styles.text}>
            Supplier Name<Text style={{color: 'red'}}>{' *'}</Text>
          </Text>
          <TextInput
            placeholder="Supplier Name"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
            }}
            value={inputs.SupplierName}
            onChangeText={val => handleInputs('SupplierName', val)}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>
            Contact Person Name<Text style={{color: 'red'}}>{' *'}</Text>
          </Text>
          <TextInput
            placeholder="Contact Person Name"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
            }}
            value={inputs.ContactPersonName}
            onChangeText={val => handleInputs('ContactPersonName', val)}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>
            Mobile No.<Text style={{color: 'red'}}>{' *'}</Text>
          </Text>
          <TextInput
            placeholder="Mobile No."
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
            }}
            value={inputs.MobileNo}
            onChangeText={val => handleInputs('MobileNo', val)}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>
            Address<Text style={{color: 'red'}}>{' *'}</Text>
          </Text>
          <TextInput
            placeholder="Address"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
            }}
            value={inputs.Address}
            onChangeText={val => handleInputs('Address', val)}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>
            State<Text style={{color: 'red'}}>{' *'}</Text>
          </Text>
          <View style={{}}>
            <Dropdown
              style={[
                styles.dropdown,
                {borderWidth: 1, borderColor: '#979998'},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={stateList1?.satates}
              inputSearchStyle={{
                borderRadius: 10,
                backgroundColor: '#f0f0f0',
              }}
              searchPlaceholder="search.."
              maxHeight={250}
              search
              labelField="label"
              valueField="value"
              placeholder="state"
              value={inputs.StateId}
              onChange={item => {
                manageCity(item.value);
                handleInputs('StateId', item.value);
              }}
            />
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>
            City<Text style={{color: 'red'}}>{' *'}</Text>
          </Text>
          <View>
            <Dropdown
              style={[
                styles.dropdown,
                {borderWidth: 1, borderColor: '#979998'},
              ]}
              search
              searchPlaceholder="search.."
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={cityList ? cityList : []}
              maxHeight={250}
              labelField="label"
              valueField="value"
              placeholder="City"
              value={inputs.CityId}
              onChange={item => {
                handleInputs('CityId', item.value);
              }}
              inputSearchStyle={{
                borderRadius: 10,
                backgroundColor: '#f0f0f0',
              }}
            />
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>Pincode</Text>
          <TextInput
            placeholder="Pincode"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
            }}
            value={inputs.Pincode}
            onChangeText={val => handleInputs('Pincode', val)}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>Website URL</Text>
          <TextInput
            placeholder="Website URL"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
            }}
            value={inputs.Website}
            onChangeText={val => handleInputs('Website', val)}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>
            Tell us what are you<Text style={{color: 'red'}}>{' *'}</Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                status={inputs.SupplierType == 1 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('SupplierType', 1)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text>Manufacturer</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                status={inputs.SupplierType == 2 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('SupplierType', 2)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text>Wholesaler</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                status={inputs.SupplierType == 3 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('SupplierType', 3)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text>Both</Text>
            </View>
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>
            Any branches you have<Text style={{color: 'red'}}>{' *'}</Text>
          </Text>
          <CheckBox
            disabled={false}
            value={inputs.IsAnyBranch}
            onValueChange={newValue =>
              handleInputs('IsAnyBranch', !inputs.IsAnyBranch)
            }
            tintColors={{true: '#032e63', false: '#032e63'}}
            onTintColor="#032e63"
            onCheckColor="#032e63"
            boxType="square"
            style={{height: 16, width: 18, marginTop: 10}}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>Type of jewellery</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                disabled={false}
                value={inputs.JTyped}
                onValueChange={newValue => {
                  setInputs(prev => ({...prev, JTyped: newValue}));
                }}
                tintColors={{true: '#032e63', false: '#032e63'}}
                onTintColor="#032e63"
                onCheckColor="#032e63"
                boxType="square"
                style={{height: 16, width: 18}}
              />
              <Text style={{marginLeft: 10}}>Diamond</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                disabled={false}
                value={inputs.JTypeg}
                onValueChange={newValue => handleInputs('JTypeg', newValue)}
                tintColors={{true: '#032e63', false: '#032e63'}}
                onTintColor="#032e63"
                onCheckColor="#032e63"
                boxType="square"
                style={{height: 16, width: 18}}
              />
              <Text style={{marginLeft: 10}}>Gold</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                disabled={false}
                value={inputs.JTypep}
                onValueChange={newValue => handleInputs('JTypep', newValue)}
                tintColors={{true: '#032e63', false: '#032e63'}}
                onTintColor="#032e63"
                onCheckColor="#032e63"
                boxType="square"
                style={{height: 16, width: 18}}
              />
              <Text style={{marginLeft: 10}}>Platinum</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                disabled={false}
                value={inputs.JTypes}
                onValueChange={newValue => handleInputs('JTypes', newValue)}
                tintColors={{true: '#032e63', false: '#032e63'}}
                onTintColor="#032e63"
                onCheckColor="#032e63"
                boxType="square"
                style={{height: 16, width: 18}}
              />
              <Text style={{marginLeft: 10}}>Silver</Text>
            </View>
          </View>
        </View>
        {inputs.JTyped == true ? (
          <View>
            <View style={{marginTop: 10}}>
              <Text style={styles.text}>
                Diamond purity<Text style={{color: 'red'}}>{' *'}</Text>
              </Text>
              <MultiSelect
                items={items1}
                uniqueKey="name"
                onSelectedItemsChange={val => {
                  handleInputs('diamond_purity', val);
                  if (val.includes('Custom Purity')) {
                    setCustomPurityDia(true);
                  } else {
                    setCustomPurityDia(false);
                  }
                }}
                selectedItems={inputs.diamond_purity}
                searchIcon={false}
                tagBorderColor={'#032e63'}
                tagRemoveIconColor={'#fff'}
                tagTextColor={'#fff'}
                selectText={
                  inputs.diamond_purity > 0 ? '' : 'Select Diamond Purity'
                }
                single={false}
                searchInputPlaceholderText="Select Diamond Purity"
                selectedItemTextColor={'#032e63'}
                selectedItemIconColor={'#032e63'}
                itemTextColor={'#032e63'}
                displayKey="name"
                submitButtonColor={'#032e63'}
                submitButtonText="Submit"
                textInputProps={{editable: false, autoFocus: false}}
                styleDropdownMenu={{
                  // width:'100%',
                  borderBottomWidth: 1.5,
                  borderColor: '#032e63',
                  height: 55,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingHorizontal: 12,
                  marginTop: 5,
                  // borderWidth:1
                }}
                tagContainerStyle={{
                  backgroundColor: '#032e63',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '48%',
                }}
              />
            </View>
            {customPurityDia == true ? (
              <View style={{marginTop: 10}}>
                <TextInput
                  placeholder="Please specify custom purity"
                  style={{
                    borderWidth: 1,
                    marginTop: 4,
                    height: 40,
                    borderRadius: 6,
                    borderColor: 'grey',
                    paddingLeft: 10,
                  }}
                  value={inputs.diamondcustom_purity}
                  onChangeText={val =>
                    handleInputs('diamondcustom_purity', val)
                  }
                />
              </View>
            ) : null}
            <View style={{marginTop: 10}}>
              <Text style={styles.text}>
                Choose Diamond Specialisation
                <Text style={{color: 'red'}}>{' *'}</Text>
              </Text>
              <MultiSelect
                items={getSpecilization(goldSpecilization)}
                uniqueKey="id"
                onSelectedItemsChange={val =>
                  handleInputs('diamond_specialisation', val)
                }
                selectedItems={inputs.diamond_specialisation}
                searchIcon={false}
                tagBorderColor={'#032e63'}
                tagRemoveIconColor={'#fff'}
                tagTextColor={'#fff'}
                selectText={
                  inputs.diamond_specialisation.length > 0
                    ? ''
                    : 'Choose Diamond Specialisation'
                }
                single={false}
                searchInputPlaceholderText="Choose Diamond Specialisation"
                selectedItemTextColor={'#032e63'}
                selectedItemIconColor={'#032e63'}
                itemTextColor={'#032e63'}
                displayKey="name"
                submitButtonColor={'#032e63'}
                submitButtonText="Submit"
                textInputProps={{editable: false, autoFocus: false}}
                styleDropdownMenu={{
                  // width:'100%',
                  borderBottomWidth: 1.5,
                  borderColor: '#032e63',
                  height: 55,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingHorizontal: 12,
                  marginTop: 5,
                  // borderWidth:1
                }}
                tagContainerStyle={{
                  backgroundColor: '#032e63',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '48%',
                }}
              />
            </View>
          </View>
        ) : null}
        {inputs.JTypeg == true ? (
          <View>
            <View style={{marginTop: 10}}>
              <Text style={styles.text}>
                Gold purity<Text style={{color: 'red'}}>{' *'}</Text>
              </Text>
              <MultiSelect
                items={items}
                uniqueKey="name"
                onSelectedItemsChange={val => {
                  handleInputs('gold_purity', val);
                  if (val.includes('Custom Purity')) {
                    setCustomPurityGo(true);
                  } else {
                    setCustomPurityGo(false);
                  }
                }}
                selectedItems={inputs.gold_purity}
                searchIcon={false}
                tagBorderColor={'#032e63'}
                tagRemoveIconColor={'#fff'}
                tagTextColor={'#fff'}
                selectText={
                  inputs.gold_purity.length > 0 ? '' : 'Select Gold Purity'
                }
                single={false}
                searchInputPlaceholderText="Select Gold Purity"
                selectedItemTextColor={'#032e63'}
                selectedItemIconColor={'#032e63'}
                itemTextColor={'#032e63'}
                displayKey="name"
                submitButtonColor={'#032e63'}
                submitButtonText="Submit"
                textInputProps={{editable: false, autoFocus: false}}
                styleDropdownMenu={{
                  // width:'100%',
                  borderBottomWidth: 1.5,
                  borderColor: '#032e63',
                  height: 55,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingHorizontal: 12,
                  marginTop: 5,
                  // borderWidth:1
                }}
                tagContainerStyle={{
                  backgroundColor: '#032e63',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '48%',
                }}
              />
            </View>

            {customPurityGo == true ? (
              <View style={{marginTop: 10}}>
                <TextInput
                  placeholder="Please specify custom purity"
                  style={{
                    borderWidth: 1,
                    marginTop: 4,
                    height: 40,
                    borderRadius: 6,
                    borderColor: 'grey',
                    paddingLeft: 10,
                  }}
                  value={inputs.goldcustom_purity}
                  onChangeText={val => handleInputs('goldcustom_purity', val)}
                />
              </View>
            ) : null}
            <View style={{marginTop: 10}}>
              <Text style={styles.text}>
                Choose Gold Specialisation
                <Text style={{color: 'red'}}>{' *'}</Text>
              </Text>
              <MultiSelect
                items={getSpecilization(diamondSpecilization)}
                uniqueKey="id"
                onSelectedItemsChange={val =>
                  handleInputs('gold_specialisation', val)
                }
                selectedItems={inputs.gold_specialisation}
                searchIcon={false}
                tagBorderColor={'#032e63'}
                tagRemoveIconColor={'#fff'}
                tagTextColor={'#fff'}
                selectText={
                  inputs.gold_specialisation.length > 0
                    ? ''
                    : 'Choose Gold Specialisation'
                }
                single={false}
                searchInputPlaceholderText="Choose Gold Specialisation"
                selectedItemTextColor={'#032e63'}
                selectedItemIconColor={'#032e63'}
                itemTextColor={'#032e63'}
                displayKey="name"
                submitButtonColor={'#032e63'}
                submitButtonText="Submit"
                textInputProps={{editable: false, autoFocus: false}}
                styleDropdownMenu={{
                  // width:'100%',
                  borderBottomWidth: 1.5,
                  borderColor: '#032e63',
                  height: 55,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingHorizontal: 12,
                  marginTop: 5,
                  // borderWidth:1
                }}
                tagContainerStyle={{
                  backgroundColor: '#032e63',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '48%',
                }}
              />
            </View>
          </View>
        ) : null}
        {inputs.JTypep == true ? (
          <View>
            <View style={{marginTop: 10}}>
              <Text style={styles.text}>
                Platinum purity<Text style={{color: 'red'}}>{' *'}</Text>
              </Text>
              <MultiSelect
                items={items2}
                uniqueKey="name"
                onSelectedItemsChange={val => {
                  handleInputs('platinum_purity', val);
                  if (val.includes('Custom Purity')) {
                    setCustomPurityPla(true);
                  } else {
                    setCustomPurityPla(false);
                  }
                }}
                selectedItems={inputs.platinum_purity}
                searchIcon={false}
                tagBorderColor={'#032e63'}
                tagRemoveIconColor={'#fff'}
                tagTextColor={'#fff'}
                selectText={
                  inputs.platinum_purity.length > 0
                    ? ''
                    : 'Select Platinum Purity'
                }
                single={false}
                searchInputPlaceholderText="Select Platinum Purity"
                selectedItemTextColor={'#032e63'}
                selectedItemIconColor={'#032e63'}
                itemTextColor={'#032e63'}
                displayKey="name"
                submitButtonColor={'#032e63'}
                submitButtonText="Submit"
                textInputProps={{editable: false, autoFocus: false}}
                styleDropdownMenu={{
                  // width:'100%',
                  borderBottomWidth: 1.5,
                  borderColor: '#032e63',
                  height: 55,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingHorizontal: 12,
                  marginTop: 5,
                  // borderWidth:1
                }}
                tagContainerStyle={{
                  backgroundColor: '#032e63',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '48%',
                }}
              />
            </View>
            {customPurityPla == true ? (
              <View style={{marginTop: 10}}>
                <TextInput
                  placeholder="Please specify custom purity"
                  style={{
                    borderWidth: 1,
                    marginTop: 4,
                    height: 40,
                    borderRadius: 6,
                    borderColor: 'grey',
                    paddingLeft: 10,
                  }}
                  value={inputs.platinumcustom_purity}
                  onChangeText={val =>
                    handleInputs('platinumcustom_purity', val)
                  }
                />
              </View>
            ) : null}
            <View style={{marginTop: 10}}>
              <Text style={styles.text}>
                Choose Platinum Specialisation
                <Text style={{color: 'red'}}>{' *'}</Text>
              </Text>
              <MultiSelect
                items={getSpecilization(platinumSpecilization)}
                uniqueKey="id"
                onSelectedItemsChange={val =>
                  handleInputs('platinum_specialisation', val)
                }
                selectedItems={inputs.platinum_specialisation}
                searchIcon={false}
                tagBorderColor={'#032e63'}
                tagRemoveIconColor={'#fff'}
                tagTextColor={'#fff'}
                selectText={
                  inputs.platinum_specialisation.length > 0
                    ? ''
                    : 'Choose Platinum Specialisation'
                }
                single={false}
                searchInputPlaceholderText="Choose Platinum Specialisation"
                selectedItemTextColor={'#032e63'}
                selectedItemIconColor={'#032e63'}
                itemTextColor={'#032e63'}
                displayKey="name"
                submitButtonColor={'#032e63'}
                submitButtonText="Submit"
                textInputProps={{editable: false, autoFocus: false}}
                styleDropdownMenu={{
                  borderBottomWidth: 1.5,
                  borderColor: '#032e63',
                  height: 55,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingHorizontal: 12,
                  marginTop: 5,
                  // borderWidth:1
                }}
                tagContainerStyle={{
                  backgroundColor: '#032e63',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '48%',
                }}
              />
            </View>
          </View>
        ) : null}
        {inputs.JTypes == true ? (
          <View>
            <View style={{marginTop: 10}}>
              <Text style={styles.text}>
                Silver purity<Text style={{color: 'red'}}>{' *'}</Text>
              </Text>
              <MultiSelect
                items={items3}
                uniqueKey="name"
                onSelectedItemsChange={val => {
                  handleInputs('silver_purity', val);
                  if (val.includes('Custom Purity')) {
                    setCustomPuritySil(true);
                  } else {
                    setCustomPuritySil(false);
                  }
                }}
                selectedItems={inputs.silver_purity}
                searchIcon={false}
                tagBorderColor={'#032e63'}
                tagRemoveIconColor={'#fff'}
                tagTextColor={'#fff'}
                selectText={
                  inputs.silver_purity.length > 0 ? '' : 'Select Silver Purity'
                }
                single={false}
                searchInputPlaceholderText="Select Gold Purity"
                selectedItemTextColor={'#032e63'}
                selectedItemIconColor={'#032e63'}
                itemTextColor={'#032e63'}
                displayKey="name"
                submitButtonColor={'#032e63'}
                submitButtonText="Submit"
                textInputProps={{editable: false, autoFocus: false}}
                styleDropdownMenu={{
                  // width:'100%',
                  borderBottomWidth: 1.5,
                  borderColor: '#032e63',
                  height: 55,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingHorizontal: 12,
                  marginTop: 5,
                  // borderWidth:1
                }}
                tagContainerStyle={{
                  backgroundColor: '#032e63',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '48%',
                }}
              />
            </View>
            {customPuritySil == true ? (
              <View style={{marginTop: 10}}>
                <TextInput
                  placeholder="Please specify custom purity"
                  style={{
                    borderWidth: 1,
                    marginTop: 4,
                    height: 40,
                    borderRadius: 6,
                    borderColor: 'grey',
                    paddingLeft: 10,
                  }}
                  value={inputs.silvercustom_purity}
                  onChangeText={val => handleInputs('silvercustom_purity', val)}
                />
              </View>
            ) : null}
            <View style={{marginTop: 10}}>
              <Text style={styles.text}>
                Choose Silver Specialisation
                <Text style={{color: 'red'}}>{' *'}</Text>
              </Text>
              <MultiSelect
                items={getSpecilization(silverSpecilization)}
                uniqueKey="id"
                onSelectedItemsChange={val =>
                  handleInputs('silver_specialisation', val)
                }
                selectedItems={inputs.silver_specialisation}
                searchIcon={false}
                tagBorderColor={'#032e63'}
                tagRemoveIconColor={'#fff'}
                tagTextColor={'#fff'}
                selectText={
                  inputs.silver_specialisation.length > 0
                    ? ''
                    : 'Choose Silver Specialisation'
                }
                single={false}
                searchInputPlaceholderText="Choose Silver Specialisation"
                selectedItemTextColor={'#032e63'}
                selectedItemIconColor={'#032e63'}
                itemTextColor={'#032e63'}
                displayKey="name"
                submitButtonColor={'#032e63'}
                submitButtonText="Submit"
                textInputProps={{editable: false, autoFocus: false}}
                styleDropdownMenu={{
                  // width:'100%',
                  borderBottomWidth: 1.5,
                  borderColor: '#032e63',
                  height: 55,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingHorizontal: 12,
                  marginTop: 5,
                  // borderWidth:1
                }}
                tagContainerStyle={{
                  backgroundColor: '#032e63',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '48%',
                }}
              />
            </View>
          </View>
        ) : null}
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>Diamond quality</Text>
          <TextInput
            placeholder="Specify Your Qualities"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
            }}
            value={inputs.DiamondQuality}
            onChangeText={val => handleInputs('DiamondQuality', val)}
          />
        </View>
        <View style={{marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                disabled={false}
                value={inputs.IsActive}
                onValueChange={newValue => handleInputs('IsActive', newValue)}
                tintColors={{true: '#032e63', false: '#032e63'}}
                onTintColor="#032e63"
                onCheckColor="#032e63"
                boxType="square"
                style={{height: 16, width: 18}}
              />
              <Text style={{marginLeft: 10}}>Is Active</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                disabled={false}
                value={inputs.IsDefaultSupplier}
                onValueChange={newValue =>
                  handleInputs('IsDefaultSupplier', newValue)
                }
                tintColors={{true: '#032e63', false: '#032e63'}}
                onTintColor="#032e63"
                onCheckColor="#032e63"
                boxType="square"
                style={{height: 16, width: 18}}
              />
              <Text style={{marginLeft: 10}}>
                Default Supplier for all retailers
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={styles.text}>Upload Supplier Logo (if any)</Text>
          <View
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => handleImageUpload('logo')}
              style={{
                backgroundColor: 'grey',
                height: 40,
                width: '30%',
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff'}}>Choose File</Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '70%',
              }}>
              {inputs.logo.name == '' ? (
                <Text>No File Choosen</Text>
              ) : (
                <Text>{inputs.logo?.name}</Text>
              )}
            </View>
          </View>
          {inputs.logo.uri ? (
            <View
              style={{
                elevation: 5,
                shadowColor: 'black',
                shadowOffset: {height: 4, width: 4},
                shadowOpacity: 5,
                shadowRadius: 4,
              }}>
              <Image
                style={{
                  height: widthPercentageToDP(30),
                  width: widthPercentageToDP(30),
                  alignSelf: 'center',
                  marginTop: 10,
                }}
                source={{uri: inputs.logo?.uri}}
              />
            </View>
          ) : null}
        </View>

        <View style={{marginTop: 10}}>
          <Text style={styles.text}>Upload image of your product:</Text>
          <FlatList
            data={productImage}
            renderItem={({item, index}) => (
              <View>
                <View style={styles.uploadView}>
                  <TouchableOpacity
                    onPress={() =>
                      handleImageUpload(`hiddenproduct_image${index + 1}`)
                    }
                    style={styles.grey}>
                    <Text style={{color: '#fff'}}>Choose File</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '70%',
                    }}>
                    {inputs[`hiddenproduct_image${index + 1}`]?.name == '' ||
                    undefined ? (
                      <Text>No File Choosen</Text>
                    ) : (
                      <Text>{inputs[`product_name${index + 1}`]?.name}</Text>
                    )}
                  </View>
                </View>
                <TextInput
                  placeholder="Product Name"
                  style={{
                    borderWidth: 1,
                    marginTop: 4,
                    height: 40,
                    borderRadius: 6,
                    borderColor: 'grey',
                    paddingLeft: 10,
                  }}
                  value={inputs[`product_name${index + 1}`]}
                  onChangeText={val =>
                    handleInputs(`product_name${index + 1}`, val)
                  }
                />
                {inputs[`hiddenproduct_image${index + 1}`]?.uri ? (
                  <View
                    style={{
                      elevation: 5,
                      shadowColor: 'black',
                      shadowOffset: {height: 4, width: 4},
                      shadowOpacity: 5,
                      shadowRadius: 4,
                    }}>
                    <Image
                      style={{
                        height: widthPercentageToDP(30),
                        width: widthPercentageToDP(30),
                        alignSelf: 'center',
                        marginTop: 10,
                      }}
                      source={{uri: inputs.hiddenproduct_image1?.uri}}
                    />
                  </View>
                ) : null}
              </View>
            )}
          />
          {/* <View style={{marginTop: 5}}>
            <View style={styles.uploadView}>
              <TouchableOpacity
                onPress={() => handleImageUpload('hiddenproduct_image2')}
                style={styles.grey}>
                <Text style={{color: '#fff'}}>Choose File</Text>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '70%',
                }}>
                {inputs.hiddenproduct_image2?.uri == '' ? (
                  <Text>No File Choosen</Text>
                ) : (
                  <Text>{inputs.hiddenproduct_image2?.name}</Text>
                )}
              </View>
            </View>
            <TextInput
              placeholder="Product Name"
              style={{
                borderWidth: 1,
                marginTop: 4,
                height: 40,
                borderRadius: 6,
                borderColor: 'grey',
                paddingLeft: 10,
              }}
              value={inputs.product_name2}
              onChangeText={val => handleInputs('product_name2', val)}
            />
            {inputs.hiddenproduct_image2.uri ? (
              <View
                style={{
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: {height: 4, width: 4},
                  shadowOpacity: 5,
                  shadowRadius: 4,
                }}>
                <Image
                  style={{
                    height: widthPercentageToDP(30),
                    width: widthPercentageToDP(30),
                    alignSelf: 'center',
                    marginTop: 10,
                  }}
                  source={{uri: inputs.hiddenproduct_image2.uri}}
                />
              </View>
            ) : null}
          </View> */}
          {/* <View style={{marginTop: 5}}>
            <View style={styles.uploadView}>
              <TouchableOpacity
                onPress={() => handleImageUpload('hiddenproduct_image3')}
                style={styles.grey}>
                <Text style={{color: '#fff'}}>Choose File</Text>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '70%',
                }}>
                {inputs.hiddenproduct_image3?.name == '' ? (
                  <Text>No File Choosen</Text>
                ) : (
                  <Text>{inputs.hiddenproduct_image3?.name}</Text>
                )}
              </View>
            </View>
            <TextInput
              placeholder="Product Name"
              style={{
                borderWidth: 1,
                marginTop: 4,
                height: 40,
                borderRadius: 6,
                borderColor: 'grey',
                paddingLeft: 10,
              }}
              value={inputs.product_name3}
              onChangeText={val => handleInputs('product_name3', val)}
            />
            {inputs.hiddenproduct_image3?.uri ? (
              <View
                style={{
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: {height: 4, width: 4},
                  shadowOpacity: 5,
                  shadowRadius: 4,
                }}>
                <Image
                  style={{
                    height: widthPercentageToDP(30),
                    width: widthPercentageToDP(30),
                    alignSelf: 'center',
                    marginTop: 10,
                  }}
                  source={{uri: inputs.hiddenproduct_image3?.uri}}
                />
              </View>
            ) : null}
          </View> */}
        </View>

        <View style={{marginTop: 10}}>
          <Text style={styles.text}>About you</Text>
          <View
            style={{
              borderWidth: 1,
              marginTop: 4,
              borderRadius: 6,
              borderColor: 'grey',
              height: 70,
            }}>
            <TextInput
              placeholder="Pincode"
              style={{
                paddingLeft: 10,
                fontSize: 12,
                includeFontPadding: false,
                padding: 0,
                margin: 0,
              }}
              value={inputs.aboutus}
              onChangeText={val => handleInputs('aboutus', val)}
              multiline
            />
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={styles.text}>Number of employees</Text>
          <View style={{alignItems: 'flex-start'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                status={inputs.NoofEmployee == 1 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('NoofEmployee', 1)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text>Upto 10 employees</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                status={inputs.NoofEmployee == 2 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('NoofEmployee', 2)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text>11-25 employees</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                status={inputs.NoofEmployee == 3 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('NoofEmployee', 3)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text>26-35 employees</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                status={inputs.NoofEmployee == 4 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('NoofEmployee', 4)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text>36-50 employees</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                status={inputs.NoofEmployee == 5 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('NoofEmployee', 5)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text>Above 50 employees</Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={styles.text}>Upload Showroom Images (upto 3):</Text>
          <View>
            <View style={styles.sView}>
              <TouchableOpacity
                onPress={() => handleImageUpload('showroom_image')}
                style={styles.sTouch}>
                <Text style={{color: '#fff'}}>Choose File</Text>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '70%',
                }}>
                {inputs.showroom_image.length <= 0 ? (
                  <Text>No File Choosen</Text>
                ) : (
                  <Text>
                    {
                      inputs.showroom_image[inputs.showroom_image.length - 1]
                        ?.name
                    }
                  </Text>
                )}
              </View>
            </View>
            <FlatList
              data={inputs.showroom_image}
              horizontal
              style={{marginTop: 10}}
              renderItem={({item}) => {
                console.log('thjos os called', item);
                return (
                  <View
                    style={{
                      height: widthPercentageToDP(30),
                      width: widthPercentageToDP(30),
                      elevation: 5,
                      shadowColor: 'black',
                      shadowOffset: {height: 4, width: 4},
                      shadowOpacity: 5,
                      shadowRadius: 4,
                      marginHorizontal: widthPercentageToDP(2),
                    }}>
                    <Image
                      style={{height: '100%', width: '100%'}}
                      source={{uri: item.uri}}
                    />
                  </View>
                );
              }}
            />
          </View>
          {/* <View style={styles.sView}>
            <TouchableOpacity
              onPress={() => uploadShowroom2('photo')}
              style={styles.sTouch}>
              <Text style={{color: '#fff'}}>Choose File</Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '70%',
              }}>
              {showroom2 == '' ? (
                <Text>No File Choosen</Text>
              ) : (
                <Text>{showroom2}</Text>
              )}
            </View>
          </View> */}
          {/* <View style={styles.sView}>
            <TouchableOpacity
              onPress={() => uploadShowroom3('photo')}
              style={styles.sTouch}>
              <Text style={{color: '#fff'}}>Choose File</Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '70%',
              }}>
              {showroom3 == '' ? (
                <Text>No File Choosen</Text>
              ) : (
                <Text>{showroom3}</Text>
              )}
            </View>
          </View> */}
        </View>

        <View style={{marginTop: 10}}>
          <Text style={styles.text}>Upload Owner images:</Text>
          <View>
            <View>
              <View style={styles.uploadView}>
                <TouchableOpacity
                  onPress={() => handleImageUpload('hiddenowner_image1')}
                  style={styles.grey}>
                  <Text style={{color: '#fff'}}>Choose File</Text>
                </TouchableOpacity>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '70%',
                  }}>
                  {inputs.hiddenowner_image1?.name == '' ? (
                    <Text>No File Choosen</Text>
                  ) : (
                    <Text>{inputs.hiddenowner_image1?.name}</Text>
                  )}
                </View>
              </View>
              {inputs.hiddenowner_image1?.uri ? (
                <View
                  style={{
                    elevation: 5,
                    shadowColor: 'black',
                    shadowOffset: {height: 4, width: 4},
                    shadowOpacity: 5,
                    shadowRadius: 4,
                  }}>
                  <Image
                    style={{
                      height: widthPercentageToDP(30),
                      width: widthPercentageToDP(30),
                      alignSelf: 'center',
                      marginTop: 10,
                    }}
                    source={{uri: inputs.hiddenowner_image1?.uri}}
                  />
                </View>
              ) : null}
            </View>
            <TextInput
              placeholder="Owner Name"
              style={{
                borderWidth: 1,
                marginTop: 4,
                height: 40,
                borderRadius: 6,
                borderColor: 'grey',
                paddingLeft: 10,
              }}
              value={inputs.owner_name1}
              onChangeText={val => handleInputs('owner_name1', val)}
            />
            <View style={styles.multiline}>
              <TextInput
                placeholder="Write about owner description"
                style={styles.input}
                multiline
                value={inputs.owner_description1}
                onChangeText={val => handleInputs('owner_description1', val)}
              />
            </View>
          </View>
          <View style={{marginTop: 5}}>
            <View>
              <View style={styles.uploadView}>
                <TouchableOpacity
                  onPress={() => handleImageUpload('hiddenowner_image2')}
                  style={styles.grey}>
                  <Text style={{color: '#fff'}}>Choose File</Text>
                </TouchableOpacity>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '70%',
                  }}>
                  {inputs.hiddenowner_image2?.name == '' ? (
                    <Text>No File Choosen</Text>
                  ) : (
                    <Text>{inputs.hiddenowner_image2?.name}</Text>
                  )}
                </View>
              </View>
              {inputs.hiddenowner_image2?.uri != '' ? (
                <View
                  style={{
                    elevation: 5,
                    shadowColor: 'black',
                    shadowOffset: {height: 4, width: 4},
                    shadowOpacity: 5,
                    shadowRadius: 4,
                  }}>
                  <Image
                    style={{
                      height: widthPercentageToDP(30),
                      width: widthPercentageToDP(30),
                      alignSelf: 'center',
                      marginTop: 10,
                    }}
                    source={{uri: inputs.hiddenowner_image2?.uri}}
                  />
                </View>
              ) : null}
            </View>
            <TextInput
              placeholder="Owner Name"
              style={{
                borderWidth: 1,
                marginTop: 4,
                height: 40,
                borderRadius: 6,
                borderColor: 'grey',
                paddingLeft: 10,
              }}
              value={inputs.owner_name2}
              onChangeText={val => handleInputs('owner_name2', val)}
            />
            <View style={styles.multiline}>
              <TextInput
                placeholder="Write about owner description"
                style={styles.input}
                multiline
                value={inputs.owner_description2}
                onChangeText={val => handleInputs('owner_description2', val)}
              />
            </View>
          </View>
          <View style={{marginTop: 5}}>
            <View>
              <View style={styles.uploadView}>
                <TouchableOpacity
                  onPress={() => handleImageUpload('hiddenowner_image3')}
                  style={styles.grey}>
                  <Text style={{color: '#fff'}}>Choose File</Text>
                </TouchableOpacity>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '70%',
                  }}>
                  {inputs.hiddenowner_image3?.name == '' ? (
                    <Text>No File Choosen</Text>
                  ) : (
                    <Text>{inputs.hiddenowner_image3?.name}</Text>
                  )}
                </View>
              </View>
              {inputs.hiddenowner_image3?.uri ? (
                <View
                  style={{
                    elevation: 5,
                    shadowColor: 'black',
                    shadowOffset: {height: 4, width: 4},
                    shadowOpacity: 5,
                    shadowRadius: 4,
                  }}>
                  <Image
                    style={{
                      height: widthPercentageToDP(30),
                      width: widthPercentageToDP(30),
                      alignSelf: 'center',
                      marginTop: 10,
                    }}
                    source={{uri: inputs.hiddenowner_image3?.uri}}
                  />
                </View>
              ) : null}
            </View>
            <TextInput
              placeholder="Owner Name"
              style={{
                borderWidth: 1,
                marginTop: 4,
                height: 40,
                borderRadius: 6,
                borderColor: 'grey',
                paddingLeft: 10,
              }}
              value={inputs.owner_name3}
              onChangeText={val => handleInputs('owner_name3', val)}
            />
            <View style={styles.multiline}>
              <TextInput
                placeholder="Write about owner description"
                style={styles.input}
                multiline
                value={inputs.owner_description3}
                onChangeText={val => handleInputs('owner_description3', val)}
              />
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => handleOnSumit()}
            style={{
              height: 40,
              width: '100%',
              backgroundColor: '#032e63',
              marginTop: 20,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 15}}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 40}} />
      </ScrollView>
    );
  };
  if (details) {
    return (
      <View style={{flex: 1, backgroundColor: '#f0eeef'}}>
        <Header
          source={require('../../../assets/L.png')}
          title={'Edit Profile '}
          onPress={() => navigation.goBack()}
        />
        {fetching ? <Loading /> : null}
        {renderScreen()}
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, backgroundColor: '#f0eeef'}}>
        <Header
          source={require('../../../assets/L.png')}
          title={'Edit Profile '}
          onPress={() => navigation.goBack()}
        />
        <Loading />
      </View>
    );
  }
};
export default EditSupplierProfile;

const items = [
  {
    id: '1',
    name: 'Custom Purity',
  },
  {
    id: '2',
    name: '585 (14k)',
  },
  {
    id: '3',
    name: '750 (18k)',
  },
  {
    id: '4',
    name: '916 (22k)',
  },
];
const items1 = [
  {id: '1', name: 'Custom purity'},
  {id: '2', name: 'I-FG'},
  {id: '3', name: 'IF'},
  {id: '4', name: 'SI-FG'},
  {id: '5', name: 'SI-GH'},
  {id: '6', name: 'SI-I-FG'},
  {id: '7', name: 'SI-I-GH'},
  {id: '8', name: 'VS-EF'},
  {id: '9', name: 'VS-FG'},
  {id: '10', name: 'VS-GH'},
  {id: '11', name: 'VS-SI-EF'},
  {id: '12', name: 'VS-SI-FG'},
  {id: '13', name: 'VS-SI-GH'},
  {id: '14', name: 'VVS-EF'},
  {id: '15', name: 'VVS-FG'},
  {id: '16', name: 'VVS-VS-EF'},
  {id: '17', name: 'VVS-VS-FG'},
  {id: '18', name: 'VVS-VS-GH'},
];
const items2 = [
  {id: '1', name: 'Custom purity'},
  {id: '2', name: '950'},
];
const items3 = [
  {id: '1', name: 'Custom purity'},
  {id: '2', name: '92'},
];
