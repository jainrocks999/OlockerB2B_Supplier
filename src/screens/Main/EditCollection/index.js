// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Platform,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import StatusBar from '../../../components/StatusBar';
// import styles from './styles';
// import RNPickerSelect from 'react-native-picker-select';
// import Buttom from '../../../components/StoreButtomTab';
// import Header from '../../../components/CustomHeader';
// import DocumentPicker from 'react-native-document-picker';
// import Toast from 'react-native-simple-toast';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Loader from '../../../components/Loader';
// import PickerModel from '../../../components/PickerModel';
// import axios from "axios";
// import { useDispatch } from "react-redux";

// const Editcollection = ({route}) => {
  // const data=route.params.item
  // const navigation = useNavigation();
  // const dispatch=useDispatch()
  // const [status, setStatus] = useState(data.IsActive?data.IsActive==1?'Active':'In Active':'Select Status');
  // const [collection, setCollection] = useState(data.Name);
  // const [title,setTitle]=useState(data.Title)
  // const [description,setDescription]=useState(data.Description)
  // const [photo, setPhoto] = useState(`https://olocker.co${data.ImageUrl}`);
  // const [photoName, setPhotoName] = useState(data.ImageName);
  // const [photoType, setPhotoType] = useState('jpg');
//   const [photo1,setPhoto1]=useState('')
//   const [photoName1, setPhotoName1] = useState('');
//   const [photoType1, setPhotoType1] = useState('');
//   const [visiable, setVisible] = useState(false);
//   const [fetching,setFetching]=useState(false)

//   const uploadPhoto = async () => {
//     try {
//       const res = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.images],
//       });
//       setPhoto(res.uri);
//       setPhotoName(res.name)
//       setPhotoType(res.type)
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//       } else {
//         throw err;
//       }
//     }
//   };

//   const uploadPhoto1 = async () => {
//     try {
//       const res = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.images],
//       });
//       setPhoto1(res.uri);
//       setPhotoName1(res.name)
//       setPhotoType1(res.type)
      
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//       } else {
//         throw err;
//       }
//     }
//   };
//   const manageOption = val => {
//     setStatus(val);
//     setVisible(false);
//   };

//   const validateUser = async () => {
//     const user_id=await AsyncStorage.getItem('user_id')
//     const Token=await AsyncStorage.getItem('loginToken')
//     if(collection==''){
//       Toast.show('Please enter collection name')
//     }
//     if(title==''){
//       Toast.show('Please enter title')
//     }
//     else if(status=='Select Status'){
//       Toast.show('Please select status')
//     }
//     if(description==''){
//       Toast.show('Please enter description')
//     }
//     else if(photo==''){
//       Toast.show('Please select banner image')
//     }
//     // else if(photo1==''){
//     //   Toast.show('Please select banner image')
//     // }
//    else{
//     try {
//       setFetching(true)
//       const data = new FormData();
//       data.append('userId', user_id);
//       data.append('Name',collection );
//       data.append('Title', title);
//       data.append('IsActive', status=='Active'?1:0);
//       data.append('Description',description);
//       data.append('ImageName', {
//         uri: photo,
//         name: photoName.substring(photoName.lastIndexOf('/') + 1),
//         type: photoType,
//       });

//       data.append('hidden_image', {
//         uri: photo1,
//         name: photoName1.substring(photoName1.lastIndexOf('/') + 1),
//         type: photoType1,
//       });
//       const response = await axios({
//         method: 'POST',
//         data,
//         headers: {
//           'content-type': 'multipart/form-data',
//           "Olocker": `Bearer ${Token}`,
//         },
//         url: 'https://olocker.co/api/supplier//postCreateCollection',
//       });
//       // console.log('thissi is rresponse');
//       if (response.data.status == 'success') {
//         setFetching(false)
//         dispatch({
//           type: 'Get_Catalogue_Request',
//           url: '/listCollection',
//           user_id: user_id,
//           navigation
//          })
//         Toast.show(response.data.msg)
//       } else {
//         setFetching(false);
//         Toast.show(response.data.msg)
//         // console.log('thissi is rresponseelse');
//       }
//     } catch (error) {
//      setFetching(false)
//      // console.log('this isi error',error);
//     }
//   }
//   };

//   return (
//     <View style={styles.container1}>
//       <Header
//         source={require('../../../assets/L.png')}
//         source2={require('../../../assets/Image/dil.png')}
//         source1={require('../../../assets/Fo.png')}
//         title={'Add Collection '}
//         onPress={() => navigation.goBack()}
//         onPress1={() => navigation.navigate('Message')}
//         onPress2={() => navigation.navigate('FavDetails')}
//       />
//       {fetching?<Loader/>:null}
//       <PickerModel
//         visi={visiable}
//         close={() => setVisible(false)}
//         data={Status}
//         onPress1={manageOption}
//         styles={{
//           height: 200,
//           width: '58%',
//           alignSelf: 'center',
//           marginLeft: Platform.OS == 'android' ? '34%' : '34%',
//           marginTop: Platform.OS == 'android' ? '25%' : '33%',
//         }}
//       />
//       <ScrollView style={styles.scroll}>
//         <View style={styles.card}>
//           <View style={styles.main}>
//             <Text style={styles.Text1}>Collection</Text>
//             <View style={styles.main1}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter Name"
//                 placeholderTextColor="#474747"
//                 value={collection}
//                 onChangeText={val => setCollection(val)}
//               />
//             </View>
//           </View>

//           <View style={styles.main}>
//             <Text style={styles.Text1}>Title</Text>
//             <View style={styles.main1}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter Title"
//                 placeholderTextColor="#474747"
//                 value={title}
//                 onChangeText={val => setTitle(val)}
//               />
//             </View>
//           </View>

//           <View style={styles.main}>
//             <Text style={styles.Text1}>Status</Text>
//             <View style={styles.main1}>
//               <TouchableOpacity
//                 onPress={() => setVisible(true)}
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   paddingHorizontal: 0,
//                 }}>
//                 <Text
//                   style={{
//                     color: '#474747',
//                     marginTop: 1,
//                     fontSize: 14,
//                     // marginBottom: -1,
//                     fontFamily: 'Acephimere',
//                   }}>{`${status}`}</Text>
//                 <Image
//                   style={styles.rnimg}
//                   source={require('../../../assets/F.png')}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={{paddingHorizontal: 10, marginTop: 5,}}>
//             <Text style={styles.Text1}>Description</Text>
//             <View style={styles.main2}>
//               <TextInput
//                 style={{ width: '90%',
//                 marginLeft: 0,
//                 color: '#474747',}}
//                 placeholder="Enter Description"
//                 placeholderTextColor="#474747"
//                 value={description}
//                 onChangeText={val => setDescription(val)}
//                 multiline
//               />
//             </View>
//           </View>
//           <View style={styles.main}>
//             <Text style={styles.Text1}>Banner</Text>
//           </View>
//           <View style={[styles.card1, {marginTop: 20}]}>
//             <View style={styles.bottom}>
//               <TouchableOpacity onPress={() => uploadPhoto()}>
//                 {photo ? (
//                   <Image
//                     style={[styles.img1, {borderRadius: 10}]}
//                     source={{uri: photo}}
//                   />
//                 ) : (
//                   <Image
//                     style={styles.img1}
//                     source={require('../../../assets/Image/add_photo.png')}
//                   />
//                 )}
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => uploadPhoto1()}>
//               {photo1 ? (
//                   <Image
//                     style={[styles.img1, {borderRadius: 10}]}
//                     source={{uri: photo}}
//                   />
//                 ) : (
//                   <Image
//                   style={[styles.img1, {marginLeft: 0}]}
//                   source={require('../../../assets/Image/select_tmp.png')}
//                 />
//                 )}
                
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={styles.bottom1}>
//             <Text style={styles.bottom1t}>
//               Upload banner in 0000(H) * 0000(W) Dimention
//             </Text>
//           </View>
//         </View>
//         <View style={styles.bottom2}>
//           <TouchableOpacity
//           onPress={()=>validateUser()}
//             // onPress={() => navigation.navigate('SelectOption')}
//             style={styles.button}>
//             <Text style={styles.textbt}>{'Save'}</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={{height:50}}/>
//       </ScrollView>
//       <StatusBar />
//       {/* <Buttom /> */}
//     </View>
//   );
// };
// export default Editcollection;

// const Status = [
//   {label: 'Active', value: 'true'},
//   {label: 'In Active', value: 'false'},
// ];

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Platform,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import StatusBar from '../../../components/StatusBar';
// import styles from './styles';
// import RNPickerSelect from 'react-native-picker-select';
// import Buttom from '../../../components/StoreButtomTab';
// import Header from '../../../components/CustomHeader';
// import DocumentPicker from 'react-native-document-picker';
// import Toast from 'react-native-simple-toast';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Loader from '../../../components/Loader';
// import PickerModel from '../../../components/PickerModel';
// import axios from "axios";
// import { useDispatch } from "react-redux";

// const Addcollection = () => {
//   const navigation = useNavigation();
//   const dispatch=useDispatch()
//   const [status, setStatus] = useState('Select Status');
//   const [collection, setCollection] = useState('');
//   const [title,setTitle]=useState('')
//   const [description,setDescription]=useState('')
//   const [photo, setPhoto] = useState('');
//   const [photoName, setPhotoName] = useState('');
//   const [photoType, setPhotoType] = useState('');
//   const [photo1,setPhoto1]=useState('')
//   const [photoName1, setPhotoName1] = useState('');
//   const [photoType1, setPhotoType1] = useState('');
//   const [visiable, setVisible] = useState(false);
//   const [fetching,setFetching]=useState(false)

//   const uploadPhoto = async () => {
//     try {
//       const res = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.images],
//       });
//       setPhoto(res.uri);
//       setPhotoName(res.name)
//       setPhotoType(res.type)
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//       } else {
//         throw err;
//       }
//     }
//   };

//   const uploadPhoto1 = async () => {
//     try {
//       const res = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.images],
//       });
//       setPhoto1(res.uri);
//       setPhotoName1(res.name)
//       setPhotoType1(res.type)
      
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//       } else {
//         throw err;
//       }
//     }
//   };
//   const manageOption = val => {
//     setStatus(val);
//     setVisible(false);
//   };

//   const validateUser = async () => {
//     const user_id=await AsyncStorage.getItem('user_id')
//     const Token=await AsyncStorage.getItem('loginToken')
//     if(collection==''){
//       Toast.show('Please enter collection name')
//     }
//     if(title==''){
//       Toast.show('Please enter title')
//     }
//     else if(status=='Select Status'){
//       Toast.show('Please select status')
//     }
//     if(description==''){
//       Toast.show('Please enter description')
//     }
//     else if(photo==''){
//       Toast.show('Please select banner image')
//     }
//     else if(photo1==''){
//       Toast.show('Please select banner image')
//     }
//    else{
//     try {
//       setFetching(true)
//       const data = new FormData();
//       data.append('userId', user_id);
//       data.append('Name',collection );
//       data.append('Title', title);
//       data.append('IsActive', status=='Active'?1:0);
//       data.append('Description',description);
//       data.append('ImageName', {
//         uri: photo,
//         name: photoName.substring(photoName.lastIndexOf('/') + 1),
//         type: photoType,
//       });

//       data.append('hidden_image', {
//         uri: photo1,
//         name: photoName1.substring(photoName1.lastIndexOf('/') + 1),
//         type: photoType1,
//       });
//       const response = await axios({
//         method: 'POST',
//         data,
//         headers: {
//           'content-type': 'multipart/form-data',
//           "Olocker": `Bearer ${Token}`,
//         },
//         url: 'https://olocker.co/api/supplier//postCreateCollection',
//       });
//       // console.log('thissi is rresponse');
//       if (response.data.status == 'success') {
//         setFetching(false)
//         dispatch({
//           type: 'Get_Catalogue_Request',
//           url: '/listCollection',
//           user_id: user_id,
//           navigation
//          })
//         Toast.show(response.data.msg)
//       } else {
//         setFetching(false);
//         Toast.show(response.data.msg)
//         // console.log('thissi is rresponseelse');
//       }
//     } catch (error) {
//      setFetching(false)
//      // console.log('this isi error',error);
//     }
//   }
//   };

//   return (
//     <View style={styles.container1}>
//       <Header
//         source={require('../../../assets/L.png')}
//         source2={require('../../../assets/Image/dil.png')}
//         source1={require('../../../assets/Fo.png')}
//         title={'Add Collection '}
//         onPress={() => navigation.goBack()}
//         onPress1={() => navigation.navigate('Message')}
//         onPress2={() => navigation.navigate('FavDetails')}
//       />
//       {fetching?<Loader/>:null}
//       <PickerModel
//         visi={visiable}
//         close={() => setVisible(false)}
//         data={Status}
//         onPress1={manageOption}
//         styles={{
//           height: 200,
//           width: '58%',
//           alignSelf: 'center',
//           marginLeft: Platform.OS == 'android' ? '34%' : '34%',
//           marginTop: Platform.OS == 'android' ? '25%' : '33%',
//         }}
//       />
//       <ScrollView style={styles.scroll}>
//         <View style={styles.card}>
//           <View style={styles.main}>
//             <Text style={styles.Text1}>Collection</Text>
//             <View style={styles.main1}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter Name"
//                 placeholderTextColor="#474747"
//                 value={collection}
//                 onChangeText={val => setCollection(val)}
//               />
//             </View>
//           </View>

//           <View style={styles.main}>
//             <Text style={styles.Text1}>Title</Text>
//             <View style={styles.main1}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter Title"
//                 placeholderTextColor="#474747"
//                 value={title}
//                 onChangeText={val => setTitle(val)}
//               />
//             </View>
//           </View>

//           <View style={styles.main}>
//             <Text style={styles.Text1}>Status</Text>
//             <View style={styles.main1}>
//               <TouchableOpacity
//                 onPress={() => setVisible(true)}
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   paddingHorizontal: 0,
//                 }}>
//                 <Text
//                   style={{
//                     color: '#474747',
//                     marginTop: 1,
//                     fontSize: 14,
//                     // marginBottom: -1,
//                     fontFamily: 'Acephimere',
//                   }}>{`${status}`}</Text>
//                 <Image
//                   style={styles.rnimg}
//                   source={require('../../../assets/F.png')}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={{paddingHorizontal: 10, marginTop: 5,}}>
//             <Text style={styles.Text1}>Description</Text>
//             <View style={styles.main2}>
//               <TextInput
//                 style={{ width: '90%',
//                 marginLeft: 0,
//                 color: '#474747',}}
//                 placeholder="Enter Description"
//                 placeholderTextColor="#474747"
//                 value={description}
//                 onChangeText={val => setDescription(val)}
//                 multiline
//               />
//             </View>
//           </View>
//           <View style={styles.main}>
//             <Text style={styles.Text1}>Banner</Text>
//           </View>
//           <View style={[styles.card1, {marginTop: 20}]}>
//             <View style={styles.bottom}>
//               <TouchableOpacity onPress={() => uploadPhoto()}>
//                 {photo ? (
//                   <Image
//                     style={[styles.img1, {borderRadius: 10}]}
//                     source={{uri: photo}}
//                   />
//                 ) : (
//                   <Image
//                     style={styles.img1}
//                     source={require('../../../assets/Image/add_photo.png')}
//                   />
//                 )}
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => uploadPhoto1()}>
//               {photo1 ? (
//                   <Image
//                     style={[styles.img1, {borderRadius: 10}]}
//                     source={{uri: photo}}
//                   />
//                 ) : (
//                   <Image
//                   style={[styles.img1, {marginLeft: 0}]}
//                   source={require('../../../assets/Image/select_tmp.png')}
//                 />
//                 )}
                
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={styles.bottom1}>
//             <Text style={styles.bottom1t}>
//               Upload banner in 0000(H) * 0000(W) Dimention
//             </Text>
//           </View>
//         </View>
//         <View style={styles.bottom2}>
//           <TouchableOpacity
//           onPress={()=>validateUser()}
//             // onPress={() => navigation.navigate('SelectOption')}
//             style={styles.button}>
//             <Text style={styles.textbt}>{'Save'}</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={{height:50}}/>
//       </ScrollView>
//       <StatusBar />
//       {/* <Buttom /> */}
//     </View>
//   );
// };
// export default Addcollection;

// const Status = [
//   {label: 'Active', value: 'true'},
//   {label: 'In Active', value: 'false'},
// ];




import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import RNPickerSelect from 'react-native-picker-select';
import Buttom from '../../../components/StoreButtomTab';
import Header from '../../../components/CustomHeader';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';
import PickerModel from '../../../components/PickerModel';
import axios from "axios";
import { useDispatch } from "react-redux";
import { RadioButton } from "react-native-paper";

const EditCollection = ({route}) => {
  // console.log('this i route data',route.params)
  const data=route.params.item
  const navigation = useNavigation();
  const dispatch=useDispatch()
  const [name,setName]=useState(data.Name)
  const [tag,setTag]=useState(data.Title)
  const [description,setDescription]=useState(data.Description)
  const [active, setActive] = useState(data.IsActive?data.IsActive==1?'checked':'unchecked':'Select Status')
  const [inactive,setInActive]=useState(data.IsActive?data.IsActive==0?'checked':'unchecked':'Select Status')

  const [photo, setPhoto] = useState(`https://olocker.co${data.ImageUrl}`);
  const [photoName, setPhotoName] = useState(data.ImageName);
  const [photoType, setPhotoType] = useState('image/jpeg');
  const [fetching,setFetching]=useState(false)
 // console.log('this is imagee',photo,"kd;kv;zx",photoName,"dska",photoType);

  const validateUser = async () => {
    // console.log('this is se=rno',data.SrNo);
    const user_id=await AsyncStorage.getItem('user_id')
    const Token=await AsyncStorage.getItem('loginToken')
    if(name==''){
      Toast.show('Please enter collection name')
    }
    if(tag==''){
      Toast.show('Please enter tagline')
    }
    if(description==''){
      Toast.show('Please enter description')
    }
    else if(photo==''){
      Toast.show('Please select banner image')
    }
   
   else{
    try {
      setFetching(true)
      const data = new FormData();
      data.append('userId', user_id);
      data.append('Name',name );
      data.append('Title', tag);
      data.append('IsActive', active=='checked'?1:0);
      data.append('Description',description);
      data.append('SrNo',route.params.item.SrNo)
      data.append('ImageName', {
        uri: photo,
        name: photoName.substring(photoName.lastIndexOf('/') + 1),
        type: photoType,
      });
  
      data.append('hidden_image', {
        uri: photo,
        name: photoName.substring(photoName.lastIndexOf('/') + 1),
        type: photoType,
      });
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          "Olocker": `Bearer ${Token}`,
        },
        url: 'https://olocker.co/api/supplier//postCreateCollection',
      });
      // console.log('thissi is rresponse',response.data);
      if (response.data.status == 'success') {
        setFetching(false)
        dispatch({
          type: 'Get_Catalogue_Request',
          url: '/listCollection',
          user_id: user_id,
          navigation
         })
        Toast.show(response.data.msg)
      } else {
        setFetching(false);
        Toast.show(response.data.msg)
        // console.log('thissi is rresponseelse');
      }
    } catch (error) {
     setFetching(false)
    //  console.error(error.response.data); 
     // console.log('this isi error',error,data.SrNo);
    }
  }
  };

  const uploadPhoto = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setPhoto(res.uri);
      setPhotoName(res.name)
      setPhotoType(res.type)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const manageActive = () => {
    setActive('checked');
    setInActive('unchecked');
  };

  const manageInActive = () => {
    setActive('unchecked');
    setInActive('checked');
  };

  

  return (
    <View style={styles.container1}>
      <StatusBar />
      {fetching?<Loader/>:null}
      <View style={{
        backgroundColor: '#032e63',
        height: 50,
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{paddingHorizontal:5}}>
          <Image style={{ height: 20, width: 14 }} source={require('../../../assets/L.png')} />
        </TouchableOpacity>
        <Text style={{color:'#fff',fontSize:16,fontFamily:'Roboto-Medium',marginLeft:14}}>Edit Collection</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{ height: 24, width: 28, }} source={require('../../../assets/Fo.png')} />
          <Image style={{ height: 22, width: 26, tintColor: '#fff', marginLeft: 15 }} source={require('../../../assets/Image/dil.png')} />
          <Image style={{ height: 24, width: 28, tintColor: "#fff", marginLeft: 15 }} source={require('../../../assets/supplierImage/more.png')} />
        </View>
      </View>
      <ScrollView>
      <View style={{paddingHorizontal:15,marginTop:15}}>
         <TextInput
         placeholder='Name'
         style={{borderWidth:1,paddingLeft:10,fontFamily:'Roboto-Medium',borderColor:'#03154138',borderRadius:5,height:40}}
         placeholderTextColor={'#23233C'}
         value={name}
         onChangeText={(val)=>setName(val)}
         />
         <TextInput
         placeholder='Tagline'
         style={{borderWidth:1,paddingLeft:10,fontFamily:'Roboto-Medium',borderColor:'#03154138',borderRadius:5,height:40,marginTop:20}}
         placeholderTextColor={'#23233C'}
         value={tag}
         onChangeText={(val)=>setTag(val)}
         />
        <View style={{
          borderWidth:1,borderColor:'#03154138',borderRadius:5,height:200,marginTop:20
        }}>
        <TextInput
         placeholder='Description'
         style={{paddingLeft:10,fontFamily:'Roboto-Medium',marginTop:-8}}
         placeholderTextColor={'#23233C'}
         value={description}
         onChangeText={(val)=>setDescription(val)}
         multiline
         />
         </View>
         <View style={{
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
            backgroundColor:'#fff',
            marginTop:20,
            borderRadius:6
         }}>
           <View style={{flexDirection:'row',alignItems:'center'}}>
            <RadioButton
              value="first"
              status={active}
              onPress={() => manageActive()}
              uncheckedColor='#032e63'
              color='#032e63'
            />
            <Text style={{color:'#032e63',fontSize:14,fontFamily:'Roboto-Medium'}}>Active</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <RadioButton
              value="first"
              status={inactive}
              onPress={() => manageInActive()}
              uncheckedColor='#032e63'
              color='#032e63'
            />
            <Text style={{color:'#032e63',fontSize:14,fontFamily:'Roboto-Medium'}}>In Active</Text>
          </View>
         </View>
         <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:30}}>
            <TouchableOpacity 
            onPress={()=>uploadPhoto()}
            style={{
                borderWidth:1,
                width:'48%',
                borderColor:'#032e63',
                alignItems:'center',
                justifyContent:'center',
                paddingVertical:7,
                borderRadius:15
            }}>
                <Text style={{color:'#032e63',fontFamily:'Roboto-Medium',}}>Choose file</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                borderWidth:1,
                width:'48%',
                borderColor:'#032e63',
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:'#032e63',
                paddingVertical:7,
                borderRadius:15
            }}>
                <Text style={{color:'#fff',fontFamily:'Roboto-Medium'}}>Select from library</Text>
            </TouchableOpacity>
        </View>
        {photo ? (
                <View style={{marginTop:20}}>
                  <Image
                    style={{height:200,width:'48%',borderRadius:10}}
                    source={{uri: photo}}
                  />
                  </View>
                )
                 : 
                 null
                }

      </View>
      <View style={{alignItems:'center'}}>
        <TouchableOpacity
        onPress={()=>validateUser()}
        style={{
         borderWidth:1,
         width:'92%',
         borderColor:'#032e63',
         alignItems:'center',
         justifyContent:'center',
         backgroundColor:'#032e63',
         paddingVertical:7,
         borderRadius:15,
         marginTop:40
        }}
        >
          <Text style={{color:'#fff',fontFamily:'Roboto-Medium',fontSize:16}}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={{height:50}}/>
      </ScrollView>
    </View>
  );
};
export default EditCollection;

const Status = [
  {label: 'Active', value: 'true'},
  {label: 'In Active', value: 'false'},
];




