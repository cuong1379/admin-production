import { queryListProduct, addProduct, updateProduct, deleteProduct } from './service';
const Model = {
  namespace: 'listAndsearchAndprojects',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('hehehehe', payload);
      const response = yield call(queryListProduct, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.production) ? response.production : [],
      });
    },
    *createProduct({ payload }, { call, put }) {
      const response = yield call(addProduct, payload.values);
    },
    *updateProduct({ payload }, { call, put }) {
      const response = yield call(updateProduct, payload.currentId, payload.values);
    },
    *deleteProduct({ payload }, { call, put }) {
      console.log('dayla payload xoa:', payload.id);
      const response = yield call(deleteProduct, payload.id);
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
