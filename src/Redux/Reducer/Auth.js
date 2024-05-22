initialstate = {
  isFetching: false,
  isFetching1:false,
  // Login1: '',
  WishList: [],
  //  SupplierDetail:'',
  // StateList:[],
  // CityList:[],

  Collection: [],
  Gold: [],
  SupplierList: [],
  ProductList: [],
  Categories: [],
  ProductDetail: [],
  SupplierCategories: [],
  SupplierProduct: [],
  SupplierProDetail: [],
  Statelist: [],
  Pending: [],
  sentRequest: [],
  Acecpt: '',
  Reject: '',
  Collectionimg:[]


};
export default (state = initialstate, action) => {
  switch (action.type) {

    // case 'User_Login_Request':
    //   return { ...state, isFetching: true };
    // case 'User_Login_Success':
    //   return { ...state, isFetching: false, Login1: action.payload };
    // case 'User_Login_Error':
    //   return { ...state, isFetching: false };

    // case 'Supplier_Profile_Request':
    //   return { ...state, isFetching: true };
    // case 'Supplier_Profile_Success':
    //   return { ...state, isFetching: false, SupplierDetail: action.payload };
    // case 'Supplier_Profile_Error':
    //   return { ...state, isFetching: false };

    // case 'State_List_Request':
    //   return { ...state, isFetching: true };
    // case 'State_List_Success':
    //   return { ...state, isFetching: false, StateList: action.payload };
    // case 'State_List_Error':
    //   return { ...state, isFetching: false };

    // case 'City_List_Request':
    //   return { ...state, isFetching: true };
    // case 'City_List_Success':
    //   return { ...state, isFetching: false, CityList: action.payload };
    // case 'City_List_Error':
    //   return { ...state, isFetching: false };


    case 'User_collection_Request':
      return { ...state, isFetching: true };
    case 'User_collection_Success':
      return { ...state, isFetching: false, Collection: action.payload };
    case 'User_collection_Error':
      return { ...state, isFetching: false };

    case 'User_Gold_Request':
      return { ...state, isFetching: true };
    case 'User_Gold_Success':
      return { ...state, isFetching: false, Gold: action.payload };
    case 'User_Gold_Error':
      return { ...state, isFetching: false };

    case 'User_SupplierList_Request':
      return { ...state, isFetching: true };
    case 'User_SupplierList_Success':
      return { ...state, isFetching: false, SupplierList: action.payload };
    case 'User_SupplierList_Error':
      return { ...state, isFetching: false };

    case 'User_ProductList_Request':
      return { ...state, isFetching: true };
    case 'User_ProductList_Success':
      return { ...state, isFetching: false, ProductList: action.payload };
    case 'User_ProductList_Error':
      return { ...state, isFetching: false };

    case 'User_categories_Request':
      return { ...state, isFetching: true };
    case 'User_categories_Success':
      return { ...state, isFetching: false, Categories: action.payload };
    case 'User_categories_Error':
      return { ...state, isFetching: false };

    case 'User_singleProductDetail_Request':
      return { ...state, isFetching: true };
    case 'User_singleProductDetail_Success':
      return { ...state, isFetching: false, ProductDetail: action.payload };
    case 'User_singleProductDetail_Error':
      return { ...state, isFetching: false };

    case 'User_SupplierCategories_Request':
      return { ...state, isFetching1: true };
    case 'User_SupplierCategories_Success':
      return { ...state, isFetching1: false, SupplierCategories: action.payload };
    case 'User_SupplierCategories_Error':
      return { ...state, isFetching1: false };

    case 'User_SupplierProductList_Request':
      return { ...state, isFetching: true };
    case 'User_SupplierProductList_Success':
      return { ...state, isFetching: false, SupplierProduct: action.payload };
    case 'User_SupplierProductList_Error':
      return { ...state, isFetching: false };

    case 'User_SupplierProDetail_Request':
      return { ...state, isFetching: true };
    case 'User_SupplierProDetail_Success':
      return { ...state, isFetching: false, SupplierProDetail: action.payload };
    case 'User_SupplierProDetail_Error':
      return { ...state, isFetching: false };

    case 'Get_State_Request':
      return { ...state, isFetching: true };
    case 'Get_State_Success':
      return { ...state, isFetching: false, Statelist: action.payload };
    case 'Get_State_Error':
      return { ...state, isFetching: false };

    case 'Get_Pending_Request':
      return { ...state, isFetching: true };
    case 'Get_Pending_Success':
      return { ...state, isFetching: false, Pending: action.payload };
    case 'Get_Pending_Error':
      return { ...state, isFetching: false };

    case 'Get_Sent_Request':
      return { ...state, isFetching: true };
    case 'Get_Sent_Success':
      return { ...state, isFetching: false, sentRequest: action.payload };
    case 'Get_Sent_Error':
      return { ...state, isFetching: false };

    case 'Get_updateSupplierRequest_Request':
      return { ...state, isFetching: true };
    case 'Get_updateSupplierRequest_Success':
      return { ...state, isFetching: false, Acecpt: action.payload };
    case 'Get_updateSupplierRequest_Error':
      return { ...state, isFetching: false };

    case 'Get_updateSupplierRequest1_Request':
      return { ...state, isFetching: true };
    case 'Get_updateSupplierRequest1_Success':
      return { ...state, isFetching: false, Reject: action.payload };
    case 'Get_updateSupplierRequest1_Error':
      return { ...state, isFetching: false };

    case 'User_supplierDetail_Request':
      return { ...state, isFetching: true };
    case 'User_supplierDetail_Success':
      return { ...state, isFetching: false, SupplierDetail: action.payload };
    case 'User_supplierDetail_Error':
      return { ...state, isFetching: false };


    case 'Get_delete_Success':
      return { ...state, isFetching: false, deletData: action.payload };
    case 'Get_delete1_Success':
      return { ...state, isFetching: false, deletData1: action.payload };


    case 'Get_wishListProduct_Request':
      return { ...state, isFetching: true };
    case 'Get_wishListProduct_Success':
      return { ...state, isFetching: false, WishList: action.payload };
    case 'Get_wishListProduct_Error':
      return { ...state, isFetching: false };

    case 'Get_creativeImgList_Request':
      return { ...state, isFetching: true };
    case 'Get_creativeImgList_Success':
      return { ...state, isFetching: false, Collectionimg: action.payload };
    case 'Get_creativeImgList_Error':
      return { ...state, isFetching: false };





    default:
      return state;
  }
};
