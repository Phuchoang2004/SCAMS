import React from 'react';
import { Layout, Button, Dropdown, Avatar, Space, Switch, theme, Typography } from 'antd';
import type { MenuProps } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/hooks/useAuth';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ collapsed, onToggle }) => {
  const { user, logout } = useAuth();
  const { theme: appTheme, toggleTheme } = useApp();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined style={{ fontSize: 16 }} />,
      label: <span style={{ fontSize: 14 }}>Profile</span>,
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined style={{ fontSize: 16 }} />,
      label: <span style={{ fontSize: 14 }}>Settings</span>,
      onClick: () => navigate('/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined style={{ fontSize: 16, color: '#ff4d4f' }} />,
      label: <span style={{ fontSize: 14, color: '#ff4d4f' }}>Logout</span>,
      onClick: () => logout(),
    },
  ];

  return (
    <AntHeader
      style={{
        padding: '0 24px',
        background: token.colorBgContainer,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
      </div>

      <Space size={20}>
        <Space size={8}>
          <SunOutlined style={{ color: appTheme === 'light' ? '#faad14' : '#8c8c8c' }} />
          <Switch
            checked={appTheme === 'dark'}
            onChange={toggleTheme}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
          <MoonOutlined style={{ color: appTheme === 'dark' ? '#1890ff' : '#8c8c8c' }} />
        </Space>

        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <div
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 12px',
              borderRadius: 8,
              border: `1px solid ${token.colorBorderSecondary}`,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = token.colorBgTextHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Avatar
              size={36}
              src={user?.avatar}
              icon={<UserOutlined />}
              style={{
                backgroundColor: '#8c8c8c',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }}>
              <Text strong style={{ fontSize: 14 }}>{user?.name}</Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {user?.role === 'admin' ? 'Admin' :
                 user?.role === 'lecturer' || user?.role === 'Lecturer' ? 'Lecturer' :
                 user?.role === 'student' || user?.role === 'Student' ? 'Student' :
                 user?.role === 'security' || user?.role === 'Security' ? 'Security' :
                 user?.role || 'User'}
              </Text>
            </div>
            <ChevronDown size={16} color="#8c8c8c" />
          </div>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};