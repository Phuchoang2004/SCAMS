import RoomDetailsLayout from "@/components/details-layout";
import DevicesControlCard from "./DevicesControlCard";
import { Col, Row } from "antd";
import UsageReportCard from "./UsageReportCard";
import UsageCards from "./UsageCards";

const RoomManage = () => {
  return (
    <RoomDetailsLayout currentTab="manage">
      <DevicesControlCard />
      <Row gutter={[24, 24]}>
        <Col flex="auto">
          <UsageReportCard />
        </Col>
        <Col flex="400px">
          <UsageCards />
        </Col>
      </Row>
    </RoomDetailsLayout>
  );
};

export default RoomManage;
