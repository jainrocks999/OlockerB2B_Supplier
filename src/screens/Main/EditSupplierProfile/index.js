import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { RadioButton } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import MultiSelect from 'react-native-multiple-select';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/Loader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { Image } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FlatList } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
let goldSpecilization = [];
let diamondSpecilization = [];
let silverSpecilization = [];
let platinumSpecilization = [];
const EditSupplierProfile = ({ route }) => {
  const navigation = useNavigation();
  const supplierProfile = useSelector(
    state => state.Supplier?.SupplierDetail?.data,
  );

  const details = route.params?.selector?.supplierdetails[0];
  const [fetching, setFetching] = useState(false);
  const getImages = type => {
    const newArr = supplierProfile?.supplierimagedetails?.filter(
      item => item.Type == type,
    );

    return newArr;
  };
  const productImage = getImages('Product Image');

  const showroomImage = getImages('ShowRoom Image');
  const supplierLogo = getImages('Logo');
  const ownerImage = getImages('Owner Image');

  const [customPurityDia, setCustomPurityDia] = useState(false);
  const [customPurityGo, setCustomPurityGo] = useState(false);
  const [customPurityPla, setCustomPurityPla] = useState(false);
  const [customPuritySil, setCustomPuritySil] = useState(false);

  const [diamondSpecilization1,setdiamondSpecilization]=useState()

  const stateList1 = useSelector(state => state.State.StateList);
  const stateList = stateList1?.satates;
  const cityList1 = useSelector(state => state.City.CityList);
  const cityList2 = useSelector(state => state.State.city);
  const cityList = cityList1?.cities;
  const dispatch = useDispatch();




  function getNonNullableValues(supplierjewellerydetails) {
    const jewelleryPurityArray = [];
    const specialisationArray = [];

    supplierjewellerydetails.forEach(item => {
      if (item.JewelleryPurity !== null) {
        jewelleryPurityArray.push(item.JewelleryPurity);
      }
      if (item.Specialisation !== null) {
        specialisationArray.push(item.Specialisation);
      }
    });
  }





  function getSupplier(type) {
    return !!supplierProfile?.supplierjewellerydetails?.find(item => item.JewelleryType == type);
  }
  useEffect(() => {
    getNonNullableValues(supplierProfile?.supplierjewellerydetails)
    route.params?.selector?.specialisation.map(item => {
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
     setdiamondSpecilization(diamondSpecilization)
  }, []);
  const getShowroom = () => {
    let arr = [];
    showroomImage?.map(item => {
      let obj;
      obj = {
        name: item?.ImageName,
        uri: `https://olocker.co/uploads/supplier/${item?.ImageName}`,
        type: 'image/jpg',
      };
      arr.push(obj);
    });
    return arr;
  };


  const getSelected = array => {
  
    var result = array.reduce((unique, o) => {
      if(!unique.some(obj => obj.name === o.name && obj.value === o.value)) {
        unique.push(o);
      }
      return unique;
  },[]);
    return result.map(item => item.value);
  
  };

  const getSelected2 = array => {

    var result = array.reduce((unique, o) => {
      if(!unique.some(obj =>parseInt(obj.name) === parseInt(o.name) && parseInt(obj.value) === parseInt(o.value))) {
        unique.push(o);
      }
      return unique;
  },[]);
  return result.map(item => {
    if (isNaN(item.value)) {
      return item.value;
    } else {
      return parseInt(item.value);
    }
  });
    // return result.map(item => parseInt(item.value));
   
    // return []
    // array.map(item => parseInt(item.value));
  };
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
    // JTyped: getSupplier('Diamond'),
    // JTypeg: getSupplier('Gold'),
    // JTypep: getSupplier('Platinum'),
    // JTypes: getSupplier('Silver'),
    JTyped: route?.params?.selector?.typeOfjewellery?.isDaimondChecked == 'Diamond',
    JTypeg: route?.params?.selector?.typeOfjewellery?.isGoldChecked == 'Gold',
    JTypep: route?.params?.selector?.typeOfjewellery?.isPlatinumChecked == 'Platinum',
    JTypes: route?.params?.selector?.typeOfjewellery?.isSilverChecked == 'Silver',

    diamond_purity: getSelected2(route?.params?.selector?.typeOfjewellery?.isDiamond),
    diamond_specialisation: getSelected(
      route?.params?.selector?.typeOfjewellery?.isDiamondSpecialization,
    ),
    gold_purity: getSelected2(route?.params?.selector?.typeOfjewellery?.isGold),
    gold_specialisation: getSelected(
      route?.params?.selector?.typeOfjewellery?.isGoldSpecialization,
    ),
    silver_purity: getSelected2(route?.params?.selector?.typeOfjewellery?.isSilver),
    silver_specialisation: getSelected(
      route?.params?.selector?.typeOfjewellery?.isSilverSpecialization,
    ),
    platinum_specialisation: getSelected(
      route?.params?.selector?.typeOfjewellery?.isPlatinumSpecialization,
    ),
    platinum_purity: getSelected2(route?.params?.selector?.typeOfjewellery?.isPlatinum),
    goldcustom_purity: route?.params?.selector?.typeOfjewellery?.isGoldCpVal,
    diamondcustom_purity: route?.params?.selector?.typeOfjewellery?.isDiamondCpVal,
    platinumcustom_purity: route?.params?.selector?.typeOfjewellery?.isPlatinumCpVal,
    silvercustom_purity: route?.params?.selector?.typeOfjewellery?.isSilverCpVal,
    DiamondQuality: details.DiamondQuality,
    IsActive: details?.IsActive ? true : false,
    IsDefaultSupplier: details?.IsDefaultSupplier == 1 ? true : false,
    logo: {
      name: supplierLogo[0]?.ImageName,
      type: 'image/jpg',
      uri: `https://olocker.co/uploads/supplier/${supplierLogo[0]?.ImageName}`,
    },
    aboutus: '',
    NoofEmployee: details?.NoofEmployee,
    EmailId: 'tested@gmail.com',
    showroom_image: getShowroom(),
  });


  useEffect(() => {
    if (inputs.gold_purity.includes('Custom purity')) {
      handleInputs('goldcustom_purity', route?.params?.selector?.typeOfjewellery?.isGoldCpVal);
      setCustomPurityGo(true);
    } else {
      setCustomPurityGo(false);
      handleInputs('goldcustom_purity', '');
    }
  }, [inputs.gold_purity]);

  useEffect(() => {
    if (inputs.diamond_purity.includes('Custom purity')) {
      handleInputs('diamondcustom_purity', route?.params?.selector?.typeOfjewellery?.isDiamondCpVal);
      setCustomPurityDia(true);
    } else {
      setCustomPurityDia(false);
      handleInputs('diamondcustom_purity', '');
    }
  }, [inputs.diamond_purity]);

  useEffect(() => {
    if (inputs.platinum_purity.includes('Custom purity')) {
      handleInputs('platinumcustom_purity', route?.params?.selector?.typeOfjewellery?.isPlatinumCpVal);
      setCustomPurityPla(true);
    } else {
      setCustomPurityPla(false);
      handleInputs('platinumcustom_purity', '');
    }
  }, [inputs.platinum_purity]);

  useEffect(() => {
    if (inputs.silver_purity.includes('Custom purity')) {
     
      handleInputs('silvercustom_purity', route?.params?.selector?.typeOfjewellery?.isSilverCpVal);
      setCustomPuritySil(true);
    } else {
      setCustomPuritySil(false);
      handleInputs('silvercustom_purity', '');
    }
  }, [inputs.silver_purity]);
  


  const handleInputs = (key, value) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };
  const handleOnSumit = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    // const Token = await AsyncStorage.getItem('loginToken');
    // // const newData = { ...inputs, SrNo: user_id };

    if(inputs.SupplierName=='' || inputs.SupplierName==null){
        Toast.show('Please enter supplier name')
    }
    else if(inputs.ContactPersonName=='' || inputs.ContactPersonName==null){
        Toast.show('Please enter contact person name')
    }
    else if(inputs.MobileNo=='' || inputs.ContactPersonName==null){
        Toast.show('Please enter mobile number')
    }
    else if(inputs.Address=='' || inputs.Address==null){
        Toast.show('Please enter address')
    }
    else if(inputs.StateId=='' || inputs.StateId==null){
        Toast.show('Please select state name')
    }
    else if(inputs.CityId=='' || inputs.CityId==null){
      Toast.show('Please select city name')
    }
    else if(inputs.SupplierType=='' || inputs.SupplierType==null){
       Toast.show('Please tell us what are you')
    }
    
    else if(inputs.JTyped && inputs.diamond_purity.length <= 0){
      Toast.show('Please select diamond purity ');
    }
    else if(inputs.JTyped && inputs.diamond_specialisation.length <= 0){
      Toast.show('Please select diamond specialisation ');
    }
    else if(inputs.JTyped && inputs.diamond_purity.includes('Custom purity') && inputs.diamondcustom_purity == ''){
      Toast.show('Please enter diamond custom purity ');
    }
    // else if (inputs.JTyped) {
    //   if (inputs.diamond_purity.length <= 0) {
    //     Toast.show('please select diamond purity ');
    //   }
    //   if (inputs.diamond_specialisation.length <= 0) {
    //     Toast.show('please select diamond specialisation ');
    //   }
    //   if (inputs.diamond_purity.includes('Custom purity')) {
    //     if (inputs.diamondcustom_purity == '') {
    //       Toast.show('please Diamond Custom purity ');
    //     }
    //   }
    // }
    else if(inputs.JTypeg && inputs.gold_purity.length <= 0){
      Toast.show('Please select gold purity ');
    }
    else if(inputs.JTypeg && inputs.gold_specialisation.length <= 0){
      Toast.show('Please select gold specialisation ');
    }
    else if(inputs.JTypeg && inputs.gold_purity.includes('Custom purity') && inputs.goldcustom_purity == ''){
      Toast.show('Please enter gold custom purity ');
    }
    //  else if (inputs.JTypeg) {
    //   if (inputs.gold_purity.length <= 0) {
    //     Toast.show('please select gold purity ');
    //   }
    //   if (inputs.gold_specialisation.length <= 0) {
    //     Toast.show('please select gold specialisation ');
    //   }
    //   if (inputs.gold_purity.includes('Custom purity')) {
    //     if (inputs.goldcustom_purity == '') {
    //       Toast.show('please Gold Custom purity ');
    //     }
    //   }
    // } 
    else if(inputs.JTypep && inputs.platinum_purity.length <= 0){
      Toast.show('Please select platinum purity ');
    }
    else if(inputs.JTypep && inputs.platinum_specialisation.length <= 0){
      Toast.show('Please select platinum specialisation ');
    }
    else if(inputs.JTypep && inputs.platinum_purity.includes('Custom purity') && inputs.platinumcustom_purity == ''){
      Toast.show('Please enter platinum custom purity ');
    }

    // else if (inputs.JTypep) {
    //   if (inputs.platinum_purity.length <= 0) {
    //     Toast.show('please select platinum purity ');
    //   }
    //   if (inputs.platinum_specialisation.length <= 0) {
    //     Toast.show('please select platinum specialisation ');
    //   }
    //   if (inputs.platinum_purity.includes('Custom purity')) {
    //     if (inputs.platinumcustom_purity == '') {
    //       Toast.show('please Platinum Custom purity ');
    //     }
    //   }
    // }
    else if(inputs.JTypes && inputs.silver_purity.length <= 0){
      Toast.show('Please select silver purity ');
    }
    else if(inputs.JTypes && inputs.silver_specialisation.length <= 0){
      Toast.show('Please select silver specialisation ');
    }
    else if(inputs.JTypes && inputs.silver_purity.includes('Custom purity') && inputs.silvercustom_purity == ''){
      Toast.show('Please enter silver custom purity ');
    }
    else if(inputs.DiamondQuality && Number.isInteger(parseFloat(inputs.DiamondQuality))){
      Toast.show('Please enter a correct number, format 0.00')
    }
   
    //  else if (inputs.JTypes) {
    //   if (inputs.silver_purity.length <= 0) {
    //     Toast.show('please select silver purity ');
    //   }
    //   if (inputs.silver_specialisation.length <= 0) {
    //     Toast.show('please select silver specialisation ');
    //   }
    //   if (inputs.silver_purity.includes('Custom purity')) {
    //     if (inputs.silvercustom_purity == '') {
    //       Toast.show('please Silver Custom purity ');
    //     }
    //   }
    // }
   else{
    setFetching(true)
    let data = new FormData();
    data.append('SrNo',user_id)
    data.append('logo', inputs.logo);
    data.append('SupplierName', inputs.SupplierName);
    data.append('ContactPersonName', inputs.ContactPersonName);
    data.append('Address', inputs.Address);
    data.append('MobileNo', inputs.MobileNo);
    data.append('StateId', inputs.StateId);
    data.append('CityId', inputs.CityId);
    data.append('Pincode', inputs.Pincode);
    data.append('Website', inputs.Website);
    data.append('EmailId', inputs.EmailId);
    data.append('SupplierType', inputs.SupplierType);
    data.append('IsActive', 1);
    data.append('IsDefaultSupplier', inputs.IsDefaultSupplier);
    data.append('DiamondQuality',inputs.DiamondQuality)
    inputs['diamond_purity'].map((items, index) => {
      console.log(`diamond_purity[${index}]`, items);
    });
    inputs['diamond_purity'].map((items, index) => {
      data.append(`diamond_purity[${index}]`, items);
    });
    inputs['diamond_specialisation'].map((items, index) => {
      data.append(`diamond_specialisation[${index}]`, items);
    });

    data.append(`diamondcustom_purity`, inputs.diamondcustom_purity);
    data.append(`goldcustom_purity`, inputs.goldcustom_purity);
    data.append(`platinumcustom_purity`, inputs.platinumcustom_purity);
    data.append(`silvercustom_purity`, inputs.silvercustom_purity);

    inputs['gold_purity'].map((items, index) => {
      data.append(`gold_purity[${index}]`, items);
    });

    inputs['silver_purity'].map((items, index) => {
      data.append(`silver_purity[${index}]`, items);
    });

    inputs['platinum_purity'].map((items, index) => {
      data.append(`platinum_purity[${index}]`, items);
    });


    inputs['gold_specialisation'].map((items, index) => {
      data.append(`gold_specialisation[${index}]`, items);
    });

    inputs['silver_specialisation'].map((items, index) => {
      data.append(`silver_specialisation[${index}]`, items);
    });

    inputs['platinum_specialisation'].map((items, index) => {
      data.append(`platinum_specialisation[${index}]`, items);
    });

    inputs['showroom_image'].map((items, index) => {
      data.append(`showroom_image[${index}]`, items);
    });

    data.append('JTyped', inputs.JTyped ? 'Diamond' : '');

    data.append('JTypep', inputs.JTypep ? 'Platinum' : '');

    data.append('JTypeg', inputs.JTypeg ? 'Gold' : '');

    data.append('JTypes', inputs.JTypes ? 'Silver' : '');

    data.append('IsAnyBranch', inputs.IsAnyBranch ? 'on' : 'off');

    data.append('NoofEmployee', inputs.NoofEmployee)

    data.append('aboutus',inputs.aboutus)

    productImages.map((item, index) => {
      data.append(
        `hiddenproduct_image${index + 1}`,
        item[`hiddenproduct_image${index + 1}`],
      );
      data.append(
        `hiddenproduct_id${index + 1}`,
        item[`hiddenproduct_id${index + 1}`],
      );
      data.append(`product_name${index + 1}`, item[`product_name${index + 1}`]);
    });
    ownerImages.map((item, index) => {
      data.append(
        `hiddenowner_image${index + 1}`,
        item[`hiddenowner_image${index + 1}`],
      );
      data.append(
        `hiddenowner_id${index + 1}`,
        item[`hiddenowner_id${index + 1}`],
      );
      data.append(`owner_name${index + 1}`, item[`owner_name${index + 1}`]);
      data.append(
        `owner_description${index + 1}`,
        item[`owner_description${index + 1}`],
      );
    });
    console.log('this is working',data);
    validateUser(data);
  }

    // Object.keys(newData).map(item => {
    //   setFetching(true);
    //   switch (item) {
    //     case 'logo':
    //       data.append(item, newData[item]);
    //       break;
    //     case 'SupplierName': {
    //       if (newData[item] == '') {
    //         Toast.show('Please enter supplier name');
    //         return;
    //       }
    //       data.append(item, newData[item]);
    //       break;
    //     }
    //     case 'ContactPersonName': {
    //       if (newData[item] == '') {
    //         Toast.show('Please enter contact person name');
    //         return;
    //       }
    //       data.append(item, newData[item]);
    //       break;
    //     }
    //     case 'Address': {
    //       if (newData[item] == '') {
    //         Toast.show('Please enter full address');
    //         return;
    //       }
    //       data.append(item, newData[item]);
    //       break;
    //     }
    //     case 'MobileNo': {
    //       if (newData[item] == '') {
    //         Toast.show('Please enter mobile number');
    //         return;
    //       }
    //       data.append(item, newData[item]);
    //       break;
    //     }
    //     case 'StateId': {
    //       if (newData[item] == '') {
    //         Toast.show('Please select State name');
    //         return;
    //       }
    //       data.append(item, newData[item]);
    //       break;
    //     }
    //     case 'StateId': {
    //       if (newData[item] == '') {
    //         Toast.show('Please select State name');
    //         return;
    //       }
    //       data.append(item, newData[item]);
    //       break;
    //     }
    //     case 'CityId': {
    //       if (newData[item] == '') {
    //         Toast.show('Please select city name');
    //         return;
    //       }
    //       data.append(item, newData[item]);
    //       break;
    //     }
    //     case 'IsActive':
    //       data.append(item, newData[item] ? 'on' : 'off');
    //       break;
    //     case 'IsDefaultSupplier':
    //       data.append(item, newData[item] ? 'on' : 'off');
    //       break;
    //     case 'diamond_purity':

    //       newData[item].map((items, index) => {
    //         data.append(`diamond_purity[${index}]`, items);
    //       });
    //       break;
    //     case 'diamond_specialisation':
    //       newData[item].map((items, index) => {

    //         data.append(`diamond_specialisation[${index}]`, items);
    //       });
    //       break;
    //     case 'diamondcustom_purity':
    //       data.append(`diamondcustom_purity`, newData[item]);
    //       break;
    //     case 'gold_purity':
    //       newData[item].map((items, index) => {
    //         data.append(`gold_purity[${index}]`, items);
    //       });
    //       break;
    //     case 'silver_purity':
    //       newData[item].map((items, index) => {
    //         data.append(`silver_purity[${index}]`, items);
    //       });
    //       break;
    //     case 'platinum_purity':
    //       newData[item].map((items, index) => {
    //         data.append(`platinum_purity[${index}]`, items);
    //       });

    //       break;
    //     case 'gold_specialisation':
    //       newData[item].map((items, index) => {
    //         data.append(`gold_specialisation[${index}]`, items);
    //       });
    //       break;
    //     case 'silver_specialisation':
    //       newData[item].map((items, index) => {
    //         data.append(`silver_specialisation[${index}]`, items);
    //       });
    //       break;
    //     case 'platinum_specialisation':
    //       newData[item].map((items, index) => {
    //         data.append(`platinum_specialisation[${index}]`, items);
    //       });
    //       break;
    //     case 'showroom_image':
    //       newData[item].map((items, index) => {
    //         data.append(`showroom_image[${index}]`, items);
    //       });
    //       break;
    //     case 'JTyped':
    //       data.append(item, newData[item] ? 'Diamond' : '');
    //       break;
    //     case 'JTypep':
    //       data.append(item, newData[item] ? 'Platinum' : '');
    //       break;
    //     case 'JTypeg':
    //       data.append(item, newData[item] ? 'Gold' : '');
    //       break;
    //     case 'JTypes':
    //       data.append(item, newData[item] ? 'Silver' : '');
    //       break;
    //     case 'IsAnyBranch':
    //       data.append(item, newData[item] ? 'on' : 'off');
    //       break;
    //     default:
    //       data.append(item, newData[item]);
    //   }
    // });
   
  };

  const validateUser = async data => {
    const Token = await AsyncStorage.getItem('loginToken');
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

      if (response.data.status) {
        setFetching(false);
        Toast.show(response.data.msg);
        navigation.goBack()
      } else {
        setFetching(false);
        Toast.show(response.data.msg);
      }
    } catch (error) {
      Toast.show('Something went wrong');
      setFetching(false);
    }
  };
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
        case 'showroom_image': {
          response.assets.map(item => {
            let obj2 = {
              name: item.fileName?.replace(/^rn_image_picker_lib_temp_/, ''),
              type: item.type,
              uri: item.uri,
            };

            arr.push(obj2);
          });
          handleInputs('showroom_image', arr);
          break;
        }

        default:
          return;
      }
    });
  };

  const getSpecilization = data => {
    let arr = [];
    data?.map((item, index) => {
      let obj = { id: item?.SrNo, name: item?.name };
      arr.push(obj);
    });
    return arr;
  };

  const getOwnerImage = data => {
    const obj = {
      name: data?.ImageName,
      type: 'image/jpg',
      uri: `https://olocker.co/uploads/supplier/${data?.ImageName}`,
    };
    return obj;
  };

  const manageCity = stateId => {
    dispatch({
      type: 'city_list_request',
      url: 'getCities',
      stateId,
    });
  };
  const setPrevProduct = type => {
    let arr = [];

    productImage?.map((item, index) => {
      let obj = {};
      obj[`hiddenproduct_image${index + 1}`] = {
        name: item?.ImageName,
        uri: `https://olocker.co/uploads/supplier/${item?.ImageName}`,
        type: 'image/jpg',
      };
      obj[`product_name${index + 1}`] = item?.OwnerName;
      obj[`hiddenproduct_id${index + 1}`] = item?.SrNo;
      arr.push(obj);
    });

    return arr;
  };

  const setPrevOwner = type => {
    let arr = [];

    ownerImage?.map((item, index) => {
      let obj = {};
      obj[`hiddenowner_image${index + 1}`] = {
        name: item?.ImageName,
        uri: `https://olocker.co/uploads/supplier/${item?.ImageName}`,
        type: 'image/jpg',
      };
      obj[`owner_name${index + 1}`] = item?.OwnerName;
      obj[`owner_description${index + 1}`] = item?.Description;
      obj[`hiddenowner_id${index + 1}`] = item?.SrNo;
      arr.push(obj);
    });

    return arr;
  };

  const [productImages, setProductImages] = useState(setPrevProduct('image'));
  const [ownerImages, setOwnerImages] = useState(setPrevOwner('image'));

  const handleProductImages = (index, types) => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      selectionLimit: 1,
    };
    let updatedArray = [...productImages];

    if (types == 'image') {
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
        let updatedObj = {};
        updatedObj = {
          [`hiddenproduct_image${index + 1}`]: {
            uri: response.assets[0].uri,
            name: response?.assets[0]?.fileName?.replace(
              /^rn_image_picker_lib_temp_/,
              '',
            ),
            type: response.assets[0].type,
          },

          [`product_name${index + 1}`]:
            productImages[index][`product_name${index + 1}`],
          [`hiddenproduct_id${index + 1}`]:
            productImages[index][`hiddenproduct_id${index + 1}`],
        };
        updatedArray[index] = { ...updatedObj };
        setProductImages(updatedArray);
      });
    } else {
      let updatedObj = {};
      updatedObj = {
        [`hiddenproduct_image${index + 1}`]:
          productImages[index][`hiddenproduct_image${index + 1}`],
        [`product_name${index + 1}`]: types,
        [`hiddenproduct_id${index + 1}`]:
          productImages[index][`hiddenproduct_id${index + 1}`],
      };

      updatedArray[index] = { ...updatedObj };

      setProductImages(updatedArray);
    }
  };
  const handleOwnerImages = (index, types, type2) => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      selectionLimit: 1,
    };
    let updatedArray = [...ownerImages];

    if (types == 'image') {
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
        let updatedObj = {};
        updatedObj = {
          [`hiddenowner_image${index + 1}`]: {
            uri: response.assets[0].uri,
            name: response?.assets[0]?.fileName?.replace(
              /^rn_image_picker_lib_temp_/,
              '',
            ),
            type: response.assets[0].type,
          },

          [`owner_name${index + 1}`]:
            ownerImages[index][`owner_name${index + 1}`],
          [`owner_description${index + 1}`]:
            ownerImages[index][`owner_description${index + 1}`],
          [`hiddenowner_id${index + 1}`]:
            ownerImages[index][`hiddenowner_id${index + 1}`],
        };
        updatedArray[index] = { ...updatedObj };
        setOwnerImages(updatedArray);
      });
    } else if (type2 == 'name') {
      let updatedObj = {};
      updatedObj = {
        [`hiddenowner_image${index + 1}`]:
          ownerImages[index][`hiddenowner_image${index + 1}`],
        [`owner_name${index + 1}`]: types,
        [`owner_description${index + 1}`]:
          ownerImages[index][`owner_description${index + 1}`],
        [`hiddenowner_id${index + 1}`]: ownerImages[index][`-${index + 1}`],
      };
      updatedArray[index] = { ...updatedObj };
      setOwnerImages(updatedArray);
    } else {
      let updatedObj = {};
      updatedObj = {
        [`hiddenowner_image${index + 1}`]:
          ownerImages[index][`hiddenowner_image${index + 1}`],
        [`owner_name${index + 1}`]:
          ownerImages[index][`owner_name${index + 1}`],
        [`owner_description${index + 1}`]: types,
        [`hiddenowner_id${index + 1}`]:
          ownerImages[index][`hiddenowner_id${index + 1}`],
      };

      updatedArray[index] = { ...updatedObj };

      setOwnerImages(updatedArray);
    }
  };

  const renderScreen = () => {
    return (
      <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
        <View>
          <Text style={styles.text}>
            Supplier Name<Text style={{ color: 'red' }}>{' *'}</Text>
          </Text>
          <TextInput
            placeholder="Supplier Name"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10, color: 'black'
            }}
            placeholderTextColor={'grey'}
            value={inputs.SupplierName}
            onChangeText={val => handleInputs('SupplierName', val)}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>
            Contact Person Name<Text style={{ color: 'red' }}>{' *'}</Text>
          </Text>
          <TextInput
            placeholder="Contact Person Name"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10, color: '#000'
            }}
            placeholderTextColor={'grey'}
            value={inputs.ContactPersonName}
            onChangeText={val => handleInputs('ContactPersonName', val)}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>
            Mobile No.<Text style={{ color: 'red' }}>{' *'}</Text>
          </Text>
          <TextInput
            placeholder="Mobile No."
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10, color: '#000'
            }}
            placeholderTextColor={'grey'}
            value={inputs.MobileNo}
            onChangeText={val => handleInputs('MobileNo', val)}
            keyboardType='numeric'
            maxLength={10}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>
            Address<Text style={{ color: 'red' }}>{' *'}</Text>
          </Text>
          <TextInput
            placeholder="Address"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10, color: '#000'
            }}
            placeholderTextColor={'grey'}
            value={inputs.Address}
            onChangeText={val => handleInputs('Address', val)}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>
            State<Text style={{ color: 'red' }}>{' *'}</Text>
          </Text>
          <View style={{}}>
            <Dropdown
              style={[
                styles.dropdown,
                { borderWidth: 1, borderColor: '#979998' },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={stateList1?.satates}
              itemTextStyle={{ color: '#000' }}
              inputSearchStyle={{
                borderRadius: 10,
                color: '#474747',
                backgroundColor: '#f0f0f0'
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
        <View style={{ marginTop: 0 }}>
          <Text style={styles.text}>
            City<Text style={{ color: 'red' }}>{' *'}</Text>
          </Text>
          <View>
            <Dropdown
              style={[
                styles.dropdown,
                { borderWidth: 1, borderColor: '#979998' },
              ]}
              search
              searchPlaceholder="search.."
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={cityList2 ? cityList2 : cityList ? cityList : []}
              maxHeight={250}
              labelField="label"
              valueField="value"
              placeholder="City"
              value={inputs.CityId}
              onChange={item => {
                handleInputs('CityId', item.value);
              }}
              itemTextStyle={{ color: '#000' }}
              inputSearchStyle={{
                borderRadius: 10,
                color: '#474747',
                backgroundColor: '#f0f0f0'
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 0 }}>
          <Text style={styles.text}>Pincode</Text>
          <TextInput
            placeholder="Pincode"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10, color: '#000'
            }}
            placeholderTextColor={'grey'}
            value={inputs.Pincode}
            onChangeText={val => handleInputs('Pincode', val)}
            keyboardType='numeric'
            maxLength={6}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>Website URL</Text>
          <TextInput
            placeholder="Website URL"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10, color: '#000'
            }}
            placeholderTextColor={'grey'}
            value={inputs.Website}
            onChangeText={val => handleInputs('Website', val)}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>
            Tell us what are you<Text style={{ color: 'red' }}>{' *'}</Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="first"
                status={inputs.SupplierType == 1 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('SupplierType', 1)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text style={{ color: '#000' }}>Manufacturer</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="first"
                status={inputs.SupplierType == 2 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('SupplierType', 2)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text style={{ color: '#000' }} >Wholesaler</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="first"
                status={inputs.SupplierType == 3 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('SupplierType', 3)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text style={{ color: '#000' }}>Both</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>
            Any branches you have<Text style={{ color: 'red' }}>{' *'}</Text>
          </Text>
          <CheckBox
            disabled={false}
            value={inputs.IsAnyBranch}
            onValueChange={newValue =>
              handleInputs('IsAnyBranch', !inputs.IsAnyBranch)
            }
            tintColors={{ true: '#032e63', false: '#032e63' }}
            onTintColor="#032e63"
            onCheckColor="#032e63"
            boxType="square"
            style={{ height: 16, width: 18, marginTop: 10 }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>Type of jewellery</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox
                disabled={false}
                value={inputs.JTyped}
                onValueChange={newValue => {
                  setInputs(prev => ({ ...prev, JTyped: newValue }));
                }}
                tintColors={{ true: '#032e63', false: '#032e63' }}
                onTintColor="#032e63"
                onCheckColor="#032e63"
                boxType="square"
                style={{ height: 16, width: 18 }}
              />
              <Text style={{ marginLeft: 10, color: '#000' }}>Diamond</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox
                disabled={false}
                value={inputs.JTypeg}
                onValueChange={newValue => handleInputs('JTypeg', newValue)}
                tintColors={{ true: '#032e63', false: '#032e63' }}
                onTintColor="#032e63"
                onCheckColor="#032e63"
                boxType="square"
                style={{ height: 16, width: 18 }}
              />
              <Text style={{ marginLeft: 10, color: '#000' }}>Gold</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox
                disabled={false}
                value={inputs.JTypep}
                onValueChange={newValue => handleInputs('JTypep', newValue)}
                tintColors={{ true: '#032e63', false: '#032e63' }}
                onTintColor="#032e63"
                onCheckColor="#032e63"
                boxType="square"
                style={{ height: 16, width: 18 }}
              />
              <Text style={{ marginLeft: 10, color: '#000' }}>Platinum</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox
                disabled={false}
                value={inputs.JTypes}
                onValueChange={newValue => handleInputs('JTypes', newValue)}
                tintColors={{ true: '#032e63', false: '#032e63' }}
                onTintColor="#032e63"
                onCheckColor="#032e63"
                boxType="square"
                style={{ height: 16, width: 18 }}
              />
              <Text style={{ marginLeft: 10, color: '#000' }}>Silver</Text>
            </View>
          </View>
        </View>
        {inputs.JTyped == true ? (
          <View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.text}>
                Diamond purity<Text style={{ color: 'red' }}>{' *'}</Text>
              </Text>
              <MultiSelect
                items={route?.params?.selector?.typeOfjewellery?.diamondPurityList}
                // items={[]}
                uniqueKey="value"
                onSelectedItemsChange={val => {
                  handleInputs('diamond_purity', val);
                 
                  // if (val.includes('Custom Purity')) {
                  //   setCustomPurityDia(true);
                  // } else {
                  //   setCustomPurityDia(false);
                  // }
                }}

                styleItemsContainer={{
                  height: hp(20),
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
                textInputProps={{ editable: false, autoFocus: false }}
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
              <View style={{ marginTop: 10 }}>
                <TextInput
                  placeholder="Please specify custom purity"
                  style={{
                    borderWidth: 1,
                    marginTop: 4,
                    height: 40,
                    borderRadius: 6,
                    borderColor: 'grey',
                    paddingLeft: 10, color: '#000'
                  }}
                  placeholderTextColor={'grey'}
                  keyboardType='decimal-pad'
                  value={inputs.diamondcustom_purity}
                  onChangeText={val =>
                    handleInputs('diamondcustom_purity', val)
                  }
                />
              </View>
            ) : null}
            <View style={{ marginTop: 10 }}>
              <Text style={styles.text}>
                Choose Diamond Specialisation
                <Text style={{ color: 'red' }}>{' *'}</Text>
              </Text>
              <MultiSelect
                items={getSpecilization(diamondSpecilization1)}
                uniqueKey="id"
                onSelectedItemsChange={val => {
                  handleInputs('diamond_specialisation', val)
                }
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
                textInputProps={{ editable: false, autoFocus: false }}
                styleItemsContainer={{
                  height: hp(20),
                }}
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
            <View style={{ marginTop: 10 }}>
              <Text style={styles.text}>
                Gold purity<Text style={{ color: 'red' }}>{' *'}</Text>
              </Text>
              <MultiSelect
                // items={items}
                items={
                  route?.params?.selector?.typeOfjewellery?.goldPurityList
                }
                uniqueKey="value"
                onSelectedItemsChange={val => {
                  handleInputs('gold_purity', val);
                  // if (val.includes('Custom Purity')) {
                  //   setCustomPurityGo(true);
                  // } else {
                  //   setCustomPurityGo(false);
                  // }
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
                textInputProps={{ editable: false, autoFocus: false }}
                styleItemsContainer={{
                  height: hp(20),
                }}
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
              <View style={{ marginTop: 10 }}>
                <TextInput
                  placeholder="Please specify custom purity"
                  style={{
                    borderWidth: 1,
                    marginTop: 4,
                    height: 40,
                    borderRadius: 6,
                    borderColor: 'grey',
                    paddingLeft: 10, color: '#000'
                  }}
                  placeholderTextColor={'grey'}
                  keyboardType='decimal-pad'
                  value={inputs.goldcustom_purity}
                  onChangeText={val => handleInputs('goldcustom_purity', val)}
                />
              </View>
            ) : null}
            <View style={{ marginTop: 10 }}>
              <Text style={styles.text}>
                Choose Gold Specialisation
                <Text style={{ color: 'red' }}>{' *'}</Text>
              </Text>
              <MultiSelect
                items={getSpecilization(goldSpecilization)}
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
                textInputProps={{ editable: false, autoFocus: false }}
                styleItemsContainer={{
                  height: hp(20),
                }}
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
            <View style={{ marginTop: 10 }}>
              <Text style={styles.text}>
                Platinum purity<Text style={{ color: 'red' }}>{' *'}</Text>
              </Text>
              <MultiSelect
                // items={items2}
                items={
                  route?.params?.selector?.typeOfjewellery?.platinumPurityList
                }
                uniqueKey="value"
                onSelectedItemsChange={val => {
                  handleInputs('platinum_purity', val);
                  // if (val.includes('Custom Purity')) {
                  //   setCustomPurityPla(true);
                  // } else {
                  //   setCustomPurityPla(false);
                  // }
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
                textInputProps={{ editable: false, autoFocus: false }}
                styleItemsContainer={{
                  height: hp(20),
                }}
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
              <View style={{ marginTop: 10 }}>
                <TextInput
                  placeholder="Please specify custom purity"
                  style={{
                    borderWidth: 1,
                    marginTop: 4,
                    height: 40,
                    borderRadius: 6,
                    borderColor: 'grey',
                    paddingLeft: 10, color: '#000'
                  }}
                  placeholderTextColor={'grey'}
                  keyboardType='decimal-pad'
                  value={inputs.platinumcustom_purity}
                  onChangeText={val =>
                    handleInputs('platinumcustom_purity', val)
                  }
                />
              </View>
            ) : null}
            <View style={{ marginTop: 10 }}>
              <Text style={styles.text}>
                Choose Platinum Specialisation
                <Text style={{ color: 'red' }}>{' *'}</Text>
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
                textInputProps={{ editable: false, autoFocus: false }}
                styleItemsContainer={{
                  height: hp(20),
                }}
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
            <View style={{ marginTop: 10 }}>
              <Text style={styles.text}>
                Silver purity<Text style={{ color: 'red' }}>{' *'}</Text>
              </Text>
              <MultiSelect
                // items={items3}
                items={
                  route?.params?.selector?.typeOfjewellery?.silverPurityList
                }
                uniqueKey="value"
                onSelectedItemsChange={val => {
                  handleInputs('silver_purity', val);
                  // if (val.includes('Custom Purity')) {
                  //   setCustomPuritySil(true);
                  // } else {
                  //   setCustomPuritySil(false);
                  // }
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
                textInputProps={{ editable: false, autoFocus: false }}
                styleItemsContainer={{
                  height: hp(20),
                }}
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
              <View style={{ marginTop: 10 }}>
                <TextInput
                  placeholder="Please specify custom purity"
                  style={{
                    borderWidth: 1,
                    marginTop: 4,
                    height: 40,
                    borderRadius: 6,
                    borderColor: 'grey',
                    paddingLeft: 10, color: '#000'
                  }}
                  placeholderTextColor={'grey'}
                  keyboardType='decimal-pad'
                  value={inputs.silvercustom_purity}
                  onChangeText={val => handleInputs('silvercustom_purity', val)}
                />
              </View>
            ) : null}
            <View style={{ marginTop: 10 }}>
              <Text style={styles.text}>
                Choose Silver Specialisation
                <Text style={{ color: 'red' }}>{' *'}</Text>
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
                textInputProps={{ editable: false, autoFocus: false }}
                styleItemsContainer={{
                  height: hp(20),
                }}
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
        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>Diamond quality</Text>
          <TextInput
            placeholder="Specify Your Qualities"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10, color: '#000'
            }}
            placeholderTextColor={'grey'}
            value={inputs.DiamondQuality}
            onChangeText={val => handleInputs('DiamondQuality', val)}
            keyboardType='decimal-pad'
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox
                disabled={false}
                value={inputs.IsActive}
                onValueChange={newValue => handleInputs('IsActive', newValue)}
                tintColors={{ true: '#032e63', false: '#032e63' }}
                onTintColor="#032e63"
                onCheckColor="#032e63"
                boxType="square"
                style={{ height: 16, width: 18 }}
              />
              <Text style={{ marginLeft: 10, color: '#000' }}>Is Active</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox
                disabled={false}
                value={inputs.IsDefaultSupplier}
                onValueChange={newValue =>
                  handleInputs('IsDefaultSupplier', newValue)
                }
                tintColors={{ true: '#032e63', false: '#032e63' }}
                onTintColor="#032e63"
                onCheckColor="#032e63"
                boxType="square"
                style={{ height: 16, width: 18 }}
              />
              <Text style={{ marginLeft: 10, color: '#000' }}>
                Default Supplier for all retailers
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
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
              <Text style={{ color: '#fff' }}>Choose File</Text>
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
                <Text style={{ color: 'grey' }}>{inputs.logo?.name}</Text>
              )}
            </View>
          </View>
          {inputs.logo.uri ? (
            <View
              style={{
                elevation: 5,
                shadowColor: 'black',
                shadowOffset: { height: 4, width: 4 },
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
                source={{ uri: inputs.logo?.uri }}
              />
            </View>
          ) : null}
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>Upload image of your product:</Text>
          <FlatList
            data={productImages}
            renderItem={({ item, index }) => (
              <View>
                <View style={styles.uploadView}>
                  <TouchableOpacity
                    onPress={() => handleProductImages(index, 'image')}
                    style={styles.grey}>
                    <Text style={{ color: '#fff' }}>Choose File</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '70%',
                    }}>
                    {item[`hiddenproduct_image${index + 1}`]?.name == '' ||
                      undefined ? (
                      <Text style={{ color: '#000' }}>No File Choosen</Text>
                    ) : (
                      <Text style={{ color: '#000' }}>
                        {item[`hiddenproduct_image${index + 1}`]?.name}
                      </Text>
                    )}
                  </View>
                </View>
                <TextInput
                  placeholder={'Product Name'}
                  placeholderTextColor={item?.OwnerName ? 'black' : 'grey'}
                  style={{
                    borderWidth: 1,
                    marginTop: 4,
                    height: 40,
                    borderRadius: 6,
                    borderColor: 'grey',
                    paddingLeft: 10, color: '#000'
                  }}
                  value={item?.[`product_name${index + 1}`]}
                  onChangeText={val => handleProductImages(index, val)}
                />
                {item[`hiddenproduct_image${index + 1}`]?.uri ? (
                  <View
                    style={{
                      elevation: 5,
                      shadowColor: 'black',
                      shadowOffset: { height: 4, width: 4 },
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
                      source={{
                        uri: item[`hiddenproduct_image${index + 1}`]?.uri,
                      }}
                    />
                  </View>
                ) : null}
              </View>
            )}
          />
        </View>

        <View style={{ marginTop: 10 }}>
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
              placeholder="About "
              placeholderTextColor={'grey'}
              style={{
                paddingLeft: 10, color: '#000',
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

        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>Number of employees</Text>
          <View style={{ alignItems: 'flex-start' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="first"
                status={inputs.NoofEmployee == 1 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('NoofEmployee', 1)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text style={{ color: '#000' }}>Upto 10 employees</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="first"
                status={inputs.NoofEmployee == 2 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('NoofEmployee', 2)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text style={{ color: '#000' }}>11-25 employees</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="first"
                status={inputs.NoofEmployee == 3 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('NoofEmployee', 3)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text style={{ color: '#000' }}>26-35 employees</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="first"
                status={inputs.NoofEmployee == 4 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('NoofEmployee', 4)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text style={{ color: '#000' }}>36-50 employees</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="first"
                status={inputs.NoofEmployee == 5 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('NoofEmployee', 5)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text style={{ color: '#000' }}>Above 50 employees</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>Upload Showroom Images (upto 3):</Text>
          <View>
            <View style={styles.sView}>
              <TouchableOpacity
                onPress={() => handleImageUpload('showroom_image')}
                style={styles.sTouch}>
                <Text style={{ color: '#fff' }}>Choose File</Text>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '70%',
                }}>
                {inputs.showroom_image.length <= 0 ? (
                  <Text style={{ color: '#000' }}>No File Choosen</Text>
                ) : (
                  <Text style={{ color: '#000' }}>
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
              style={{ marginTop: 10 }}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      height: widthPercentageToDP(30),
                      width: widthPercentageToDP(30),
                      elevation: 5,
                      shadowColor: 'black',
                      shadowOffset: { height: 4, width: 4 },
                      shadowOpacity: 5,
                      shadowRadius: 4,
                      marginHorizontal: widthPercentageToDP(2),
                    }}>
                    <Image
                      style={{ height: '100%', width: '100%' }}
                      source={{ uri: item.uri }}
                    />
                  </View>
                );
              }}
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>Upload Owner images:</Text>
          <FlatList
            data={ownerImages}
            renderItem={({ item, index }) => (
              <View>
                <View>
                  <View style={styles.uploadView}>
                    <TouchableOpacity
                      onPress={() => handleOwnerImages(index, 'image', '')}
                      style={styles.grey}>
                      <Text style={{ color: '#fff' }}>Choose File</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '70%',
                      }}>
                      {item[`hiddenowner_image${index + 1}`]?.name == '' ? (
                        <Text style={{ color: '#000' }}>No File Choosen</Text>
                      ) : (
                        <Text style={{ color: '#000' }}>
                          {item[`hiddenowner_image${index + 1}`]?.name}
                        </Text>
                      )}
                    </View>
                  </View>
                  {item[`hiddenowner_image${index + 1}`]?.uri ? (
                    <View
                      style={{
                        elevation: 5,
                        shadowColor: 'black',
                        shadowOffset: { height: 4, width: 4 },
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
                        source={{
                          uri: item[`hiddenowner_image${index + 1}`]?.uri,
                        }}
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
                    paddingLeft: 10, color: '#000'
                  }}
                  placeholderTextColor={'grey'}
                  value={item[`owner_name${index + 1}`]}
                  onChangeText={val => handleOwnerImages(index, val, 'name')}
                />
                <View style={styles.multiline}>
                  <TextInput
                    placeholderTextColor={'grey'}
                    placeholder="Write about owner description"
                    style={[styles.input, { color: '#000' }]}
                    multiline
                    value={item[`owner_description${index + 1}`]}
                    onChangeText={val => handleOwnerImages(index, val, '')}
                  />
                </View>
              </View>
            )}
          />
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
            <Text style={{ color: '#fff', fontSize: 15 }}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    );
  };
  if (details) {
    return (
      <View style={{ flex: 1, backgroundColor: '#f0eeef' }}>
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
      <View style={{ flex: 1, backgroundColor: '#f0eeef' }}>
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
    id: '50',
    name: 'Custom Purity',
  },
  {
    id: '46',
    name: '585 (14k)',
  },
  {
    id: '41',
    name: '750 (18k)',
  },
  {
    id: '48',
    name: '916 (22k)',
  },
];
const items1 = [
  { id: '1', name: 'Custom purity' },
  { id: '75', name: 'I-FG' },
  { id: '77', name: 'IF' },
  { id: '4', name: 'SI-FG' },
  { id: '5', name: 'SI-GH' },
  { id: '6', name: 'SI-I-FG' },
  { id: '7', name: 'SI-I-GH' },
  { id: '8', name: 'VS-EF' },
  { id: '9', name: 'VS-FG' },
  { id: '10', name: 'VS-GH' },
  { id: '11', name: 'VS-SI-EF' },
  { id: '12', name: 'VS-SI-FG' },
  { id: '13', name: 'VS-SI-GH' },
  { id: '14', name: 'VVS-EF' },
  { id: '15', name: 'VVS-FG' },
  { id: '16', name: 'VVS-VS-EF' },
  { id: '17', name: 'VVS-VS-FG' },
  { id: '18', name: 'VVS-VS-GH' },
];
const items2 = [
  { id: '1', name: 'Custom purity' },
  { id: '2', name: '950' },
];
const items3 = [
  { id: '1', name: 'Custom purity' },
  { id: '2', name: '92' },
];
