const {
  default: AsyncStorage,
} = require('@react-native-async-storage/async-storage');
const {default: store} = require('../../../Redux/Store');

export const GetMessageCommon = async (id, user_type) => {
  const user_id = AsyncStorage.getItem('user_id');
  const Token = await AsyncStorage.getItem('loginToken');
  store.dispatch({
    type: 'get_Message_Request2',
    url: '/getMessage',
    senderId: parseInt(user_id._j),
    reciverid: parseInt(id),
    token: Token,
    user_type: user_type,
  });
};
