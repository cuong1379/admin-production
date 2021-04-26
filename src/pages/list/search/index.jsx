import React, { Component, useState } from 'react';
import { Input } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import axios from 'axios';
import { connect } from 'umi';

const Search = ({ dispatch, children }) => {
  const [searchData, setSearchData] = useState([]);
  // handleTabChange = (key) => {
  //   const { match } = this.props;
  //   const url = match.url === '/' ? '' : match.url;

  //   switch (key) {
  //     case 'articles':
  //       history.push(`${url}/articles`);
  //       break;

  //     case 'applications':
  //       history.push(`${url}/applications`);
  //       break;

  //     case 'projects':
  //       history.push(`${url}/projects`);
  //       break;

  //     default:
  //       break;
  //   }
  // };
  const handleFormSubmit = async (value) => {
    dispatch({
      type: 'listAndsearchAndprojects/fetch',
      payload: {
        q: value,
      },
    });

    // try {
    //   const res = await axios.get(`http://localhost:5555/productions?q=${value}`);
    //   console.log(res.data);
    //   setSearchData(res.data.production);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  // getTabKey = () => {
  //   const { match, location } = this.props;
  //   const url = match.path === '/' ? '' : match.path;
  //   const tabKey = location.pathname.replace(`${url}/`, '');

  //   if (tabKey && tabKey !== '/') {
  //     return tabKey;
  //   }

  //   return 'articles';
  // };

  // const tabList = [
  //   {
  //     key: 'articles',
  //     tab: '文章',
  //   },
  //   {
  //     key: 'projects',
  //     tab: '项目',
  //   },
  //   {
  //     key: 'applications',
  //     tab: '应用',
  //   },
  // ];
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
      />
    </div>
  );

  return (
    <PageContainer
      searchValue={searchData}
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
