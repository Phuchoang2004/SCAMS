import { Flex, Card, Typography } from "antd";

const { Title } = Typography;

const UsageCards = () => {
  return (
    <Flex vertical gap={24}>
      <Card>
        <Flex vertical gap={0}>
          <Title level={2}>Monthly Usage</Title>
          <Flex align="center" gap={16}>
            <div style={{ fontSize: 40 }}>200</div>
            <div>hours</div>
          </Flex>
        </Flex>
      </Card>
      <Card>
        <Flex vertical gap={0}>
          <Title level={2}>Monthly Electric Usage</Title>
          <Flex align="center" gap={16}>
            <div style={{ fontSize: 40 }}>4000</div>
            <div>kWh</div>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default UsageCards;
