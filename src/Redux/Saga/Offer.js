import { ToastAndroid, YellowBox } from 'react-native';
import { takeEvery, put, call } from 'redux-saga/effects';
import Api from '../Api';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse } from 'react-native-svg';

//Login
function* offerList(action) {
    try {
      const data={
        userid:action.userid
      }
      const response = yield call(Api.fetchDataByGET1,action.url,data);
  // // console.log('this is user response',response.status);

      if (response.status == 'success') {
        yield put({
          type: 'Template_Detail_Success',
          payload: response.data,
        });
          action.navigation.navigate('OfferTemplate')
      } else {
        yield put({
          type: 'Template_Detail_Error',
        });
      }
    } catch (error) {
      // console.log(error);
      yield put({
        type: 'Template_Detail_Error',
      });
    }
  }

  function* offerTempList(action) {
    try {
      const data={
        userid:action.userid
      }
      const response = yield call(Api.fetchDataByGET1,action.url,data);
     // // console.log('this is user response',response);
      if (response.status == 'success') {
        yield put({
          type: 'Add_Offer_Success',
          payload: response.data,
        });
          action.navigation.navigate('AddOffer')
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
      const data={
        userid:action.userid
      }
      const response = yield call(Api.fetchDataByGET1,action.url,data);
   //   // console.log('this is user response',response);
      if (response.status == 'success') {
        yield put({
          type: 'Offer_List_Success',
          payload: response.data,
        });
          action.navigation.navigate('OfferList')
      } else {
        yield put({
          type: 'Offer_List_Error',
        });
      }
    } catch (error) {
      yield put({
        type: 'Offer_List_Error',
      });
    }
  }

export default function* citySaga() {
    yield takeEvery('Template_Detail_Request',offerList)
    yield takeEvery('Add_Offer_Request',offerTempList)
    yield takeEvery('Offer_List_Request',offerListData)
  }
  