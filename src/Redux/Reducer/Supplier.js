initialstate = {
    SupplierDetail:'',
    isFetching:false,
   
  };
  export default (state = initialstate, action) => {
    switch (action.type) {
     
        case 'Supplier_Profile_Request':
            return { ...state, isFetching: true };
          case 'Supplier_Profile_Success':
            return { ...state, isFetching: false, SupplierDetail: action.payload };
          case 'Supplier_Profile_Error':
            return { ...state, isFetching: false };

      default:
        return state;
    }
  };
  