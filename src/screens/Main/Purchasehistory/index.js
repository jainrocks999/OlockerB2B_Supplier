import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import BottomTab from '../../../components/StoreButtomTab';
import Header from '../../../components/CustomHeader';

// import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import Loader from '../../../components/Loader';
const Messagebox = () => {
  const navigation = useNavigation();

  const [page, setPage] = useState('');
  const [total, setTotal] = useState('');
  const [value, setValue] = useState(pageNo);
  const [pageNo, setPageNo] = useState(1);
  // const source = Platform.OS === 'android' ? { uri: "bundle-assets://pdf/terapanth_ka_itihaas.pdf" } : { uri: "bundle-assets://terapanth_ka_itihaas_part_1.pdf" }
  const actualDownload = () => {
    const {dirs} = RNFetchBlob.fs;
    const date = new Date();

    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        title: `data.pdf`,
        path: `${dirs.DocumentDir}/data.pdf`,
        appendExt: 'pdf',
      },
      android: {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mediaScannable: true,
          title: `data.pdf`,
          path: `${
            dirs.DownloadDir +
            '/me_' +
            Math.floor(date.getTime() + date.getSeconds() / 2)
          }.pdf`,
          // path: `${dirs.DownloadDir}/data.pdf`,
        },
      },
    });

    RNFetchBlob.config(configOptions)
      .fetch(
        'GET',
        `http://samples.leanpub.com/thereactnativebook-sample.pdf`,
        {},
      )
      // .fetch('GET', `https:\/\/ekyatraterapanth.com\/adminpanel\/assets\/doc\/terapanth_ka_itihaas_part_1.pdf`, {})
      .then(res => {})
      .catch(e => {});
  };

  const downloadFile = async () => {
    if (Platform.OS == 'ios') {
      actualDownload();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          actualDownload();
        } else {
          Alert.alert(
            'Permission Denied!',
            'You need to give storage permission to download the file',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  return (
    <View style={styles.container1}>
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        source1={require('../../../assets/Fo.png')}
        title={'Purchase History '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('Message')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
      <ScrollView>
        <View style={styles.Main}>
          <Text style={styles.Maintext}> item purchased`</Text>
        </View>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View style={styles.cardv}>
              <View style={styles.cardvi}>
                <View style={styles.bottom1}>
                  <View style={styles.bottom1View}>
                    <Text style={styles.bottom1Viewtext}>INSURED</Text>
                  </View>
                </View>
              </View>
              <View style={{width: '70%', paddingHorizontal: 8}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: '#343434',
                      fontFamily: 'Acephimere',
                      fontSize: 12,
                    }}>{`ITEM ID   ${item.price}`}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={{width: 16, height: 16}}
                      source={require('../../../assets/Image/rupay.png')}
                    />
                    <Text style={{color: '#343434', fontFamily: 'Acephimere'}}>
                      {item.price}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 5,
                    color: '#343434',
                    fontFamily: 'Acephimere',
                  }}>{`Purchase Date  ${item.date}`}</Text>
                <TouchableOpacity
                  onPress={() => downloadFile()}
                  style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                  <Image
                    style={{height: 60, width: 40}}
                    source={require('../../../assets/Image/pdf.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>
      <StatusBar />
      {/* <View style={{bottom: 0, position: 'absolute', left: 0, right: 0}}>
        <BottomTab />
      </View> */}
    </View>
  );
};
export default Messagebox;
const data = [
  {itemId: 'KJHIUY86H', price: '32000', date: '01-01-2020'},
  {itemId: 'KJHIUY86H', price: '32000', date: '01-01-2020'},
  {itemId: 'KJHIUY86H', price: '32000', date: '01-01-2020'},
];

Data1 = [
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
