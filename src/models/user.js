import { queryMe, query as queryUsers } from '@/services/user';
import { history } from 'umi';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetchMe(_, { call, put, select }) {
      const token = yield select((state) => state.auth.token);
      console.log('day la token', token);
      const response = yield call(queryMe, token);
      if (response.success === true) {
        // history.replace('/')
        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        });
      } else {
        history.replace('/user/login');
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
  },
};
export default UserModel;
