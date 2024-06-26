initialstate = {
  isFetching: false,
  fetching:false,
  Catalogue: [],
  Products: '',
  CollectionDetails: '',
  SelfCreatedProduct: '',
  OlockerCreatedProduct: '',
  metalData: {},
  diamondData: [],
  stoneData: [],
  decorativeData: [],
  totalWiegt: '',
  msg: {},
  itemField: {},
  editProduct: {},
  hProductSrNo: '',
  productEdit: false,
  productData: {},
  datadelete: {
    decorative: false,
    stone: false,
    metal: false,
    diamond: false,
  },
  lImages: [],
  visible: false,
  productTypeList: [],
  ProductList:[]
};

export default (state = initialstate, action) => {
  switch (action.type) {

    case 'add_product_request_new':
      return { ...state, isFetching: true };
    case 'add_product_success_new':
      return { 
        ...state,
        isFetching: false,
        metalData: {},
        diamondData: [],
        stoneData: [],
        decorativeData: [],
        totalWiegt: '',
        msg: {},
         };

    case 'Get_Catalogue_Request':
      return { ...state, isFetching: true };
    case 'Get_Catalogue_Success':
      return { ...state, isFetching: false, Catalogue: action.payload };
    case 'Get_Catalogue_Error':
      return { ...state, isFetching: false };

    case 'My_Product_Request':
      return { ...state, isFetching: true };
    case 'My_Product_Success':
      return {
        ...state, isFetching: false, Products: action.payload, totalWiegt: '',
        msg: {}, metalData: {}, editProduct: {}, diamondData: [],
        stoneData: [],
        decorativeData: [],
      };
    case 'My_Product_Error':
      return { ...state, isFetching: false };

    case 'Collection_Detail_Request':
      return { ...state, isFetching: true };
    case 'Collection_Detail_Success':
      return { ...state, isFetching: false, CollectionDetails: action.payload };
    case 'Collection_Detail_Error':
      return { ...state, isFetching: false };

    case 'Self_Product_Request':
      return { ...state, isFetching: true };
    case 'Self_Product_Success':
      return { ...state, isFetching: false, SelfCreatedProduct: action.payload };
    case 'Self_Product_Error':
      return { ...state, isFetching: false };

    case 'Olocker_Product_Request':
      return { ...state, isFetching: true };
    case 'Olocker_Product_Success':
      return {
        ...state,
        isFetching: false,
        OlockerCreatedProduct: action.payload,
      };
    case 'Olocker_Product_Error':
      return { ...state, isFetching: false };
    case 'add_metal_list_request':
      return { ...state, isFetching: true };
    case 'add_metal_list_success':
      return {
        ...state,
        isFetching: false,
        metalData: action.payload,
        totalWiegt: action.totalWiegt,
      };
    case 'add_metal_list_error':
      return { ...state, isFetching: false };
    case 'add_dimon_request':
      return { ...state, isFetching: true };
    case 'add_dimon_success':
      return { ...state, isFetching: false, diamondData: action.payload };
    case 'add_dimon_error':
      return { ...state, isFetching: false };
    case 'add_stone_request':
      return { ...state, isFetching: true };
    case 'add_stone_success':
      return { ...state, isFetching: false, stoneData: action.payload };
    case 'add_stone_error':
      return { ...state, isFetching: false };
    case 'add_decItem_request':
      return { ...state, isFetching: true };
    case 'add_decItem_success':
      return { ...state, isFetching: false, decorativeData: action.payload };
    case 'add_decItem_error':
      return { ...state, isFetching: false };
    case 'verify_product_wieght_request':
      return { ...state, isFetching: true };
    case 'verify_product_wieght_success':
      return {
        ...state,
        isFetching: false,
        msg: { msg: action.payload, error: false },
      };
    case 'verify_product_wieght_error1':
      return {
        ...state,
        isFetching: false,
        msg: { msg: action.payload, error: true },
      };
    case 'verify_product_wieght_error':
      return { ...state, isFetching: false };
    case 'get_item_field_list_request':
      return { ...state, isFetching: true };
    case 'get_item_field_list_success':
      return { ...state, isFetching: false, itemField: action.payload };
    case 'get_item_field_list_error':
      return { ...state, isFetching: false };
    case 'create_product_request':
      return { ...state, isFetching: true };
    case 'create_product_success':
      return { ...state, isFetching: false };
    case 'create_product_error':
      return { ...state, isFetching: false };
    case 'delete_metal_request':
      return { ...state, isFetching: true };
    case 'delete_metal_success': {
      console.log('this is playload', action.payload);
      let newdata = state.metalData.result?.filter(
        item => item.SrNo != action.payload,
      );
      return {
        ...state,
        isFetching: false,
        metalData: { result: newdata },
        datadelete: {
          decorative: false,
          stone: false,
          metal: true,
          diamond: false,
        },
      };
    }
    case 'delete_metal_error':
      return { ...state, isFetching: false };
    case 'diamond_delete_requet':
      return { ...state, isFetching: true };
    case 'diamond_delete_success':
      return {
        ...state,
        isFetching: false,
        diamondData: state.diamondData.filter(
          item => item.SrNo != action.payload,
        ),
        datadelete: {
          decorative: false,
          stone: false,
          metal: false,
          diamond: true,
        },
      };
    case 'diamond_delete_error':
      return { ...state, isFetching: false };
    case 'remove_stone_request':
      return { ...state, isFetching: true };
    case 'remove_stone_success':
      return {
        ...state,
        isFetching: false,
        stoneData: state.stoneData.filter(item => item.SrNo != action.payload),
        datadelete: {
          decorative: false,
          stone: true,
          metal: false,
          diamond: false,
        },
      };
    case 'remove_stone_error':
      return { ...state, isFetching: false };
    case 'remove_decorative_request':
      return { ...state, isFetching: true };
    case 'remove_decorative_success':
      return {
        ...state,
        isFetching: false,
        decorativeData: state.decorativeData.filter(
          item => item.SrNo != action.payload,
        ),
        datadelete: {
          decorative: true,
          stone: false,
          metal: false,
          diamond: false,
        },
      };
    case 'remove_decorative_error':
      return { ...state, isFetching: false };

    case 'edit_product_reqest':
      return { ...state, isFetching: true };
    case 'edit_product_success':
      return {
        ...state,
        isFetching: false,
        editProduct: action.payload,
        diamondData: action.payload?.productdetails?.pdiamond,
        decorativeData: action.payload?.productdetails?.pdecoration,
        stoneData: action.payload?.productdetails?.pstones,
        metalData: { result: action.payload?.productdetails?.pmetals },
        totalWiegt: action.payload?.products?.GrossWt,
        hProductSrNo: action.payload?.products?.SrNo,
        productEdit: action.productEdit,
      };
    case 'edit_product_error':
      return { ...state, isFetching: false };
    case 'is_product_edit':
      return { ...state, productEdit: action.payload };
    case 'product_detail_request':
      return { ...state, isFetching: true };
    case 'product_detail_success':
      return { ...state, isFetching: false, productData: action.payload };
    case 'product_detail_error':
      return { ...state, isFetching: false };

    case 'product_delete_request':
      return { ...state, isFetching: true };
    case 'product_delete_success':
      return { ...state, isFetching: false };
    case 'product_delete_error':
      return { ...state, isFetching: false };

    case 'library_images_request':
      return { ...state, isFetching: true };
    case 'library_images_success':
      return {
        ...state,
        isFetching: false,
        lImages: action.payload,
      };
    case 'library_images_error':
      return { ...state, isFetching: false };
    case 'visible_request': {
      return { ...state, visible: action.visible };
    }

    case 'product_Type_Request':
      return { ...state, fetching: true };
    case 'product_Type_Success':
      return { ...state, fetching: false, productTypeList: action.payload};
    case 'product_Type_Error':
      return { ...state, fetching: false };

    case 'User_ProductLists_Request':
      return { ...state, isFetching: true };
    case 'User_ProductLists_Success':
      return { ...state, isFetching: false, ProductList: action.payload };
    case 'User_ProductLists_Error':
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
