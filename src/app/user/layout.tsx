'use client'
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/navigation';

const { Header, Sider, Content } = Layout;


const MyLayout = ({ children }: any) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
      
      <div className="flex items-center justify-center h-16 text-center gap-2">
        <TwitterOutlined
          style={{ fontSize: '30px', color: '#fff' }}
        />

        <span
          className="text-2xl"
          style={{
            display: collapsed ? 'none' : 'block',
            color: '#fff' 
          }}
        >
          AI管理
        </span>
      </div>

        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/user/dashboard']}
          onClick={({ key }) => {
            router.push(key);
          }}
          items={[
            {
              key: '/user/dashboard',
              icon: <UserOutlined />,
              label: 'AI问答',
            },
            {
              key: '/user/summarize',
              icon: <UploadOutlined />,
              label: 'AI总结',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default MyLayout