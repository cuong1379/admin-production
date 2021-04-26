import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, List, Row, Select, Tag, Table, Space } from 'antd';
import { connect } from 'umi';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import axios from 'axios';

const { Option } = Select;
const FormItem = Form.Item;

const Articles = ({ dispatch, listAndsearchAndArticles: { list = [] }, loading }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch({
      type: 'listAndsearchAndArticles/fetch',
      payload: {
        count: 12,
      },
    });
  }, []);

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
    // {
    //   title: 'Số người',
    //   key: 'count',
    //   dataIndex: 'count',
    //   render: (count) => (
    //     <>
    //       {count.map((tag) => {
    //         if (tag >= 9) {
    //           color = 'volcano';
    //         } else if (tag >= 6 && tag <= 8) color = 'yellow';
    //         else color = 'green';
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Sửa</a>
          <a>Xóa</a>
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

  return (
    <>
      <Card bordered={false}>
        <Form
          layout="inline"
          form={form}
          initialValues={{
            owner: ['wjh', 'zxx'],
          }}
          onValuesChange={() => {
            dispatch({
              type: 'listAndsearchAndarticles/fetch',
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
                <TagSelect.Option value="cat1">Khách hàng loại I</TagSelect.Option>
                <TagSelect.Option value="cat2">Khách hàng loại II</TagSelect.Option>
                <TagSelect.Option value="cat3">Khách hàng loại III</TagSelect.Option>
              </TagSelect>
            </FormItem>
          </StandardFormRow>

          <StandardFormRow title="Lựa chọn khác" grid last>
            <Row gutter={16}>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="Theo thời gian" name="user">
                  <Select
                    placeholder="Mới nhất"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                    }}
                  >
                    <Option value="lisa">Mới nhất</Option>
                    <Option value="lisa">Muộn nhất</Option>
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
    </>
  );
};

export default connect(({ listAndsearchAndArticles, loading }) => ({
  listAndsearchAndArticles,
  loading: loading.models.listAndsearchAndArticles,
}))(Articles);
