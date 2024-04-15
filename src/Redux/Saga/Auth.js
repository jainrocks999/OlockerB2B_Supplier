import {ToastAndroid, YellowBox} from 'react-native';
import {takeEvery, put, call} from 'redux-saga/effects';
import Api from '../Api';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parse} from 'react-native-svg';

//Login
function* doLogin(action) {
  // // console.log(action);
  // try {
  //   const params = new URLSearchParams();
  //   params.append('email', 'issuenotfound.404+1@gmail.com');
  //   params.append('password', '123456');
  //   const response = yield call(Api.fetchDataByPOST, action.url, params);
  //   if (!response) {
  //     Toast.show('Please enter  Valid user id & password   ');
  //   } else if (response.status == true) {
  //     yield put({
  //       type: 'User_Login_Success',
  //       payload: response,
  //     });
  //     AsyncStorage.setItem('loginToken', response.token);
  //     AsyncStorage.setItem('user_id', response.userDetail.SrNo);
  //     action.navigation.replace('Home');
  //     Toast.show(response.message);
  //   } else {
  //     yield put({
  //       type: 'User_Login_Error',
  //     });
  //     Toast.show(response.message);
  //   }
  // } catch (error) {
  //   // console.log('error223', error);
  //   yield put({
  //     type: 'User_Login_Error',
  //   });
  // }
}
// WishList Request

function* WishListRequest(action) {
  // // console.log('this is action detail', action.user_id);
  try {
    const data = {
      userId: action.user_id,
      userType: 'supplier',
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);
    console.log('this siss response', response);
    if (response.status == true) {
      yield put({
        type: 'Get_wishListProduct_Success',
        payload: response,
      });
      action.navigation.navigate('FavDetails');

      // action.navigation.navigate('MyNetwork1', { screen: 'MyNetwork' })
    } else {
      yield put({
        type: 'Get_wishListProduct_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Get_wishListProduct_Error',
    });
    console.log('this is error rrr', error);
  }
}

function* SupportProfileRequest(action) {
  try {
    const data = {
      userId: '10',
      usertype: 'supplier',
     userRole:'6',
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);
    // console.log('this is user response', response);
    if (response.status == true) {
      yield put({
        type: 'Supplier_Profile_Success',
        payload: response,
      });
      // action.navigation.navigate('FavDetails')
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

function* stateList(action) {
  try {
    const response = yield call(Api.fetchDataByGET1, action.url);
    if (response.status == true) {
      yield put({
        type: 'State_List_Success',
        payload: response,
      });
    } else {
      yield put({
        type: 'State_List_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'State_List_Error',
    });
  }
}

function* cityList(action) {
  try {
    const data = {
      stateId: action.stateId,
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);
    if (response.status == true) {
      yield put({
        type: 'City_List_Success',
        payload: response,
      });
    } else {
      yield put({
        type: 'City_List_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'City_List_Error',
    });
  }
}

function* getCollection(action) {
  try {
    const data = {
      partnerId: action.partnerId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_collection_Success',
        payload: response.collection,
      });
    } else {
      yield put({
        type: 'User_collection_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_collection_Error',
    });
  }
}
// Gold price
function* getGold(action) {
  try {
    const data = {
      partnerId: action.partnerId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_Gold_Success',
        payload: response,
      });
    } else {
      yield put({
        type: 'User_Gold_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_collection_Error',
    });
  }
}
// Supplier List
function* SupplierList(action) {
  try {
    const data = {
      partnerId: action.partnerId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_SupplierList_Success',
        payload: response,
      });
    } else {
      yield put({
        type: 'User_SupplierList_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_SupplierList_Error',
    });
  }
}
// my Product list
function* ProductList(action) {
  try {
    const data = {
      userId: action.userId,
      userType: action.userType,
      typeId: action.typeId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_ProductList_Success',
        payload: response,
      });
      action.navigation.navigate('MyProductDetails', {
        name: action.name,
        ProductL: true,
      });
    } else {
      yield put({
        type: 'User_ProductList_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_ProductList_Error',
    });
  }
}
//SupplierProductList

function* SupplierProductList(action) {
  try {
    const data = {
      userId: action.userId,
      userType: action.userType,
      typeId: action.typeId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_SupplierProductList_Success',
        payload: response,
      });
      action.navigation.navigate('MyProductDetails', {
        name: action.name,
        ProductL: false,
      });
    } else {
      yield put({
        type: 'User_SupplierProductList_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_SupplierProductList_Error',
    });
  }
}

//Supplier Categories

function* SupplierCategories(action) {
  // console.log('data ,,,actoin', action);
  try {
    // const data = {
    //   userId: action.userId,
    //   userType: action.userType,
    // };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      // data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_SupplierCategories_Success',
        payload: response.categories,
      });

      // AsyncStorage.setItem('ImagePath', response.imagepath);
    } else {
      yield put({
        type: 'User_SupplierCategories_Error',
      });
    }
  } catch (error) {
    // console.log('why this ,, errow ', error);
    yield put({
      type: 'User_SupplierCategories_Error',
    });
  }
}

// My Product Categories
function* ProductCategories(action) {
  // console.log('data ,,,actoin', action);
  try {
    const data = {
      userId: action.userId,
      userType: action.userType,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_categories_Success',
        payload: response,
      });

      // AsyncStorage.setItem('ImagePath', response.imagepath);
    } else {
      yield put({
        type: 'User_categories_Error',
      });
    }
  } catch (error) {
    // console.log('why this ,, errow ', error);
    yield put({
      type: 'User_categories_Error',
    });
  }
}

// my Product Details
function* ProductDetails(action) {
  try {
    const data = {
      userId: action.userId,
      userType: action.userType,
      productId: action.productId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_singleProductDetail_Success',
        payload: response,
      });
      action.navigation.navigate('SubCategory', {
        name: action.name,
        Details: true,
      });
    } else {
      yield put({
        type: 'User_singleProductDetail_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_singleProductDetail_Error',
    });
  }
}

//SupplierProductDetails
function* SupplierProductDetails(action) {
  try {
    const data = {
      userId: action.userId,
      userType: action.userType,
      productId: action.productId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_SupplierProDetail_Success',
        payload: response,
      });
      action.navigation.navigate('SubCategory', {
        name: action.name,
        Details: false,
      });
    } else {
      yield put({
        type: 'User_SupplierProDetail_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_SupplierProDetail_Error',
    });
  }
}

// State List
function* StateList(action) {
  try {
    const data = {};
    const response = yield call(Api.fetchDataByGET1, action.url, action.Token);
    if (response.status == true) {
      yield put({
        type: 'Get_State_Success',
        payload: response,
      });
      action.navigation.navigate('MyNetwork1', {screen: 'MyNetwork'});
    } else {
      yield put({
        type: 'Get_State_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Get_State_Error',
    });
  }
}
// Pending Request
function* pendinRequest(action) {
  // console.log('fufseoufasiofsdoif', action);
  try {
    const data = {
      partnerId: action.partnerId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'Get_Pending_Success',
        payload: response,
      });

      action.navigation.navigate('PendingRequest');
    } else {
      yield put({
        type: 'Get_Pending_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Get_Pending_Error',
    });
  }
}

// sent Request
function* SentRequest(action) {
  // console.log('fufseoufasiofsdoif', action);
  try {
    const data = {
      partnerId: action.partnerId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'Get_Sent_Success',
        payload: response,
      });

      action.navigation.navigate('SentRequest');
    } else {
      yield put({
        type: 'Get_Sent_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Get_Sent_Error',
    });
  }
}

// Acecpt Reequest
function* AcecptRequest(action) {
  // console.log('fufseoufasiofsdoif', action);
  try {
    let data = new FormData();
    data.append('partnerId', action.partnerId);
    data.append('sp_networkId', action.sp_networkId);
    data.append('statusId', action.statusId);
    data.append('rejectReason', action.rejectReason);
    const response = yield call(
      Api.fetchDataByGET3,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'Get_/updateSupplierRequest_Success',
        payload: response,
      });

      //  action.navigation.navigate('SentRequest');
    } else {
      yield put({
        type: 'Get_/updateSupplierRequest_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Get_/updateSupplierRequest_Error',
    });
  }
}

// Reject Reequest
function* RejectRequest(action) {
  try {
    let data = new FormData();
    data.append('partnerId', action.partnerId);
    data.append('sp_networkId', action.sp_networkId);
    data.append('statusId', action.statusId);
    data.append('rejectReason', action.rejectReason);
    // const data = {
    //   partnerId: action.partnerId,
    //   sp_networkId: action.sp_networkId,
    //   statusId: action.statusId,
    // };
    const response = yield call(
      Api.fetchDataByGET3,
      action.url,
      action.Token,
      data,
    );
    // console.log('data reject appp log .....', response);
    if (response.status == true) {
      yield put({
        type: 'Get_/updateSupplierRequest1_Success',
        payload: response,
      });

      //  action.navigation.navigate('SentRequest');
    } else {
      yield put({
        type: 'Get_/updateSupplierRequest1_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Get_/updateSupplierRequest1_Error',
    });
  }
}
// Supplier Details
function* SupplierDetail(action) {
  // console.log('fufseoufasiofsdoif', action);
  try {
    const data = {
      supplierId: action.supplierId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_supplierDetail_Success',
        payload: response,
      });

      action.navigation.navigate('MyNetwork1', {screen: 'PartnerProfile'});
    } else {
      yield put({
        type: 'User_supplierDetail_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_supplierDetail_Error',
    });
  }
}

// WishList Request

export default function* authSaga() {
  yield takeEvery('Get_wishListProduct_Request', WishListRequest);
  yield takeEvery('User_collection_Request', getCollection);
  yield takeEvery('User_Gold_Request', getGold);
  yield takeEvery('User_SupplierList_Request', SupplierList);
  yield takeEvery('User_ProductList_Request', ProductList);
  yield takeEvery('User_categories_Request', ProductCategories);
  yield takeEvery('User_singleProductDetail_Request', ProductDetails);
  yield takeEvery('User_SupplierCategories_Request', SupplierCategories);
  yield takeEvery('User_SupplierProductList_Request', SupplierProductList);
  yield takeEvery('User_SupplierProDetail_Request', SupplierProductDetails);
  yield takeEvery('Get_State_Request', StateList);
  yield takeEvery('Get_Pending_Request', pendinRequest);
  yield takeEvery('Get_Sent_Request', SentRequest);
  yield takeEvery('Get_updateSupplierRequest_Request', AcecptRequest);
  yield takeEvery('Get_updateSupplierRequest1_Request', RejectRequest);
  yield takeEvery('User_supplierDetail_Request', SupplierDetail);
}
