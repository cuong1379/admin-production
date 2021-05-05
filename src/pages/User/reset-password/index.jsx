import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import axios from 'axios';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 12,
  },
};

// let location = useLocation();

const index = () => {
  const onFinish = (values) => {
    const tokenPath = location.pathname.substr(21);
    console.log(tokenPath);
    try {
      const res = axios.post(`http://localhost:5555/users/reset-password`, {
        password: values,
        token: tokenPath,
      });
      console.log(res.data);
      //   message.success('Vui lòng check email để thay đổi mật khẩu');
    } catch (error) {
      console.log(error);
    }
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <div
        style={{
          marginBottom: '30px',
          marginTop: '30px',
          textAlign: 'center',
          fontSize: '15px',
          fontWeight: 400,
        }}
      >
        Nhập mật khẩu mới:
      </div>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Mật khẩu mới"
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default index;

// import React from 'react';
// import { Form, Input, Button, Checkbox, message } from 'antd';
// import axios from 'axios';

// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 8,
//   },
// };
// const tailLayout = {
//   wrapperCol: {
//     offset: 8,
//     span: 12,
//   },
// };

// const index = () => {
//   return <div></div>;
// };

// export default index;
