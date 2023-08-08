import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import Header from "../../../components/CustomHeader";
import { useNavigation } from '@react-navigation/native'
import styles from "./styles";
import { RadioButton } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import MultiSelect from 'react-native-multiple-select';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from "react-native-simple-toast";
import { useDispatch, useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import Loading from "../../../components/Loader";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

let goldSpecilization=[]
let diamondSpecilization=[]
let silverSpecilization=[]
let platinumSpecilization=[]
const EditSupplierProfile = ({route}) => {
   
    const navigation = useNavigation()
    const details=route.params.selector.supplierdetails[0]
    const [fetching,setFetching]=useState(false)
    const productImage=route.params.productImage
    const showroomImage=route.params.showroomImage
    const supplierLogo=route.params.supplierLogo
    const ownerImage=route.params.ownerImage
    console.log('ownerName1,productImage',productImage,ownerImage);
    const [supplierName,setSupplierName]=useState(details.SupplierName)
    const [contactPerson,setContactPerson]=useState(details.ContactPersonName)
    const [mobile,setMobile]=useState(details.MobileNo)
    const [address,setAddress]=useState(details.Address)
    const [state,setState]=useState(details.StateId)
    const [city,setCity]=useState(details.CityId)
    const [pincode,setPincode]=useState(details.Pincode)
    const [website,setWesite]=useState(details.Website)
    const [quality,setQuality]=useState(details.DiamondQuality)
    const [manufacturer, setManufacturer] = useState(details.SupplierType==1?'checked':'unchecked')
    const [wholeSaler, setWholeSaler] = useState(details.SupplierType==2?'checked':'unchecked')
    const [both, setBoth] = useState(details.SupplierType==3?'checked':'unchecked')
    const [branch, setBranch] = useState(details.IsAnyBranch==1?true:false);
    const [gold,setGold]=useState(true)
    const [diamond,setDiamond]=useState(false)
    const [platinum,setPlatinum]=useState(false)
    const [silver,setSilver]=useState(false)
    const [selected,setSelected]=useState([])
    const [selected1,setSelected1]=useState([])
    const [selected2,setSelected2]=useState([])
    const [selected3,setSelected3]=useState([])
    const [selected4,setSelected4]=useState([])
    const [selected5,setSelected5]=useState([])
    const [selected6,setSelected6]=useState([])
    const [selected7,setSelected7]=useState([])
    const [isActive,setIsActive]=useState(details.IsActive==1?true:false)
    const [isDefault,setIsDefault]=useState(details.IsDefaultSupplier==null||details.IsDefaultSupplier==0?false:true)
    const [logoName,setLogoName]=useState(supplierLogo)
    const [logoUri,setLogoUri]=useState('')
    const [logoType,setLogoType]=useState('')
    const [productImage1,setProductImage1]=useState(productImage.length>0?productImage[0].ImageName:'')
    const [productImage1Uri,setproductImage1Uri]=useState('')
    const [productImage1Type,setproductImage1Type]=useState('')
    const [productImage2,setProductImage2]=useState(productImage.length>1?productImage[1].ImageName:'')
    const [productImage2Uri,setproductImage2Uri]=useState('')
    const [productImage2Type,setproductImage2Type]=useState('')
    const [productImage3,setProductImage3]=useState(productImage.length>2?productImage[2].ImageName:'')
    const [productImage3Uri,setproductImage3Uri]=useState('')
    const [productImage3Type,setproductImage3Type]=useState('')
    const [productName1,setProductName1]=useState(productImage.length>0?productImage[0].OwnerName:'')
    const [productName2,setProductName2]=useState(productImage.length>1?productImage[1].OwnerName:'')
    const [productName3,setProductName3]=useState(productImage.length>2?productImage[2].OwnerName:'')
    const [about,setAbout]=useState(details.SupplierIntroduction)
    const [ten,setTen]=useState(details.NoofEmployee==1?'checked':'unchecked')
    const [elevan,setElevan]=useState(details.NoofEmployee==2?'checked':'unchecked')
    const [twentySix,setTwentySix]=useState(details.NoofEmployee==3?'checked':'unchecked')
    const [thirtySix,setThirtySix]=useState(details.NoofEmployee==4?'checked':'unchecked')
    const [fifty,setFifty]=useState(details.NoofEmployee==5?'checked':'unchecked')
    const [showroom1,setShowroom1]=useState(showroomImage.length>0?showroomImage[0].ImageName:'')
    const [showroom1Uri,setshowroom1Uri]=useState('')
    const [showroom1Type,setshowroom1Type]=useState('')
    const [showroom2,setShowroom2]=useState(showroomImage.length>1?showroomImage[1].ImageName:'')
    const [showroom2Uri,setshowroom2Uri]=useState('')
    const [showroom2Type,setshowroom2Type]=useState('')
    const [showroom3,setShowroom3]=useState(showroomImage.length>2?showroomImage[2].ImageName:'')
    const [showroom3Uri,setshowroom3Uri]=useState('')
    const [showroom3Type,setshowroom3Type]=useState('')
    const [ownerImage1,setOwnerImage1]=useState(ownerImage.length>0?ownerImage[0].ImageName:'')
    const [ownerImage1Uri,setownerImage1Uri]=useState('')
    const [ownerImage1Type,setownerImage1Type]=useState('')
    const [ownerImage2,setOwnerImage2]=useState(ownerImage.length>1?ownerImage[1].ImageName:'')
    const [ownerImage2Uri,setownerImage2Uri]=useState('')
    const [ownerImage2Type,setownerImage2Type]=useState('')
    const [ownerImage3,setOwnerImage3]=useState(ownerImage.length>2?ownerImage[2].ImageName:'')
    const [ownerImage3Uri,setownerImage3Uri]=useState('')
    const [ownerImage3Type,setownerImage3Type]=useState('')
    const [ownerName1,setOwnerName1]=useState(ownerImage.length>0?ownerImage[0].OwnerName:'')
    const [ownerName2,setOwnerName2]=useState(ownerImage.length>1?ownerImage[1].OwnerName:'')
    const [ownerName3,setOwnerName3]=useState(ownerImage.length>2?ownerImage[2].OwnerName:'')
    const [description1,setDescriptiion1]=useState(ownerImage.length>2?ownerImage[0].Description:'')
    const [description2,setDescriptiion2]=useState(ownerImage.length>2?ownerImage[1].Description:'')
    const [description3,setDescriptiion3]=useState(ownerImage.length>2?ownerImage[2].Description:'')
    const [customPurityD,setCustomPurityD]=useState('')
    const [customPurityG,setCustomPurityG]=useState('')
    const [customPurityP,setCustomPurityP]=useState('')
    const [customPurityS,setCustomPurityS]=useState('')

    const [customPurityDia,setCustomPurityDia]=useState(false)
    const [customPurityGo,setCustomPurityGo]=useState(false)
    const [customPurityPla,setCustomPurityPla]=useState(false)
    const [customPuritySil,setCustomPuritySil]=useState(false)

    const stateList1=useSelector(state=>state.State.StateList)
    const stateList=stateList1?.satates
    const cityList1=useSelector(state=>state.City.CityList)
    const cityList=cityList1?.cities
    const dispatch=useDispatch()
   
    useEffect(()=>{
  
        route.params.selector.specialisation.map(item=>{
            if(item.metaltype=='Gold'){
                if(goldSpecilization.length>0){
                    if(!goldSpecilization.includes(item)){
                        goldSpecilization.push(item)
                    }
                }
                else{
                    goldSpecilization.push(item)
                }
            }  
            else if(item.metaltype=='Diamond'){
                if(diamondSpecilization.length>0){
                    if(!diamondSpecilization.includes(item)){
                        diamondSpecilization.push(item)
                    }
                }
                else{
                    diamondSpecilization.push(item)
                }
            }
            else if(item.metaltype=='Platinum'){
                if(platinumSpecilization.length>0){
                    if(!platinumSpecilization.includes(item)){
                        platinumSpecilization.push(item)
                    }
                }
                else{
                    platinumSpecilization.push(item)
                }
            }
            else if(item.metaltype=='Silver'){
                if(silverSpecilization.length>0){
                    if(!silverSpecilization.includes(item)){
                        silverSpecilization.push(item)
                    }
                }
                else{
                    silverSpecilization.push(item)
                }
            }
        })
    },[])

    const validateUser = async () => {
        const user_id=await AsyncStorage.getItem('user_id')
        const Token=await AsyncStorage.getItem('loginToken')
        console.log('this is user id',user_id);
        if(supplierName==''){
          Toast.show('Please enter supplier name')
        }
        else if(contactPerson==''){
          Toast.show('Please enter contact person name')
        }
        else if(mobile==''){
          Toast.show('Please enter mobile number')
        }
        else if(address==''){
          Toast.show('Please enter full address')
        }
        else if(state==''){
            Toast.show('Please select state name')
        }
        else if(city==''){
           Toast.show('Please select city name')
        }
       else{
        try {
          setFetching(true)
          const data = new FormData();
          data.append('SrNo', user_id);
          data.append('SupplierName',supplierName );
          data.append('ContactPersonName', contactPerson);
          data.append('MobileNo',mobile);
          data.append('Address',address);
          data.append('StateId',state);
          data.append('CityId',city);
          data.append('Pincode',pincode);
          data.append('Website',website);
          data.append('SupplierType',manufacturer=='checked'?1:wholeSaler=='checked'?2:both=='checked'?3:'');
          data.append('IsAnyBranch',branch==true?'on':'off');
          data.append('JTyped',diamond==true?'Diamond':'');
          data.append('JTypeg',gold==true?'Gold':'');
          data.append('JTypep',platinum==true?'Platinum':'');
          data.append('JTypes',silver==true?'Silver':'');
          data.append('diamond_purity[]',selected2);
          data.append('diamondcustom_purity',customPurityD);
          data.append('diamond_specialisation[]',selected3);
          data.append('gold_purity[]',selected);
          data.append('goldcustom_purity',customPurityG);
          data.append('gold_specialisation[]',selected1);
          data.append('platinumcustom_purity',customPurityP);
          data.append('silvercustom_purity',customPurityS);
          data.append('DiamondQuality',quality);
          data.append('EmailId','');
          data.append('IsActive',isActive==true?'on':'off');
          data.append('IsDefaultSupplier',isDefault==true?'on':'off');
          data.append('product_name1',productName1);
          data.append('hiddenproduct_image1',
           {
            uri: productImage1Uri,
            name: productImage1,
            type: productImage1Type,
          }
          );
          data.append('hiddenproduct_id1',productImage[0]?.SrNo);
          data.append('product_name2',productName2);
          data.append('hiddenproduct_image2',
           {
            uri: productImage2Uri,
            name: productImage2,
            type: productImage2Type,
          }
          );
          data.append('hiddenproduct_id2',productImage[1]?.SrNo);
          data.append('product_name3',productName3);
          data.append('hiddenproduct_image3',
           {
            uri: productImage3Uri,
            name: productImage3,
            type: productImage3Type,
          }
          );
          data.append('hiddenproduct_id3',productImage[2]?.SrNo);
          data.append('aboutus',about);
          data.append('NoofEmployee',ten=='checked'?1:elevan=='checked'?2:twentySix=='checked'?3:thirtySix=='checked'?5:fifty=='checked'?5:'');
          data.append('owner_name1',ownerName1)
          data.append('owner_description1',description1);
          data.append('hiddenowner_image1', 
          {
            uri: ownerImage1Uri,
            name: ownerImage1,
            type: ownerImage1Type,
          }
          );
          data.append('hiddenowner_id1',ownerImage[0]?.SrNo);
          data.append('owner_name2',ownerName2);
          data.append('owner_description2',description2);
          data.append('hiddenowner_image2', 
          {
            uri: ownerImage2Uri,
            name: ownerImage2,
            type: ownerImage2Type,
          }
          );
          data.append('hiddenowner_id2',ownerImage[1]?.SrNo);
          data.append('owner_name3',ownerName3);
          data.append('owner_description3',description3);
          data.append('hiddenowner_image3', 
          {
            uri: ownerImage3Uri,
            name: ownerImage3,
            type: ownerImage3Type,
          }
          );
          data.append('hiddenowner_id3',ownerImage[2]?.SrNo);
          data.append('showroom_image[0]',
           {
            uri: showroom1Uri,
            name: showroom1,
            type: showroom1Type,
          }
          );
          data.append('showroom_image[1]', {
            uri: showroom2Uri,
            name: showroom2,
            type: showroom2Type,
          });
          data.append('showroom_image[2]',{
            uri: showroom3Uri,
            name: showroom3,
            type: showroom3Type,
          });
          data.append('logo',
           {
            uri: logoUri,
            name: logoName,
            type: logoType,
          }
          );

          const response = await axios({
            method: 'POST',
            data,
            headers: {
              'content-type': 'multipart/form-data',
              "Olocker": `Bearer ${Token}`,
            },
            url: 'https://olocker.co/api/supplier//updateProfile',
          });
          console.log('this is iresponae',response);
          if (response.data.status == 'success') {
            setFetching(false)
            Toast.show(response.data.msg)
          } else {
            setFetching(false);
            Toast.show(response.data.msg)
            console.log('this is iresponae',response);
          }
        } catch (error) {
            // console.log("err->", error.response.data)
         setFetching(false)
         console.log('this is iresponae',error);
        }
      }
      };
    
    
    const manageMenu = () => {
        setManufacturer('checked')
        setWholeSaler('unchecked')
        setBoth('unchecked')
    }
    const manageWhole = () => {
        setManufacturer('unchecked')
        setWholeSaler('checked')
        setBoth('unchecked')
    }
    const manageBoth = () => {
        setManufacturer('unchecked')
        setWholeSaler('unchecked')
        setBoth('checked')
    }
    const manageTen = () => {
        setTen('checked')
        setElevan('unchecked')
        setTwentySix('unchecked')
        setThirtySix('unchecked')
        setFifty('unchecked')
    }
    const manageElevan = () => {
        setTen('unchecked')
        setElevan('checked')
        setTwentySix('unchecked')
        setThirtySix('unchecked')
        setFifty('unchecked')
    }
    const manageTwentySix = () => {
        setTen('unchecked')
        setElevan('unchecked')
        setTwentySix('checked')
        setThirtySix('unchecked')
        setFifty('unchecked')
    }
    const manageThirySix = () => {
        setTen('unchecked')
        setElevan('unchecked')
        setTwentySix('unchecked')
        setThirtySix('checked')
        setFifty('unchecked')
    }
    const manageFifty = () => {
        setTen('unchecked')
        setElevan('unchecked')
        setTwentySix('unchecked')
        setThirtySix('unchecked')
        setFifty('checked')
    }

  const  chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                return;
            } else if (response.errorCode == 'permission') {
                return;
            } else if (response.errorCode == 'others') {
                return;
            }
            console.log('this is respponsee valu',response);
           setLogoName(response.assets[0].fileName.substring(response.assets[0].fileName.lastIndexOf('-') + 1))
           setLogoUri(response.assets[0].uri)
           setLogoType(response.assets[0].type)
        });
    };

    const  uploadProduct1 = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                return;
            } else if (response.errorCode == 'permission') {
                return;
            } else if (response.errorCode == 'others') {
                return;
            }
           setProductImage1(response.assets[0].fileName.substring(response.assets[0].fileName.lastIndexOf('-') + 1))
           setproductImage1Uri(response.assets[0].uri)
           setproductImage1Type(response.assets[0].type)
        });
    };
    const  uploadProduct2 = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                return;
            } else if (response.errorCode == 'permission') {
                return;
            } else if (response.errorCode == 'others') {
                return;
            }
            setProductImage2(response.assets[0].fileName.substring(response.assets[0].fileName.lastIndexOf('-') + 1))
            setproductImage2Uri(response.assets[0].uri)
            setproductImage2Type(response.assets[0].type)
        });
    };
    const  uploadProduct3 = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                return;
            } else if (response.errorCode == 'permission') {
                return;
            } else if (response.errorCode == 'others') {
                return;
            }
            setProductImage3(response.assets[0].fileName.substring(response.assets[0].fileName.lastIndexOf('-') + 1))
            setproductImage3Uri(response.assets[0].uri)
            setproductImage3Type(response.assets[0].type)
        });
    };

    const  uploadShowroom1 = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                return;
            } else if (response.errorCode == 'permission') {
                return;
            } else if (response.errorCode == 'others') {
                return;
            }
            setShowroom1(response.assets[0].fileName.substring(response.assets[0].fileName.lastIndexOf('-') + 1))
            setshowroom1Uri(response.assets[0].uri)
            setshowroom1Type(response.assets[0].type)
        });
    };

    const  uploadShowroom2 = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                return;
            } else if (response.errorCode == 'permission') {
                return;
            } else if (response.errorCode == 'others') {
                return;
            }
            setShowroom2(response.assets[0].fileName.substring(response.assets[0].fileName.lastIndexOf('-') + 1))
            setshowroom2Uri(response.assets[0].uri)
            setshowroom2Type(response.assets[0].type)
        });
    };

    const  uploadShowroom3 = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                return;
            } else if (response.errorCode == 'permission') {
                return;
            } else if (response.errorCode == 'others') {
                return;
            }
            setShowroom3(response.assets[0].fileName.substring(response.assets[0].fileName.lastIndexOf('-') + 1))
            setshowroom3Uri(response.assets[0].uri)
            setshowroom3Type(response.assets[0].type)
        });
    };

    const  uploadOwner1 = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                return;
            } else if (response.errorCode == 'permission') {
                return;
            } else if (response.errorCode == 'others') {
                return;
            }
            setOwnerImage1(response.assets[0].fileName.substring(response.assets[0].fileName.lastIndexOf('-') + 1))
            setownerImage1Uri(response.assets[0].uri)
            setownerImage1Type(response.assets[0].type)
        });
    };

    const  uploadOwner2 = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                return;
            } else if (response.errorCode == 'permission') {
                return;
            } else if (response.errorCode == 'others') {
                return;
            }
            setOwnerImage2(response.assets[0].fileName.substring(response.assets[0].fileName.lastIndexOf('-') + 1))
            setownerImage2Uri(response.assets[0].uri)
            setownerImage2Type(response.assets[0].type)
        });
    };

    const  uploadOwner3 = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                return;
            } else if (response.errorCode == 'permission') {
                return;
            } else if (response.errorCode == 'others') {
                return;
            }
            setOwnerImage3(response.assets[0].fileName.substring(response.assets[0].fileName.lastIndexOf('-') + 1))
            setownerImage3Uri(response.assets[0].uri)
            setownerImage3Type(response.assets[0].type)
        });
    };

const handleSumit=()=>{
    if(supplierName==''){
        Toast.show('Please enter supplier name')
    }
    else if(contactPerson==''){
        Toast.show('Please enter contact person name')
    }
    else if(mobile==''){
        Toast.show('Please enter mobile number')
    }
    else if(address==''){
        Toast.show('Please enter complete address')
    }
    else if(state==''){
        Toast.show('Please select state name')
    }
    else if(city==''){
        Toast.show('Please select city name')
    }
    else if(selected==[]){
        Toast.show('Please select gold purity')
    }
    else if(selected1==[]){
        Toast.show('Please choose gold specialisation')
    }
    else{

    }
}


const manageCity=(val)=>{
    setState(val)
    dispatch({
        type: 'City_List_Request',
        url: '/getCities',
        stateId:val
      })
}

const renderScreen=()=>{
    return(

        <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
        <View>
            <Text style={styles.text}>Supplier Name<Text style={{ color: 'red' }}>{' *'}</Text></Text>
            <TextInput
                placeholder="Supplier Name"
                style={{ borderWidth: 1, marginTop: 4, height: 40, borderRadius: 6, borderColor: 'grey', paddingLeft: 10 }}
                value={supplierName}
                onChangeText={(val)=>setSupplierName(val)}
            />
        </View>
        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Contact Person Name<Text style={{ color: 'red' }}>{' *'}</Text></Text>
            <TextInput
                placeholder="Contact Person Name"
                style={{ borderWidth: 1, marginTop: 4, height: 40, borderRadius: 6, borderColor: 'grey', paddingLeft: 10 }}
                value={contactPerson}
                onChangeText={(val)=>setContactPerson(val)}
           />
        </View>
        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Mobile No.<Text style={{ color: 'red' }}>{' *'}</Text></Text>
            <TextInput
                placeholder="Mobile No."
                style={{ borderWidth: 1, marginTop: 4, height: 40, borderRadius: 6, borderColor: 'grey', paddingLeft: 10 }}
                value={mobile}
                onChangeText={(val)=>setMobile(val)}
           />
        </View>
        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Address<Text style={{ color: 'red' }}>{' *'}</Text></Text>
            <TextInput
                placeholder="Address"
                style={{ borderWidth: 1, marginTop: 4, height: 40, borderRadius: 6, borderColor: 'grey', paddingLeft: 10 }}
                value={address}
                onChangeText={(val)=>setAddress(val)}
            />
        </View>
        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>State<Text style={{ color: 'red' }}>{' *'}</Text></Text>
           <View  style={{ borderWidth: 1, marginTop: 4, height: 40, borderRadius: 6, borderColor: 'grey', paddingLeft: 6 }}>
            <RNPickerSelect
              onValueChange={val => manageCity(val)}
              items={stateList}
              style={{
                inputAndroid: {
                  color: '#474747',
                  width: '100%',
                  fontSize: 14,
                  marginBottom: -1,
                  fontFamily: 'Acephimere',
                },
                inputIOS: {
                  color: '#474747',
                  width: '100%',
                  fontSize: 14,
                  marginBottom: 10,
                  fontFamily: 'Acephimere',
                },
                placeholder: {
                  color: 'grey',
                  width: '100%',
                  alignSelf: 'center',
                  fontFamily: 'Acephimere',
                },
              }}
              value={state}
              useNativeAndroidPickerStyle={false}
              placeholder={{label: 'Select State', value: ''}}
            />
        </View>
        </View>
        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>City<Text style={{ color: 'red' }}>{' *'}</Text></Text>
            <View  style={{ borderWidth: 1, marginTop: 4, height: 40, borderRadius: 6, borderColor: 'grey', paddingLeft: 6 }}>
            <RNPickerSelect
              onValueChange={val => setCity(val)}
              items={cityList}
              style={{
                inputAndroid: {
                  color: '#474747',
                  width: '100%',
                  fontSize: 14,
                  marginBottom: -1,
                  fontFamily: 'Acephimere',
                },
                inputIOS: {
                  color: '#474747',
                  width: '100%',
                  fontSize: 14,
                  marginBottom: 10,
                  fontFamily: 'Acephimere',
                },
                placeholder: {
                  color: 'grey',
                  width: '100%',
                  alignSelf: 'center',
                  fontFamily: 'Acephimere',
                },
              }}
              value={city}
              useNativeAndroidPickerStyle={false}
              placeholder={{label: 'Select State', value: ''}}
            />
        </View>
        </View>
        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Pincode</Text>
            <TextInput
                placeholder="Pincode"
                style={{ borderWidth: 1, marginTop: 4, height: 40, borderRadius: 6, borderColor: 'grey', paddingLeft: 10 }}
                value={pincode}
                onChangeText={(val)=>setPincode(val)}
            />
        </View>
        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Website URL</Text>
            <TextInput
                placeholder="Website URL"
                style={{ borderWidth: 1, marginTop: 4, height: 40, borderRadius: 6, borderColor: 'grey', paddingLeft: 10 }}
                value={website}
                onChangeText={(val)=>setWesite(val)}
            />
        </View>
        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Tell us what are you<Text style={{ color: 'red' }}>{' *'}</Text></Text>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <RadioButton
                    value="first"
                    status={manufacturer}
                    onPress={() => manageMenu()}
                    uncheckedColor='#032e63'
                    color='#032e63'
                />
                <Text>Manufacturer</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <RadioButton
                    value="first"
                    status={wholeSaler}
                    onPress={() => manageWhole()}
                    uncheckedColor='#032e63'
                    color='#032e63'
                />
                 <Text>Wholesaler</Text>
                </View>
               
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <RadioButton
                    value="first"
                    status={both}
                    onPress={() => manageBoth()}
                    uncheckedColor='#032e63'
                    color='#032e63'
                />
                <Text>Both</Text>
                </View>
            </View>
        </View>
        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Any branches you have<Text style={{ color: 'red' }}>{' *'}</Text></Text>
            <CheckBox
              disabled={false}
              value={branch}
              onValueChange={newValue => setBranch(newValue)}
              tintColors={{true: '#032e63', false: '#032e63'}}
              onTintColor='#032e63'
              onCheckColor='#032e63'
              boxType='square'
              style={{height:16,width:18,marginTop:10}}
            />
        </View>
        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Type of jewellery</Text>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <CheckBox
              disabled={false}
              value={diamond}
              onValueChange={newValue => setDiamond(newValue)}
              tintColors={{true: '#032e63', false: '#032e63'}}
              onTintColor='#032e63'
              onCheckColor='#032e63'
              boxType='square'
              style={{height:16,width:18}}
            />
            <Text style={{marginLeft:10}}>Diamond</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <CheckBox
              disabled={false}
              value={gold}
              onValueChange={newValue => setGold(newValue)}
              tintColors={{true: '#032e63', false: '#032e63'}}
              onTintColor='#032e63'
              onCheckColor='#032e63'
              boxType='square'
              style={{height:16,width:18}}
            />
            <Text style={{marginLeft:10}}>Gold</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <CheckBox
              disabled={false}
              value={platinum}
              onValueChange={newValue => setPlatinum(newValue)}
              tintColors={{true: '#032e63', false: '#032e63'}}
              onTintColor='#032e63'
              onCheckColor='#032e63'
              boxType='square'
              style={{height:16,width:18}}
            />
            <Text style={{marginLeft:10}}>Platinum</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <CheckBox
              disabled={false}
              value={silver}
              onValueChange={newValue => setSilver(newValue)}
              tintColors={{true: '#032e63', false: '#032e63'}}
              onTintColor='#032e63'
              onCheckColor='#032e63'
              boxType='square'
              style={{height:16,width:18}}
            />
            <Text style={{marginLeft:10}}>Silver</Text>
            </View>
            </View>
        </View>
        {diamond==true?<View>
        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Diamond purity<Text style={{ color: 'red' }}>{' *'}</Text></Text>
            <MultiSelect   
                        items={items1}
                        uniqueKey="name"
                        onSelectedItemsChange={(val)=>{
                            setSelected2(val)
                            if(val.includes('Custom Purity')){
                                setCustomPurityDia(true)
                            }
                            else{
                                setCustomPurityDia(false)
                            }
                        }
                        }
                        selectedItems={selected2}
                        searchIcon={false}
                        tagBorderColor={'#032e63'}
                        tagRemoveIconColor={'#fff'}
                        tagTextColor={'#fff'}
                        selectText={selected2.length>0?'':"Select Diamond Purity"}
                        single={false}
                        searchInputPlaceholderText="Select Diamond Purity"
                        selectedItemTextColor={'#032e63'}
                        selectedItemIconColor={'#032e63'}
                        itemTextColor={'#032e63'}
                        displayKey="name"
                        submitButtonColor={'#032e63'}
                        submitButtonText="Submit"
                        textInputProps={{ editable: false,autoFocus:false }}
        
                        styleDropdownMenu={{
                            // width:'100%',
                            borderBottomWidth:1.5,
                            borderColor:'#032e63',
                            height:55,
                            alignSelf:'center',
                            flexDirection:'row',
                            backgroundColor:'#fff',
                            paddingHorizontal:12,
                            marginTop:5
                            // borderWidth:1
                         
                          }}
                          tagContainerStyle={{backgroundColor:'#032e63',justifyContent:'space-between',alignItems:'center',width:'48%'}}
                      />
        </View>
        {customPurityDia==true?<View style={{ marginTop: 10 }}>
            <TextInput
                placeholder="Please specify custom purity"
                style={{ borderWidth: 1, marginTop: 4, height: 40, borderRadius: 6, borderColor: 'grey', paddingLeft: 10 }}
                value={customPurityD}
                onChangeText={(val)=>setCustomPurityD(val)}
            />
        </View>:null}
        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Choose Diamond Specialisation<Text style={{ color: 'red' }}>{' *'}</Text></Text>
            <MultiSelect   
                        items={diamondSpecilization}
                        uniqueKey="Specialisation"
                        onSelectedItemsChange={(val)=>setSelected3(val)}
                        selectedItems={selected3}
                        searchIcon={false}
                        tagBorderColor={'#032e63'}
                        tagRemoveIconColor={'#fff'}
                        tagTextColor={'#fff'}
                        selectText={selected3.length>0?'':"Choose Diamond Specialisation"}
                        single={false}
                        searchInputPlaceholderText="Choose Diamond Specialisation"
                        selectedItemTextColor={'#032e63'}
                        selectedItemIconColor={'#032e63'}
                        itemTextColor={'#032e63'}
                        displayKey="name"
                        submitButtonColor={'#032e63'}
                        submitButtonText="Submit"
                        textInputProps={{ editable: false,autoFocus:false }}
        
                        styleDropdownMenu={{
                            // width:'100%',
                            borderBottomWidth:1.5,
                            borderColor:'#032e63',
                            height:55,
                            alignSelf:'center',
                            flexDirection:'row',
                            backgroundColor:'#fff',
                            paddingHorizontal:12,
                            marginTop:5
                            // borderWidth:1
                         
                          }}
                          tagContainerStyle={{backgroundColor:'#032e63',justifyContent:'space-between',alignItems:'center',width:'48%'}}
                      />
        </View>
      </View>:null}
        {gold==true?<View>
        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Gold purity<Text style={{ color: 'red' }}>{' *'}</Text></Text>
            <MultiSelect   
                        items={items}
                        uniqueKey="name"
                        onSelectedItemsChange={(val)=>{
                            setSelected(val)
                            if(val.includes('Custom Purity')){
                            setCustomPurityGo(true)
                            }
                            else{
                            setCustomPurityGo(false) 
                            }
                           }
                        }
                        selectedItems={selected}
                        searchIcon={false}
                        tagBorderColor={'#032e63'}
                        tagRemoveIconColor={'#fff'}
                        tagTextColor={'#fff'}
                        selectText={selected.length>0?'':"Select Gold Purity"}
                        single={false}
                        searchInputPlaceholderText="Select Gold Purity"
                        selectedItemTextColor={'#032e63'}
                        selectedItemIconColor={'#032e63'}
                        itemTextColor={'#032e63'}
                        displayKey="name"
                        submitButtonColor={'#032e63'}
                        submitButtonText="Submit"
                        textInputProps={{ editable: false,autoFocus:false }}
        
                        styleDropdownMenu={{
                            // width:'100%',
                            borderBottomWidth:1.5,
                            borderColor:'#032e63',
                            height:55,
                            alignSelf:'center',
                            flexDirection:'row',
                            backgroundColor:'#fff',
                            paddingHorizontal:12,
                            marginTop:5
                            // borderWidth:1
                         
                          }}
                          tagContainerStyle={{backgroundColor:'#032e63',justifyContent:'space-between',alignItems:'center',width:'48%'}}
                      />
        </View>
        
        {customPurityGo==true?<View style={{ marginTop: 10 }}>
            <TextInput
                placeholder="Please specify custom purity"
                style={{ borderWidth: 1, marginTop: 4, height: 40, borderRadius: 6, borderColor: 'grey', paddingLeft: 10 }}
                value={customPurityG}
                onChangeText={(val)=>setCustomPurityG(val)}
            />
        </View>:null}
        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Choose Gold Specialisation<Text style={{ color: 'red' }}>{' *'}</Text></Text>
            <MultiSelect   
                        items={goldSpecilization}
                        uniqueKey="Specialisation"
                        onSelectedItemsChange={(val)=>setSelected1(val)}
                        selectedItems={selected1}
                        searchIcon={false}
                        tagBorderColor={'#032e63'}
                        tagRemoveIconColor={'#fff'}
                        tagTextColor={'#fff'}
                        selectText={selected1.length>0?'':"Choose Gold Specialisation"}
                        single={false}
                        searchInputPlaceholderText="Choose Gold Specialisation"
                        selectedItemTextColor={'#032e63'}
                        selectedItemIconColor={'#032e63'}
                        itemTextColor={'#032e63'}
                        displayKey="name"
                        submitButtonColor={'#032e63'}
                        submitButtonText="Submit"
                        textInputProps={{ editable: false,autoFocus:false }}
        
                        styleDropdownMenu={{
                            // width:'100%',
                            borderBottomWidth:1.5,
                            borderColor:'#032e63',
                            height:55,
                            alignSelf:'center',
                            flexDirection:'row',
                            backgroundColor:'#fff',
                            paddingHorizontal:12,
                            marginTop:5
                            // borderWidth:1
                         
                          }}
                          tagContainerStyle={{backgroundColor:'#032e63',justifyContent:'space-between',alignItems:'center',width:'48%'}}
                      />
        </View>
      </View>:null}
      {platinum==true?<View>
        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Platinum purity<Text style={{ color: 'red' }}>{' *'}</Text></Text>
            <MultiSelect   
                        items={items2}
                        uniqueKey="name"
                        onSelectedItemsChange={(val)=>{
                            setSelected4(val)
                            if(val.includes('Custom Purity')){
                                setCustomPurityPla(true)
                                }
                                else{
                                setCustomPurityPla(false) 
                                }
                        }
                        }
                        selectedItems={selected4}
                        searchIcon={false}
                        tagBorderColor={'#032e63'}
                        tagRemoveIconColor={'#fff'}
                        tagTextColor={'#fff'}
                        selectText={selected4.length>0?'':"Select Platinum Purity"}
                        single={false}
                        searchInputPlaceholderText="Select Platinum Purity"
                        selectedItemTextColor={'#032e63'}
                        selectedItemIconColor={'#032e63'}
                        itemTextColor={'#032e63'}
                        displayKey="name"
                        submitButtonColor={'#032e63'}
                        submitButtonText="Submit"
                        textInputProps={{ editable: false,autoFocus:false }}
        
                        styleDropdownMenu={{
                            // width:'100%',
                            borderBottomWidth:1.5,
                            borderColor:'#032e63',
                            height:55,
                            alignSelf:'center',
                            flexDirection:'row',
                            backgroundColor:'#fff',
                            paddingHorizontal:12,
                            marginTop:5
                            // borderWidth:1
                         
                          }}
                          tagContainerStyle={{backgroundColor:'#032e63',justifyContent:'space-between',alignItems:'center',width:'48%'}}
                      />
        </View>
        {customPurityPla==true?<View style={{ marginTop: 10 }}>
            <TextInput
                placeholder="Please specify custom purity"
                style={{ borderWidth: 1, marginTop: 4, height: 40, borderRadius: 6, borderColor: 'grey', paddingLeft: 10 }}
                value={customPurityP}
                onChangeText={(val)=>setCustomPurityP(val)}
            />
        </View>:null}
        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Choose Platinum Specialisation<Text style={{ color: 'red' }}>{' *'}</Text></Text>
            <MultiSelect   
                        items={platinumSpecilization}
                        uniqueKey="Specialisation"
                        onSelectedItemsChange={(val)=>setSelected5(val)}
                        selectedItems={selected5}
                        searchIcon={false}
                        tagBorderColor={'#032e63'}
                        tagRemoveIconColor={'#fff'}
                        tagTextColor={'#fff'}
                        selectText={selected4.length>0?'':"Choose Platinum Specialisation"}
                        single={false}
                        searchInputPlaceholderText="Choose Platinum Specialisation"
                        selectedItemTextColor={'#032e63'}
                        selectedItemIconColor={'#032e63'}
                        itemTextColor={'#032e63'}
                        displayKey="name"
                        submitButtonColor={'#032e63'}
                        submitButtonText="Submit"
                        textInputProps={{ editable: false,autoFocus:false }}
        
                        styleDropdownMenu={{
                            // width:'100%',
                            borderBottomWidth:1.5,
                            borderColor:'#032e63',
                            height:55,
                            alignSelf:'center',
                            flexDirection:'row',
                            backgroundColor:'#fff',
                            paddingHorizontal:12,
                            marginTop:5
                            // borderWidth:1
                         
                          }}
                          tagContainerStyle={{backgroundColor:'#032e63',justifyContent:'space-between',alignItems:'center',width:'48%'}}
                      />
        </View>
      </View>:null}
      {silver==true?<View>
        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Silver purity<Text style={{ color: 'red' }}>{' *'}</Text></Text>
            <MultiSelect   
                        items={items3}
                        uniqueKey="name"
                        onSelectedItemsChange={(val)=>{
                            setSelected6(val)
                            if(val.includes('Custom Purity')){
                                setCustomPuritySil(true)
                                }
                                else{
                                setCustomPuritySil(false) 
                                }
                        }}
                        selectedItems={selected6}
                        searchIcon={false}
                        tagBorderColor={'#032e63'}
                        tagRemoveIconColor={'#fff'}
                        tagTextColor={'#fff'}
                        selectText={selected6.length>0?'':"Select Silver Purity"}
                        single={false}
                        searchInputPlaceholderText="Select Gold Purity"
                        selectedItemTextColor={'#032e63'}
                        selectedItemIconColor={'#032e63'}
                        itemTextColor={'#032e63'}
                        displayKey="name"
                        submitButtonColor={'#032e63'}
                        submitButtonText="Submit"
                        textInputProps={{ editable: false,autoFocus:false }}
        
                        styleDropdownMenu={{
                            // width:'100%',
                            borderBottomWidth:1.5,
                            borderColor:'#032e63',
                            height:55,
                            alignSelf:'center',
                            flexDirection:'row',
                            backgroundColor:'#fff',
                            paddingHorizontal:12,
                            marginTop:5
                            // borderWidth:1
                         
                          }}
                          tagContainerStyle={{backgroundColor:'#032e63',justifyContent:'space-between',alignItems:'center',width:'48%'}}
                      />
        </View>
        {customPuritySil==true?<View style={{ marginTop: 10 }}>
            <TextInput
                placeholder="Please specify custom purity"
                style={{ borderWidth: 1, marginTop: 4, height: 40, borderRadius: 6, borderColor: 'grey', paddingLeft: 10 }}
                value={customPurityS}
                onChangeText={(val)=>setCustomPurityS(val)}
            />
        </View>:null}
        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Choose Silver Specialisation<Text style={{ color: 'red' }}>{' *'}</Text></Text>
            <MultiSelect   
                        items={silverSpecilization}
                        uniqueKey="Specialisation"
                        onSelectedItemsChange={(val)=>setSelected7(val)}
                        selectedItems={selected7}
                        searchIcon={false}
                        tagBorderColor={'#032e63'}
                        tagRemoveIconColor={'#fff'}
                        tagTextColor={'#fff'}
                        selectText={selected7.length>0?'':"Choose Silver Specialisation"}
                        single={false}
                        searchInputPlaceholderText="Choose Silver Specialisation"
                        selectedItemTextColor={'#032e63'}
                        selectedItemIconColor={'#032e63'}
                        itemTextColor={'#032e63'}
                        displayKey="name"
                        submitButtonColor={'#032e63'}
                        submitButtonText="Submit"
                        textInputProps={{ editable: false,autoFocus:false }}
        
                        styleDropdownMenu={{
                            // width:'100%',
                            borderBottomWidth:1.5,
                            borderColor:'#032e63',
                            height:55,
                            alignSelf:'center',
                            flexDirection:'row',
                            backgroundColor:'#fff',
                            paddingHorizontal:12,
                            marginTop:5
                            // borderWidth:1
                         
                          }}
                          tagContainerStyle={{backgroundColor:'#032e63',justifyContent:'space-between',alignItems:'center',width:'48%'}}
                      />
        </View>
      </View>:null}
        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Diamond quality</Text>
            <TextInput
                placeholder="Specify Your Qualities"
                style={{ borderWidth: 1, marginTop: 4, height: 40, borderRadius: 6, borderColor: 'grey', paddingLeft: 10 }}
                value={quality}
                onChangeText={(val)=>setQuality(val)}
           />
        </View>
        <View style={{ marginTop: 10 }}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <CheckBox
              disabled={false}
              value={isActive}
              onValueChange={newValue => setIsActive(newValue)}
              tintColors={{true: '#032e63', false: '#032e63'}}
              onTintColor='#032e63'
              onCheckColor='#032e63'
              boxType='square'
              style={{height:16,width:18}}
            />
            <Text style={{marginLeft:10}}>Is Active</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <CheckBox
              disabled={false}
              value={isDefault}
              onValueChange={newValue => setIsDefault(newValue)}
              tintColors={{true: '#032e63', false: '#032e63'}}
              onTintColor='#032e63'
              onCheckColor='#032e63'
              boxType='square'
              style={{height:16,width:18}}
            />
            <Text style={{marginLeft:10}}>Default Supplier for all retailers</Text>
            </View>
            </View>
        </View>

        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Upload Supplier Logo (if any)</Text>
            <View style={{ 
                borderWidth: 1, 
                marginTop: 4, 
                height: 40, 
                borderRadius: 6, 
                borderColor: 'grey', 
                flexDirection:'row',
                alignItems:'center'
                }}>
                <TouchableOpacity 
                onPress={()=>chooseFile('photo')}
                style={{
                    backgroundColor:'grey', 
                    height: 40, 
                    width:'30%',
                    borderTopLeftRadius:6,
                    borderBottomLeftRadius:6,
                    alignItems:'center',
                    justifyContent:'center'
                    }}>
                    <Text style={{color:'#fff'}}>Choose File</Text>
                </TouchableOpacity>
                <View style={{alignItems:'center',justifyContent:'center',width:'70%'}}>
                   {logoName==''? <Text>No File Choosen</Text>:<Text>{logoName}</Text>}
                </View>
            </View>
        </View>


        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Upload image of your product:</Text>
            <View>
            <View style={styles.uploadView}>
                <TouchableOpacity 
                onPress={()=>uploadProduct1('photo')}
                style={styles.grey}>
                    <Text style={{color:'#fff'}}>Choose File</Text>
                </TouchableOpacity>
                <View style={{alignItems:'center',justifyContent:'center',width:'70%'}}>
                   {productImage1==''? <Text>No File Choosen</Text>:<Text>{productImage1}</Text>}
                </View>
            </View>
            <TextInput
                placeholder="Product Name"
                style={{ borderWidth: 1, marginTop: 4, height: 40, borderRadius: 6, borderColor: 'grey', paddingLeft: 10 }}
                value={productName1}
                onChangeText={(val)=>setProductName1(val)}
            />
            </View>
            <View style={{marginTop:5}}>
            <View style={styles.uploadView}>
                <TouchableOpacity 
                onPress={()=>uploadProduct2('photo')}
                style={styles.grey}>
                    <Text style={{color:'#fff'}}>Choose File</Text>
                </TouchableOpacity>
                <View style={{alignItems:'center',justifyContent:'center',width:'70%'}}>
                   {productImage2==''? <Text>No File Choosen</Text>:<Text>{productImage2}</Text>}
                </View>
            </View>
            <TextInput
                placeholder="Product Name"
                style={{ borderWidth: 1, marginTop: 4, height: 40, borderRadius: 6, borderColor: 'grey', paddingLeft: 10 }}
                value={productName2}
                onChangeText={(val)=>setProductName2(val)}
            />
            </View>
            <View style={{marginTop:5}}>
            <View style={styles.uploadView}>
                <TouchableOpacity 
                onPress={()=>uploadProduct3('photo')}
                style={styles.grey}>
                    <Text style={{color:'#fff'}}>Choose File</Text>
                </TouchableOpacity>
                <View style={{alignItems:'center',justifyContent:'center',width:'70%'}}>
                   {productImage3==''? <Text>No File Choosen</Text>:<Text>{productImage3}</Text>}
                </View>
            </View>
            <TextInput
                placeholder="Product Name"
                style={{ borderWidth: 1, marginTop: 4, height: 40, borderRadius: 6, borderColor: 'grey', paddingLeft: 10 }}
                value={productName3}
                onChangeText={(val)=>setProductName3(val)}
            />
            </View>
        </View>

        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>About you</Text>
            <View style={{ 
                borderWidth: 1, 
                marginTop: 4, 
                borderRadius: 6, 
                borderColor: 'grey',
                height:70
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
                value={about}
                onChangeText={(val)=>setAbout(val)}
                multiline
            />
            </View>
        </View>

        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Number of employees</Text>
            <View style={{alignItems:'flex-start',}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <RadioButton
                    value="first"
                    status={ten}
                    onPress={() => manageTen()}
                    uncheckedColor='#032e63'
                    color='#032e63'
                />
                <Text>Upto 10 employees</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <RadioButton
                    value="first"
                    status={elevan}
                    onPress={() => manageElevan()}
                    uncheckedColor='#032e63'
                    color='#032e63'
                />
                 <Text>11-25 employees</Text>
                </View>
               
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <RadioButton
                    value="first"
                    status={twentySix}
                    onPress={() => manageTwentySix()}
                    uncheckedColor='#032e63'
                    color='#032e63'
                />
                <Text>26-35 employees</Text>
                </View>

                <View style={{flexDirection:'row',alignItems:'center'}}>
                <RadioButton
                    value="first"
                    status={thirtySix}
                    onPress={() => manageThirySix()}
                    uncheckedColor='#032e63'
                    color='#032e63'
                />
                <Text>36-50 employees</Text>
                </View>

                <View style={{flexDirection:'row',alignItems:'center'}}>
                <RadioButton
                    value="first"
                    status={fifty}
                    onPress={() => manageFifty()}
                    uncheckedColor='#032e63'
                    color='#032e63'
                />
                <Text>Above 50 employees</Text>
                </View>
            </View>
        </View>

        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Upload Showroom Images (upto 3):</Text>
            <View style={styles.sView}>
                <TouchableOpacity 
                onPress={()=>uploadShowroom1('photo')}
                style={styles.sTouch}>
                    <Text style={{color:'#fff'}}>Choose File</Text>
                </TouchableOpacity>
                <View style={{alignItems:'center',justifyContent:'center',width:'70%'}}>
                   {showroom1==''? <Text>No File Choosen</Text>:<Text>{showroom1}</Text>}
                </View>
            </View>
            <View style={styles.sView}>
                <TouchableOpacity 
                onPress={()=>uploadShowroom2('photo')}
                style={styles.sTouch}>
                    <Text style={{color:'#fff'}}>Choose File</Text>
                </TouchableOpacity>
                <View style={{alignItems:'center',justifyContent:'center',width:'70%'}}>
                   {showroom2==''? <Text>No File Choosen</Text>:<Text>{showroom2}</Text>}
                </View>
            </View>
            <View style={styles.sView}>
                <TouchableOpacity 
                onPress={()=>uploadShowroom3('photo')}
                style={styles.sTouch}>
                    <Text style={{color:'#fff'}}>Choose File</Text>
                </TouchableOpacity>
                <View style={{alignItems:'center',justifyContent:'center',width:'70%'}}>
                   {showroom3==''? <Text>No File Choosen</Text>:<Text>{showroom3}</Text>}
                </View>
            </View>
        </View>


        <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Upload Owner images:</Text>
            <View>
            <View style={styles.uploadView}>
                <TouchableOpacity 
                onPress={()=>uploadOwner1('photo')}
                style={styles.grey}>
                    <Text style={{color:'#fff'}}>Choose File</Text>
                </TouchableOpacity>
                <View style={{alignItems:'center',justifyContent:'center',width:'70%'}}>
                   {ownerImage1==''? <Text>No File Choosen</Text>:<Text>{ownerImage1}</Text>}
                </View>
            </View>
            <TextInput
                placeholder="Owner Name"
                style={{ borderWidth: 1, marginTop: 4, height: 40, borderRadius: 6, borderColor: 'grey', paddingLeft: 10 }}
                value={ownerName1}
                onChangeText={(val)=>setOwnerName1(val)}
            />
             <View style={styles.multiline}>
            <TextInput
                placeholder="Write about owner description"
                style={styles.input}
                multiline
                value={description1}
                onChangeText={(val)=>setDescriptiion1(val)}
            />
            </View>
            </View>
            <View style={{marginTop:5}}>
            <View style={styles.uploadView}>
                <TouchableOpacity 
                onPress={()=>uploadOwner2('photo')}
                style={styles.grey}>
                    <Text style={{color:'#fff'}}>Choose File</Text>
                </TouchableOpacity>
                <View style={{alignItems:'center',justifyContent:'center',width:'70%'}}>
                   {ownerImage2==''? <Text>No File Choosen</Text>:<Text>{ownerImage2}</Text>}
                </View>
            </View>
            <TextInput
                placeholder="Owner Name"
                style={{ borderWidth: 1, marginTop: 4, height: 40, borderRadius: 6, borderColor: 'grey', paddingLeft: 10 }}
                value={ownerName2}
                onChangeText={(val)=>setOwnerName2(val)}
            />
             <View style={styles.multiline}>
            <TextInput
                placeholder="Write about owner description"
                style={styles.input}
                multiline
                value={description2}
                onChangeText={(val)=>setDescriptiion2(val)}
            />
            </View>
            </View>
            <View style={{marginTop:5}}>
            <View style={styles.uploadView}>
                <TouchableOpacity 
                onPress={()=>uploadOwner3('photo')}
                style={styles.grey}>
                    <Text style={{color:'#fff'}}>Choose File</Text>
                </TouchableOpacity>
                <View style={{alignItems:'center',justifyContent:'center',width:'70%'}}>
                   {ownerImage3==''? <Text>No File Choosen</Text>:<Text>{ownerImage3}</Text>}
                </View>
            </View>
            <TextInput
                placeholder="Owner Name"
                style={{ borderWidth: 1, marginTop: 4, height: 40, borderRadius: 6, borderColor: 'grey', paddingLeft: 10 }}
                value={ownerName3}
                onChangeText={(val)=>setOwnerName3(val)}
            />
             <View style={styles.multiline}>
            <TextInput
                placeholder="Write about owner description"
                style={styles.input}
                multiline
                value={description3}
                onChangeText={(val)=>setDescriptiion3(val)}
            />
            </View>
            </View>
        </View>

         <View>
             <TouchableOpacity 
             onPress={()=>validateUser()}
             style={{
                 height:40,
                 width:'100%',
                 backgroundColor:'#032e63',
                 marginTop:20,
                 borderRadius:8,
                 alignItems:'center',
                 justifyContent:'center'
             }}>
                 <Text style={{color:'#fff',fontSize:15}}>Submit</Text>
             </TouchableOpacity>
         </View>
        <View style={{ height: 40 }}/>
    </ScrollView>
    )
}
if (details) {
    return (
        <View style={{ flex: 1, backgroundColor: '#f0eeef' }}>
            <Header
                source={require('../../../assets/L.png')}
                title={'Edit Profile '}
                onPress={() => navigation.goBack()}
            />
           {fetching?<Loading/>:null}
           {renderScreen()}
        </View>
    )
    
} else {
    return (
        <View style={{ flex: 1, backgroundColor: '#f0eeef' }}>
            <Header
                source={require('../../../assets/L.png')}
                title={'Edit Profile '}
                onPress={() => navigation.goBack()}
            />
           <Loading/>
          
        </View>
    )
}
    
}
export default EditSupplierProfile;

const items = [{
    id: '1',
    name: 'Custom Purity'
  }, {
    id: '2',
    name: '585 (14k)'
  }, {
    id: '3',
    name: '750 (18k)'
  }, {
    id: '4',
    name: '916 (22k)'
  }, 
];
const items1 = [{
    id: '1',
    name: 'Custom Purity'
  }, {
    id: '2',
    name: 'I-FG'
  }, {
    id: '3',
    name: 'IF'
  }, {
    id: '4',
    name: 'SI-FG'
  }, 
  {
    id: '5',
    name: 'SI-GH'
  }, {
    id: '6',
    name: 'SI-I-FG'
  }, 
];
const items2 = [{
    id: '1',
    name: 'Custom Purity'
  }, {
    id: '2',
    name: '950'
  }, 
];
const items3 = [{
    id: '1',
    name: 'Custom Purity'
  }, {
    id: '2',
    name: '92'
  }, 
];
