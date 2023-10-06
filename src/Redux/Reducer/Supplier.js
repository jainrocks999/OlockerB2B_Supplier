initialstate = {
  SupplierDetail: '',
  isFetching: false,
  modalStatus: false,
  AssiGnModal: false

};
export default (state = initialstate, action) => {
  switch (action.type) {

    case 'Supplier_Profile_Request':
      return { ...state, isFetching: true };
    case 'Supplier_Profile_Success':
      return { ...state, isFetching: false, SupplierDetail: action.payload };
    case 'Supplier_Profile_Error':
      return { ...state, isFetching: false };
    case 'Invite_retailert_Request':
      return { ...state, isFetching: true }
    case 'Invite_retailert_Success':
      return { ...state, isFetching: false, modalStatus: action.payload }
    case 'Invite_retailert_Error':
      return { ...state, isFetching: false }
    case 'update_status_&_assign_request':
      return { ...state, isFetching: true, }
    case 'update_status_&_assign_success':
      return { ...state, isFetching: false, AssiGnModal: action.payload }
    case 'update_status_&_assign_Error':
      return { ...state, isFetching: false }
    case 'add_partner_to_network_request':
      return { ...state, isFetching: true }
    case 'add_partner_to_network_success':
      return { ...state, isFetching: false }
    case 'add_partner_to_network_error':
      return { ...state, isFetching: false }

    default:
      return state;
  }
};
