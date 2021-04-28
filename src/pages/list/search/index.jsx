import React, { useState } from 'react';
import { Input } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import axios from 'axios';
import { connect } from 'umi';

const Search = ({ dispatch, children }) => {
  const [currentValueInput, setCurrentValueInput] = useState();
  const handleFormSubmit = async (value) => {
    dispatch({
      type: 'listAndsearchAndprojects/fetch',
      payload: {
        q: value,
      },
    });

    dispatch({
      type: 'listAndsearchAndArticles/fetch',
      payload: {
        q: value,
      },
    });

    setCurrentValueInput('');
  };

  const mainSearch = (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <Input.Search
        placeholder="Tìm kiếm gì đó?"
        enterButton="Tìm kiếm"
        size="large"
        onSearch={handleFormSubmit}
        style={{
          maxWidth: 522,
          width: '100%',
        }}
        value={currentValueInput}
      />
    </div>
  );

  return (
    <PageContainer
      content={mainSearch}
      // tabList={tabList}
      // tabActiveKey={this.getTabKey()}
      // onTabChange={this.handleTabChange}
    >
      {children}
    </PageContainer>
  );
};

export default connect(({ listAndsearchAndprojects, loading }) => ({
  listAndsearchAndprojects,
  loading: loading.models.listAndsearchAndprojects,
}))(Search);
