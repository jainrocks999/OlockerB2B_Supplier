import {ToastAndroid, YellowBox} from 'react-native';
import {takeEvery, put, call} from 'redux-saga/effects';
import Api from '../Api';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parse} from 'react-native-svg';


function* SupportProfileRequest(action) {
  console.log('supplier action,,,ds,',action);
  try {
    const data = {
      userId: action.userId,
      usertype: 'supplier',
     userRole:'6',
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);
   console.log('this is action respomse',JSON.stringify(response));
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
    console.log('this is error', error);
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
    console.log('search retailer ,,,,,,,',action);
    const res = yield call(Api.fetchDataByPOST, action.url, action.data);
   
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
        navigation: action.navigation,
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
  console.log('acction kmklfgmlkfgm,,,,,',action);
  try {
    let data = new FormData();
    data.append('userId', action.userId);
    data.append('id', action.id);
    const res = yield call(Api.fetchDataByPOST, action.url, data);
    if (res.status) {
      yield put({
        type: 'add_partner_to_network_success',
      });

       yield put({
      
          type: 'get_networkretailerdetail_request',
          partnerId: action.id,
          supplierId:action.userId,
          url: 'getNetworkRetailerDeatils',
          navigation:action.navigation,
      
       })
           

      // console.log(action.data2)
      // yield put({
      //   type: 'Search_Retailer_Request',
      //   url: '/searchRetailer',
      //   userId: action.data2.userId,
      //   role: action.data2.role,
      //   city: action.data2.city,
      //   state: action.data2.state,
      //   Rname: action.data2.RRname,
      //   start: action.data2.start,
      //   length: action.data2.length,
      //   navigation: action.navigation,
      // });
       Toast.show(res.msg);
    } else {
      Toast.show('Something went wrong');
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: 'add_partner_to_network_error',
    });
    Toast.show('Something went wrong');
  }
}
function* removeSuppliertest(action) {
  try {
    const data = {
      partner_id: action.partner_id,
      supplier_id:action.SupplierSrNo
    };
    const res = yield call(Api.fetchDataByGET1, action.url, data);
console.log('response ..... dtata',res);
if(res.status==true){
  yield put({
    type: 'remove_retailerfromnetwork_Success',
  });

  yield put({
      
    type: 'get_networkretailerdetail_request',
    partnerId: action.partner_id,
    supplierId:action.user,
    url: 'getNetworkRetailerDeatils',
    navigation:action.navigation,

 });
 yield put({
 
    type: 'Network_List_Request',
    url: '/getNetworkRetailer',
    userId: action.user,
    userRole: 6,
 
 
    type: 'Get_delete_Success',
    payload: undefined

 })     


// if(action.reatailer==true){
//   yield put({
//     type: 'Search_Retailer_Request',
//     url: '/searchRetailer',
//     userId: action.data2.userId,
//     role: action.data2.role,
//     city: action.data2.city,
//     state: action.data2.state,
//     Rname: action.data2.RRname,
//     start: action.data2.start,
//     length: action.data2.length,
//     navigation: action.navigation,
//   });}
//   else{
//     yield put({
//       type: 'Retailer_RequestList',
//       url: '/getReatilerRequest',
//       userId:action.userId,
//      userRole:'6',
//     });
    
//   }
  Toast.show(res?.msg)
}
else{
  yield put({
    type: 'remove_retailerfromnetwork_Error',
  });
}


  } catch (error) {
    yield put({
      type: 'remove_retailerfromnetwork_Error',
    });
    console.log(error);
  }
}
function* ChangePass(action){
  try {
    data={
      userid:action.userid,
      oldpass: action.oldpass,
      newPassword:action.newPassword,
      cnPass:action.cnPass,
    }
    const res = yield call(Api.fetchDataByGET1, action.url, data);
    if(res.status==true){
      yield put({
        type: 'Get_changePassword_Success',
        payload:res,
      });
      console.log(res);
      Toast.show(res.msg)
      // yield put({
      
      //     type: 'Supplier_Profile_Request',
      //     url: '/editProfile',
      //     userId:action.userid,
      //     userType: 'supplier',
      //     role: 6,
       
      // })
       action.navigation.navigate('Customers')
    }else{
      yield put({
        type: 'Get_changePassword_Error',
       
      });
      Toast.show(res?.msg)
    }
    console.log('resaponse change password,,,',res);
  } catch (error) {
    yield put({
      type: 'Get_changePassword_Error',
     
    });
  }

}
export default function* supplierSaga() {
  yield takeEvery('Supplier_Profile_Request', SupportProfileRequest);
  yield takeEvery('Invite_retailert_Request', addRetailer);
  yield takeEvery('update_status_&_assign_request', assiGnData);
  yield takeEvery('add_partner_to_network_request', addtoNetwork);
  yield takeEvery('remove_retailerfromnetwork_Request', removeSuppliertest);
  yield takeEvery('Get_changePassword_Request',ChangePass)
}
