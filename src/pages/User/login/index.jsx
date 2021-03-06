import {
  AlipayCircleOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, Space, message, Tabs } from 'antd';
import React, { useState, useEffect } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage, history } from 'umi';
import { getFakeCaptcha } from '@/services/login';
import styles from './index.less';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const config = {
  apiKey: 'AIzaSyA_bsqOxDH_nuO_dptOQ2hTXGPKTBjQSi0',
  authDomain: 'hainam-restaurant.firebaseapp.com',
  // ...
};
firebase.initializeApp(config);

const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/',

  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [type, setType] = useState('account');
  const intl = useIntl();

  const handleSubmit = (values) => {
    console.log('dqw', values);
    const { dispatch } = props;
    dispatch({
      type: 'auth/login',
      payload: { ...values, type },
    });
  };

  useEffect(() => {
    if (localStorage.getItem('auth-firebase-token')) {
      history.push('/');
    }
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        console.log('khong co user');
      } else {
        console.log('logged in user', user.displayName);
        const token = await user.getIdToken();
        console.log('token firebase', token);
        localStorage.setItem('auth-firebase-token', token);
      }
      return () => unregisterAuthObserver();
    });
  }, []);

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values);
          return Promise.resolve();
        }}
      >
        <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane
            key="account"
            tab={intl.formatMessage({
              id: 'pages.login.accountLogin.tab',
              defaultMessage: '',
            })}
          />
          <Tabs.TabPane
            key="mobile"
            tab={intl.formatMessage({
              id: 'pages.login.phoneLogin.tab',
              defaultMessage: '',
            })}
          />
        </Tabs>

        {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage
            content={intl.formatMessage({
              id: 'pages.login.accountLogin.errorMessage',
              defaultMessage: '',
            })}
          />
        )}
        {type === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder="T??n ????ng nh???p"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="pages.login.username.required" defaultMessage="" />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="M???t kh???u"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="pages.login.password.required" defaultMessage="" />
                  ),
                },
              ]}
            />
          </>
        )}

        {status === 'error' && loginType === 'mobile' && !submitting && <LoginMessage content="" />}
        {type === 'mobile' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={styles.prefixIcon} />,
              }}
              name="mobile"
              placeholder={intl.formatMessage({
                id: 'pages.login.phoneNumber.placeholder',
                defaultMessage: '',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="pages.login.phoneNumber.required" defaultMessage="" />
                  ),
                },
                {
                  pattern: /^1\d{10}$/,
                  message: (
                    <FormattedMessage id="pages.login.phoneNumber.invalid" defaultMessage="" />
                  ),
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined className={styles.prefixIcon} />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.captcha.placeholder',
                defaultMessage: '',
              })}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${intl.formatMessage({
                    id: 'pages.getCaptchaSecondText',
                    defaultMessage: '',
                  })}`;
                }

                return intl.formatMessage({
                  id: 'pages.login.phoneLogin.getVerificationCode',
                  defaultMessage: '',
                });
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="pages.login.captcha.required" defaultMessage="" />,
                },
              ]}
              onGetCaptcha={async (mobile) => {
                const result = await getFakeCaptcha(mobile);

                if (result === false) {
                  return;
                }

                message.success('');
              }}
            />
          </>
        )}
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            <FormattedMessage id="pages.login.rememberMe" defaultMessage="" />
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            <FormattedMessage id="pages.login.forgotPassword" defaultMessage="" />
          </a>
        </div>
      </ProForm>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
