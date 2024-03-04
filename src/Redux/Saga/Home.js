import {Alert, ToastAndroid, YellowBox} from 'react-native';
import {takeEvery, put, call} from 'redux-saga/effects';
import Api from '../Api';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parse} from 'react-native-svg';

//Login
function* bannerList(action) {
  try {
    const data = {};
    const response = yield call(Api.fetchDataByGET1, action.url, data);
    // console.log('thisi is user response', response);
    if (response.success) {
      yield put({
        type: 'Banner_List_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'Banner_List_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Banner_List_Error',
    });
  }
}

function* networkList(action) {
  try {
    const data = {
      userRole: 6,
      userId: 13,
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);

    if (response.success == true) {
      yield put({
        type: 'Network_List_Success',
        payload: response.data.networkretailer,
      });
    } else {
      yield put({
        type: 'Network_List_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Network_List_Error',
    });
    console.log('this is errro', console.log(error));
  }
}
function* productTypeList(action) {
  try {
    const data = {
      userid: action.userId,
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);

    if (response.status) {
      yield put({
        type: 'product_TypeList_Success',
        payload: response.data,
        session: response.current_session_id,
      });
    } else {
      yield put({
        type: 'product_TypeList_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'product_TypeList_Error',
    });
  }
}
function* SearchRetailerRequest(action) {
  try {
    console.log('called', action);
    const data = {
      userRole: action.role,
      userId: action.userId,
      stateId: action.state,
      cityId: action.city,
      retailerName: action.Rname,
      start: action.start,
      length: action.length,
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);
    console.log('this is response', JSON.stringify(response));
    if (response.status) {
      console.log('this is search response');
      yield put({
        type: 'Search_Retailer_Success',
        payload: response.data,
        data2: {
          city: action.city,
          state: action.state,
          role: action.role,
          RRname: action.Rname,
          userId: action.userId,
          start: action.start,
          length: action.length,
        },
      });

      action.navigation.navigate('myNetworkBtn', {data: 'List'});
    } else {
      yield put({
        type: 'Search_Retailer_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Search_Retailer_Error',
    });
    console.log(error);
  }
}
function* SearchMynetworkRequest(action) {
  try {
    const data = {
      userRole: action.role,
      userId: action.userId,
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);

    if (response.status) {
      yield put({
        type: 'Search_MyNetwork_Success',
        payload: response.data.networkretailer,
      });
    } else {
      yield put({
        type: 'Search_MyNetwork_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Search_MyNetwork_Error',
    });
  }
}
function* retailerRequestList(action) {
  try {
    const data = {
      userRole: action.role,
      userId: action.userId,
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);

    if (response.status) {
      yield put({
        type: 'Retailer_RequestList_Success',
        payload: response.data.retailer,
      });
    } else {
      yield put({
        type: 'Retailer_RequestList_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Retailer_RequestList_Error',
    });
  }
}
function* InviteRetailerList(action) {
  try {
    const data = {
      userRole: action.role,
      userId: action.userId,
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);

    if (response.status) {
      yield put({
        type: 'Invite_RetailerList_Success',
        payload: response.data.inviteRetailer,
      });
    } else {
      yield put({
        type: 'Invite_RetailerList_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Invite_RetailerList_Error',
    });
  }
}
function* getWishList(action) {
  try {
    const data = {
      userId: action.userId,
      userType: 'supplier',
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);

    if (response.status) {
      yield put({
        type: 'getWishList_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'getWishList_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'getWishList_Error',
    });
  }
}

function* AddproductWishList(action) {
  // console.log( '==;.>...>>>>>>>>>>>>>',action.checkProduct, action.SupplierSrNo);
  try {
    const data = {
      checkProduct: action.checkProduct,
      SupplierSrNo: action.SupplierSrNo,
      userType: 'supplier',
    };
    const response = yield call(Api.fetchDataByGET3, action.url, data);

    if (response.status) {
      yield put({
        type: 'AddWishList_Success',
        payload: response,
      });
    } else {
      yield put({
        type: 'AddWishList_Error',
      });
    }
  } catch (err) {
    yield put({
      type: 'AddWishList_Error',
    });
  }
}
function* AddnetworkToPatner(action) {
  try {
    const response = yield call(Api.AddPatnerToNetwork, action);

    if (response.status) {
      yield put({
        type: 'Addnetwork_toPatner_Success',
        payload: response.msg,
      });
    } else {
      yield put({
        type: 'Addnetwork_toPatner_Error',
      });
    }
  } catch (err) {
    console.log('=>>>>>>>>..error', err);
    yield put({
      type: 'Addnetwork_toPatner_Error',
    });
  }
}
function* RemovePatner(action) {
  console.log('=........>>>>>>>>>>>>>>>>>', action);
  const data = {
    id: action.Id,
  };
  try {
    const response = yield call(Api.fetchDataByGET1, action.url, data);
    console.log(response, '=>>>>>>>>>>>>>>>>>>>>>>');
    if (response.status) {
      yield put({
        type: 'RemovePatner_Success',
        payload: response.msg,
      });
    } else {
      yield put({
        type: 'RemovePatner_Error',
      });
    }
  } catch (err) {
    console.log('=>>>>>>>>..error', err);
    yield put({
      type: 'RemovePatner_Error',
    });
  }
}

function*getPartnerDetail(action){
  console.log('partneer deatail action.....',action);

  try {

    const data = {
            partnerId: action.partnerId,
          };

          const response = yield call(Api.fetchDataByGET1, action.url, data);  
    console.log('resonse data ,,,,4444',response);
if(response.status==true){
 
  yield put({
            type: 'get_networkretailerdetail_Success',
            payload: response.data,
          });
          action.navigation.navigate('PatnerProfile');
}


  } catch (error) {
    console.log('thisi s partner detail error', error);
        yield put({
          type: 'get_networkretailerdetail_error',
        });
  }
}







// function* getPartner(action) {
//   console.log('virendra,,',action);
//   try {
//     const data = {
//       partnerId: action.partnerId,
//     };

//     const response = yield call(Api.fetchDataByGET1, action.url, data);
//     // const response = yield call(Api.fetchDataByGET1, action.url, data);
//    console.log('rfghjh',response);
// // if(response.status==true){
// //   console.log('response data ......',response.data);
// // }


//     // if (response.status==true || response.success ==true) {
//     //   yield put({
//     //     type: 'get_network_retailer_detail_success',
//     //     payload: response,
//     //   });
//     //   // action.navigation.navigate('PatnerProfile');
//     // } else {
//     //   yield put({
//     //     type: 'get_network_retailer_detail_error',
//     //   });
//     // }
//     Toast.show(response?.msg);
//   } catch (error) {
//     console.log('thisi s partner detail error', error);
//     yield put({
//       type: 'get_network_retailer_detail_error',
//     });
//    }
// }

export default function* homeSaga() {
  yield takeEvery('Banner_List_Request', bannerList);
  yield takeEvery('Network_List_Request', networkList);
  yield takeEvery('Search_Retailer_Request', SearchRetailerRequest);
  yield takeEvery('Search_MyNetwork_Request', SearchMynetworkRequest);
  yield takeEvery('Retailer_RequestList', retailerRequestList);
  yield takeEvery('Invite_RetailerList', InviteRetailerList);
  yield takeEvery('getWishList_request', getWishList);
  yield takeEvery('Addpruduct_WishList', AddproductWishList);
  yield takeEvery('product_TypeList_Request', productTypeList);
  yield takeEvery('Addnetwork_toPatner_Request', AddnetworkToPatner);
  yield takeEvery('RemovePatner_Request', RemovePatner);
yield takeEvery('get_networkretailerdetail_request',getPartnerDetail);

  // yield takeEvery('get_network_retailer_detail_request', getPartner);
}
