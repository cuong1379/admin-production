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

    // *fetchCurrent(_, { call, put }) {
    //   const response = yield call(queryCurrent);
    //   yield put({
    //     type: 'saveCurrentUser',
    //     payload: response,
    //   });
    // },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
