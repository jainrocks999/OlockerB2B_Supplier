import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Image,
  Share,
  TextInput,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import TabView from '../../../components/StoreButtomTab';
import {useNavigation} from '@react-navigation/native';
import {FlatListSlider} from 'react-native-flatlist-slider';
import Preview from '../../../components/Preview';
import Banner from '../../../components/Banner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {useSelector} from 'react-redux';
import Loader from '../../../components/Loader';
const SubCategory = ({route}) => {
  const navigation = useNavigation();
  const selector = useSelector(state => state.ProductDetail?.detail);
  const selector1 = useSelector(state => state.SupplierProDetail?.detail);
  const name = route.params.name;
  const name1 = route.params.name;
  const Detail = route.params.Details;
  // console.log(
  //   'detailss........................',
  //   Detail ? selector : selector1,
  // );

  const isFetching = useSelector(state => state.isFetching);
  const [collection, setCollection] = useState(
    Detail ? selector?.ProductSku : selector1?.ProductSku,
  );
  const [stockNo, setStock] = useState(
    Detail ? selector?.ItemName : selector1?.ItemName,
  );
  const [metal, setMetal] = useState('');
  const [gm, setGm] = useState('');
  const [demo, setDemo] = useState(
    Detail
      ? selector?.ItemDesc?.substring(0, 35)
      : selector1?.ItemDesc?.substring(0, 35),
  );
  const [price, setPrice] = useState('');
  const [mg, setMg] = useState('');
  const [metalPurity, setMetalPurity] = useState('');
  const [description, setDescription] = useState('');
  const [editable, setEditable] = useState(false);
  const [editable1, setEditable1] = useState(false);
  const [editable2, setEditable2] = useState(false);
  const [click1, setClick1] = useState(false);
  const [url, setUrl] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  const share = async () => {
    await Share.share({
      message: `Product Name : ${selector?.ItemName}  \nProduct Details : ${selector?.ItemDesc} `,
    });
  };

  const manageEdit = () => {
    setEditable(true);
    setEditable1(true);
    setEditable2(true);
    // Detail();
  };
  const click = click1 => {
    if (click1) {
      setClick1(false);
    } else {
      setClick1(true);
    }
  };
  return (
    <View style={styles.container}>
      <Header
        source={require('../../../assets/L.png')}
        source1={require('../../../assets/Fo.png')}
        source2={require('../../../assets/Image/dil.png')}
        title={'Product Details'}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('Message')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
      <ScrollView>
        {isFetching ? <Loader /> : null}
        <View style={styles.main}>
          <TouchableOpacity onPress={() => click(click1)}>
            <View>
              <Image
                style={{width: 21, height: 18}}
                tintColor={click1 ? 'red' : '#fff'}
                source={require('../../../assets/Image/dil.png')}
              />
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              onPress={() => share()}
              // {()=>navigation.navigate('Filter')}
            >
              <Image
                style={styles.img}
                source={require('../../../assets/Image/share1.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <FlatListSlider
            data={images}
            height={200}
            // timer={5000}
            contentContainerStyle={{paddingHorizontal: 30}}
            indicatorContainerStyle={{position: 'absolute', bottom: -20}}
            indicatorActiveColor={'#ffffff'}
            indicatorInActiveColor={'grey'}
            indicatorActiveWidth={5}
            component={<Preview />}
            separatorWidth={15}
            width={310}
            autoscroll={false}
            loop={false}
          />
          {/* })} */}
        </View>

        <View style={styles.view}>
          <Image
            style={styles.img1}
            source={require('../../../assets/Image/rupay.png')}
          />
          <Text style={styles.text}>
            {Detail
              ? selector?.ProductsPrice?.substring(0, 8)
              : selector1?.ProductsPrice?.substring(0, 8)}
          </Text>
          <Text style={styles.text1}>( Approximate Price )</Text>
        </View>
        <View style={{padding: 20}}>
          <View style={styles.main1}>
            <View style={styles.main1view}>
              <View style={styles.main1view1}>
                <Text style={styles.main1view1text}>
                  {
                    // selector?.ItemDesc
                    // ? selector.ItemDesc?.substring(0, 35)
                    //   :
                    'PRODUCT DESCRIPTION'
                  }
                </Text>
              </View>
              {Detail ? (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Editproduct')}
                  //  onPress={()=>manageEdit()}
                  style={{alignItems: 'flex-end'}}>
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../../../assets/Image/edit.png')}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={{marginLeft: 20, marginTop: 8}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.cardtext}>{'Name       :      '}</Text>
                <TextInput
                  style={{height: 40, color: '#052a47'}}
                  value={stockNo}
                  editable={editable1}
                  onChangeText={val => setStock(val)}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: -15,
                }}>
                <Text style={styles.cardtext}>{'Stock No :      '}</Text>
                <TextInput
                  style={{height: 40, color: '#052a47'}}
                  value={collection}
                  editable={editable}
                  onChangeText={val => setCollection(val)}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: -15,
                }}>
                <Text style={styles.cardtext}>{'Metal        :     '}</Text>

                <TextInput
                  style={{height: 40, color: '#052a47'}}
                  value={demo}
                  editable={editable2}
                  onChangeText={val => setDemo(val)}
                />
                {/* )} */}
              </View>
            </View>
          </View>
        </View>
        <View style={{height: 100}} />
      </ScrollView>
      <View style={{bottom: 0, left: 0, right: 0, position: 'absolute'}}>
        {/* <TabView /> */}
      </View>
    </View>
  );
};
export default SubCategory;

const images = [
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
];
