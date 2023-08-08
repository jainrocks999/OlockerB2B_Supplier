import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import Bottum from '../../../components/StoreButtomTab';
const Messagebox = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container1}>
      <View style={styles.container}>
        <TouchableOpacity delayPressIn={0} onPress={() => navigation.goBack()}>
          <Image style={styles.img} source={require('../../../assets/L.png')} />
        </TouchableOpacity>
        <Text style={styles.text}>{'Message Box'}</Text>

        <View style={{width: '15%'}} />
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
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
      <ScrollView style={{flex: 1}}>
        <View style={styles.main}>
          <Text style={styles.Text1}>My item needs to be excha...</Text>
          <Text>... Last replied on 07 Sep, 2020</Text>
        </View>
        <View style={[styles.main, {marginTop: 20}]}></View>
      </ScrollView>
      <StatusBar />
      <Bottum />
    </View>
  );
};
export default Messagebox;

Data = [
  {
    label: 'ITEM ID KJHYUY86H',
    value: 'Purchase date 01-03-2020',

    Item: '- Last replied on 07 Sep, 2020',
  },
  {
    label: 'ITEM ID LKU839840',
    value: 'Purchase date 01-03-2020',
    Item: '- Last replied on 07 Sep, 2020',
  },
];
