import { queryListCustomer, addCustomer, updateCustomer, deleteCustomer } from './service';
const Model = {
  namespace: 'listAndsearchAndArticles',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('ádasdasd', payload);
      const response = yield call(queryListCustomer, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.customer) ? response.customer : [],
      });
    },
    *createCustomer({ payload }, { call, put }) {
      const response = yield call(addCustomer, payload.values);
    },
    *updateCustomer({ payload }, { call, put }) {
      const response = yield call(updateCustomer, payload.currentId, payload.values);
    },
    *deleteCustomer({ payload }, { call, put }) {
      console.log('dayla payload xoa:', payload.id);
      const response = yield call(deleteCustomer, payload.id);
      console.log('day la respon xoa', response);
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload };
    },
  },
};
export default Model;
