import React, { useEffect, useState,useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions, Share, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../../components/CustomHeader";
import styles from "./style";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader'
import Constants from "../../../Redux/Constants";
import axios from "axios";
import Toast from "react-native-simple-toast";

const ProductTypeListDetails = ({ route }) => {
    const selector = useSelector(state => state.Catalogue.ProductList);
    const isFetching1 = useSelector(state => state.Catalogue.isFetching);
    const dispatch = useDispatch()
    const isFocus = useIsFocused()
    const navigation = useNavigation()
    const win = Dimensions.get('window');
    const [isFetching, setIsFetching] = useState();
    const [liked, setLiked] = useState([]);
    const [loader, setLoader] = useState(false)
    const [start, setStart] = useState(0)
    const [data, setData] = useState()
    const [count,setCount]=useState()
    const handleRef=useRef(FlatList)


    const share1 = async (id) => {
        let pr = id.Price;
        let name = id.ItemName;
        let image = id.ImageName;
        let Description = id.Description;
        await Share.share({
            message: `Product Name : ${name}${id.ProductSku} \n app url:${'https://olocker.co/suppliers'}\n  playStore url: ${'https://play.google.com/store/apps'}`,
            // url1 : 'https://play.google.com/store/apps',
        });
    };

    useEffect(() => {
        if (isFocus) {
            productTypeListDetails();
        }
    }, [isFocus])


    const productTypeListDetails = async () => {
        const Token = await AsyncStorage.getItem('loginToken');
        const user_id = await AsyncStorage.getItem('user_id');
        console.log('this is token',Token);
        const data = {
            userId: route.params.productRequestId,
            userType: route.params.userType,
            typeId: route.params.id,
            login_user_id: user_id,
            login_user_type: 'supplier',
            start: 0,
            limit: 20,
        };
        // const data = {
        //     userId: 13,
        //     userType: 'partner',
        //     typeId: 762,
        //     login_user_id: 13,
        //     login_user_type: 'partner',
        //     start: 0,
        //     limit: 20,
        // };
        console.log(data);
        try {
            setLoader(true)
            const response = await axios({
                method: 'GET',
                // url:`https://olocker.co/api/supplier//productTypeProducts?userId=${user_id}&userType='partner'&typeId=${'50'}&login_user_id=${user_id}&login_user_type='partner'&start=${0}&limit=${20}`,
                url: Constants.MainUrl + '/productTypeProducts',
                params: data,
                headers: {
                    'content-type': 'application/json',
                    Olocker: `Bearer ${Token}`,
                },
            });
            console.log('this is res',response.data);
            if (response.status) {
                setData(response?.data?.list)
                setStart(20)
                setCount(0)
                // console.log(" response.data;" ,response.data);
                setLoader(false)
            }
            else {
                // Toast.show(response.msg)
                setLoader(false)
            }

        } catch (error) {
            console.log('error123', error);
            setLoader(false)
            throw error;
        }
        // dispatch({
        //     type: 'User_ProductLists_Request',
        //     url: '/productTypeProducts',
        //     userId: user_id,
        //     userType: 'supplier',
        //     typeId: route.params.id,
        //     Token: Token,
        //     name: route.params.name,
        //     login_user_id: user_id,
        //     login_user_type: 'supplier',
        //     start:1,
        //     limit:20
        // });
    };
    const handleApiOnReachEnd = async () => {
        const Token = await AsyncStorage.getItem('loginToken');
        const user_id = await AsyncStorage.getItem('user_id');
        const data1 = {
            userId: route.params.productRequestId,
            userType: route.params.userType,
            typeId: route.params.id,
            login_user_id: user_id,
            login_user_type: 'supplier',
            start: start,
            limit: 20,
        };
        try {
            setLoader(true)
            const response = await axios({
                method: 'GET',
                url: Constants.MainUrl + '/productTypeProducts',
                // url:`https://olocker.co/api/supplier//productTypeProducts?userId=${user_id}&userType='partner'&typeId=${route.params.id}&login_user_id=${user_id}&login_user_type='partner'&start=${start}&limit=${20}`,
                params: data1,
                headers: {
                    'content-type': 'application/json',
                    Olocker: `Bearer ${Token}`,
                },
            });
           
            if (response.data.status==true) {
                var newData = response?.data?.list
                var stateAssetArr = [...data, ...newData]
             
                setData(stateAssetArr)
                setStart(start + 20)
                setCount(start)
                setLoader(false)
            }
            else {
                Toast.show(response?.data?.msg)
                console.log('this is user response',response.data);
                setLoader(false)
            }

        } catch (error) {
            console.log('error123', error);
            setLoader(false)
            throw error;
        }
    }
    const handleWishListProduct = async () => {

        const Token = await AsyncStorage.getItem('loginToken');
        const user_id = await AsyncStorage.getItem('user_id');
        const data1 = {
            userId: user_id,
            userType: 'supplier',
            typeId: route.params.id,
            login_user_id: user_id,
            login_user_type: 'supplier',
            start:0 ,
            // start:0,
            limit: start,
        };
        try {
            setLoader(true)
            const response = await axios({
                method: 'GET',
                url: Constants.MainUrl + '/productTypeProducts',
                params: data1,
                headers: {
                    'content-type': 'application/json',
                    Olocker: `Bearer ${Token}`,
                },
            });
            if (response.data.status==true) {
                var newData = response?.data?.list
                var stateAssetArr = [...data]
             
                setData(newData)
                // setStart(start + 20)
                setLoader(false)
            }
            else {
                Toast.show(response?.data?.msg)
                setLoader(false)
            }

        } catch (error) {
            console.log('error123', error);
            setLoader(false)
            throw error;
        }
    }



    const AddWishList = async (item, index) => {

        const Token = await AsyncStorage.getItem('loginToken');
        const user_id = await AsyncStorage.getItem('user_id');
        let res;
        res = await addProductWishList(item.SrNo);
        console.log('this is res', res);
        if (res.status) {
            let arr=[...data]
            console.log('this is att',arr);
            let objIndex = arr.findIndex(obj => obj.SrNo == item.SrNo);
            console.log('this is obj index',objIndex);
            arr[objIndex].is_exist = true
            setData(arr)
            // handleWishListProduct()
            // dispatch({
            //     type: 'User_ProductLists_Request',
            //     url: '/productTypeProducts',
            //     userId: user_id,
            //     userType: 'supplier',
            //     typeId: route.params.id,
            //     Token: Token,
            //     name: route.params.name,
            //     login_user_id: user_id,
            //     login_user_type: 'supplier',

            //     navigation,
            // });
        }
    };
    const RemoveWislist = async (item, index) => {

        const Token = await AsyncStorage.getItem('loginToken');
        const user_id = await AsyncStorage.getItem('user_id');
        let res;

        res = await RemoveWhishList(item.SrNo);

        if (res.status) {
            let arr=[...data]
            console.log('this is att',arr);
            let objIndex = arr.findIndex(obj => obj.SrNo == item.SrNo);
            console.log('this is obj index',objIndex);
            arr[objIndex].is_exist = false
            setData(arr)


            // handleWishListProduct()

            // dispatch({
            //     type: 'User_ProductLists_Request',
            //     url: '/productTypeProducts',
            //     userId: user_id,
            //     userType: 'supplier',
            //     typeId: route.params.id,
            //     Token: Token,
            //     name: route.params.name,
            //     login_user_id: user_id,
            //     login_user_type: 'supplier',

            //     //   navigation,
            // });
        }
    };

    const RemoveWhishList = async (id, liked) => {
        setIsFetching(true);
        const user_id = await AsyncStorage.getItem('user_id');
        const Token = await AsyncStorage.getItem('loginToken');
        var myHeaders = new Headers();
        myHeaders.append('Olocker', `Bearer ${Token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        let response = fetch(
            `https://olocker.co/api/supplier/removeProductWishlist?productId=${id}&SupplierSrNo=${user_id}&userType=supplier`,
            requestOptions,
        )
            .then(response => response.text())
            .then(result => {
                setIsFetching(false);

                return JSON.parse(result);
            })
            .catch(error => {
                console.log('error', error);
                setIsFetching(false);
            });

        return response;
    };


    const addProductWishList = async item => {
        setIsFetching(true);
        const Token = await AsyncStorage.getItem('loginToken');
        const user_id = await AsyncStorage.getItem('user_id');
        var myHeaders = new Headers();
        myHeaders.append('Olocker', `Bearer ${Token}`);

        var formdata = new FormData();
        formdata.append('checkProduct', item);
        formdata.append('SupplierSrNo', user_id);
        formdata.append('userType', 'supplier');

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
        };

        let res = fetch(
            'https://olocker.co/api/supplier/addProductitemWishlist',
            requestOptions,
        )
            .then(response => response.text())
            .then(result => {
                setIsFetching(false);
                setLiked([...liked, item.SrNo]);
                return JSON.parse(result);
            })
            .catch(error => {
                console.log('error', error);
                setIsFetching(false);
            });

        return res;
    };

    const ProductDetalis = async item => {

        const user_id = await AsyncStorage.getItem('user_id');
        dispatch({
            type: 'product_detail_request',
            url: 'productDetails',
            productId: item.SrNo,
            supplierSrNo: user_id,
            userType:route.params.userType,
            navigation,
        });
    };


    return (
        <View style={{ flex: 1 }}>
            <Header
                source={require('../../../assets/L.png')}
                source1={require('../../../assets/Fo.png')}
                source2={require('../../../assets/Image/dil.png')}
                title={route?.params?.name}
                onPress={() => navigation.goBack()}
                onPress1={() => navigation.navigate('Message')}
                onPress2={() => navigation.navigate('FavDetails')}
            />
            {isFetching || isFetching1 || loader ? <Loader /> : null}
            <View>

                {/* {selector?.list? <View style={styles.main}>
                    <View>
                        <Text style={styles.text}>
                            {selector?.list?.length === 1
                                ? `${selector?.list?.length} Item`
                                : `${selector?.list?.length} Items`
                            }
                        </Text>
                    </View>
                </View>:null} */}
                {data ? <View style={styles.main}>
                    <View>
                        <Text style={styles.text}>
                            {data?.length === 1
                                ? `${data?.length} Item`
                                : `${data?.length} Items`
                            }
                        </Text>
                    </View>
                </View> : null}
                <View style={styles.card}>
                    <FlatList
                        // data={selector?.list}
                        ref={handleRef}
                        data={data}
                        numColumns={2}
                        onEndReachedThreshold={0.5}
                        style={{marginBottom:125}}
                        onEndReached={() => handleApiOnReachEnd()}
                //         ListHeaderComponent={()=>(
                //             <View style={styles.main}>
                //     <View>
                //         <Text style={styles.text}>
                //             {data?.length === 1
                //                 ? `${data?.length} Item`
                //                 : `${data?.length} Items`
                //             }
                //         </Text>
                //     </View>
                // </View> 
                //         )}
                        renderItem={({ item, index }) => (
                            <View style={styles.cardview}>

                                <View
                                    style={{
                                        height: hp('100%'),
                                        width: wp('45%'),
                                        maxHeight: hp('24%'),
                                        borderWidth: 0,
                                        borderColor: 'red',
                                    }}>
                                    <View
                                        style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View
                                            style={{ width: '18%' }}>
                                            {item.is_exist == false ? (
                                                <TouchableOpacity style={{ alignItems: 'center', alignSelf: 'center' }}
                                                    onPress={() => {
                                                        AddWishList(item, index)
                                                    }}>
                                                    <Image
                                                        style={{
                                                            width: 22, height: 19,
                                                            marginLeft: 5,
                                                            marginTop: 7,
                                                            tintColor: 'grey',
                                                        }}
                                                        source={require('../../../assets/Image/dil.png')}
                                                    />
                                                </TouchableOpacity>)
                                                : (<TouchableOpacity style={{ alignItems: 'center', alignSelf: 'center' }}
                                                    onPress={() => { RemoveWislist(item, index) }
                                                    }>
                                                    <Image
                                                        style={{
                                                            width: 22, height: 19,
                                                            marginLeft: 5,
                                                            marginTop: 7,
                                                            tintColor: 'red',
                                                        }}
                                                        source={require('../../../assets/Image/dil.png')}
                                                    />
                                                </TouchableOpacity>)
                                            }
                                        </View>
                                        <View
                                            style={{
                                                borderTopRightRadius: 10,
                                                borderBottomLeftRadius: 10,
                                                backgroundColor: '#24a31e',
                                                marginTop: Platform.OS == 'android' ? 0 : 0,
                                                height: hp('2.4%'),
                                                width: '45.5%',
                                            }}>
                                            <Text
                                                style={
                                                    styles.cardview2text
                                                }>{parseFloat(item.GrossWt)?.toFixed(2)}
                                                <Text style={
                                                    styles.cardview2text
                                                }> GM</Text>
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                        <TouchableOpacity onPress={() => share1(item)}>
                                            <Image
                                                style={{
                                                    height: hp('2%'),
                                                    width: wp('5.7%'),
                                                    marginTop: 10, marginLeft: 0

                                                }}
                                                source={require('../../../assets/Image/share1.png')}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                ProductDetalis(item)
                                            }}
                                            style={{
                                                height: hp('13.9%'),
                                                width: wp('38%'),

                                            }}>

                                            <Image
                                                style={{
                                                    width: win.width * 0.33,
                                                    height: '100%',
                                                    resizeMode: 'contain',
                                                    alignSelf: 'center',
                                                }}
                                                source={item.ImageName ? { uri: `${'https://olocker.co/uploads/product/'}${item.ImageName}` } :
                                                    require('../../../assets/logo.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        style={{
                                            height: hp('3%'),
                                            width: '100%',
                                            marginLeft: 35,
                                            marginTop: 5
                                        }}>
                                        <Text
                                            style={
                                                styles.cardbottomtext
                                            }>{`ID# ${item.ProductSku}`}</Text>
                                        <View style={styles.cardbottom1}>
                                            <Image
                                                style={{ width: 16, height: 20 }}
                                                source={require('../../../assets/Image/rupay.png')}
                                            />
                                            <Text style={styles.cardbottom1text}>
                                                {item?.ProductsPrice == null ? 0 : parseFloat(item.ProductsPrice)?.toFixed(2) ?? '0'}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>

        </View>
    )

}
export default ProductTypeListDetails;