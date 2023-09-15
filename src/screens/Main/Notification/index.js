import {View, TouchableOpacity, FlatList, TextInput, Text} from 'react-native';
import React ,{useState}from 'react';
import Header from '../../../components/CustomHeader';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function index() {

	const [searchText, setSearchText] = useState('');
	const [filteredData, setFilteredData] = useState(data);
	

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        title={'Search Patner'}
        source={require('../../../assets/L.png')}
        onPress={() => navigation.goBack()}
      />
      <View
        style={{
          borderWidth: 1,
          height: 45,
          paddingHorizontal: 10,
          marginTop: 15,
          borderRadius: 20,
          marginHorizontal: 20,
          backgroundColor: '#f0f0f0',
		  
        }}>
        <TextInput placeholder="Search" 
		  onChangeText={text => {
			setSearchText(text);
			filterData();
		  }}
		  value={searchText}
		/>
        <TouchableOpacity></TouchableOpacity>
      </View>

  

      <View style={{flex: 1, marginTop:20,marginHorizontal:10}}>
        <FlatList 
    showsVerticalScrollIndicator={false}

		data={data}
		keyExtractor={item => item.id.toString()}
		renderItem={({item})=>(

			<View style={{borderWidth:1,marginVertical:3,flexDirection:'row',
			justifyContent:'space-between',alignItems:'center',paddingHorizontal:20,backgroundColor:'#f0f0f0',
			borderRadius:20,height:80}}>
				<View>

			
				<Text style={{fontSize:18,fontWeight:'700'}}>{item.partner_name}</Text>
				<Text style={{fontSize:15}}>{item.email}</Text>
				</View>
				<TouchableOpacity style={{borderRadius:10,padding:2,
				alignItems:'center',justifyContent:'center',backgroundColor:item.color,
				}}>
					<AntDesign name={item.logo} size={35} color={'#fff'} />
				</TouchableOpacity>
			</View>

		)}
		/>
      </View>
    </View>
  );
}

const data = [
  {
    id: '1',
    partner_id: '13',
    partner_name: 'Sri Alankar Jeweller',
    email: 'issuenotfound.404+1@gmail.com',
    contact_id: '5',
    conatct_name: 'Bhawani Jewellers',
    user_type: '',
    active_contact: '0',
    created_at: '2023-08-25 07:33:47.000000',
    updated_at: '2023-09-14 18:34:48.323910',
    deleted_at: '0',
	logo:'wechat',
	color:'#74db9c'
  },
  {
    id: '3',
    partner_id: '13',
    partner_name: 'Om Jeweller',
    email: 'Rohansasa@gmailcom',
    contact_id: '12',
    conatct_name: 'Prsthmesh pawar',
    user_type: '',
    active_contact: '1',
    created_at: '2023-09-14 18:17:59.000000',
    updated_at: '2023-09-14 18:34:44.134621',
    deleted_at: '0',
	logo:'adduser',
	color:'#000'
  },
  {
    id: '3',
    partner_id: '13',
    partner_name: 'gupta Jeweller',
    email: 'Rohansasa@gmailcom',
    contact_id: '12',
    conatct_name: 'Prsthmesh pawar',
    user_type: '',
    active_contact: '1',
    created_at: '2023-09-14 18:17:59.000000',
    updated_at: '2023-09-14 18:34:44.134621',
    deleted_at: '0',
	logo:'wechat',
	color:'#74db9c'
  },
  {
    id: '3',
    partner_id: '13',
    partner_name: 'soni Jeweller',
    email: 'Rohansasa@gmailcom',
    contact_id: '12',
    conatct_name: 'Prsthmesh pawar',
    user_type: '',
    active_contact: '1',
    created_at: '2023-09-14 18:17:59.000000',
    updated_at: '2023-09-14 18:34:44.134621',
    deleted_at: '0',
	logo:'adduser',
	color:'#000'
  },
];
