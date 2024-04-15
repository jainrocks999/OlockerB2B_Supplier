const {
  default: AsyncStorage,
} = require('@react-native-async-storage/async-storage');
const {default: store} = require('../../../Redux/Store');

export const GetMessageCommon = async (id, user_type) => {
  console.log('id get ,,,,',id);
  const user_id =await AsyncStorage.getItem('user_id');
  const Token = await AsyncStorage.getItem('loginToken');
  store.dispatch({
    type: 'get_Message_Request',
    url: '/getMessage',
    senderId: parseInt(user_id),
    reciverid: parseInt(id),
    token: Token,
    user_type: user_type,
  });
};
