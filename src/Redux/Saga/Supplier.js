import {ToastAndroid, YellowBox} from 'react-native';
import {takeEvery, put, call} from 'redux-saga/effects';
import Api from '../Api';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parse} from 'react-native-svg';

function* SupportProfileRequest(action) {
  try {
    const data = {
      userId: '10',
      usertype: 'supplier',
      role: '6',
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);
    //  // console.log('this is user response',response);
    if (response.status == true) {
      yield put({
        type: 'Supplier_Profile_Success',
        payload: response,
      });
    } else {
      yield put({
        type: 'Supplier_Profile_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Supplier_Profile_Error',
    });
  }
}

function* addRetailer(action) {
  try {
    console.log('thisis callled', JSON.stringify(action));
    let data = new FormData();
    data.append('RetailerName', action.RetailerName);
    data.append('Location', action.Location);
    data.append('CategoryType', action.CategoryType);
    data.append('ContactPersonFirstName', action.ContactPersonFirstName);
    data.append('ContactPersonLastName', action.ContactPersonLastName);
    data.append('ContactNumber', action.ContactNumber);
    data.append('EmailId', action.EmailId);
    data.append('userId', action.userId);
    const res = yield call(Api.fetchDataByPOST, action.url, data);
    if (res.status) {
      yield put({
        type: 'Invite_retailert_Success',
        payload: action.status,
      });
      Toast.show(res.msg);
    }
  } catch (err) {
    console.log('this is errpr', err);
    yield put({
      type: 'Invite_retailert_Error',
    });
  }
}
function* assiGnData(action) {
  try {
    const res = yield call(Api.fetchDataByPOST, action.url, action.data);
    console.log('this is called');
    if (res.status) {
      yield put({
        type: 'update_status_&_assign_success',
        payload: action.AssiGnModal,
      });
      {
        /*{"RRname": "", "city": "", "role": "6", "state": "1645"} */
      }
      yield put({
        type: 'Search_Retailer_Request',
        url: '/searchRetailer',
        userId: action.data2.userId,
        role: action.data2.role,
        city: action.data2.city,
        state: action.data2.state,
        Rname: action.data2.RRname,
        start: action.data2.start,
        length: action.data2.length,
        navigation: '',
      });
      Toast.show(res.msg);
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: 'update_status_&_assign_error',
    });
  }
}
function* addtoNetwork(action) {
  try {
    let data = new FormData();
    data.append('userId', action.userId);
    data.append('id', action.id);
    const res = yield call(Api.fetchDataByPOST, action.url, data);
    if (res.status) {
      yield put({
        type: 'add_partner_to_network_success',
      });
      // console.log(action.data2)
      yield put({
        type: 'Search_Retailer_Request',
        url: '/searchRetailer',
        userId: action.data2.userId,
        role: action.data2.role,
        city: action.data2.city,
        state: action.data2.state,
        Rname: action.data2.RRname,
        start: action.data2.start,
        length: action.data2.length,
        navigation: '',
      });
      Toast.show(res.msg);
    } else {
      Toast.show('Something went wrong1');
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: 'add_partner_to_network_error',
    });
    Toast.show('Something went wrong2');
  }
}
function* removeSuppliertest(action) {
  try {
    const data = {
      PartnerSrNo: action.PartnerSrNo,
      SupplierSrNo: action.SupplierSrNo,
    };
    const res = yield call(Api.fetchDataByGET1, action.url, data);
  } catch (error) {
    console.log(error);
  }
}
export default function* supplierSaga() {
  yield takeEvery('Supplier_Profile_Request', SupportProfileRequest);
  yield takeEvery('Invite_retailert_Request', addRetailer);
  yield takeEvery('update_status_&_assign_request', assiGnData);
  yield takeEvery('add_partner_to_network_request', addtoNetwork);
  yield takeEvery('remove_retailer_from_network', removeSuppliertest);
}
