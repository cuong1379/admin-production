import { stringify } from 'querystring';
import { routerRedux } from 'dva/router';
import { accountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'auth',
  state: {
    token: localStorage.getItem('store-token'),
    status: undefined,
  },
  effects: {
    *login({ payload: { username, password } }, { call, put }) {
      console.log('ád', username, password);
      const response = yield call(accountLogin, username, password);
      console.log('resssss', response);

      // Login successfully
      if (response.status === 'ok') {
        // yield call(setAuthority, response.data.authData.policies);
        // yield call(setAuthority, response.data.authData.role);

        yield put({
          type: 'changeToken',
          payload: response.token,
        });

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }

        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *logout(_, { call, put }) {
      yield call(setAuthority, '');
      yield put({
        type: 'changeToken',
        payload: null,
      });

      const { redirect } = getPageQuery(); // redirect

      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },
  reducers: {
    changeToken(state, { payload }) {
      localStorage.setItem('store-token', payload || '');
      return { ...state, token: payload };
    },
  },
};
export default Model;
