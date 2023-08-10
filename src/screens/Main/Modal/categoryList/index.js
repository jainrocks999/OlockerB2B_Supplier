import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInput} from 'react-native';

const Notification = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setShowModal(!showModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
             onPress={() => setShowModal(!showModal)}
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: '#032e63',
                alignItems: 'center',
                justifyContent: 'center',
                position:'absolute',right:0,margin:10
              }}>
              <Text style={{fontSize: 18, color: 'white'}}>X</Text>
            </TouchableOpacity>
            <View style={{alignItems: 'center', alignSelf: 'center',marginTop:40}}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '800',
                  color: '#000',
                  marginLeft: -10,
                }}>
                Category List for Product SKU:{' '}
              </Text>
              <Text style={{fontSize: 24, fontWeight: '800', color: '#000'}}>
                10BAI683
              </Text>
            </View>
            <View style={styles.Card}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    width: '45.5%',
                  }}>
                  <Text style={{fontWeight: '600', fontSize: 18}}>
                    ProductSku:-
                  </Text>
                </View>
                <View style={{width: '40%'}}>
                  <Text style={{fontWeight: '500', fontSize: 18}}>
                    10BAI-683
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="pencil"
                      size={20}
                      color={'#000'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="delete"
                      size={20}
                      color={'#000'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View style={{}}>
                  <Text style={{fontWeight: '600', fontSize: 18}}>
                    Collection Name:-
                  </Text>
                </View>
                <View style={{width: '41.5%'}}>
                  <Text style={{fontWeight: '500', fontSize: 18}}>Gold</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View style={{}}>
                  <Text style={{fontWeight: '600', fontSize: 18}}>
                    PreInsured :
                  </Text>
                </View>
                <View style={{width: '41.5%'}}>
                  <Text style={{fontWeight: '500', fontSize: 18}}>No</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View style={{}}>
                  <Text style={{fontWeight: '600', fontSize: 18}}>
                    IsBestSeller :
                  </Text>
                </View>
                <View style={{}}>
                  <CheckBox />
                </View>
              </View>
            </View>
            
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => {
          setShowModal(true);
        }}
        style={{
          backgroundColor: 'skyblue',
          width: '80%',
          height: 45,
          alignSelf: 'center',
          marginTop: '15%',
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 18, fontWeight: '800'}}>Show</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Notification;
