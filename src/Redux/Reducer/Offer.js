initialstate = {
  OfferList: '',
  OfferTempList: '',
  isFetching: false,
  OfferListData: '',
  offerTypeList: {},
  offerProudctList: {},
  offerDetail: {},
  isEdit: false,
  modaleOpen: false,
  modal: false,
};
export default (state = initialstate, action) => {
  switch (action.type) {
    case 'Template_Detail_Request':
      return {...state, isFetching: true};
    case 'Template_Detail_Success':
      return {...state, isFetching: false, OfferList: action.payload};
    case 'Template_Detail_Error':
      return {...state, isFetching: false};

    case 'Add_Offer_Request':
      return {...state, isFetching: true};
    case 'Add_Offer_Success':
      return {...state, isFetching: false, OfferTempList: action.payload};
    case 'Add_Offer_Error':
      return {...state, isFetching: false};

    case 'Offer_List_Request':
      return {...state, isFetching: true};
    case 'Offer_List_Success':
      return {...state, isFetching: false, OfferListData: action.payload};
    case 'Offer_List_Error':
      return {...state, isFetching: false};
    case 'get_offer_type_list_request':
      return {...state, isFetching: true};
    case 'get_offer_type_list_success':
      return {...state, isFetching: false, offerTypeList: action.payload};
    case 'getOfferProductList_request':
      return {...state, isFetching: true};
    case 'getOfferProductList_success':
      return {...state, isFetching: false, offerProudctList: action.payload};
    case 'getOfferProductList_error':
      return {...state, isFetching: false};
    case 'createOffer_request':
      return {...state, isFetching: true};
    case 'createOffer_success':
      return {...state, isFetching: false};
    case 'createOffer_error':
      return {...state, isFetching: false};
    case 'remove_offer_list_request':
      return {...state, isFetching: true};
    case 'remove_offer_list_success':
      return {...state, isFetching: false};
    case 'remove_offer_list_error':
      return {...state, isFetching: false};
    case 'offer_details_request':
      return {...state, isFetching: true};
    case 'offer_details_success':
      return {...state, isFetching: false, offerDetail: action.payload};
    case 'offer_details_error':
      return {...state, isFetching: false};
    case 'offer_edit_modal_open': {
      return {...state, isEdit: action.payload1, modaleOpen: action.payload2};
    }
    case 'add_product_offer_request':
      return {...state, isFetching: true};
    case 'add_product_offer_success':
      return {...state, isFetching: false};
    case 'add_product_offer_error':
      return {...state, isFetching: false};
    case 'offfer_product_modal':
      return {...state, modal: action.modal};
    default:
      return state;
  }
};
