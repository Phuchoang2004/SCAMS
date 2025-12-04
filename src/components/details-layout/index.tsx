import { Flex, Tabs, TabsProps } from "antd";
import { ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarCheck, Settings, LayoutDashboard } from "lucide-react";

type RoomDetailsLayoutProps = {
  currentTab: string;
  children: ReactNode;
};

const RoomDetailsLayout = ({
  currentTab,
  children,
}: RoomDetailsLayoutProps) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const items: TabsProps["items"] = [
    {
      key: "details",
      label: (
        <Flex align="center" gap={8}>
          <LayoutDashboard size={18} />
          <span>Details & Schedule</span>
        </Flex>
      ),
      children: null,
    },
    {
      key: "booking",
      label: (
        <Flex align="center" gap={8}>
          <CalendarCheck size={18} />
          <span>Booking</span>
        </Flex>
      ),
      children: null,
    },
    {
      key: "manage",
      label: (
        <Flex align="center" gap={8}>
          <Settings size={18} />
          <span>Manage & Control</span>
        </Flex>
      ),
      children: null,
    },
  ];

  const tabChange = (key: string) => {
    navigate(`/room/${id}/${key}`);
  };

  return (
    <Flex vertical gap={24}>
      <Tabs
        defaultActiveKey={currentTab}
        items={items}
        onChange={tabChange}
        size="large"
        tabBarStyle={{
          marginBottom: 0,
          fontWeight: 500,
          fontSize: 15,
        }}
        tabBarGutter={32}
      />
      {children}
    </Flex>
  );
};

export default RoomDetailsLayout;
