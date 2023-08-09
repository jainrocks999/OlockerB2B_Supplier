import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInput} from 'react-native';

const Notification = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [value, setValue] = useState(null);

  const renderItem = item => {
    return (
      <View
        style={{
          borderBottomWidth: 2,
          height: 40,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 5,
        }}>
        <CheckBox />
        <Text
          style={{
            fontSize: 18,
            marginLeft: 5,
            fontWeight: '700',
            color: '#000',
          }}>
          {item.label}
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView contentContainerStyle={{}}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => navigation.goBack()}>
              <Image
                style={styles.img}
                source={require('../../../assets/L.png')}
              />
            </TouchableOpacity>
            <Text style={[styles.text, {marginLeft: 15}]}>
              SUPPLIER ADD PRODUCT
            </Text>
          </View>
          <View style={styles.headertouch}>
            <TouchableOpacity onPress={() => navigation.navigate('Message')}>
              <Image
                style={styles.img1}
                source={require('../../../assets/Fo.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 15}}
              onPress={() => handleWishList()}>
              <Image
                style={styles.img2}
                source={require('../../../assets/Image/dil.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Logout()}>
              <Image
                style={styles.img3}
                source={require('../../../assets/Image/menu-icon.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={{marginHorizontal: 10, marginTop: 20}}>
            <Text style={{fontSize: 22, fontWeight: '800', color: '#000'}}>
              {' '}
              CHOOSE SUPPLIER ADD PRODUCT
            </Text>
          </View>

          <View>
            <View
              style={{
                marginHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '5%',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  borderWidth: 2,
                  width: 25,
                  height: 25,
                  borderRadius: 12.5,
                  alignItems: 'center',

                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'white',

                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: '#032e63',
                  }}></View>
              </View>
              <View style={{marginLeft: 5}}>
                <Text style={{fontSize: 18, fontWeight: '600'}}>
                  Digital Inventory
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 2,
                  marginLeft: 10,
                  width: 25,
                  height: 25,
                  borderRadius: 12.5,
                  alignItems: 'center',

                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'white',

                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: '#032e63',
                  }}></View>
              </View>
              <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 18, fontWeight: '600'}}>
                  Pre-Insured Jewellery
                </Text>
              </View>
            </View>
          </View>

          <View style={{marginHorizontal: 10, marginTop: 20}}>
            <Text style={{fontSize: 22, fontWeight: '800', color: '#000'}}>
              {' '}
              Choose Price Calculation Method
            </Text>
          </View>

          <View>
            <View
              style={{
                marginHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '5%',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  borderWidth: 2,
                  width: 25,
                  height: 25,
                  borderRadius: 12.5,
                  alignItems: 'center',

                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'white',

                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: '#032e63',
                  }}></View>
              </View>
              <View style={{marginLeft: 5}}>
                <Text style={{fontSize: 18, fontWeight: '600'}}>
                  Break Up Pricing
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 2,
                  marginLeft: 10,
                  width: 25,
                  height: 25,
                  borderRadius: 12.5,
                  alignItems: 'center',

                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'white',

                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: '#032e63',
                  }}></View>
              </View>
              <View style={{marginLeft: 10, width: '40%'}}>
                <Text style={{fontSize: 18, fontWeight: '600'}}>
                  MRP Pricing
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={{marginHorizontal: 20, marginTop: 20}}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#000'}}>
              FILL PRODUCT DETAILS
            </Text>
          </View>

          <View style={{marginHorizontal: 20, marginTop: 20}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
              Item Name
            </Text>
            <View>
              <Dropdown
                style={[
                  styles.dropdown,
                  {borderWidth: 1, borderColor: '#979998'},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={DropData}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Product/item type"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          <View style={{marginHorizontal: 20, marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
              Status
            </Text>
            <View>
              <Dropdown
                style={[
                  styles.dropdown,
                  {borderWidth: 1, borderColor: '#979998'},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={DropData}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Live"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          <View style={{marginHorizontal: 20, marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
              ProductSku
            </Text>
            <View>
              <Dropdown
                style={[
                  styles.dropdown,
                  {borderWidth: 1, borderColor: '#979998'},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={DropData}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Product/item type"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          <View style={{marginHorizontal: 20, marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
              Style Id
            </Text>
            <View>
              <Dropdown
                style={[
                  styles.dropdown,
                  {borderWidth: 1, borderColor: '#979998'},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={DropData}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Product/item type"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>

          <View style={{marginHorizontal: 20, marginTop: 20}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
              Demensions
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 60,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 35,
                  borderWidth: 1,
                  borderRadius: 5,
                  width: '48%',
                }}>
                <View
                  style={{
                    width: '60%',
                    justifyContent: 'center',
                    height: 50,
                  }}>
                  <TextInput
                    style={{fontSize: 18, fontWeight: '600'}}
                    placeholder="Width"
                  />
                </View>

                <View
                  style={{
                    backgroundColor: '#032e63',
                    borderTopRightRadius: 2,
                    borderBottomRightRadius: 2,
                    width: '35%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 18, color: 'white', fontWeight: '600'}}>
                    mm
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 35,
                  borderWidth: 1,
                  borderRadius: 5,
                  width: '48%',
                }}>
                <View
                  style={{
                    width: '60%',
                    justifyContent: 'center',
                    height: 50,
                  }}>
                  <TextInput
                    style={{fontSize: 18, fontWeight: '600'}}
                    placeholder="Height"
                  />
                </View>

                <View
                  style={{
                    backgroundColor: '#032e63',
                    borderTopRightRadius: 2,
                    borderBottomRightRadius: 2,
                    width: '35%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 18, color: 'white', fontWeight: '600'}}>
                    mm
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 60,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 35,
                  borderWidth: 1,
                  borderRadius: 5,
                  width: '48%',
                }}>
                <View
                  style={{
                    width: '60%',
                    justifyContent: 'center',
                    height: 50,
                  }}>
                  <TextInput
                    style={{fontSize: 18, fontWeight: '600'}}
                    placeholder="Thickness"
                  />
                </View>

                <View
                  style={{
                    backgroundColor: '#032e63',
                    borderTopRightRadius: 2,
                    borderBottomRightRadius: 2,
                    width: '35%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 18, color: 'white', fontWeight: '600'}}>
                    mm
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 35,
                  borderWidth: 1,
                  borderRadius: 5,
                  width: '48%',
                }}>
                <View
                  style={{
                    width: '60%',
                    justifyContent: 'center',
                    height: 50,
                  }}>
                  <TextInput
                    style={{fontSize: 18, fontWeight: '600'}}
                    placeholder="Size"
                  />
                </View>

                <View
                  style={{
                    backgroundColor: '#032e63',
                    borderTopRightRadius: 2,
                    borderBottomRightRadius: 2,
                    width: '35%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 18, color: 'white', fontWeight: '600'}}>
                    mm
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{marginHorizontal: 20, marginTop: 15}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: '#000'}}>
            Hallmarked
          </Text>
          <View
            style={{
              marginHorizontal: 20,
              alignItems: 'center',
              marginTop: '5%',
              flexDirection: 'row',
            }}>
            <View
              style={{
                borderWidth: 2,
                width: 25,
                height: 25,
                borderRadius: 12.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'white',
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: '#032e63',
                }}></View>
            </View>

            <View style={{marginHorizontal: 20}}>
              <Text style={{fontSize: 18, fontWeight: '600'}}>Yes</Text>
            </View>
            <View
              style={{
                borderWidth: 2,
                marginLeft: 10,
                width: 25,
                height: 25,
                borderRadius: 12.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'white',
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: '#032e63',
                }}></View>
            </View>
            <View style={{marginLeft: 20}}>
              <Text style={{fontSize: 18, fontWeight: '600'}}>No</Text>
            </View>
          </View>
        </View>
        <View style={{marginHorizontal: 20, marginTop: 15}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: '#000'}}>
            Gender
          </Text>
          <View
            style={{
              marginHorizontal: 20,
              alignItems: 'center',
              marginTop: '5%',
              flexDirection: 'row',
            }}>
            <View
              style={{
                borderWidth: 2,
                width: 25,
                height: 25,
                borderRadius: 12.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'white',
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: '#032e63',
                }}></View>
            </View>

            <View style={{marginHorizontal: 20}}>
              <Text style={{fontSize: 18, fontWeight: '600'}}>Male</Text>
            </View>
            <View
              style={{
                borderWidth: 2,
                marginLeft: 10,
                width: 25,
                height: 25,
                borderRadius: 12.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'white',
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: '#032e63',
                }}></View>
            </View>
            <View style={{marginHorizontal: 20}}>
              <Text style={{fontSize: 18, fontWeight: '600'}}>Female</Text>
            </View>
            <View
              style={{
                borderWidth: 2,
                marginLeft: 10,
                width: 25,
                height: 25,
                borderRadius: 12.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'white',
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: '#032e63',
                }}></View>
            </View>
            <View style={{marginLeft: 20}}>
              <Text style={{fontSize: 18, fontWeight: '600'}}>Kids</Text>
            </View>
          </View>
        </View>
        <View
          style={{alignSelf: 'flex-end', marginHorizontal: 20, marginTop: 15}}>
          <View>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#032e63'}}>
              Assign Category
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginTop: 15,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <CheckBox />
            </View>
            <View style={{marginHorizontal: 10}}>
              <Text style={{fontSize: 18, color: '#000', fontWeight: '600'}}>
                Is Best Seller
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                borderWidth: 2,
                width: 25,
                height: 25,
                borderRadius: 12.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'white',
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: '#032e63',
                }}></View>
            </View>

            <View style={{marginHorizontal: 10}}>
              <Text style={{fontSize: 18, color: '#000', fontWeight: '600'}}>
                Is Best Seller
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginTop: 15,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: '#032e63',

              width: '49%',
              height: 40,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 18, fontWeight: '600', color: '#032e63'}}>
              Metal Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              backgroundColor: '#032e63',

              width: '49%',
              height: 40,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
              Stone Details
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginTop: 15,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: '#032e63',

              width: '49%',
              height: 40,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 18, fontWeight: '600', color: '#032e63'}}>
              Diamond Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              backgroundColor: '#032e63',

              width: '49%',
              paddingHorizontal: 5,
              height: 40,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}>
              Decorative item Details
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{marginHorizontal: 20, marginTop: 15}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '48%'}}>
              <View style={{marginHorizontal: 10, marginVertical: 10}}>
                <Text
                  style={{fontSize: 20, fontWeight: '700', color: '#032e63'}}>
                  Verify Wt.
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 40,
                  paddingHorizontal: 10,
                }}>
                <TextInput
                  placeholder="Verify Wt."
                  style={{fontSize: 16, fontWeight: '700'}}
                />
              </View>
            </View>
            <View style={{width: '48%'}}>
              <View style={{marginHorizontal: 10, marginVertical: 10}}>
                <Text
                  style={{fontSize: 20, fontWeight: '700', color: '#032e63'}}>
                  Gross Wt.
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 40,
                  paddingHorizontal: 10,
                }}>
                <TextInput
                  placeholder="Gross Wt."
                  style={{fontSize: 16, fontWeight: '700'}}
                />
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '48%'}}>
              <View style={{marginHorizontal: 10, marginVertical: 10}}>
                <Text
                  style={{fontSize: 20, fontWeight: '700', color: '#032e63'}}>
                  Metal Wt.
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 40,
                  paddingHorizontal: 10,
                }}>
                <TextInput
                  placeholder="Metal Wt."
                  style={{fontSize: 16, fontWeight: '700'}}
                />
              </View>
            </View>
            <View style={{width: '48%'}}>
              <View style={{marginHorizontal: 10, marginVertical: 10}}>
                <Text
                  style={{fontSize: 20, fontWeight: '700', color: '#032e63'}}>
                  Diamond Wt.
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 40,
                  paddingHorizontal: 10,
                }}>
                <TextInput
                  placeholder="Diamond Wt."
                  style={{fontSize: 16, fontWeight: '700'}}
                />
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '48%'}}>
              <View style={{marginHorizontal: 10, marginVertical: 10}}>
                <Text
                  style={{fontSize: 20, fontWeight: '700', color: '#032e63'}}>
                  Stone Wt.
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 40,
                  paddingHorizontal: 10,
                }}>
                <TextInput
                  placeholder="Stone Wt."
                  style={{fontSize: 16, fontWeight: '700'}}
                />
              </View>
            </View>
            <View style={{width: '48%'}}>
              <View style={{marginHorizontal: 10, marginVertical: 10}}>
                <Text
                  style={{fontSize: 20, fontWeight: '700', color: '#032e63'}}>
                  Decorative Wt.
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 40,
                  paddingHorizontal: 10,
                }}>
                <TextInput
                  placeholder="Decorative Wt."
                  style={{fontSize: 16, fontWeight: '700'}}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{marginVertical: 20}}>
          <View style={{marginHorizontal: 20}}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#000'}}>
              Chargeable amount for Labour
            </Text>
          </View>

          <View
            style={{
              marginLeft: 20,
              alignItems: 'center',
              marginTop: '5%',
              flexDirection: 'row',
            }}>
            <View
              style={{
                borderWidth: 2,
                width: 25,
                height: 25,
                borderRadius: 12.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'white',
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: '#032e63',
                }}></View>
            </View>

            <View style={{marginHorizontal: 5}}>
              <Text style={{fontSize: 14, fontWeight: '600'}}>
                Charges Per Gram Rs
              </Text>
            </View>
            <View
              style={{
                borderWidth: 2,
                marginLeft: 10,
                width: 25,
                height: 25,
                borderRadius: 12.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'white',
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: '#032e63',
                }}></View>
            </View>
            <View style={{marginLeft: 5}}>
              <Text style={{fontSize: 14, fontWeight: '600'}}>
                Wastage(% of Net Gold wt)
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginHorizontal: 20}}>
          <View>
            <View style={{}}>
              <Text style={{fontSize: 20, fontWeight: '700', color: '#000'}}>
                Wastage % between 0-100
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                height: 40,
                borderRadius: 4,
                marginTop: 10,
                paddingHorizontal: 5,
              }}>
              <TextInput placeholder="Wastage % between 0-100" />
            </View>
          </View>
          <View style={{marginVertical: 20}}>
            <View style={{}}>
              <Text style={{fontSize: 20, fontWeight: '700', color: '#000'}}>
                Chargeable amount for Product RS
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                height: 40,
                borderRadius: 4,
                marginTop: 10,
                paddingHorizontal: 5,
              }}>
              <TextInput placeholder="0.00" />
            </View>
          </View>
          <View style={{}}>
            <View style={{}}>
              <Text style={{fontSize: 20, fontWeight: '700', color: '#000'}}>
                {' '}
                CERTIFICATION DETAILS
              </Text>
            </View>
            <View style={{}}>
              <Dropdown
                style={[styles.dropdown, {borderWidth: 1}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={DropData}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Select item"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            style={{
              alignSelf: 'center',
              marginTop: 15,
              borderWidth: 2,
              alignItems: 'center',
              justifyContent: 'space-evenly',
              borderColor: '#032e63',
              flexDirection: 'row',
              height: 45,
              borderRadius: 30,
              width: '60%',
            }}>
            <Entypo name="upload" size={25} color={'#032e63'} />
            <Text style={{color: '#032e63', fontWeight: '700', fontSize: 16}}>
              Upload Images 6
            </Text>
          </TouchableOpacity>

          <View style={{marginTop: 20, flexDirection: 'row', marginLeft: -10}}>
            <View>
              <Image
                style={{height: 100, width: 100}}
                source={{
                  uri: 'https://cdn11.bigcommerce.com/s-x49po/images/stencil/1280x1280/products/62041/87698/1607601332291_IMG_20201128_134909__65880.1607778700.jpg?c=2',
                }}
              />
            </View>
            <View>
              <Image
                style={{height: 100, width: 100}}
                source={{
                  uri: 'https://cdn11.bigcommerce.com/s-x49po/images/stencil/1280x1280/products/62041/87698/1607601332291_IMG_20201128_134909__65880.1607778700.jpg?c=2',
                }}
              />
            </View>
            <View>
              <Image
                style={{height: 100, width: 100}}
                source={{
                  uri: 'https://cdn11.bigcommerce.com/s-x49po/images/stencil/1280x1280/products/62041/87698/1607601332291_IMG_20201128_134909__65880.1607778700.jpg?c=2',
                }}
              />
            </View>
            <View>
              <Image
                style={{height: 100, width: 100}}
                source={{
                  uri: 'https://cdn11.bigcommerce.com/s-x49po/images/stencil/1280x1280/products/62041/87698/1607601332291_IMG_20201128_134909__65880.1607778700.jpg?c=2',
                }}
              />
            </View>
          </View>
        </View>

        <View style={{marginHorizontal: 10, marginTop: 15}}>
          <Text style={{fontSize: 20, fontWeight: '800', color: '#000'}}>
            CHOOSE CATEGORIES TO PRODUCT
          </Text>
          <Text style={{fontSize: 16, fontWeight: '800', color: '#000'}}>
            (DEFINE TABS:- TICKS MARK ALL THE TABS WHERE YOU WANT THIS JEWELLERY
            TO APPEAR IN CLINT SEARCH)
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            borderWidth: 2,
            marginTop: 15,
            borderBottomWidth: 0,
          }}>
          <Dropdown
            style={{borderBottomWidth: 2}}
            placeholderStyle={[
              styles.placeholderStyle,
              {fontWeight: '800', fontSize: 18, marginLeft: 10, color: '#000'},
            ]}
            selectedTextStyle={[
              styles.selectedTextStyle,
              {fontSize: 18, fontWeight: '700', color: '#000', marginLeft: 10},
            ]}
            iconStyle={{width: 30, height: 30}}
            data={DropData}
            maxHeight={250}
            labelField="label"
            valueField="value"
            placeholder="Price"
            value={value}
            renderItem={renderItem}
            itemTextStyle={{fontSize: 18, fontWeight: '700', color: '#000'}}
            onChange={item => {
              setValue(item.value);
            }}
          />
          <Dropdown
            style={{borderBottomWidth: 2}}
            placeholderStyle={[
              styles.placeholderStyle,
              {fontWeight: '800', fontSize: 18, marginLeft: 10, color: '#000'},
            ]}
            selectedTextStyle={[
              styles.selectedTextStyle,
              {fontSize: 18, fontWeight: '700', color: '#000', marginLeft: 10},
            ]}
            iconStyle={{width: 30, height: 30}}
            data={DropData}
            maxHeight={250}
            labelField="label"
            valueField="value"
            placeholder="Gold Colour"
            value={value}
            renderItem={renderItem}
            itemTextStyle={{fontSize: 18, fontWeight: '700', color: '#000'}}
            onChange={item => {
              setValue(item.value);
            }}
          />
          <Dropdown
            style={{borderBottomWidth: 2}}
            placeholderStyle={[
              styles.placeholderStyle,
              {fontWeight: '800', fontSize: 18, marginLeft: 10, color: '#000'},
            ]}
            selectedTextStyle={[
              styles.selectedTextStyle,
              {fontSize: 18, fontWeight: '700', color: '#000', marginLeft: 10},
            ]}
            iconStyle={{width: 30, height: 30}}
            data={DropData}
            maxHeight={250}
            labelField="label"
            valueField="value"
            placeholder="Metal"
            value={value}
            renderItem={renderItem}
            itemTextStyle={{fontSize: 18, fontWeight: '700', color: '#000'}}
            onChange={item => {
              setValue(item.value);
            }}
          />
          <Dropdown
            style={{borderBottomWidth: 2}}
            placeholderStyle={[
              styles.placeholderStyle,
              {fontWeight: '800', fontSize: 18, marginLeft: 10, color: '#000'},
            ]}
            selectedTextStyle={[
              styles.selectedTextStyle,
              {fontSize: 18, fontWeight: '700', color: '#000', marginLeft: 10},
            ]}
            iconStyle={{width: 30, height: 30}}
            data={DropData}
            maxHeight={250}
            labelField="label"
            valueField="value"
            placeholder="Metal Purity"
            value={value}
            renderItem={renderItem}
            itemTextStyle={{fontSize: 18, fontWeight: '700', color: '#000'}}
            onChange={item => {
              setValue(item.value);
            }}
          />
          <Dropdown
            style={{borderBottomWidth: 2}}
            placeholderStyle={[
              styles.placeholderStyle,
              {fontWeight: '800', fontSize: 18, marginLeft: 10, color: '#000'},
            ]}
            selectedTextStyle={[
              styles.selectedTextStyle,
              {fontSize: 18, fontWeight: '700', color: '#000', marginLeft: 10},
            ]}
            iconStyle={{width: 30, height: 30}}
            data={DropData}
            maxHeight={250}
            labelField="label"
            valueField="value"
            placeholder="Test Necklace1"
            value={value}
            renderItem={renderItem}
            itemTextStyle={{fontSize: 18, fontWeight: '700', color: '#000'}}
            onChange={item => {
              setValue(item.value);
            }}
          />
          <Dropdown
            style={{borderBottomWidth: 2}}
            placeholderStyle={[
              styles.placeholderStyle,
              {fontWeight: '800', fontSize: 18, marginLeft: 10, color: '#000'},
            ]}
            selectedTextStyle={[
              styles.selectedTextStyle,
              {fontSize: 18, fontWeight: '700', color: '#000', marginLeft: 10},
            ]}
            iconStyle={{width: 30, height: 30}}
            data={DropData}
            maxHeight={250}
            labelField="label"
            valueField="value"
            placeholder="Test Category"
            value={value}
            renderItem={renderItem}
            itemTextStyle={{fontSize: 18, fontWeight: '700', color: '#000'}}
            onChange={item => {
              setValue(item.value);
            }}
          />
        </View>
        <View style={{marginHorizontal: 10, marginTop: 15}}>
          <Text style={{fontSize: 20, fontWeight: '800', color: '#000'}}>
            CHOOSE CATEGORIES TO PRODUCT
          </Text>
          <Text style={{fontSize: 16, fontWeight: '800', color: '#000'}}>
            (DEFINE TABS:- TICKS MARK ALL THE TABS WHERE YOU WANT THIS JEWELLERY
            TO APPEAR IN CLINT SEARCH)
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            borderWidth: 2,
            marginTop: 15,
            borderBottomWidth: 0,
          }}>
          <View
            style={{
              borderBottomWidth: 2,
              height: 40,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CheckBox />
            <Text
              style={{
                fontSize: 18,
                marginLeft: 5,
                fontWeight: '700',
                color: '#000',
              }}>
              UNDER 25000
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 2,
              height: 40,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CheckBox />
            <Text
              style={{
                fontSize: 18,
                marginLeft: 5,
                fontWeight: '700',
                color: '#000',
              }}>
              UNDER 25000
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 2,
              height: 40,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CheckBox />
            <Text
              style={{
                fontSize: 18,
                marginLeft: 5,
                fontWeight: '700',
                color: '#000',
              }}>
              UNDER 50000
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 2,
              height: 40,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CheckBox />
            <Text
              style={{
                fontSize: 18,
                marginLeft: 5,
                fontWeight: '700',
                color: '#000',
              }}>
              UNDER 100000
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 2,
              height: 40,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CheckBox />
            <Text
              style={{
                fontSize: 18,
                marginLeft: 5,
                fontWeight: '700',
                color: '#000',
              }}>
              UNDER 200000
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 2,
              height: 40,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CheckBox />
            <Text
              style={{
                fontSize: 18,
                marginLeft: 5,
                fontWeight: '700',
                color: '#000',
              }}>
              UNDER 200000
            </Text>
          </View>
        </View>

        <View style={{marginHorizontal:20,marginTop:15}}>
          <TouchableOpacity style={{height:40,borderRadius:30,
            alignItems:'center',justifyContent:'center',
            backgroundColor:'#032e63'}}>
            <Text style={{fontSize:18,color:'white',fontWeight:'600'}}>Update Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{height:40,borderRadius:30,
            alignItems:'center',justifyContent:'center',marginTop:15,
            backgroundColor:'#666564'}}>
            <Text style={{fontSize:18,color:'white',fontWeight:'600'}}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={{height: 100}} />
      </ScrollView>

      <TouchableOpacity
        style={{
          position: 'absolute',
          backgroundColor: '#032e63',
          bottom: 15,
          alignItems: 'center',
          justifyContent: 'center',

          borderRadius: 40,
          right: 25,
          height: hp(9),
          width: wp(18),
        }}>
        <Ionicons name="chatbubbles-outline" size={45} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};
export default Notification;

const DropData = [
  {label: 'UNDER 25000', value: '1'},
  {label: 'UNDER 25000', value: '2'},
  {label: 'UNDER 50000', value: '3'},
  {label: 'UNDER 100000', value: '4'},
];

const page = [
  {
    number: '1',
  },
  {
    number: '2',
  },
  {
    number: '3',
  },
  {
    number: '4',
  },
  {
    number: '5',
  },
];
const data = [
  {
    sNo: '01',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '02',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
  {
    sNo: '03',
    RName: 'Rohan sahu',
    State: 'MP',
    city: 'Indore',
    ACategory: 'Lorem',
    Iproduct: 'lorem',
  },
];
