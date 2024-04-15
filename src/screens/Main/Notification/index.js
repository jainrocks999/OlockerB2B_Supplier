import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import BottomTab from '../../../components/StoreButtomTab';
import Loader from '../../../components/Loader';
import { useSelector ,useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch=useDispatch();
 const selector =useSelector(state=>state.Home.Notification1);
 const isFetching= useSelector(state=>state.Home.isFetching);
 const [visiable1,setVisible]=useState(false);
 console.log('notifiyyyyyyy...........',selector);


useEffect(()=>{
apicall();
},[])
const apicall =async()=>{
  const user_id = await AsyncStorage.getItem('user_id');
  dispatch({
    type:'Get_pushNotificationLis_Request',
    url:'/pushNotificationList',
    supplierId:user_id
   })
}
 





 const clearnotification=async()=>{
  const Token = await AsyncStorage.getItem('loginToken');
  const user_id = await AsyncStorage.getItem('user_id');
  const axios = require('axios');
setVisible(true);
let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://olocker.co/api/supplier//pushNotificationRemove?supplierId=${user_id}`,
  headers: { 
    'Olocker': `Bearer ${Token}`
  }
};

axios.request(config)
.then((response) => {
  if(response.data.status==true){
  console.log('resposeemmmm',JSON.stringify(response.data));
  apicall();
  setVisible(false);
  }
  else{
    setVisible(false);
  }
})
.catch((error) => {
  setVisible(false);
  console.log(error);
});

 }

  return (
    <View style={{flex: 1, backgroundColor: '#f0eeef'}}>
 
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        title={'Notification '}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('FavDetails')}
      />
      {isFetching||visiable1?<Loader/>:null}
     {
        selector?.length == 0 ?
            <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', height: '90%',}}>
              <Text style={{
        fontFamily: 'Acephimere',
        fontSize: 19,
        color: 'grey', fontWeight: '700'
    }}> {'No Notification'} </Text>

            </View>
            :


      <ScrollView style={{paddingHorizontal:0}}>
         <View style={{}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10}}>
              <Text
               style={{color:'#000',marginLeft:0,marginTop:10}}>
                {selector?.length==1?    `${selector?.length}  Notification`:`${selector?.length}  Notifications`}
              </Text>
          <TouchableOpacity style={{marginTop:10,}}
          onPress={()=>clearnotification()}
          >   
         <Text style={{color:'#000',textDecorationLine:'underline'}}>Clear Notification</Text>
         </TouchableOpacity> 
        </View>
      {/* <Text  style={{color:'#000',marginLeft:10,marginTop:10}}>{`${selector?.length}${'  Notification'}`}</Text> */}
        <View style={{marginBottom:20}}>
            <FlatList
              data={selector}
              renderItem={({item}) => (
                <View
                  style={{
                    backgroundColor: '#f0f0f0',
                    // marginTop: 10,
                     paddingHorizontal: 10,
                    paddingVertical: 10,
                    // paddingLeft: 20,
                    shadowColor: 'black',
    shadowOffset: {width: 3, height: 12},
    shadowOpacity: 0.8,
     shadowRadius: 0,
    elevation: 8,
                  }}>
                  
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 17,color:'#000',fontWeight:'700'}}>{item.senderName}</Text>
                    <View
                      style={{
                        backgroundColor: '#24a31e',
                        paddingHorizontal: 6,
                        paddingVertical: 2,borderRadius:5
                      }}>
                        
                      <Text style={{color: '#fff', fontSize: 13,}}>
                      {item.title}
                      </Text>
                    </View>
                  </View>
                  
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Image
                      style={{tintColor: 'grey', height: 13, width: 17}}
                      source={require('../../../assets/Fo.png')}
                    />

                    <Text style={{marginLeft: 6, fontSize: 14, color: '#000',fontWeight:'500'}}>
                    {item.message}
                    </Text>
                  </View>
                  <Text style={{color:'#000',marginTop:5,fontSize:13,fontWeight:'600'}}>Last seen: <Text style={{color:'#000',fontWeight:'500'}}>{item?.created_at}</Text></Text>
                  <View style={{borderWidth:0.5,marginTop:5}}/>
                </View>
              )}
            />
        </View>
       
        </View>
      </ScrollView>
}
      <StatusBar />
    </View>
  );
};
export default HomeScreen;
const data = [
  {
    title: 'Milind Jewellers',
    text: 'We can supply product you have as..',
    time: 'Last replied on 07 Sep,2020',
  },
  {
    title: 'Mahabir Jewellers',
    text: 'Payments term can be discussed as per..',
    time: 'Last replied on 01 Sep,2020',
  },
  {
    title: 'Narendra Jewellers',
    text: 'We can supply product you have as..',
    time: 'Last replied on 03 Sep,2020',
  },
];




















// import {View, TouchableOpacity, FlatList, TextInput, Text} from 'react-native';
// import React, {useState} from 'react';
// import Header from '../../../components/CustomHeader';
// import styles from './styles';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Feather from 'react-native-vector-icons/Feather';

// export default function index() {
//   const [searchText, setSearchText] = useState('');
//   const [filteredData, setFilteredData] = useState([]);

//   const handleReturnKey = () => {
//     const filtered = data.filter(
//       item =>
//       // item.email.toLowerCase().includes(searchText.toLowerCase())||
//       item.partner_name.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };
//   return (
//     <View style={{flex: 1, backgroundColor: 'white'}}>
//       <Header
//         title={'Notification'}
//         source={require('../../../assets/L.png')}
//         onPress={() => navigation.goBack()}
//       />
//       <View
//         style={styles.search}>
//         <TextInput
//         style={{width:'90%',fontSize:18}}
//           placeholder="Search "
//           onChangeText={text => {
//             setSearchText(text);
//           }}
//           value={searchText}
//           returnKeyType="search"
//           onSubmitEditing={handleReturnKey}
//         />
//         <TouchableOpacity
//         onPress={()=>{handleReturnKey()}}
//         >
//           <Feather name="search" size={25} />
//         </TouchableOpacity>
//       </View>

//       <View style={{flex: 1, marginTop: 20, marginHorizontal: 10}}>
//         <FlatList
//           showsVerticalScrollIndicator={false}
//           data={filteredData}
//           keyExtractor={item => item.id.toString()}
//           renderItem={({item}) => (
//             <View
//               style={{
//                 marginVertical: 3,
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 paddingHorizontal: 20,
//                 backgroundColor: '#f0f0f0',
//                 borderRadius: 20,
//                 height: 80,
//               }}>
//               <View>
//                 <Text style={{fontSize: 18, fontWeight: '700'}}>
//                   {item.partner_name}
//                 </Text>
//                 <Text style={{fontSize: 15}}>{item.email}</Text>
//               </View>
//               <TouchableOpacity
//                 style={{
//                   borderRadius: 10,
//                   padding: 2,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   backgroundColor: item.color,
//                 }}>
//                 <AntDesign name={item.logo} size={35} color={'#fff'} />
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//       </View>
//     </View>
//   );
// }

// const data = [
//   {
//     id: '1',
//     partner_id: '13',
//     partner_name: 'Sri Alankar Jeweller',
//     email: 'issuenotfound.404+1@gmail.com',
//     contact_id: '5',
//     conatct_name: 'Bhawani Jewellers',
//     user_type: '',
//     active_contact: '0',
//     created_at: '2023-08-25 07:33:47.000000',
//     updated_at: '2023-09-14 18:34:48.323910',
//     deleted_at: '0',
//     logo: 'wechat',
//     color: '#74db9c',
//   },
//   {
//     id: '3',
//     partner_id: '13',
//     partner_name: 'Om Jeweller',
//     email: 'Rohan@gmailcom',
//     contact_id: '12',
//     conatct_name: 'Prsthmesh pawar',
//     user_type: '',
//     active_contact: '1',
//     created_at: '2023-09-14 18:17:59.000000',
//     updated_at: '2023-09-14 18:34:44.134621',
//     deleted_at: '0',
//     logo: 'adduser',
//     color: '#000',
//   },
//   {
//     id: '3',
//     partner_id: '13',
//     partner_name: 'gupta Jeweller',
//     email: 'demo@gmailcom',
//     contact_id: '12',
//     conatct_name: 'Prsthmesh pawar',
//     user_type: '',
//     active_contact: '1',
//     created_at: '2023-09-14 18:17:59.000000',
//     updated_at: '2023-09-14 18:34:44.134621',
//     deleted_at: '0',
//     logo: 'wechat',
//     color: '#74db9c',
//   },
//   {
//     id: '3',
//     partner_id: '13',
//     partner_name: 'soni Jeweller',
//     email: 'forebear@gmailcom',
//     contact_id: '12',
//     conatct_name: 'Prsthmesh pawar',
//     user_type: '',
//     active_contact: '1',
//     created_at: '2023-09-14 18:17:59.000000',
//     updated_at: '2023-09-14 18:34:44.134621',
//     deleted_at: '0',
//     logo: 'adduser',
//     color: '#000',
//   },

// ];

// // import {View, Text} from 'react-native';
// // import React from 'react';
// // import PatnerProfile from '../patnerProfile';

// // export default function Notification() {
// //   return <View style={{flex: 1}}></View>;
// // }
