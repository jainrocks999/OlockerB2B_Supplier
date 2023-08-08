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
const Editprofile = () => {
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState('');
  return (
    <View style={styles.container1}>
      <View style={styles.container}>
        <TouchableOpacity delayPressIn={0} onPress={() => navigation.goBack()}>
          <Image style={styles.img} source={require('../../../assets/L.png')} />
        </TouchableOpacity>
        <Text style={styles.text}>{'Edit Profile'}</Text>

        <View style={{width: '30%'}} />
        <TouchableOpacity>
          <Image
            style={styles.img}
            source={require('../../../assets/Fo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.img}
            source={require('../../../assets/La.png')}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{flex: 1, paddingHorizontal: 15, paddingVertical: 20}}>
        <View style={styles.main}>
          <View
            style={{
              height: 114,
              width: 114,
              backgroundColor: '#918f99',
              borderRadius: 57,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, color: '#fff'}}>Add Photo</Text>
          </View>
          <View style={styles.main1}>
            <RNPickerSelect
              onValueChange={val => setSelectedItems(val)}
              items={Data}
              style={styles.rn}
              value={
                selectedItems == 0 || selectedItems == null ? '' : selectedItems
              }
              useNativeAndroidPickerStyle={false}
              placeholder={{label: 'Mr.', value: 0}}
              Icon={() => (
                <Image
                  style={styles.rnimg}
                  source={require('../../../assets/F.png')}
                />
              )}
            />
          </View>

          <View style={styles.main1}>
            <TextInput
              style={{width: '90%', marginLeft: 10}}
              placeholder="First name"
              placeholderTextColor="black"
            />
          </View>
          <View style={styles.main1}>
            <TextInput
              style={{width: '90%', marginLeft: 10}}
              placeholder="Last name"
              placeholderTextColor="black"
            />
          </View>
          <View style={styles.main1}>
            <TextInput
              style={{width: '90%', marginLeft: 10}}
              placeholder="Mobbile number"
              placeholderTextColor="black"
            />
          </View>
          <View style={styles.main1}>
            <TextInput
              style={{width: '90%', marginLeft: 10}}
              placeholder="Email address"
              placeholderTextColor="black"
            />
          </View>
          <View style={styles.main1}>
            <TextInput
              style={{width: '90%', marginLeft: 10}}
              placeholder="Address"
              placeholderTextColor="black"
            />
          </View>
          <View style={styles.main1}>
            <TextInput
              style={{width: '90%', marginLeft: 10}}
              placeholder="Pin code"
              placeholderTextColor="black"
            />
          </View>
          <View style={styles.main1}>
            <TextInput
              style={{width: '90%', marginLeft: 10}}
              placeholder="City"
              placeholderTextColor="black"
            />
          </View>
          <View style={styles.main1}>
            <TextInput
              style={{width: '90%', marginLeft: 10}}
              placeholder="Date of birth (DD/MM/YYYY)"
              placeholderTextColor="black"
            />
          </View>
          <View style={styles.main1}>
            <TextInput
              style={{width: '90%', marginLeft: 10}}
              placeholder="Anniversary date (DD/MM/YYYY)"
              placeholderTextColor="black"
            />
          </View>
        </View>
        <View style={{marginTop: 20, marginHorizontal: 110, marginBottom: 60}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Loyalty')}
            style={styles.button}>
            <Text style={styles.bttext}>{'Save'}</Text>
          </TouchableOpacity>
          <Text style={{marginLeft: 18, marginTop: 12, fontSize: 10}}>
            DELETE CUSTOMER
          </Text>
        </View>
      </ScrollView>
      <StatusBar />
      <Buttom />
    </View>
  );
};
export default Editprofile;

const Data = [
  {label: 'Football', value: 'football'},
  {label: 'Baseball', value: 'baseball'},
  {label: 'Hockey', value: 'hockey'},
];
