import React, {useEffect, useState} from 'react';
// Import required components
import {
  SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import RNPickerSelect from 'react-native-picker-select';
import Bottum from '../../../components/StoreButtomTab';
import Header from '../../../components/CustomHeader';
import Stars from 'react-native-stars';
const ExpandableComponent = ({item, onClickFunction}) => {
  const [layoutHeight, setLayoutHeight] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View style={{paddingHorizontal: 10}}>
      {/*Header of the Expandable List Item*/}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={{}}>
        <View style={[styles.card, {marginTop: 10}]}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 17,
              alignItems: 'center',
              marginTop: 10,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#032e63',
                  fontFamily: 'Acephimere',
                }}>
                {item.CustomerName}
              </Text>
              {/* <View 
          style={{
            backgroundColor:'#da9401',
            borderRadius:20,
            alignItems:'center',
            justifyContent:'center',
            marginLeft:10,
            paddingVertical:2,paddingHorizontal:17
            }}>
              <Text style={{color:'#fff',fontSize:9,fontFamily:'Acephimere'}}>GOLD</Text>
          </View> */}
            </View>
            <View>
              {/* {item.QuestionAnswers.map((item, key) =>  */}
              {/* item.Question==item.Answer? */}
              <Stars
                // display={item.Answer/2}
                spacing={3}
                count={5}
                starSize={15}
                fullStar={require('../../../assets/Image/star.png')}
                emptyStar={require('../../../assets/Image/star1.png')}
              />
              {/* :null
          )} */}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'space-between',
              marginTop: 5,
              paddingHorizontal: 17,
            }}>
            <Text style={{color: '#313131', fontFamily: 'Roboto-Medium'}}>
              {item.MobileNo}
            </Text>
            {layoutHeight == null ? (
              <Text
                style={{
                  fontSize: 12,
                  color: '#2d2d2d',
                  fontFamily: 'Acephimere',
                }}>
                {item.CreateDate}
              </Text>
            ) : null}
          </View>
          {layoutHeight == 0 ? (
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 17,
                width: '100%',
              }}>
              <View style={{width: '30%'}}></View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 12, fontFamily: 'Acephimere'}}>
                  EXPAND
                </Text>
                <Image
                  style={{height: 10, width: 8, marginLeft: 5}}
                  source={require('../../../assets/arrowD.png')}
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: '#2d2d2d',
                  fontFamily: 'Acephimere',
                }}>
                {item.CreateDate}
              </Text>
            </View>
          ) : (
            <View />
          )}
          <View
            style={{
              height: layoutHeight,
              overflow: 'hidden',
            }}>
            {/* {item.QuestionAnswers.map((item, key) => ( */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 15,
              }}>
              <View style={{width: '45%', marginTop: 5}}>
                <Text
                  style={{
                    color: '#2d2d2d',
                    fontFamily: 'Acephimere',
                    fontSize: 13,
                    fontWeight: '700',
                  }}>
                  {item.Question}
                </Text>
              </View>

              <View style={{width: '45%', marginTop: 5}}>
                <Text
                  style={{
                    color: '#032e63',
                    fontFamily: 'Acephimere',
                    fontSize: 13,
                    fontWeight: '700',
                  }}>
                  {item.Answer}
                </Text>
              </View>
            </View>
            {/* ))} */}
            <View style={{width: '93%', alignSelf: 'center'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Chat')}
                style={{
                  backgroundColor: '#e9056b',
                  width: '100%',
                  paddingHorizontal: 40,
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: 'Roboto-Medium',
                  }}>
                  Reply
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const navigation = useNavigation();

  const [listDataSource, setListDataSource] = useState(CONTENT);
  const [multiSelect, setMultiSelect] = useState(false);
  const [pending, setPending] = useState(true);
  const [replied, setReplied] = useState(false);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    } else {
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
          : (array[placeindex]['isExpanded'] = false),
      );
    }
    setListDataSource(array);
  };
  const managePending = () => {
    setPending(true);
    setReplied(false);
  };
  const manageReplied = () => {
    setReplied(true);
    setPending(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Header
          source={require('../../../assets/L.png')}
          source2={require('../../../assets/Image/dil.png')}
          source1={require('../../../assets/Fo.png')}
          title={'Feedback '}
          onPress={() => navigation.goBack()}
          onPress2={() => navigation.navigate('FavDetails')}
        />
        <ScrollView>
          {pending == true ? (
            <View>
              {CONTENT.map((item, key) => (
                <ExpandableComponent
                  key={item.CustomerSrNo}
                  onClickFunction={() => {
                    updateLayout(key);
                  }}
                  item={item}
                />
              ))}
            </View>
          ) : null}
          {replied == true ? (
            <View>
              {selector.map((item, key) => (
                <ExpandableComponent
                  key={item.CustomerSrNo}
                  onClickFunction={() => {
                    updateLayout(key);
                  }}
                  item={item}
                />
              ))}
            </View>
          ) : null}

          <View style={{marginBottom: 70}} />
        </ScrollView>
      </View>
      {/* <View style={{bottom:0,left:0,right:0,position:'absolute'}}>
     <Bottum />
     </View> */}
    </SafeAreaView>
  );
};

export default App;

//Dummy content to show
//You can also use dynamic data by calling webservice
const CONTENT = [
  {
    isExpanded: false,
    name: 'Milind Shethia',
    mobile: '+918765467834',
    date: '23 Sep 2021',
    subcategory: [{id: 1, val: 'Sub Cat 1'}],
  },
  {
    isExpanded: false,
    name: 'Milind Shethia',
    mobile: '+918765467834',
    date: '23 Sep 2021',
    subcategory: [{id: 4, val: 'Sub Cat 4'}],
  },
  {
    isExpanded: false,
    name: 'Milind Shethia',
    mobile: '+918765467834',
    date: '23 Sep 2021',
    subcategory: [{id: 7, val: 'Sub Cat 7'}],
  },
];
