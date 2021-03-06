import { queryListCustomer, addCustomer, updateCustomer, deleteCustomer } from './service';
const Model = {
  namespace: 'listAndsearchAndArticles',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('ád', payload);
      const response = yield call(queryListCustomer, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.customer) ? response.customer : [],
      });
    },
    *createCustomer({ payload }, { call }) {
      const response = yield call(addCustomer, payload.values);
    },
    *updateCustomer({ payload }, { call }) {
      const response = yield call(updateCustomer, payload.id, payload.values);
    },
    *deleteCustomer({ payload }, { call }) {
      const response = yield call(deleteCustomer, payload.id);
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload };
    },
  },
};
export default Model;
