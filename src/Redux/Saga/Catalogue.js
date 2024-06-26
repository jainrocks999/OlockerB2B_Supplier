import {ToastAndroid, YellowBox} from 'react-native';
import {takeEvery, put, call, take} from 'redux-saga/effects';
import Api from '../Api';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parse} from 'react-native-svg';

function* getCatalogue(action) {
  try {
    const data = {
      userid: action.user_id,
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);
    if (response.collection) {
      yield put({
        type: 'Get_Catalogue_Success',
        payload: response.collection,
      });
      action.navigation.navigate('MyCatalogue');
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
    console.log(error);
  }
}

function* getProducts(action) {
  try {
    const data = {
      userid: action.user_id,
      start: action.start,
      length: action.length,
      search: action.search,
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);
    if (response) {
      yield put({
        type: 'My_Product_Success',
        payload: response,
      });
      // action.navigation.navigate('MyCatalogue')
      if (action.btn === 'cat') {
        action.navigation.navigate('MyCatalogueCopy'); //OfferTemplate
      } else if (action.btn === 'see') {
      } else {
        if (action?.isDlete) {
          action.navigation.pop(1);
        } else if (action?.isEdit) {
          action.navigation.pop(action?.count);
        } else {
          action.navigation.navigate('AddSupplierProdcut');
        }
      }
    } else {
      yield put({
        type: 'My_Product_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'My_Product_Error',
    });
    console.log(error);
  }
}

function* getCollectionDetails(action) {
  try {
    const data = {
      SrNo: action.collectionSrNo,
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);
    if (response.status) {
      yield put({
        type: 'Collection_Detail_Success',
        payload: response.data,
      });
      // action.navigation.navigate('MyCatalogue')
      action.navigation.navigate('MyCatalogueDetaill');
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
    const data = {
      search_key: action.search_key,
      fromPrice: action.fromPrice,
      toPrice: action.toPrice,
      minWeight: action.minWeight,
      maxWeight: action.minWeight,
      SupplierId: action.SupplierId,
      userCollectionType: action.userCollectionType,
      start: action.start,
      limit: action.limit,
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);
    // console.log('this is user response',response);
    if (response.status) {
      yield put({
        type: 'Self_Product_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'Self_Product_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Self_Product_Error',
    });
    // console.log('this is error methood',error);
  }
}

function* getOlockerProductList(action) {
  try {
    const data = {
      search_key: action.search_key,
      fromPrice: action.fromPrice,
      toPrice: action.toPrice,
      minWeight: action.minWeight,
      maxWeight: action.minWeight,
      SupplierId: action.SupplierId,
      userCollectionType: action.userCollectionType,
      start: action.start,
      limit: action.limit,
    };
    const response = yield call(Api.fetchDataByGET1, action.url, data);
    // console.log('this is user response',response);
    if (response.status) {
      yield put({
        type: 'Olocker_Product_Success',
        payload: response.data,
      });
      action.navigation.navigate('Addproduct');
    } else {
      yield put({
        type: 'Olocker_Product_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Olocker_Product_Error',
    });
    // console.log('this is error methood',error);
  }
}
function* addmetal(action) {
  try {
    let data = new FormData();
    console.log('this is action', action);
    data.append('GrossWt', action.data.GrossWt);
    data.append('MetalPurity', action.data.MetalPurity);
    data.append('MetalTypes', action.data.MetalTypes);
    data.append('MetalWt', action.data.MetalWt);
    data.append('MetalWtUnit', action.data.MetalWtUnit);
    data.append('hMetalWt', action.data.hMetalWt);
    data.append('hProductSrNo', action.data.hProductSrNo);
    data.append('current_session_id', action.data.current_session_id);
    data.append('isAdd', action.data.isAdd);
    const res = yield call(Api.fetchDataByPOST, action.url, data);
    if (res.status) {
      yield put({
        type: 'add_metal_list_success',
        payload: res.metalData,
        totalWiegt: action.data.GrossWt,
      });
      Toast.show(res.msg);
    } else {
      yield put({
        type: 'add_metal_list_error',
      });
      Toast.show(res.msg);
    }
  } catch (error) {
    console.log('this sis rer', error);
    yield put({
      type: 'add_metal_list_error',
    });
    Toast.show('Something went wrong');
  }
}
function* addDiamond(action) {
  try {
    let data = new FormData();

    data.append('BreakUp', action.data.BreakUp);
    data.append('ChargAmt', action.data.ChargAmt);
    data.append('DiamondName', action.data.DiamondName);
    data.append('DiamondQuality', action.data.DiamondQuality);
    data.append('DiamondShape', action.data.DiamondShape);
    data.append('DiamondWtUnit', action.data.DiamondWtUnit);
    data.append('Diamondwt', action.data.Diamondwt);
    data.append('hDiamondSrNo', action.data.hDiamondSrNo);
    data.append('hProductSrNo', action.data.hProductSrNo);
    data.append('isAdd', action.data.isAdd);
    data.append('current_session_id', action.data.current_session_id);
    const res = yield call(Api.fetchDataByPOST, action.url, data);

    if (res.status) {
      yield put({
        type: 'add_dimon_success',
        payload: res.diamondData.result,
      });
      Toast.show(res.msg);
    } else {
      yield put({
        type: 'add_dimon_error',
      });
      Toast.show(res.msg);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: 'add_dimon_error',
    });
    Toast.show('Something went wrong');
  }
}
function* addStone(action) {
  try {
    let data = new FormData();
    data.append('BreakUp', action.data.BreakUp);
    data.append('ChargAmt', action.data.ChargAmt);
    data.append('StoneName', action.data.StoneName);
    data.append('StoneWt', action.data.StoneWt);
    data.append('StoneWtUnit', action.data.StoneWtUnit);
    data.append('hProductSrNo', action.data.hProductSrNo);
    data.append('hStonesSrNo', action.data.hStonesSrNo);
    data.append('isAdd', action.data.isAdd);
    data.append('current_session_id', action.data.current_session_id);
    const res = yield call(Api.fetchDataByPOST, action.url, data);
    console.log(JSON.stringify(res));
    if (res.success) {
      yield put({
        type: 'add_stone_success',
        payload: res.stoneData.result,
      });
      Toast.show(res.msg);
    } else {
      yield put({
        type: 'add_stone_error',
      });
      Toast.show(res.msg);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: 'add_stone_error',
    });
    Toast.show('Something went wrong');
  }
}
function* addDecorative(action) {
  try {
    let data = new FormData();
    data.append('BreakUp', action.data.BreakUp);
    data.append('ChargAmt', action.data.ChargAmt);
    data.append('DecoItemName', action.data.DecoItemName);
    data.append('DecoWt', action.data.DecoWt);
    data.append('DecoWtUnit', action.data.DecoWtUnit);
    data.append('hDecorationSrNo', action.data.hDecorationSrNo);
    data.append('hProductSrNo', action.data.hProductSrNo);
    data.append('isAdd', action.data.isAdd);
    data.append('current_session_id', action.data.current_session_id);
    const res = yield call(Api.fetchDataByPOST, action.url, data);
    if (res?.status || res?.success) {
      yield put({
        type: 'add_decItem_success',
        payload: res.decorativeData.result,
      });
      Toast.show(res.msg);
    } else {
      yield put({
        type: 'add_decItem_error',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: 'add_decItem_error',
    });
  }
}
function* verifyWt(action) {
  try {
    const data = {
      GrossWt: action.GrossWt,
      MetalWtGrandTotal: action.MetalWtGrandTotal,
      DiamondGrandTotal: action.DiamondGrandTotal,
      StoneGrandTotal: action.StoneGrandTotal,
      DecorationGrandTotal: action.DecorationGrandTotal,
    };
    const res = yield call(Api.fetchDataByGET1, action.url, data);
    if (res.success) {
      yield put({
        type: 'verify_product_wieght_success',
        payload: res.msg,
      });
    } else {
      yield put({
        type: 'verify_product_wieght_error1',
        payload: res.msg,
      });
      Toast.show(res.msg);
    }
  } catch (error) {
    console.log(error, 'thisss');
    yield put({
      type: 'verify_product_wieght_error',
    });
    Toast.show('Something went wrong');
  }
}
function* getItemFields(action) {
  try {
    const data = {
      itemSrNo: action.itemSrNo,
    };
    const res = yield call(Api.fetchDataByGET1, action.url, data);
    if (res.fields) {
      yield put({
        type: 'get_item_field_list_success',
        payload: res.fields,
      });
    } else {
      yield put({
        type: 'get_item_field_list_error',
      });
      Toast.show('Something went wrong while getting fields.');
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: 'get_item_field_list_error',
    });
    Toast.show('Something went wrong while getting fields.');
  }
}
function* removeMetal(action) {
  try {
    const data = {
      MetalId: action.MetalId,
      current_session_id: action.current_session_id,
      hProductSrNo: action.hProductSrNo,
    };
    const res = yield call(Api.fetchDataByGET1, action.url, data);
    if (res.status || res.success) {
      yield put({
        type: 'delete_metal_success',
        payload: action.MetalId,
      });
    } else {
      yield put({
        type: 'delete_metal_error',
      });
    }
    Toast.show(res.msg);
  } catch (error) {
    console.log(error);
    yield put({
      type: 'delete_metal_error',
    });
    Toast.show('Something went wrong');
  }
}
function* createProduct(action) {
  try {
    console.log('caleed');
    let data = new FormData();
    yield Object.keys(action.data).map(item => {
      data.append(item, action.data[item]);
    });
    //console.log(data);
    const res = yield call(Api.fetchDataByPOST, action.url, data);
    console.log(res);
    if (res?.status) {
      yield put({
        type: 'create_product_success',
      });
      Toast.show(res?.msg);
    } else {
      yield put({
        type: 'create_product_error',
      });
      Toast.show(res?.msg);
    }
  } catch (err) {
    yield put({
      type: 'create_product_error',
    });
    console.log(err);
    Toast.show('Somenthing went wrong');
  }
}
function* removeDiamond(action) {
  try {
    const data = {
      DiamondId: action.DiamondId,
      current_session_id: action.current_session_id,
      BreakUp: action.BreakUp,
      hProductSrNo: action.hProductSrNo,
    };

    const res = yield call(Api.fetchDataByGET1, action.url, data);

    if (res.success || res.status) {
      yield put({
        type: 'diamond_delete_success',
        payload: action.DiamondId,
      });
    } else {
      yield put({
        type: 'diamond_delete_error',
      });
    }
    Toast.show(res.msg);
  } catch (error) {
    console.log(error);
    yield put({
      type: 'diamond_delete_error',
    });
  }
}
function* removeStone(action) {
  try {
    const data = {
      StoneId: action.StoneId,
      BreakUp: action.BreakUp,
      current_session_id: action.current_session_id,
      hProductSrNo: action.hProductSrNo,
    };
    const res = yield call(Api.fetchDataByGET1, action.url, data);
    if (res.success || res.status) {
      yield put({
        type: 'remove_stone_success',
        payload: action.StoneId,
      });
    } else {
      yield put({
        type: 'remove_stone_error',
      });
    }
    Toast.show(res.msg);
  } catch (error) {
    yield put({
      type: 'remove_stone_error',
    });
    Toast.show('Something went wrong');
    console.log('thoiss osso', error);
  }
}
function* removeDecorative(action) {
  try {
    const data = {
      DecorativeId: action.DecorativeId,
      BreakUp: action.BreakUp,
      current_session_id: action.current_session_id,
      hProductSrNo: action.hProductSrNo,
    };
    const res = yield call(Api.fetchDataByGET1, action.url, data);
    if (res.success || res.status) {
      yield put({
        type: 'remove_decorative_success',
        payload: action.DecorativeId,
      });
    } else {
      yield put({
        type: 'remove_decorative_error',
      });
    }
    Toast.show(res.msg);
  } catch (error) {
    console.log(error);
    yield put({
      type: 'remove_decorative_error',
    });
    Toast.show('Something went wrong');
  }
}
function* editProduct(action) {
  try {
    const data = {
      productId: action.productId,
      supplierSrNo: action.supplierSrNo,
    };
    const res = yield call(Api.fetchDataByGET1, action.url, data);

    if (res?.success || res?.status) {
      console.log('this is called');
      yield put({
        type: 'edit_product_success',
        payload: res.data,
        productEdit: true,
      });
      action.navigation.navigate('ChooseSupplierProduct',{  productEdit1: true });
    } else {
      yield put({
        type: 'edit_product_error',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: 'edit_product_error',
    });
  }
}
function* productData(action) {
  try {
    const data = {
      productId: action.productId,
      supplierSrNo: action.supplierSrNo,
    };
    const res = yield call(Api.fetchDataByGET1, action.url, data);

    if (res?.success || res?.status) {
      console.log('this is called');
      yield put({
        type: 'product_detail_success',
        payload: res.data,
      });
      action.navigation.navigate('SubCategory',
        {data:action.userType}
      );
      // Toast.show('datails data get success');
    } else {
      yield put({
        type: 'product_detail_error',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: 'product_detail_error',
    });
  }
}
function* deleteProduct(action) {
  try {
    console.log('derrree');
    const data = {
      productSrNo: action.productSrNo,
      supplierSrNo: action.supplierSrNo,
    };
    // {"success":true,"status":"success","msg":"Successfully, product data has been deleted"}
    const res = yield call(Api.fetchDataByGET1, action.url, data);
    if (res.success || res.status) {
      yield put({
        type: 'product_delete_success',
      });
      yield put({
        type: 'My_Product_Request',
        url: '/getProductList',
        user_id: action.supplierSrNo,
        start: 0,
        length: 10,
        search: '',
        navigation: action.navigation,
        btn: '',
        isDlete: true,
      });
    } else {
      yield put({
        type: 'product_delete_error',
      });
    }
    Toast.show(res.msg);
  } catch (error) {
    console.log(error);
    yield put({
      type: 'product_delete_error',
    });
  }
}
function* getProductsPrice(action) {
  try {
    const data = {
      current_session_id: action.current_session_id,
      IsWastage: action.IsWastage,
      LabourCharges: action.LabourCharges,
      hProductSrNo: action.hProductSrNo,
    };
    const res = yield call(Api.fetchDataByGET1, action.url, data);
    console.log('this is resssdjf', JSON.stringify(res));
  } catch (error) {}
}
function* getImages(action) {
  try {
    const res = yield call(Api.fetchDataByGET1, action.url);
    if (res.status) {
      yield put({
        type: 'library_images_success',
        payload: res?.data,
      });
      yield put({
        type: 'visible_request',
        visible: action.open,
      });
    } else {
      yield put({
        type: 'library_images_error',
      });
      Toast.show('Something went wrong');
    }
  } catch (error) {
    yield put({
      type: 'library_images_error',
    });
    Toast.show('Something went wrong');
    console.log('thisisis i', error);
  }
}

// My Product Categories
function* productTypeList(action) {
  try {
    const data = {
      userId: action.userId,
      userType: 'supplier',
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      data,
    );
    console.log('this is res',response);
    if (response.status == true) {
     
      yield put({
        type: 'product_Type_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'product_Type_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'product_Type_Error',
    });
        Toast.show(error);
  }
}

function* ProductList(action) {
  try {
    console.log('this is actiom',action);
    const data = {
      userId: action.userId,
      userType: action.userType,
      typeId: action.typeId,
      login_user_id: action.login_user_id,
      login_user_type: action.login_user_type,
      start:action.start,
      limit:action.limit
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      data,
    );
    console.log(response);
    if (response.status == true) {
      yield put({
        type: 'User_ProductLists_Success',
        payload: response,
      });
      //  action.navigation.navigate('ProductTypeListDetails')
      if (action.navigation) {
        action.navigation.navigate('ProductTypeListDetails', {
          name: action.name,
          id: action.typeId
        });
      }

    } else {
      yield put({
        type: 'User_ProductLists_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_ProductLists_Error',
    });
        Toast.show(error);
  }
}


function* addProductNew(action) {
      yield put({
        type: 'add_product_success_new',
        payload: null,
      });
}




export default function* citySaga() {
  yield takeEvery('Get_Catalogue_Request', getCatalogue);
  yield takeEvery('My_Product_Request', getProducts);
  yield takeEvery('Collection_Detail_Request', getCollectionDetails);
  yield takeEvery('Self_Product_Request', getSelfProductList);
  yield takeEvery('Olocker_Product_Request', getOlockerProductList);
  yield takeEvery('add_metal_list_request', addmetal);
  yield takeEvery('add_dimon_request', addDiamond);
  yield takeEvery('add_stone_request', addStone);
  yield takeEvery('add_decItem_request', addDecorative);
  yield takeEvery('verify_product_wieght_request', verifyWt);
  yield takeEvery('get_item_field_list_request', getItemFields);
  yield takeEvery('create_product_request', createProduct);
  yield takeEvery('delete_metal_request', removeMetal);
  yield takeEvery('diamond_delete_requet', removeDiamond);
  yield takeEvery('remove_stone_request', removeStone);
  yield takeEvery('remove_decorative_request', removeDecorative);
  yield takeEvery('edit_product_reqest', editProduct);
  yield takeEvery('product_detail_request', productData);
  yield takeEvery('product_delete_request', deleteProduct);
  yield takeEvery('get_product_price_request', getProductsPrice);
  yield takeEvery('library_images_request', getImages);
  yield takeEvery('product_Type_Request',productTypeList)
  yield takeEvery('User_ProductLists_Request',ProductList)
  yield takeEvery('add_product_request_new',addProductNew)

}
