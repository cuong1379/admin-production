// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user/login',
              name: 'login',
              component: './User/login',
            },
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              name: 'forgot-password',
              path: '/user/forgot-password',
              component: './user/forgot-password',
            },
            {
              name: 'reset-password',
              path: '/user/reset-password/:token',
              component: './user/reset-password',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          // authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/dashboard/analysis',
            },
            {
              path: '/dashboard/analysis',
              name: 'Báo cáo',
              icon: 'dashboard',
              component: './dashboard/analysis',
              routes: [
                {
                  // authority: ['supervisor'],
                  path: '/',
                  redirect: '/dashboard/analysis',
                },
              ],
            },

            {
              path: '/list',
              icon: 'table',
              name: 'Quản lý',
              routes: [
                {
                  path: '/list/search',
                  name: 'Danh sách quản lý',
                  component: './list/search',
                  routes: [
                    {
                      path: '/list/search',
                      redirect: '/list/search/projects',
                    },

                    {
                      name: 'Đồ ăn',
                      icon: 'smile',
                      path: '/list/search/projects',
                      component: './list/search/projects',
                    },
                    {
                      name: 'Khách hàng',
                      icon: 'smile',
                      path: '/list/search/articles',
                      component: './list/search/articles',
                    },
                    // {
                    //   name: 'applications',
                    //   icon: 'smile',
                    //   path: '/list/search/applications',
                    //   component: './list/search/applications',
                    // },
                  ],
                },
              ],
            },

            {
              name: 'Kết quả',
              icon: 'CheckCircleOutlined',
              path: '/result',
              routes: [
                {
                  path: '/',
                  redirect: '/result/success',
                },
                {
                  name: 'Thành công',
                  icon: 'smile',
                  path: '/result/success',
                  component: './result/success',
                },
                {
                  name: 'Thất bại',
                  icon: 'smile',
                  path: '/result/fail',
                  component: './result/fail',
                },
              ],
            },
            {
              name: 'Cảnh báo',
              icon: 'warning',
              path: '/exception',
              routes: [
                {
                  path: '/',
                  redirect: '/exception/403',
                },
                {
                  name: '403',
                  icon: 'smile',
                  path: '/exception/403',
                  component: './exception/403',
                },
                {
                  name: '404',
                  icon: 'smile',
                  path: '/exception/404',
                  component: './exception/404',
                },
                {
                  name: '500',
                  icon: 'smile',
                  path: '/exception/500',
                  component: './exception/500',
                },
              ],
            },
            {
              name: 'Tài khoản',
              icon: 'user',
              path: '/account',
              routes: [
                {
                  path: '/',
                  redirect: '/account/center',
                },
                {
                  name: 'Tổng quan',
                  icon: 'smile',
                  path: '/account/center',
                  component: './account/center',
                },
                {
                  name: 'Cài đặt',
                  icon: 'smile',
                  path: '/account/settings',
                  component: './account/settings',
                },
              ],
            },
            {
              name: 'Thiết kế',
              icon: 'highlight',
              path: '/editor',
              routes: [
                {
                  path: '/',
                  redirect: '/editor/flow',
                },
                {
                  name: 'Luồng hoạt động',
                  icon: 'smile',
                  path: '/editor/flow',
                  component: './editor/flow',
                },
                {
                  name: 'Cuộc thi',
                  icon: 'smile',
                  path: '/editor/mind',
                  component: './editor/mind',
                },
                {
                  name: 'Koni',
                  icon: 'smile',
                  path: '/editor/koni',
                  component: './editor/koni',
                },
              ],
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
});
