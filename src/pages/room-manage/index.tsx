import RoomDetailsLayout from "@/components/details-layout";
import DevicesControlCard from "./DevicesControlCard";
import { Card, Col, Flex, Row, Typography } from "antd";
import UsageReportCard from "./UsageReportCard";

const { Title, Text } = Typography;

const RoomManage = () => {
  return (
    <RoomDetailsLayout currentTab="manage">
      <DevicesControlCard />
      <Row gutter={[24, 24]}>
        <Col flex="auto">
          <UsageReportCard />
        </Col>
        <Col flex="400px">
          <Row>
            <Card>
              <Flex vertical gap={0}>
                <Title level={2}>Monthly Usage</Title>
                <Flex align="center" gap={16}>
                  <div style={{ fontSize: 40 }}>200</div>
                  <div>hours</div>
                </Flex>
              </Flex>
            </Card>
          </Row>
          <Row>
            <Card>
              <Flex vertical gap={0}>
                <Title level={2}>Monthly Electric Usage</Title>
                <Flex align="center" gap={16}>
                  <div style={{ fontSize: 40 }}>4000</div>
                  <div>kWh</div>
                </Flex>
              </Flex>
            </Card>
          </Row>
        </Col>
      </Row>
    </RoomDetailsLayout>
  );
};

export default RoomManage;
