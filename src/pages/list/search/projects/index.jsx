import {
  Card,
  Col,
  Form,
  List,
  Row,
  Select,
  Typography,
  Button,
  Modal,
  InputNumber,
  Input,
  Popconfirm,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import moment from 'moment';
import AvatarList from './components/AvatarList';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
const { Option } = Select;
const FormItem = Form.Item;
import axios from 'axios';
const { Paragraph } = Typography;

const getKey = (id, index) => `${id}-${index}`;

const Projects = ({ dispatch, listAndsearchAndprojects: { list = [] }, loading }) => {
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);

  const [currentId, setCurrentId] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch({
      type: 'listAndsearchAndprojects/fetch',
      payload: {
        count: 8,
      },
    });
  }, []);

  const cardList = list && (
    <List
      rowKey="id"
      loading={loading}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Card
            className={styles.card}
            hoverable
            cover={<img alt={item.name} src={item.thumbnail} />}
          >
            <Card.Meta
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <a>{item.name}</a>
                  <a onClick={() => handleUpdateProduct(item._id)} style={{ color: 'red' }}>
                    Chi tiết
                  </a>
                </div>
              }
              description={
                <Paragraph
                  className={styles.item}
                  ellipsis={{
                    rows: 2,
                  }}
                >
                  {item.description}
                </Paragraph>
              }
            />
            <Popconfirm
              title="Xác nhận xóa sản phẩm này?"
              onConfirm={() => confirm(item._id)}
              onCancel={cancel}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>

            <div className={styles.cardItemContent} style={{ justifyContent: 'space-between' }}>
              <div style={{ fontSize: '20px', fontWeight: '15px' }}>
                Giá: {new Intl.NumberFormat().format(item.price)} VNĐ
              </div>
              <div style={{ fontWeight: '15px' }}>
                Số lượng: {new Intl.NumberFormat().format(item.quantity)}
              </div>
              {/* <div className={styles.avatarList}>
                <AvatarList size="small">
                  {item.members.map((member, i) => (
                    <AvatarList.Item
                      key={getKey(item.id, i)}
                      src={member.avatar}
                      tips={member.name}
                    />
                  ))}
                </AvatarList>
              </div> */}
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
  const formItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
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

  const handleAddProduct = () => {
    setIsModalVisibleAdd(true);
  };

  const handleCancelAdd = () => {
    setIsModalVisibleAdd(false);
  };

  const handleUpdateProduct = (id) => {
    setIsModalVisibleUpdate(true);
    setCurrentId(id);
  };

  const handleCancelUpdate = () => {
    setIsModalVisibleUpdate(false);
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const onFinishAdd = async (values) => {
    await dispatch({
      type: 'listAndsearchAndprojects/createProduct',
      payload: {
        values,
      },
    });
    setIsModalVisibleAdd(false);
    await dispatch({
      type: 'listAndsearchAndprojects/fetch',
      payload: {
        count: 8,
      },
    });
  };

  const onFinishUpdate = async (values) => {
    await dispatch({
      type: 'listAndsearchAndprojects/updateProduct',
      payload: {
        values,
        currentId,
      },
    });
    setIsModalVisibleUpdate(false);
    dispatch({
      type: 'listAndsearchAndprojects/fetch',
      payload: {
        count: 8,
      },
    });
    form.resetFields();
  };

  const cancel = (e) => {
    message.error('Bạn chưa xóa');
  };

  const confirm = async (id) => {
    await dispatch({
      type: 'listAndsearchAndprojects/deleteProduct',
      payload: {
        id,
      },
    });

    dispatch({
      type: 'listAndsearchAndprojects/fetch',
      payload: {
        count: 8,
      },
    });
  };

  return (
    <div className={styles.coverCardList}>
      <Card bordered={false}>
        <Form
          layout="inline"
          onValuesChange={() => {
            dispatch({
              type: 'listAndsearchAndprojects/fetch',
              payload: {
                count: 8,
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
                <TagSelect.Option value="cat1">Hải sản</TagSelect.Option>
                <TagSelect.Option value="cat2">Đồ chiên</TagSelect.Option>
                <TagSelect.Option value="cat3">Đồ ăn nhanh</TagSelect.Option>
                <TagSelect.Option value="cat4">Bia</TagSelect.Option>
                <TagSelect.Option value="cat5">Đặc sản</TagSelect.Option>
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="Lọc" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="Theo giá" name="author">
                  <Select
                    placeholder="Từ thấp đến cao"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                    }}
                  >
                    <Option value="lisa">Từ thấp đến cao</Option>
                    <Option value="lisaa">Từ cao đến thấp</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="Đánh giá" name="rate">
                  <Select
                    placeholder="Bán chạy nhất"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                    }}
                  >
                    <Option value="good">Bán chạy nhất</Option>
                    <Option value="normal">Mới nhất</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col lg={8} md={4} sm={4} xs={24}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button type="primary" danger onClick={handleAddProduct}>
                    Thêm mới
                  </Button>
                </div>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <div className={styles.cardList}>{cardList}</div>
      <Modal
        title="Thêm sản phẩm"
        visible={isModalVisibleAdd}
        onCancel={handleCancelAdd}
        footer={null}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinishAdd}
          validateMessages={validateMessages}
        >
          <Form.Item name={['name']} label="Tên sản phẩm" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name={['quantity']}
            label="Số lượng"
            rules={[{ type: 'number', min: 0, max: 1000 }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name={['price']}
            label="Giá tiền"
            rules={[{ type: 'number', min: 0, max: 100000000 }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name={['thumbnail']} label="Hình ảnh" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['description']} label="Mô tả sản phẩm">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Cập nhật sản phẩm"
        visible={isModalVisibleUpdate}
        onCancel={handleCancelUpdate}
        footer={null}
      >
        <Form
          form={form}
          {...layout}
          name="nest-messages"
          onFinish={onFinishUpdate}
          validateMessages={validateMessages}
        >
          <Form.Item name={['name']} label="Tên sản phẩm" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name={['quantity']}
            label="Số lượng"
            rules={[{ type: 'number', min: 0, max: 1000 }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name={['price']}
            label="Giá tiền"
            rules={[{ type: 'number', min: 0, max: 100000000 }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name={['thumbnail']} label="Hình ảnh" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['description']} label="Mô tả sản phẩm">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default connect(({ listAndsearchAndprojects, loading }) => ({
  listAndsearchAndprojects,
  loading: loading.models.listAndsearchAndprojects,
}))(Projects);
