import { Tabs, TabsProps } from "antd";
import { ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
      label: "Details & Schedule",
      children: null,
    },
    {
      key: "booking",
      label: "Booking",
      children: null,
    },
    {
      key: "manage",
      label: "Manage & Control",
      children: null,
    },
  ];

  const tabChange = (key: string) => {
    navigate(`/room/${id}/${key}`);
  };

  return (
    <div>
      <Tabs defaultActiveKey={currentTab} items={items} onChange={tabChange} />
      {children}
    </div>
  );
};

export default RoomDetailsLayout;
