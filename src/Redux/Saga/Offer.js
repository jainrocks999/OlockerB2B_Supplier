import {Alert, ToastAndroid, YellowBox} from 'react-native';
import {takeEvery, put, call} from 'redux-saga/effects';
import Api from '../Api';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parse} from 'react-native-svg';
import { act } from 'react-test-renderer';

//Login
function* offerList(action) {
  try {
    const data = {
      userid: action.userid,
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);
    //  console.log('this is user response', JSON.stringify(response));

    if (response.status || response.success) {
      yield put({
        type: 'Template_Detail_Success',
        payload: response.data,
      });
      if (action.page != 'home') action.navigation.navigate('OfferTemplate');
    } else {
      yield put({
        type: 'Template_Detail_Error',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: 'Template_Detail_Error',
    });
  }
}

function* offerTempList(action) {
  try {
    const data = {
      userid: action.userid,
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);
    // // console.log('this is user response',response);
    if (response.status) {
      yield put({
        type: 'Add_Offer_Success',
        payload: response.data,
      });
      action.navigation.navigate('AddOffer');
    } else {
      yield put({
        type: 'Add_Offer_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Add_Offer_Error',
    });
  }
}

function* offerListData(action) {
  try {
    // console.log('thi si calledd');
    const data = {
      SupplierSrNo: action.userid,
      start: 0,
      length: 80,
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);
   
    if (response.status) {
      yield put({
        type: 'Offer_List_Success',
        payload: response.data,
      });
      if (action.page == 'add') {
        action.navigation.pop(1);
      } else if (action.page == 'delete') {
      } else {
        action?.navigation?.navigate('OfferList');
      }
    } else {
      yield put({
        type: 'Offer_List_Error',
      });
    }
  } catch (error) {
    console.log('this is error', error);
    yield put({
      type: 'Offer_List_Error',
    });
  }
}
function* offerTypeList(action) {
  try {
    const res = yield call(Api.fetchDataByGET1, action.url, action.data);
    if (res.status) {
      yield put({
        type: 'get_offer_type_list_success',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'get_offer_type_list_error',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: 'get_offer_type_list_error',
    });
  }
}

function* offerprodutlist(action){
  try {
    const data = {
      userId: action.userId,
        start: action.start,
       limit: action.limit,
      };
 
  const res = yield call(Api.fetchDataByGET1, action.url, data);
  console.log('response data ,,,,,,,',res.data);
 

  if (res.status==true) {
           yield put({
             type: 'Get_OfferProductList_Success',
             payload: res.data,
           });
    
           console.log('response ...offerupadate ...',res.data.products);
           yield put({
             type: 'offfer_product_modal',
            modal: action.modal,
           });
         } else {
           yield put({
             type: 'Get_OfferProductList_Error',
           });
         }
  
  } catch (error) {
    console.log('error //////////.........',error);
    yield put({
            type: 'Get_OfferProductList_Error',
           });
           Toast.show('Something went wrong');
  }
  
  }











// function* getOfferProductList12(action) {
//   try {
//     console.log('this is product',action);
//     const data = {
//       userId: action.userId,
//       start: action.start,
//       limit: action.limit,
//     };
//     const res = yield call(Api.fetchDataByGET1, action.url, data);

//     if (res.status==true) {
//       yield put({
//         type: 'get_OfferProductList_success',
//         payload: res.data,
//       });

//       console.log('response ...offerupadate ...',res.data.products);
//       yield put({
//         type: 'offfer_product_modal',
//         modal: action.modal,
//       });
//     } else {
//       yield put({
//         type: 'get_OfferProductList_error',
//       });
//     }
//     Toast.show(res.msg);
//   } catch (error) {
//     console.log('this is erro', error);
//     yield put({
//       type: 'get_OfferProductList_error',
//     });
//     Toast.show('Something went wrong');
//   }
// }
function* createOffer(action) {
  const id = yield AsyncStorage.getItem('user_id');
  console.log(action);
  try {
    const res = yield call(Api.fetchDataByPOST, action.url, action.data);
    if (res.status) {
      yield put({
        type: 'createOffer_success',
      });
      yield put({
        type: 'Offer_List_Request',
        url: '/getOfferList',
        userid: id,
        navigation: action.navigation,
        page: 'add',
      });
    } else {
      yield put({
        type: 'createOffer_error',
      });
    }
    Toast.show(res.msg);
  } catch (error) {
    yield put({
      type: 'createOffer_error',
    });
    console.log(error);
  }
}
function* removeOffer(action) {
  const id = yield AsyncStorage.getItem('user_id');
  try {
    const data = {
      offerId: action.offerId,
    };
    const res = yield call(Api.fetchDataByGET1, action.url, data);
    if (res.status) {
      yield put({
        type: 'remove_offer_list_success',
      });
      yield put({
        type: 'Offer_List_Request',
        url: '/getOfferList',
        userid: id,
        navigation: action?.navigation,
        page: action.page,
      });
    } else {
      yield put({
        type: 'remove_offer_list_error',
      });
    }
    Toast.show(res.msg);
  } catch (error) {
    yield put({
      type: 'remove_offer_list_error',
    });
    console.log(error);
  }
}
function* getOfferDetails(action) {
  console.log('offer list as s s as s  s as',action);
  try {
    const data = {
      userId: action.userId,
      offerId: action.offerId,
    };
    const res = yield call(Api.fetchDataByGET1, action.url, data);
  
    if (res.status) {
      yield put({
        type: 'offer_details_success',
        payload: res.data,
      });
     
      if (action.op == 'edit') {
        yield put({
          type: 'offer_edit_modal_open',
          payload1: true,
          payload2: false,
        });
        action.navigation.navigate('AddOffer', {isEdit: false});
      } else {
      
         
        yield put({
          type: 'offer_edit_modal_open',
          payload2: action.some,
          payload1: false,
        });
        console.log('responsessss..........viewfggdfdgfdgd',res.data);
        // action.navigation.navigate('AddOffer', {isEdit: true});
        // action.navigation.navigate('OfferDetails');
      }
    } else {
      yield put({
        type: 'offer_details_error',
      });
      Toast.show('something went wrong');
    }
  } catch (err) {
    yield put({
      type: 'offer_details_error',
    });
    Toast.show('Something went wrong');
    console.log('this is error ............',err);
  }
}
function* addPorudctOffer(action) {
  try {
    const user_id = yield AsyncStorage.getItem('user_id');
    console.log('this is action', JSON.stringify(action.data));
    const res = yield call(Api.fetchDataByPOST, action.url, action.data);

    if (res.status) {
      yield put({
        type: 'add_product_offer_success',
      });
      yield put({
        type: 'Offer_List_Request',
        url: '/getOfferList',
        userid: user_id,
        navigation: action?.navigation,
        page: 'pta nhi',
      });
      yield put({
        type: 'offfer_product_modal',
        modal: false,
      });
    } else {
      yield put({
        type: 'add_product_offer_error',
      });
    }
  } catch (error) {
    yield put({
      type: 'add_product_offer_error',
    });
    console.log('this is error', error);
  }
}



export default function* citySaga() {
  yield takeEvery('Template_Detail_Request', offerList);
  yield takeEvery('Add_Offer_Request', offerTempList);
  yield takeEvery('Offer_List_Request', offerListData);
  yield takeEvery('get_offer_type_list_request', offerTypeList);
  
yield takeEvery('Get_OfferProductList_Request',offerprodutlist);

  // yield takeEvery('get_OfferProductList_request', getOfferProductList12);
  yield takeEvery('createOffer_request', createOffer);
  yield takeEvery('remove_offer_list_request', removeOffer);
  yield takeEvery('offer_details_request', getOfferDetails);
  yield takeEvery('add_product_offer_request', addPorudctOffer);
}
