import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Drawer,
  Row,
  Select,
  Tag,
  Table,
  Space,
  Input,
  DatePicker,
  TimePicker,
  Popconfirm,
  message,
} from 'antd';
import { connect } from 'umi';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import axios from 'axios';

const { Option } = Select;
const FormItem = Form.Item;
import moment from 'moment';

const Articles = ({ dispatch, listAndsearchAndArticles: { list = [] }, loading }) => {
  const [visible, setVisible] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [curentId, setCurentId] = useState();
  // const [currentInfoCustomer, setCurrentInfoCustomer] = useState({
  //   name: '',
  //   phone: '',
  //   date: '',
  //   time: '',
  //   count: '',
  //   content: '',
  // });
  const [form] = Form.useForm();
  const format = 'HH:mm';
  useEffect(() => {
    dispatch({
      type: 'listAndsearchAndArticles/fetch',
    });
  }, []);

  const showDrawer = (id) => {
    setCurentId(id);

    // try {
    //   const res = await axios.get(`http://localhost:5555/customers/${id}`);
    //   setCurrentInfoCustomer(res.data.customer);
    //   console.log('asd', res.data.customer);
    // } catch (error) {
    //   console.log(error);
    // }

    setVisible(true);
  };

  // useEffect(() => {
  //   form.setFieldsValue(currentInfoCustomer);
  // }, [form, currentInfoCustomer]);

  const showDrawerAdd = () => {
    setVisibleAdd(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onCloseAdd = () => {
    setVisibleAdd(false);
  };

  const columns = [
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => <p style={{ color: 'red' }}>0{phone}</p>,
    },
    {
      title: 'Ngày đặt bàn',
      dataIndex: 'date',
      key: 'date',
      render: (date) => <p>{date.substr(0, 10)}</p>,
    },
    {
      title: 'Giờ đặt',
      dataIndex: 'time',
      key: 'time',
      render: (time) => {
        let h = time.substring(11, 13);
        let m = time.substring(14, 16);
        let s = time.substring(17, 19);
        let hour = Number(h);
        let hourReal;
        if (hour + 7 <= 24) {
          hourReal = hour + 7;
        } else {
          hourReal = hour + 7 - 24;
        }
        return (
          <Tag color="green">
            {hourReal}:{m}:{s}
          </Tag>
        );
      },
    },
    {
      title: 'Số người',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Lời nhắn',
      dataIndex: 'content',
      key: 'content',
    },

    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => showDrawer(record._id)}>Sửa</a>
          <Popconfirm
            title="Bạn có chắc muốn xóa lịch đặt bàn này?"
            onConfirm={() => confirm(record._id)}
            onCancel={cancel}
            okText="Xóa"
            cancelText="Hủy"
          >
            <a>Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const formItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
      md: {
        span: 12,
      },
    },
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const confirm = async (id) => {
    console.log(id);

    await dispatch({
      type: 'listAndsearchAndArticles/deleteCustomer',
      payload: {
        id,
      },
    });

    dispatch({
      type: 'listAndsearchAndArticles/fetch',
    });

    message.success('Xóa thành công');
  };

  const cancel = () => {
    message.error('Bạn chưa xóa');
  };

  const onFinishUpdate = async (values) => {
    console.log('Success:', values);
    console.log('day la id:', curentId);
    await dispatch({
      type: 'listAndsearchAndArticles/updateCustomer',
      payload: {
        id: curentId,
        values,
      },
    });

    setVisible(false);

    dispatch({
      type: 'listAndsearchAndArticles/fetch',
    });
  };

  const onFinishAdd = async (values) => {
    await dispatch({
      type: 'listAndsearchAndArticles/createCustomer',
      payload: {
        values,
      },
    });

    setVisibleAdd(false);

    dispatch({
      type: 'listAndsearchAndArticles/fetch',
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Card bordered={false}>
        <Form
          layout="inline"
          form={form}
          initialValues={{
            owner: ['wjh', 'zxx'],
          }}
          onValuesChange={(value) => {
            const a = value.date;
            dispatch({
              type: 'listAndsearchAndArticles/fetch',
              payload: {
                date: `date:${a}`,
              },
            });
          }}
        >
          <StandardFormRow
            title="Danh mục"
            block
            style={{
              paddingBottom: 11,
            }}
          >
            <FormItem name="category">
              <TagSelect expandable>
                <TagSelect.Option value="cat1">Khách hàng loại I</TagSelect.Option>
                <TagSelect.Option value="cat2">Khách hàng loại II</TagSelect.Option>
                <TagSelect.Option value="cat3">Khách hàng loại III</TagSelect.Option>
              </TagSelect>
            </FormItem>
          </StandardFormRow>

          <StandardFormRow title="Lựa chọn khác" grid last>
            <Row gutter={16}>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="Theo thời gian" name="datee">
                  <Select
                    placeholder="Mới nhất"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                    }}
                  >
                    <Option value="asc">Mới nhất</Option>
                    <Option value="desc">Muộn nhất</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="Theo loại" name="rate">
                  <Select
                    placeholder="Thân thiết"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                    }}
                  >
                    <Option value="good">Lần đầu</Option>
                    <Option value="good">Thân thiết</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col lg={8} md={4} sm={4} xs={24}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button type="primary" danger onClick={showDrawerAdd}>
                    Tạo lịch đặt bàn
                  </Button>
                </div>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <Card
        style={{
          marginTop: 24,
        }}
        bordered={false}
        bodyStyle={{
          padding: '8px 32px 32px 32px',
        }}
      >
        <Table columns={columns} dataSource={list} />
      </Card>

      <Drawer title="Thêm lịch đặt bàn" onClose={onCloseAdd} visible={visibleAdd} width="350px">
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinishAdd}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Họ tên"
            name="name"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số điện thoại!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ngày đặt bàn"
            name="date"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập ngày đặt!',
              },
            ]}
          >
            <DatePicker placeholder="mm/dd/yy" />
          </Form.Item>

          <Form.Item
            label="Giờ đặt"
            name="time"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập giờ đặt!',
              },
            ]}
          >
            <TimePicker defaultValue={moment('17:45', format)} format={format} />
          </Form.Item>

          <Form.Item
            label="Số người"
            name="count"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số người!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Lời nhắn" name="content">
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Thêm lịch
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <Drawer title="Thông tin khách hàng" onClose={onClose} visible={visible} width="350px">
        <Form {...layout} name="basic" onFinish={onFinishUpdate} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Họ tên"
            name="name"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số điện thoại!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ngày đặt bàn"
            name="date"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập ngày đặt!',
              },
            ]}
          >
            <DatePicker placeholder="mm/dd/yy" />
          </Form.Item>

          <Form.Item
            label="Giờ đặt"
            name="time"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập giờ đặt!',
              },
            ]}
          >
            <TimePicker defaultValue={moment('17:45', format)} format={format} />
          </Form.Item>

          <Form.Item
            label="Số người"
            name="count"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số người!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Lời nhắn" name="content">
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default connect(({ listAndsearchAndArticles, loading }) => ({
  listAndsearchAndArticles,
  loading: loading.models.listAndsearchAndArticles,
}))(Articles);
