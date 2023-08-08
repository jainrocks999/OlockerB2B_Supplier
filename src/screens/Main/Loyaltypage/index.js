import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import RNPickerSelect from 'react-native-picker-select';
import BottomTab from '../../../components/StoreButtomTab';
import Header from '../../../components/CustomHeader';
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import colors from '../../../components/colors';
import getDate from '../../../components/Date';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Loyalty = () => {
  const navigation = useNavigation();

  const [date, setPlan2] = useState();
  const isFocused = useIsFocused();
  const [data4, setData4] = useState([]);
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container1}>
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        source1={require('../../../assets/Fo.png')}
        title={'Loyalty '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('Message')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
      <ScrollView style={{flex: 1, paddingHorizontal: 10}}>
        {/* <FlatList
        data={data4}
        renderItem={({item})=>(
          <View style={[styles.card,{marginBottom:5}]}>
            
         <View style={styles.main}> 
           <Text style={[styles.textbt,{fontFamily:'Philosopher-Regular',fontSize:20}]}>{item.PlanType}</Text>
           <Text style={[styles.textbt,{fontFamily:'Philosopher-Regular',fontSize:20}]}>{`${item.Points} Points`}</Text>
         </View>
         <View style={styles.main1}>
          <View style={{alignItems:'center',justifyContent:'center',paddingVertical:5}}>
         <Text style={[styles.textB,{color:'#032e63',fontFamily:'Roboto-Medium'}]}>{`${item.start}`}</Text>
         <Text style={[styles.textC,{fontFamily:'Roboto-Medium',color:'#595959',marginRight:10}]}>Start Date</Text>
         </View>   
         <View style={{borderWidth:0.5,borderColor:'grey',paddingVertical:10}}/>
         <View style={{alignItems:'center',justifyContent:'center',paddingVertical:10,}}>
         <Text style={[styles.textB,{color:'#032e63',fontFamily:'Roboto-Medium',marginRight:10,width:'80%'}]}>{item.EndDate}</Text>
         <Text style={[styles.textC,{fontFamily:'Roboto-Medium',color:'#595959'}]}>End Date</Text>
         </View>   
         </View>
      </View>
        )}
        /> */}
        {/* :null} */}

        <View style={styles.card}>
          <View style={styles.main}>
            <Text
              style={[
                styles.textbt,
                {fontFamily: 'Philosopher-Regular', fontSize: 20},
              ]}>
              Referral
            </Text>
            <Text
              style={[
                styles.textbt,
                {fontFamily: 'Philosopher-Regular', fontSize: 20},
              ]}>
              150 Points
            </Text>
          </View>
          <View style={styles.main1}>
            <View style={{marginTop: 0}}>
              <Text
                style={[
                  styles.textB,
                  {color: '#032e63', fontFamily: 'Roboto-Medium'},
                ]}>
                11 Sep 2021{' '}
              </Text>
              <Text
                style={[
                  styles.textC,
                  {fontFamily: 'Roboto-Medium', color: '#595959'},
                ]}>
                Start Date
              </Text>
              <View style={{marginTop: 10}}></View>
            </View>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: 'grey',
                paddingVertical: 10,
              }}
            />
            <View style={{marginTop: 10}}>
              <Text
                style={[
                  styles.textB,
                  {color: '#032e63', fontFamily: 'Roboto-Medium'},
                ]}>
                10 Oct 2021{' '}
              </Text>
              <Text
                style={[
                  styles.textC,
                  {fontFamily: 'Roboto-Medium', color: '#595959'},
                ]}>
                End Date
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.main2}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  styles.textbt,
                  {fontFamily: 'Philosopher-Regular', fontSize: 20},
                ]}>
                First purchase
              </Text>
              <Text style={{color: '#fff', fontSize: 10, marginLeft: 10}}>
                Expired
              </Text>
            </View>
            <Text
              style={[
                styles.textbt,
                {fontFamily: 'Philosopher-Regular', fontSize: 20},
              ]}>
              150 Points
            </Text>
          </View>
          <View style={styles.main1}>
            <View style={{marginTop: 10}}>
              <Text
                style={[
                  styles.textB,
                  {fontFamily: 'Roboto-Medium', color: '#79797a'},
                ]}>
                11 Sep 2021{' '}
              </Text>
              <Text
                style={[
                  styles.textC,
                  {fontFamily: 'Roboto-Medium', color: '#595959'},
                ]}>
                Start Date
              </Text>
              <View style={{marginTop: 10}}></View>
            </View>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: 'grey',
                paddingVertical: 10,
              }}
            />
            <View style={{marginTop: 10}}>
              <Text
                style={[
                  styles.textB,
                  {fontFamily: 'Roboto-Medium', color: '#79797a'},
                ]}>
                10 Oct 2021{' '}
              </Text>
              <Text
                style={[
                  styles.textC,
                  {fontFamily: 'Roboto-Medium', color: '#595959'},
                ]}>
                End Date
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 90,
            paddingHorizontal: 10,
          }}></View>
      </ScrollView>

      <View
        style={{
          backgroundColor: '#032e63',
          width: 60,
          height: 60,
          position: 'absolute',
          bottom: 80,
          right: 15,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Loyalty')}>
          <Image
            style={{height: 30, width: 30}}
            source={require('../../../assets/plus.png')}
          />
        </TouchableOpacity>
      </View>
      <StatusBar />
      <View
        style={{
          marginVertical: hp('2.5%'),
          position: 'absolute',
          top: '50%',
          right: '50%',
        }}>
        <ActivityIndicator size="large" animating={visible} color={colors.bc} />
      </View>
    </View>
  );
};
export default Loyalty;
