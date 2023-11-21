initialstate = {
  isFetching: false,
  StateList: [],
  city: [],
};
export default (state = initialstate, action) => {
  switch (action.type) {
    case 'State_List_Request':
      return {...state, isFetching: true};
    case 'State_List_Success':
      return {...state, isFetching: false, StateList: action.payload};
    case 'State_List_Error':
      return {...state, isFetching: false};
    case 'city_list_request':
      return {...state, isFetching: true};
    case 'city_list_success':
      return {...state, isFetching: false, city: action.data};
    case 'city_list_error':
      return {...state, isFetching: false};

    default:
      return state;
  }
};
