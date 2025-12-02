import React from "react";
import { Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  HomeOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/config/routes";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();

  const menuItems: MenuProps["items"] = [
    {
      key: ROUTES.HOME,
      icon: <HomeOutlined />,
      label: "Home",
      onClick: () => navigate(ROUTES.HOME),
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        background: token.colorBgContainer,
        borderRight: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: collapsed ? 16 : 20,
          fontWeight: "bold",
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
          color: token.colorPrimary,
        }}
      >
        {collapsed ? "S" : "SCAMS"}
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{
          borderRight: 0,
          background: "transparent",
        }}
      />
    </Sider>
  );
};
