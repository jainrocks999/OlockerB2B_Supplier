initialstate = {
    isFetching:false,
    Catalogue:[],
    Products:'',
    CollectionDetails:'',
    SelfCreatedProduct:'',
    OlockerCreatedProduct:''
  };
  
  export default (state = initialstate, action) => {
    switch (action.type) {
     
        case 'Get_Catalogue_Request':
          return { ...state, isFetching: true };
        case 'Get_Catalogue_Success':
          return { ...state, isFetching: false, Catalogue: action.payload };
        case 'Get_Catalogue_Error':
          return { ...state, isFetching: false };

        case 'My_Product_Request':
          return { ...state, isFetching: true };
        case 'My_Product_Success':
          return { ...state, isFetching: false, Products: action.payload };
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
          return { ...state, isFetching: false, OlockerCreatedProduct: action.payload };
        case 'Olocker_Product_Error':
        return { ...state, isFetching: false };

      default:
        return state;
    }
  };
  