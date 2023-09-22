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
//         title={'Search Patner'}
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


import { View, Text } from 'react-native'
import React from 'react'
import PatnerProfile from '../patnerProfile'

export default function index() {
  return (
    <View style={{flex:1}}>
   
    </View>
  )
}