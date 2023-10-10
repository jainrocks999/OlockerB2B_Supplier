initialstate = {
  isFetching: false,
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
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case 'Get_Catalogue_Request':
      return {...state, isFetching: true};
    case 'Get_Catalogue_Success':
      return {...state, isFetching: false, Catalogue: action.payload};
    case 'Get_Catalogue_Error':
      return {...state, isFetching: false};

    case 'My_Product_Request':
      return {...state, isFetching: true};
    case 'My_Product_Success':
      return {...state, isFetching: false, Products: action.payload};
    case 'My_Product_Error':
      return {...state, isFetching: false};

    case 'Collection_Detail_Request':
      return {...state, isFetching: true};
    case 'Collection_Detail_Success':
      return {...state, isFetching: false, CollectionDetails: action.payload};
    case 'Collection_Detail_Error':
      return {...state, isFetching: false};

    case 'Self_Product_Request':
      return {...state, isFetching: true};
    case 'Self_Product_Success':
      return {...state, isFetching: false, SelfCreatedProduct: action.payload};
    case 'Self_Product_Error':
      return {...state, isFetching: false};

    case 'Olocker_Product_Request':
      return {...state, isFetching: true};
    case 'Olocker_Product_Success':
      return {
        ...state,
        isFetching: false,
        OlockerCreatedProduct: action.payload,
      };
    case 'Olocker_Product_Error':
      return {...state, isFetching: false};
    case 'add_metal_list_request':
      return {...state, isFetching: true};
    case 'add_metal_list_success':
      return {
        ...state,
        isFetching: false,
        metalData: action.payload,
        totalWiegt: action.totalWiegt,
      };
    case 'add_metal_list_error':
      return {...state, isFetching: false};
    case 'add_dimon_request':
      return {...state, isFetching: true};
    case 'add_dimon_success':
      return {...state, isFetching: false, diamondData: action.payload};
    case 'add_dimon_error':
      return {...state, isFetching: false};
    case 'add_stone_request':
      return {...state, isFetching: true};
    case 'add_stone_success':
      return {...state, isFetching: false, stoneData: action.payload};
    case 'add_stone_error':
      return {...state, isFetching: false};
    case 'add_decItem_request':
      return {...state, isFetching: true};
    case 'add_decItem_success':
      return {...state, isFetching: false, decorativeData: action.payload};
    case 'add_decItem_error':
      return {...state, isFetching: false};
    case 'verify_product_wieght_request':
      return {...state, isFetching: true};
    case 'verify_product_wieght_success':
      return {
        ...state,
        isFetching: false,
        msg: {msg: action.payload, error: false},
      };
    case 'verify_product_wieght_error1':
      return {
        ...state,
        isFetching: false,
        msg: {msg: action.payload, error: true},
      };
    case 'verify_product_wieght_error':
      return {...state, isFetching: false};
    case 'get_item_field_list_request':
      return {...state, isFetching: true};
    case 'get_item_field_list_success':
      return {...state, isFetching: false, itemField: action.payload};
    case 'get_item_field_list_error':
      return {...state, isFetching: false};
    case 'create_product_request':
      return {...state, isFetching: true};
    case 'create_product_success':
      return {...state, isFetching: false};
    case 'create_product_error':
      return {...state, isFetching: false};

    default:
      return state;
  }
};
