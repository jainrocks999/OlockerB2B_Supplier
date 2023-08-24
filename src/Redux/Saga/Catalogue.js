import { ToastAndroid, YellowBox } from 'react-native';
import { takeEvery, put, call, take } from 'redux-saga/effects';
import Api from '../Api';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse } from 'react-native-svg';

function* getCatalogue(action) {
    try {
      const data={
        userid:action.user_id
      }
      const response = yield call(
        Api.fetchDataByGET1,
        action.url,
        data
      );
      if (response.collection) {
        yield put({
          type: 'Get_Catalogue_Success',
          payload: response.collection,
        });
        action.navigation.navigate('MyCatalogue')
        // action.navigation.navigate('MyCatalogueCopy')
      } else {
        yield put({
          type: 'Get_Catalogue_Error',
        });
      }
    } catch (error) {
      yield put({
        type: 'Get_Catalogue_Error',
      });
    }
  }

  function* getProducts(action) {

console.log(action);
    try {
      const data={
        userid:action.user_id,
        start:action.start,
        length:action.length,
        search:action.search
      }
      const response = yield call(
        Api.fetchDataByGET1,
        action.url,
        data
      );
      if (response) {
        yield put({
          type: 'My_Product_Success',
          payload: response,
        });
        // action.navigation.navigate('MyCatalogue')
        action.navigation.navigate('MyCatalogueCopy')
      } else {
        yield put({
          type: 'My_Product_Error',
        });
      }
    } catch (error) {
      yield put({
        type: 'My_Product_Error',
      });
    }
  }

  function* getCollectionDetails(action) {
    try {
      const data={
       
        SrNo:action.collectionSrNo
      }
      const response = yield call(
        Api.fetchDataByGET1,
        action.url,
        data
      );
      if (response.status=='success') {
        yield put({
          type: 'Collection_Detail_Success',
          payload: response.data,
        });
        // action.navigation.navigate('MyCatalogue')
        action.navigation.navigate('MyCatalogueDetaill')
      } else {
        yield put({
          type: 'Collection_Detail_Error',
        });
      }
    } catch (error) {
      yield put({
        type: 'Collection_Detail_Error',
      });
    }
  }

  function* getSelfProductList(action) {
    try {
      const data={
        search_key: action.search_key,
        fromPrice:action.fromPrice,
        toPrice:action.toPrice,
        minWeight:action.minWeight,
        maxWeight:action.minWeight,
        SupplierId:action.SupplierId,
        userCollectionType:action.userCollectionType,
        start:action.start,
        limit:action.limit,
      }
      const response = yield call(
        Api.fetchDataByGET1,
        action.url,
        data
      );
      console.log('this is user response',response);
      if (response.status=='success') {
        yield put({
          type: 'Self_Product_Success',
          payload: response.data,
        });
      
        action.navigation.navigate('Addproduct')
      } else {
        yield put({
          type: 'Self_Product_Error',
        });
      }
    } catch (error) {
      yield put({
        type: 'Self_Product_Error',
      });
      console.log('this is error methood',error);
    }
  }

  function* getOlockerProductList(action) {
    try {
      const data={
        search_key: action.search_key,
        fromPrice:action.fromPrice,
        toPrice:action.toPrice,
        minWeight:action.minWeight,
        maxWeight:action.minWeight,
        SupplierId:action.SupplierId,
        userCollectionType:action.userCollectionType,
        start:action.start,
        limit:action.limit,
      }
      const response = yield call(
        Api.fetchDataByGET1,
        action.url,
        data
      );
      console.log('this is user response',response);
      if (response.status=='success') {
        yield put({
          type: 'Olocker_Product_Success',
          payload: response.data,
        });
        action.navigation.navigate('Addproduct')
      } else {
        yield put({
          type: 'Olocker_Product_Error',
        });
      }
    } catch (error) {
      yield put({
        type: 'Olocker_Product_Error',
      });
      console.log('this is error methood',error);
    }
  }

export default function* citySaga() {
    yield takeEvery('Get_Catalogue_Request',getCatalogue)
    yield takeEvery('My_Product_Request',getProducts)
    yield takeEvery('Collection_Detail_Request',getCollectionDetails)
    yield takeEvery('Self_Product_Request',getSelfProductList)
    yield takeEvery('Olocker_Product_Request',getOlockerProductList)
  }
  
  