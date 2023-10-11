import React, {useEffect, useState} from 'react';
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
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInput} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Loader from '../../../components/Loader';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DiamondViewModal from '../Modal/diamondDetails';
import MetalViewModal from '../Modal/MetalDetails';
import DecorativeViewModal from '../Modal/DecorativeDetails';
import StoneViewModal from '../Modal/stoneDetails';
import {RadioButton} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import Constants from '../../../Redux/Constants';
import axios from 'axios';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-simple-toast';

const AddProducts = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [value, setValue] = useState(null);
  const [ViewMetalModal, setViewMetalModal] = useState(false);
  const [ViewStoneModal, setViewStoneModal] = useState(false);
  const [ViewDiamondModal, setViewDiamondModal] = useState(false);
  const [ViewDecorativeModal, setViewDecorativeModal] = useState(false);
  const session = useSelector(state => state.Home?.session);
  const productType = useSelector(state => state.Home.productTypeList);
  const isFetching = useSelector(state => state.Home.isFetching);
  const isFetching2 = useSelector(state => state.Catalogue.isFetching);
  const isFocuse = useIsFocused();
  const stoneData = useSelector(state => state.Catalogue?.stoneData);
  const decorativeData = useSelector(state => state.Catalogue?.decorativeData);
  const metalData = useSelector(state => state.Catalogue?.metalData);
  const totalWiegt = useSelector(state => state.Catalogue?.totalWiegt);
  const diamondData = useSelector(state => state.Catalogue?.diamondData);
  const itemField = useSelector(state => state.Catalogue?.itemField);
  const msg = useSelector(state => state.Catalogue?.msg);

  useEffect(() => {
    productTypeList();
  }, [isFocuse]);
  const dispatch = useDispatch();
  const productTypeList = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'product_TypeList_Request',
      url: '/productAddListData',
      userId: Number(user_id),
    });
  };
  const navigation = useNavigation();

  const verifyProduct = () => {
    dispatch({
      type: 'verify_product_wieght_request',
      url: 'verifyWt',
      GrossWt: inputs.GrossWt,
      MetalWtGrandTotal: inputs.MetalWtGrandTotal,
      DiamondGrandTotal: inputs.DiamondGrandTotal,
      StoneGrandTotal: inputs.StoneGrandTotal,
      DecorationGrandTotal: inputs.DecorationGrandTotal,
    });
  };

  const renderItem = item => {
    return (
      <>
        <View
          style={{
            borderBottomWidth: 2,
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 2,
            paddingLeft: 5,
            width: '100%',
          }}>
          <CheckBox
            onChange={() => {
              handleCategory(item.SrNo);
            }}
            value={inputs.chk_sc.includes(item.SrNo) ? true : false}
          />
          <Text
            style={{
              fontSize: 18,
              marginLeft: 5,
              fontWeight: '700',
              color: '#000',
            }}>
            {item.Name}
          </Text>
        </View>
      </>
    );
  };
  const handleCategory = SrNo => {
    if (inputs.chk_sc.includes(SrNo)) {
      let res = inputs.chk_sc.filter(item => item != SrNo);
      handleInputs('chk_sc', res);
    } else {
      handleInputs('chk_sc', [...inputs.chk_sc, SrNo]);
    }
  };

  const [inputs, setInputs] = useState({
    radioInventoryPreInsured: 0,
    radioPriceCalculator: 1,
    ItemName: '',
    Status: 'Live',
    ProductSku: '',
    StyleID: '',
    Hallmarked: 1,
    radioGender: 'Male',
    IsBestSeller: false,
    StoneWt: '',
    StoneWtUnit: [],
    StoneName: [],
    StoneChargeableAmount: '',
    StoneGrandTotal: 0,
    hStonesSrNo: [],
    DiamondGrandTotal: '',
    hDiamondSrNo: [],
    Diamondwt: 0,
    DiamondWtUnit: [],
    DiamondChargeableAmount: 0,
    DiamondShape: [],
    DiamondQuality: [],
    DiamondName: [],
    MetalWtGrandTotal: 0,
    hMetalWt: [],
    GrossWt: 0,
    MetalTypes: [],
    Metal_Purity: [],
    MetalWt: 0,
    MetalWtUnit: [],
    DecorationGrandTotal: 0,
    hDecorationSrNo: [],
    DecoWt: 0,
    DecorativeChargeableAmount: 0,
    DecorativeItemName: [],
    DecoWtUnit: [],
    txtLabourCharges: '',
    radioIsWastage: 0,
    txtProductCharges: '',
    isProductCertd: 0,
    ProductCertifiedBy: '',
    ImgUpload: '',
    chk_sc: [],
    hdnImagecount: 0,
    lblwidthUnit: '', //bacha hai
    lblBreadthUnit: '', //thikness
    lblSizeUnit: '',
    lblheightUnit: '',
    txtProductWidth: '',
    txtProductHeight: '',
    txtProductBreadth: '', //thikness
    txtSize: '',
    txtVGrossWt: '',
    txtVMetalWt: '',
    txtVDiamondWt: '',
    txtVStoneWt: '',
    txtVDecoWt: '',
    txtMrp: '',
    DeliveryDays: '',
    hdnGrossWt: '',
    DecoItemName: '',
    submit: 'create product',
    ItemType: '',
    hdnProductSku: '',
    hdnProductType: '',
    rbCategory: 'Category B',
  });
  useEffect(() => {
    stoneData?.length > 0 ? addStonedata() : null;
  }, [stoneData]);
  useEffect(() => {
    diamondData?.length > 0 ? addDiamondData() : null;
  }, [diamondData]);
  useEffect(() => {
    metalData?.result?.length > 0 ? addMetalData() : null;
  }, [metalData]);
  useEffect(() => {
    decorativeData?.length > 0 ? addDecorativeData() : null;
  }, [decorativeData]);
  const handleInputs = async (params, input) => {
    setInputs(prev => ({...prev, [params]: input}));
  };
  useEffect(() => {
    itemField ? handleitemFIleds() : null;
  }, [itemField]);

  const handleitemFIleds = () => {
    setInputs(prev => ({
      ...prev,
      lblSizeUnit: itemField?.lblSizeUnit,
      lblBreadthUnit: itemField?.lblBreadthUnit,
      lblwidthUnit: itemField?.lblwidthUnit,
      lblheightUnit: itemField?.lblheightUnit,
    }));
  };
  const addStonedata = async () => {
    let stonewt = 0;
    let StoneWtUnit = [];
    let StoneName = [];
    let StoneChargeableAmount = 0;
    let stoneSrNo = [];
    let stonesingleWiegt = [];
    await stoneData?.map(item => {
      console.log('thnis is ite,', item);

      let stonewieght =
        item.UnitStoneWt === 'Cts.' ? item.StoneWt / 5 : item.StoneWt;
      stonesingleWiegt.push(stonewieght);
      stonewt = parseFloat(stonewt) + parseFloat(stonewieght);
      StoneChargeableAmount =
        parseFloat(StoneChargeableAmount) +
        parseFloat(item?.StoneChargeableAmount);
      StoneWtUnit.push(item?.UnitStoneWt);
      StoneName.push(item?.StoneName);
      stoneSrNo.push(item?.SrNo);
    });
    setInputs(prev => ({
      ...prev,
      StoneWt: stonesingleWiegt,
      StoneWtUnit: ['Gms'],
      StoneName: StoneName,
      StoneChargeableAmount: StoneChargeableAmount,
      StoneGrandTotal: stonewt,
      hStonesSrNo: stoneSrNo,
      txtVStoneWt: `${stonewt} Gms`,
    }));
    calculatePrice();
  };

  const addDiamondData = async () => {
    let hDiamondSrNo = [];
    let diamondWt = 0;
    let DiamondWtUnit = [];
    let DiamondChargeableAmount = 0;
    let DiamondName = [];
    let DiamondShape = [];
    let DiamondQuality = [];
    let DiamondGrandTotal = [];
    await diamondData?.map(item => {
      let dimondWieght =
        item.UnitStoneWt == 'Cts.' ? item.StoneWt / 5 : item.StoneWt;
      hDiamondSrNo.push(item?.SrNo);
      diamondWt = parseFloat(diamondWt) + parseFloat(dimondWieght);
      DiamondGrandTotal.push(dimondWieght);
      DiamondWtUnit.push(item?.UnitStoneWt);
      DiamondChargeableAmount =
        parseFloat(DiamondChargeableAmount) +
        parseFloat(item?.StoneChargeableAmount);
      DiamondName.push(item?.StoneName);
      DiamondShape.push(item?.StoneShape);
      DiamondQuality.push(item?.StoneQuality);
    });
    setInputs(prev => ({
      ...prev,
      DiamondGrandTotal: diamondWt,
      hDiamondSrNo: hDiamondSrNo,
      Diamondwt: DiamondGrandTotal,
      DiamondWtUnit: ['Gms'],
      DiamondChargeableAmount: DiamondChargeableAmount,
      DiamondName: DiamondName,
      DiamondShape: DiamondShape,
      DiamondQuality: DiamondQuality,
      txtVDiamondWt: `${diamondWt} Gms`,
    }));
    calculatePrice();
  };

  const addMetalData = async () => {
    let hMetalWt = 0;
    let MetalWtUnit = [];
    let Metal_Purity = [];
    let MetalTypes = [];
    let MetalWtGrandTotal = [];

    await metalData?.result?.map(item => {
      let metalweight =
        item.UnitMetalWt === 'Cts.' ? item.MetalWt / 5 : item.MetalWt;
      hMetalWt = parseFloat(hMetalWt) + parseFloat(metalweight);
      MetalWtGrandTotal.push(metalweight);
      MetalWtUnit.push(item.UnitMetalWt);
      Metal_Purity.push(item.MetalPurity);
      MetalTypes.push(item.MetalType);
    });
    setInputs(prev => ({
      ...prev,
      hMetalWt: hMetalWt,
      MetalWtGrandTotal: hMetalWt,
      GrossWt: totalWiegt,
      MetalWt: MetalWtGrandTotal,
      MetalWtUnit: ['Gms'],
      Metal_Purity: Metal_Purity,
      MetalTypes: MetalTypes,
      txtVGrossWt: `${totalWiegt} ${MetalWtUnit[0]}`,
      txtVMetalWt: `${hMetalWt} Gms`,
      hdnGrossWt: totalWiegt,
    }));
    calculatePrice();
  };

  const addDecorativeData = async () => {
    let hDecorationSrNo = [];
    let DecoWt = 0;
    let DecorativeChargeableAmount = 0;
    let DecorativeItemName = [];
    let DecoWtUnit = [];
    let DecorationGrandTotal = [];
    await decorativeData?.map(item => {
      let decovwie =
        item.UnitDecoItemWt === 'Cts.'
          ? item.DecorativeItemWt / 5
          : item.DecorativeItemWt;
      hDecorationSrNo.push(item?.SrNo);
      DecoWt = parseFloat(DecoWt) + parseFloat(decovwie);
      DecorationGrandTotal.push(decovwie);
      DecorativeChargeableAmount =
        parseFloat(DecorativeChargeableAmount) +
        parseFloat(item.DecorativeChargeableAmount);
      DecorativeItemName.push(item.DecorativeItemName);
      DecoWtUnit.push(item.UnitDecoItemWt);
    });
    setInputs(prev => ({
      ...prev,
      hDecorationSrNo: hDecorationSrNo,
      DecorationGrandTotal: DecoWt,
      DecoWt: DecorationGrandTotal,
      DecorativeChargeableAmount: DecorativeChargeableAmount,
      DecorativeItemName: DecorativeItemName,
      DecoWtUnit: ['Gms'],
      txtVDecoWt: `${DecoWt} Gms`,
    }));
    calculatePrice();
  };
  const calculatePrice = () => {
    inputs.DiamondChargeableAmount;
    inputs.DecorativeChargeableAmount;
    inputs.StoneChargeableAmount;

    const res =
      parseFloat(
        inputs.DiamondChargeableAmount > 0
          ? inputs.DecorativeChargeableAmount
          : 0,
      ) +
      parseFloat(
        inputs.StoneChargeableAmount > 0 ? inputs.StoneChargeableAmount : 0,
      ) +
      parseFloat(
        inputs.DiamondChargeableAmount > 0 ? inputs.DiamondChargeableAmount : 0,
      );
    handleInputs('txtProductCharges', res.toFixed(2));
  };
  const uploadImage = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      //  console.log(res);
      //  {
      //     uri: photo,
      //     name: photo1.substring(photo1.lastIndexOf('/') + 1),
      //     type: Photo2,
      //   }

      const res2 = RNFetchBlob.fs.createFile(res.uri);
      // console.log('thisiisi', res2);

      setInputs(prev => ({
        ...prev,
        ImgUpload: [
          ...inputs.ImgUpload,
          {uri: res.uri, name: res.name, type: res.type},
        ],
      }));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const handleOnSubmit = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    let data = {
      ...inputs,
      hdnIsMrp: inputs.radioPriceCalculator,
      hProductSrNo: 0,
      hdnProductPartner: '',
      hdnProductBranch: '',
      hdnImagecount: inputs.ImgUpload.length,
      userid: user_id,
      current_session_id: session,
      IsDefaultSupplier: 1,
      IsBestSeller: inputs.IsBestSeller ? 1 : 0,
    };

    let data2 = new FormData();
    await Object.keys(data).map(async (item, index) => {
      if (item === 'chk_sc') {
        data[item]?.map((item, index) => {
          data2.append(`chk_sc[${index}]`, item);
        });
      } else if (item == 'ImgUpload') {
        data[item]?.map((item, index) => {
          data2.append(`ImgUpload[${index}]`, item);
        });
      } else {
        data2.append(item, data[item]);
      }
    });
    // console.log(inputs.ImgUpload);
    // });
    //  console.log(JSON.stringify(data2));
    //  console.log(inputs.txtMrp);
    fetchDataByPOST('', data2);
  };
  const [isFetching3, setIfetching] = useState(false);
  const fetchDataByPOST = async (url, params) => {
    setIfetching(true);
    const Token = await AsyncStorage.getItem('loginToken');
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Olocker: `Bearer ${Token}`,
      },
    };
    try {
      const response = await axios.post(
        Constants.MainUrl + 'createProduct',
        params,
        config,
      );

      setIfetching(false);
      Toast.show(response.data.msg);
    } catch (error) {
      console.log('this si ', error);
      setIfetching(false);
      Toast.show('Something went wrong');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {isFetching || isFetching2 || isFetching3 ? <Loader /> : null}
      <ScrollView contentContainerStyle={{}}>
        <DiamondViewModal
          visi={ViewDiamondModal}
          close={() => setViewDiamondModal(false)}
          isBrekup={inputs.radioPriceCalculator}
        />
        <MetalViewModal
          visi={ViewMetalModal}
          close={() => setViewMetalModal(false)}
          isBrekup={inputs.radioPriceCalculator}
        />
        <DecorativeViewModal
          visi={ViewDecorativeModal}
          close={() => setViewDecorativeModal(false)}
          isBrekup={inputs.radioPriceCalculator}
        />
        <StoneViewModal
          visi={ViewStoneModal}
          close={() => setViewStoneModal(false)}
          isBrekup={inputs.radioPriceCalculator}
        />
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: wp(53),
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => navigation.goBack()}>
              <Image
                style={styles.img}
                source={require('../../../assets/L.png')}
              />
            </TouchableOpacity>
            <Text style={[styles.text, {color: 'white'}]}>
              SUPPLIER ADD PRODUCT
            </Text>
          </View>
          <View style={styles.headertouch}>
            <TouchableOpacity onPress={() => navigation.navigate('Message')}>
              <Image
                style={styles.img1}
                source={require('../../../assets/Fo.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleWishList()}>
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

        <View style={{marginTop: wp(4), marginHorizontal: wp(3)}}>
          <Text style={{fontSize: wp(4.5), fontWeight: '800', color: '#000'}}>
            {' '}
            CHOOSE SUPPLIER ADD PRODUCT
          </Text>
        </View>
        <View>
          <View
            style={{
              alignItems: 'center',
              //justifyContent: 'space-between',

              flexDirection: 'row',
              marginHorizontal: wp(3),
              // borderWidth: 1
            }}>
            <RadioButton
              value={inputs.radioInventoryPreInsured}
              color="#032e63"
              uncheckedColor="#474747"
              status={
                inputs.radioInventoryPreInsured == 0 ? 'checked' : 'unchecked'
              }
              onPress={() => handleInputs('radioInventoryPreInsured', 0)}
            />
            <Text style={{fontSize: wp(3.8), fontWeight: '600'}}>
              Digital Inventory
            </Text>
            <View style={{marginLeft: wp(5)}}>
              <RadioButton
                value={inputs.radioInventoryPreInsured}
                color="#032e63"
                uncheckedColor="#474747"
                status={
                  inputs.radioInventoryPreInsured == 1 ? 'checked' : 'unchecked'
                }
                onPress={() => handleInputs('radioInventoryPreInsured', 1)}
              />
            </View>

            <Text style={{fontSize: wp(3.8), fontWeight: '600'}}>
              Pre-Insured Jewellery
            </Text>
          </View>

          <View style={styles.mrt}>
            <Text style={{fontSize: wp(4.5), fontWeight: '800', color: '#000'}}>
              {' '}
              Choose Price Calculation Method
            </Text>
          </View>
          {
            // Break Up Pricing
            //   MRP Pricing
          }
          <View
            style={{
              alignItems: 'center',
              //justifyContent: 'space-between',

              flexDirection: 'row',
              marginHorizontal: wp(3),
              // borderWidth: 1
            }}>
            <RadioButton
              value={inputs.radioPriceCalculator}
              color="#032e63"
              uncheckedColor="#474747"
              status={
                inputs.radioPriceCalculator == 0 ? 'checked' : 'unchecked'
              }
              onPress={() => handleInputs('radioPriceCalculator', 0)}
            />
            <Text style={{fontSize: wp(3.8), fontWeight: '600'}}>
              Break Up Pricing
            </Text>
            <View style={{marginLeft: wp(5)}}>
              <RadioButton
                value={inputs.radioPriceCalculator}
                color="#032e63"
                uncheckedColor="#474747"
                status={
                  inputs.radioPriceCalculator == 1 ? 'checked' : 'unchecked'
                }
                onPress={() => handleInputs('radioPriceCalculator', 1)}
              />
            </View>

            <Text style={{fontSize: wp(3.8), fontWeight: '600'}}>
              MRP Pricing
            </Text>
          </View>
        </View>
        {
          //  MRP Pricing
          // Break Up Pricing
          //FILL PRODUCT DETAILS
        }
        <View>
          <View style={styles.mrt}>
            <Text style={styles.text}>Item Name</Text>
            <View>
              {productType?.productType && (
                <Dropdown
                  style={[
                    styles.dropdown,
                    {borderWidth: 1, borderColor: '#979998'},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={productType?.productType}
                  maxHeight={250}
                  labelField="Value"
                  valueField="Id"
                  placeholder="Product/item type"
                  value={inputs.ItemName}
                  onChange={item => {
                    handleInputs('ItemName', item.Value);
                    handleInputs('ItemType', item.Id);
                    console.log(item);
                    dispatch({
                      type: 'get_item_field_list_request',
                      url: 'getItemFields',
                      itemSrNo: item.Id,
                    });
                  }}
                />
              )}
            </View>
          </View>
          <View style={styles.mrt}>
            <Text style={styles.text}>Status</Text>
            <View>
              <Dropdown
                style={[
                  styles.dropdown,
                  {borderWidth: 1, borderColor: '#979998'},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={live}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Live"
                value={inputs.Status}
                onChange={item => {
                  handleInputs('Status', item.value);
                }}
              />
            </View>
          </View>
          {inputs.Status == 'Catalog' ? (
            <View style={styles.mrt}>
              <Text style={styles.text}>Estimate Delivery Days</Text>
              <View>
                <TextInput
                  style={[
                    styles.dropdown,
                    {borderWidth: 1, borderColor: '#979998'},
                  ]}
                  placeholder="Delivery Days"
                  value={inputs.DeliveryDays}
                  onChangeText={input => {
                    handleInputs('DeliveryDays', input);
                  }}
                />
              </View>
            </View>
          ) : null}
          <View style={styles.mrt}>
            <Text style={styles.text}>ProductSku</Text>
            <View>
              <TextInput
                style={[
                  styles.dropdown,
                  {borderWidth: 1, borderColor: '#979998'},
                ]}
                placeholder="Optional"
                value={inputs.ProductSku}
                onChangeText={input => {
                  handleInputs('ProductSku', input);
                  handleInputs('hdnProductSku', input);
                }}
              />
            </View>
          </View>
          <View style={styles.mrt}>
            <Text style={styles.text}>Style Id</Text>
            <View>
              <TextInput
                style={[
                  styles.dropdown,
                  {borderWidth: 1, borderColor: '#979998'},
                ]}
                placeholder="Style Id"
                value={inputs.StyleID}
                onChangeText={input => handleInputs('StyleID', input)}
              />
            </View>
          </View>
        </View>
        {
          //Hallmarked
        }
        <View style={[styles.mrt, {marginTop: wp(4)}]}>
          <Text style={{fontSize: wp(4.5), fontWeight: '800', color: '#000'}}>
            {' '}
            Hallmarked
          </Text>
          <View
            style={{
              alignItems: 'center',
              //justifyContent: 'space-between',

              flexDirection: 'row',
              marginHorizontal: wp(3),
              // borderWidth: 1
            }}>
            <RadioButton
              value={inputs.Hallmarked}
              color="#032e63"
              uncheckedColor="#474747"
              status={inputs.Hallmarked == 1 ? 'checked' : 'unchecked'}
              onPress={() => {
                handleInputs('Hallmarked', 1);
              }}
            />
            <Text style={{fontSize: wp(3.8), fontWeight: '600'}}>Yes</Text>
            <View style={{marginLeft: wp(5)}}>
              <RadioButton
                value={inputs.Hallmarked}
                color="#032e63"
                uncheckedColor="#474747"
                status={inputs.Hallmarked == 0 ? 'checked' : 'unchecked'}
                onPress={() => {
                  handleInputs('Hallmarked', 0);
                }}
              />
            </View>

            <Text style={{fontSize: wp(3.8), fontWeight: '600'}}>No</Text>
          </View>
        </View>
        <View style={styles.mrt}>
          <Text style={{fontSize: wp(4.5), fontWeight: '800', color: '#000'}}>
            {' '}
            Gender
          </Text>
          <View
            style={{
              alignItems: 'center',
              //justifyContent: 'space-between',

              flexDirection: 'row',
              marginHorizontal: wp(3),
              // borderWidth: 1
            }}>
            <RadioButton
              value={inputs.radioGender}
              color="#032e63"
              uncheckedColor="#474747"
              status={inputs.radioGender == 'Male' ? 'checked' : 'unchecked'}
              onPress={() => handleInputs('radioGender', 'Male')}
            />
            <Text style={{fontSize: wp(3.8), fontWeight: '600'}}>Male</Text>
            <View style={{marginLeft: wp(5)}}>
              <RadioButton
                value={inputs.radioGender}
                color="#032e63"
                uncheckedColor="#474747"
                status={
                  inputs.radioGender == 'Female' ? 'checked' : 'unchecked'
                }
                onPress={() => handleInputs('radioGender', 'Female')}
              />
            </View>

            <Text style={{fontSize: wp(3.8), fontWeight: '600'}}>Female</Text>
            <View style={{marginLeft: wp(5)}}>
              <RadioButton
                value={inputs.radioGender}
                color="#032e63"
                uncheckedColor="#474747"
                status={inputs.radioGender == 'Kids' ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('radioGender', 'Kids')}
              />
            </View>

            <Text style={{fontSize: wp(3.8), fontWeight: '600'}}>Kids</Text>
          </View>
        </View>
        {/* <View
          style={{ alignSelf: 'center', mrr: wp(3), marginTop: wp(4) }}> */}
        {/* <View style={{}}>
          <Text style={{ fontSize: wp(5), marginLeft: wp(-24), fontWeight: '700', color: '#032e63' }}>
            Assign Category
          </Text>
          <View style={{ flexDirection: "row", alignItems: 'center', marginRight: wp(12), marginLeft: wp(-24) }}>
            <View style={{ marginLeft: wp(5) }}>
              <RadioButton
                value={'fnff'}
                color="#032e63"
                uncheckedColor="#474747"
                status='checked'

              // status={checked === 'Gold' ? 'checked' : 'unchecked'}
              // onPress={() => setChecked('Gold')}
              /></View>

            <Text style={{ fontSize: wp(3.8), fontWeight: '600' }}>
              Common
            </Text>
            {/* </View> *
          </View>
        </View> */}
        <View style={[styles.mrt, {marginTop: wp(4)}]}>
          <Text style={{fontSize: wp(4.5), fontWeight: '800', color: '#000'}}>
            {' '}
            Assign Category
          </Text>
          <View
            style={{
              alignItems: 'center',
              //justifyContent: 'space-between',

              flexDirection: 'row',
              marginHorizontal: wp(3),
              // borderWidth: 1
            }}>
            <RadioButton
              value={'fnff'}
              color="#032e63"
              uncheckedColor="#474747"
              status={
                inputs.rbCategory == 'Category B' ? 'checked' : 'unchecked'
              }
              onPress={() => {
                handleInputs('rbCategory', 'Category B');
              }}
            />
            <Text style={{fontSize: wp(3.8), fontWeight: '600'}}>Common</Text>
            <View style={{marginLeft: wp(5)}}>
              <RadioButton
                value={inputs.rbCategory}
                color="#032e63"
                uncheckedColor="#474747"
                status={
                  inputs.rbCategory == 'Category A' ? 'checked' : 'unchecked'
                }
                onPress={() => {
                  handleInputs('rbCategory', 'Category A');
                }}
              />
            </View>

            <Text style={{fontSize: wp(3.8), fontWeight: '600'}}>
              Exclusive
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(3),
            marginTop: wp(4),
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <CheckBox
                value={inputs.IsBestSeller}
                onChange={() =>
                  handleInputs('IsBestSeller', !inputs.IsBestSeller)
                }
                tintColors={{true: '#032e63', false: '#032e63'}}
              />
            </View>
            <View style={{}}>
              <Text
                style={{fontSize: wp(4.5), color: '#000', fontWeight: '600'}}>
                Is Best Seller
              </Text>
            </View>
          </View>
        </View>
        {itemField?.lblDimension == 1 ? (
          <View style={{marginHorizontal: wp(3), marginTop: wp(5)}}>
            <Text
              style={{
                fontSize: wp(4.5),
                fontWeight: '800',
                color: '#000',
              }}>
              Dimensions
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: wp(1),
              }}>
              <View style={{width: '45%'}}>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: wp(2),
                    height: hp(5.5),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    paddingLeft: wp(4),
                  }}>
                  <TextInput
                    placeholder="Width"
                    editable={itemField?.divWidth == 1 ? true : false}
                    style={{fontSize: wp(4.5), fontWeight: '700', flex: 1}}
                    value={inputs.txtProductWidth}
                    onChangeText={input =>
                      handleInputs('txtProductWidth', input)
                    }
                  />
                  <View
                    style={{
                      borderLeftWidth: 1,
                      width: '30%',
                      height: '100%',
                      backgroundColor: 'lightgrey',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: 'black', fontWeight: '700'}}>
                      {inputs.lblwidthUnit}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{width: '45%'}}>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: wp(2),
                    height: hp(5.5),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    paddingLeft: wp(4),
                  }}>
                  <TextInput
                    placeholder="Height"
                    editable={itemField?.divHeight == 1 ? true : false}
                    style={{fontSize: wp(4.5), fontWeight: '700', flex: 1}}
                    value={inputs.txtProductHeight}
                    onChangeText={input =>
                      handleInputs('txtProductHeight', input)
                    }
                  />
                  <View
                    style={{
                      borderLeftWidth: 1,
                      width: '30%',
                      height: '100%',
                      backgroundColor: 'lightgrey',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: 'black', fontWeight: '700'}}>
                      {inputs.lblheightUnit}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: wp(3),
              }}>
              <View style={{width: '45%'}}>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: wp(2),
                    height: hp(5.5),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    paddingLeft: wp(4.5),
                  }}>
                  <TextInput
                    placeholder="Thikness"
                    editable={itemField?.divBreadth == 1 ? true : false}
                    style={{fontSize: wp(4.5), fontWeight: '700', flex: 1}}
                    value={inputs.txtProductBreadth}
                    onChangeText={input =>
                      handleInputs('txtProductBreadth', input)
                    }
                  />
                  <View
                    style={{
                      borderLeftWidth: 1,
                      width: '30%',
                      height: '100%',
                      backgroundColor: 'lightgrey',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: 'black', fontWeight: '700'}}>
                      {inputs.lblBreadthUnit}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{width: '45%'}}>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: wp(2),
                    height: hp(5.5),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    paddingLeft: wp(4),
                  }}>
                  <TextInput
                    editable={itemField?.divSize == 1 ? true : false}
                    value={inputs.txtSize}
                    placeholder="Size"
                    onChangeText={input => handleInputs('txtSize', input)}
                    style={{fontSize: wp(4.5), fontWeight: '700', flex: 1}}
                  />
                  <View
                    style={{
                      borderLeftWidth: 1,
                      width: '30%',
                      height: '100%',
                      backgroundColor: 'lightgrey',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: 'black', fontWeight: '700'}}>
                      {inputs.lblSizeUnit}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginTop: 15,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              setViewMetalModal(true);
            }}
            style={styles.btn}>
            <Text style={styles.txt2}>Metal Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setViewStoneModal(true);
            }}
            style={[styles.btn, {backgroundColor: '#032e63'}]}>
            <Text style={[styles.txt2, {color: 'white'}]}>Stone Details</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(2),
            marginTop: wp(2),
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              setViewDiamondModal(true);
            }}
            style={styles.btn}>
            <Text style={styles.txt2}>Diamond Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setViewDecorativeModal(true);
            }}
            style={[styles.btn, {backgroundColor: '#032e63'}]}>
            <Text style={[styles.txt2, {color: 'white', textAlign: 'center'}]}>
              Decorative item Details
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{marginHorizontal: 20, marginTop: 15}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '48%'}}>
              <View style={{marginHorizontal: 10, marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: wp(5),
                    fontWeight: '500',
                    color: '#032e63',
                  }}>
                  Decorative Wt.
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: wp(2),
                  height: hp(5.5),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  editable={false}
                  placeholder={
                    inputs.DecorationGrandTotal
                      ? inputs.DecorationGrandTotal.toString() +
                        ' ' +
                        inputs.DecoWtUnit[inputs.DecoWtUnit.length - 1]
                      : 'Decorative Wt.'
                  }
                  style={{fontSize: wp(4), fontWeight: '700'}}
                />
              </View>
            </View>
            <View style={{width: '48%'}}>
              <View style={{marginHorizontal: 10, marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: wp(5),
                    fontWeight: '500',
                    color: '#032e63',
                  }}>
                  Gross Wt.
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: wp(2),
                  height: hp(5.5),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  editable={false}
                  placeholder={totalWiegt ? totalWiegt : 'Gross Wt.'}
                  style={{fontSize: wp(4), fontWeight: '700'}}
                />
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '48%'}}>
              <View style={{marginHorizontal: 10, marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: wp(5),
                    fontWeight: '500',
                    color: '#032e63',
                  }}>
                  Metal Wt.
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: wp(2),
                  height: hp(5.5),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  placeholder={
                    inputs.MetalWtGrandTotal
                      ? inputs.MetalWtGrandTotal.toString() +
                        ' ' +
                        inputs.MetalWtUnit[inputs.MetalWtUnit.length - 1]
                      : 'Metal Wt.'
                  }
                  editable={false}
                  style={{fontSize: wp(4), fontWeight: '700'}}
                />
              </View>
            </View>
            <View style={{width: '48%'}}>
              <View style={{marginHorizontal: 10, marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: wp(5),
                    fontWeight: '500',
                    color: '#032e63',
                  }}>
                  Diamond Wt.
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: wp(2),
                  height: hp(5.5),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  editable={false}
                  placeholder={
                    inputs.Diamondwt
                      ? inputs.DiamondGrandTotal +
                        ' ' +
                        inputs.DiamondWtUnit[inputs.DiamondWtUnit.length - 1]
                      : 'Diamond Wt.'
                  }
                  style={{fontSize: wp(4), fontWeight: '700'}}
                />
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '48%'}}>
              <View style={{marginHorizontal: 10, marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: wp(5),
                    fontWeight: '500',
                    color: '#032e63',
                  }}>
                  Stone Wt.
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: wp(2),
                  height: hp(5.5),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  editable={false}
                  placeholder={
                    inputs.StoneGrandTotal
                      ? inputs.StoneGrandTotal +
                        ' ' +
                        inputs.StoneWtUnit[inputs.StoneWtUnit.length - 1]
                      : 'Stone Wt.'
                  }
                  style={{fontSize: wp(4), fontWeight: '700'}}
                />
              </View>
            </View>
            <View style={{width: '48%'}}>
              <View style={{marginHorizontal: 10, marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: wp(5),
                    fontWeight: '500',
                    color: '#032e63',
                  }}>
                  Verify Wt.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => verifyProduct()}
                style={{
                  borderWidth: 1,
                  borderRadius: wp(2),
                  height: hp(5.5),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'green', //#032e63',
                }}>
                <Text style={{fontSize: wp(4), color: 'white'}}>
                  Verify Wt.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{width: '90%', marginTop: wp(2), alignSelf: 'center'}}>
          <Text
            style={{
              alignSelf: 'center',
              color: msg?.error ? 'red' : 'green',
              fontSize: wp(3),
              fontWeight: '800',
            }}>
            {msg?.msg}
          </Text>
        </View>
        <View style={{marginVertical: 20}}>
          {inputs.radioPriceCalculator == 0 ? (
            <>
              <View style={styles.mrt}>
                <Text
                  style={{fontSize: wp(4.5), fontWeight: '800', color: '#000'}}>
                  {' '}
                  Chargeable amount for Labour
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginHorizontal: wp(1),
                }}>
                <RadioButton
                  value={inputs.radioIsWastage}
                  color="#032e63"
                  uncheckedColor="#474747"
                  status={inputs.radioIsWastage == 0 ? 'checked' : 'unchecked'}
                  onPress={() => handleInputs('radioIsWastage', 0)}
                />
                <Text style={{fontSize: wp(3.8), fontWeight: '600'}}>
                  Charges Per Gram Rs
                </Text>
                <View style={{marginLeft: wp(2)}}>
                  <RadioButton
                    value={inputs.radioIsWastage}
                    color="#032e63"
                    uncheckedColor="#474747"
                    status={
                      inputs.radioIsWastage == 1 ? 'checked' : 'unchecked'
                    }
                    onPress={() => handleInputs('radioIsWastage', 1)}
                    // status={checked === 'Gold' ? 'checked' : 'unchecked'}
                    // onPress={() => setChecked('Gold')}
                  />
                </View>

                <Text style={{fontSize: wp(3.8), fontWeight: '600'}}>
                  Wastage(% of Net Gold wt)
                </Text>
              </View>
            </>
          ) : null}
        </View>

        <View style={[styles.mrt, {marginTop: wp(-5)}]}>
          {inputs.radioPriceCalculator == 0 ? (
            <>
              <Text
                style={{fontSize: wp(4.5), fontWeight: '800', color: '#000'}}>
                {' '}
                {inputs.radioIsWastage == 1
                  ? 'Wastage % between 0-100'
                  : 'Amount in Rs.'}
              </Text>

              <View
                style={{
                  borderWidth: 1,
                  height: hp(5.5),
                  borderRadius: wp(2),
                  marginTop: wp(2),
                  paddingHorizontal: 5,
                  marginHorizontal: wp(3),
                }}>
                <TextInput
                  value={inputs.txtLabourCharges}
                  onChangeText={input => {
                    handleInputs('txtLabourCharges', input);
                  }}
                  placeholder={
                    inputs.radioIsWastage
                      ? 'Wastage % between 0-100'
                      : 'Amount in Rs.'
                  }
                />
              </View>
            </>
          ) : null}
          {
            //Chargeable amount for Product RS
          }
          <View style={{marginTop: wp(3)}}>
            <Text style={{fontSize: wp(4.5), fontWeight: '800', color: '#000'}}>
              {' '}
              {inputs.radioPriceCalculator == 0
                ? 'Chargeable amount for Product RS'
                : 'Specify MRP pricing '}
            </Text>
            <View
              style={{
                borderWidth: 1,
                height: hp(5.5),
                borderRadius: wp(2),
                marginTop: wp(2),
                paddingHorizontal: 5,
                marginHorizontal: wp(3),
              }}>
              <TextInput
                editable={inputs.radioPriceCalculator == 1 ? true : false}
                value={
                  inputs.radioPriceCalculator == 0
                    ? inputs.txtProductCharges
                    : inputs.txtMrp
                }
                onChangeText={input =>
                  handleInputs(
                    inputs.radioPriceCalculator == 0
                      ? 'txtProductCharges'
                      : 'txtMrp',
                    input,
                  )
                }
                placeholder={'0.00'}
              />
            </View>
          </View>
          {
            //CERTIFICATION DETAILS
          }
          <View style={{marginTop: wp(6)}}>
            <Text style={{fontSize: wp(4.5), fontWeight: '800', color: '#000'}}>
              {' '}
              CERTIFICATION DETAILS
            </Text>
            <Text
              style={{
                marginLeft: wp(3),
                fontSize: wp(4.5),
                marginTop: wp(1),
                fontWeight: 'bold',
                color: 'black',
              }}>
              Certified
            </Text>
            <View style={{marginHorizontal: wp(3)}}>
              <Dropdown
                style={[styles.dropdown, {borderWidth: 1}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={DropData2}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Select item"
                value={inputs.isProductCertd}
                onChange={item => {
                  handleInputs('isProductCertd', item.value);
                }}
              />
            </View>
            {inputs?.isProductCertd ? (
              <>
                <Text
                  style={{
                    marginLeft: wp(3),
                    fontSize: wp(4.5),
                    marginTop: wp(2),
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  Certification agency
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    height: hp(5.5),
                    borderRadius: wp(2),
                    marginTop: wp(2),
                    paddingHorizontal: 5,
                    marginHorizontal: wp(3),
                  }}>
                  <TextInput
                    value={inputs.ProductCertifiedBy}
                    onChangeText={input =>
                      handleInputs('ProductCertifiedBy', input)
                    }
                    placeholder="Certification agency"
                  />
                </View>
              </>
            ) : null}
          </View>

          <TouchableOpacity
            onPress={() => uploadImage()}
            style={{
              alignSelf: 'center',
              marginTop: 15,
              borderWidth: 2,
              alignItems: 'center',
              justifyContent: 'space-evenly',
              borderColor: '#032e63',
              flexDirection: 'row',
              height: hp(5.5),
              borderRadius: wp(3.5),
              width: '55%',
            }}>
            <Entypo name="upload" size={20} color={'#032e63'} />
            <Text
              style={{color: '#032e63', fontWeight: '700', fontSize: wp(4)}}>
              Upload Images 6
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: hp(17),
              // borderWidth: 1,
              marginTop: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FlatList
              data={inputs.ImgUpload}
              keyExtractor={(item, index) => index}
              horizontal={true}
              renderItem={({item, index}) => (
                <Image
                  style={{
                    height: hp(15),
                    width: wp(30),
                    alignSelf: 'center',
                    marginHorizontal: wp(1),
                  }}
                  source={{uri: item.uri}}
                />
              )}
            />
          </View>
        </View>
        <View style={{marginHorizontal: wp(3), marginTop: hp(3)}}>
          <Text style={{fontSize: wp(4.5), fontWeight: '800', color: '#000'}}>
            CHOOSE CATEGORIES TO PRODUCT
          </Text>
          <Text style={{fontSize: wp(3), fontWeight: '800', color: 'grey'}}>
            (DEFINE TABS:- TICKS MARK ALL THE TABS WHERE YOU WANT THIS JEWELLERY
            TO APPEAR IN CLINT SEARCH)
          </Text>
        </View>
        <View style={{marginTop: wp(3.5)}}>
          <FlatList
            data={productType?.category}
            renderItem={({item}) => (
              <TouchableOpacity activeOpacity={1} style={{marginVertical: 5}}>
                <View
                  style={{
                    marginHorizontal: 20,
                    borderBottomWidth: 0,
                    marginTop: 5,
                    height: 40,
                    backgroundColor: '#032E63',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '700',
                      marginLeft: 10,
                      color: '#fff',
                    }}>
                    {item.Name}
                  </Text>
                </View>
                <View
                  style={{
                    marginHorizontal: 20,
                    borderWidth: 2,
                    borderBottomWidth: 0,
                  }}>
                  <Dropdown
                    style={{borderBottomWidth: 2, height: 40}}
                    placeholderStyle={[
                      styles.placeholderStyle,
                      {
                        fontWeight: '800',
                        fontSize: 18,
                        marginLeft: 10,
                        color: '#000',
                      },
                    ]}
                    selectedTextStyle={[
                      styles.selectedTextStyle,
                      {
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#000',
                        marginLeft: 10,
                      },
                    ]}
                    iconStyle={{width: 30, height: 30}}
                    data={item.subcategory}
                    maxHeight={200}
                    labelField="Name"
                    valueField="Name"
                    placeholder="Select"
                    value={inputs.chk_sc}
                    renderItem={renderItem}
                    itemTextStyle={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: '#000',
                    }}
                    onChange={item => {
                      console.log(item);
                    }}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{marginHorizontal: 10, marginTop: 15}}>
          <Text style={{fontSize: wp(4.5), fontWeight: '800', color: '#000'}}>
            CHOOSE CATEGORIES TO PRODUCT
          </Text>
          <Text style={{fontSize: wp(4), fontWeight: '800', color: 'grey'}}>
            (DEFINE TABS:- TICKS MARK ALL THE TABS WHERE YOU WANT THIS JEWELLERY
            TO APPEAR IN CLINT SEARCH)
          </Text>
        </View>
        <View>
          <FlatList
            data={productType?.collection}
            renderItem={({item}) => (
              <View
                style={{
                  marginHorizontal: 20,
                  borderWidth: 2,
                  marginTop: 15,
                  borderBottomWidth: 0,
                }}>
                <View
                  style={{
                    borderBottomWidth: 2,
                    height: 40,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <CheckBox
                    onChange={async () => {
                      console.log(item.SrNo);
                      if (inputs.chk_sc.includes(item.SrNo)) {
                        const res = inputs.chk_sc.filter(
                          items => items != item.SrNo,
                        );

                        handleInputs('chk_sc', res);
                      } else {
                        handleInputs('chk_sc', [...inputs.chk_sc, item.SrNo]);
                      }
                    }}
                    value={inputs.chk_sc.includes(item.SrNo) ? true : false}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      marginLeft: 5,
                      fontWeight: '700',
                      color: '#000',
                    }}>
                    {item.Name}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>

        <View style={{marginHorizontal: 20, marginTop: 15}}>
          <TouchableOpacity
            onPress={() => {
              handleOnSubmit();
            }}
            style={{
              height: 40,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#032e63',
            }}>
            <Text style={{fontSize: 18, color: 'white', fontWeight: '600'}}>
              Add Product
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 40,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
              backgroundColor: '#666564',
            }}>
            <Text style={{fontSize: 18, color: 'white', fontWeight: '600'}}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddProducts;
const DropData = [
  {label: 'Yes', value: 1},
  {label: 'No', value: 2},
];
const DropData2 = [
  {label: 'Yes', value: 1},
  {label: 'No', value: 0},
];
const live = [
  {label: 'Live', value: 'Live'},
  {label: 'Catalog', value: 'Catalog'},
];
