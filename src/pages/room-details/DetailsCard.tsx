import { Room, RoomStatus } from "@/types";
import { Card, Flex, Row, Badge, Typography, Col } from "antd";
import { Building, Map, MapPin } from "lucide-react";

const { Title, Text } = Typography;

type DetailsCardProps = {
  room: Room;
};

const DetailsCard = ({ room }: DetailsCardProps) => {
  return (
    <Card>
      <Flex justify="space-between">
        <Flex vertical align="flex-start" gap={16}>
          <Title>Details</Title>

          <Row gutter={16}>
            <Col>
              <Text strong>Status:</Text>
            </Col>
            <Col>
              <Flex gap={8}>
                {room.status === RoomStatus.AVAILABLE ? (
                  <Badge
                    status="success"
                    text={<Text type="success">Available</Text>}
                  />
                ) : (
                  <Badge
                    status="error"
                    text={<Text type="danger">Occupied</Text>}
                  />
                )}
              </Flex>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col>
              <Text strong>Room:</Text>
            </Col>
            <Col>
              <Flex gap={8}>
                <Building />
                <Text>{room.block}</Text>
              </Flex>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col>
              <Text strong>Location:</Text>
            </Col>
            <Col>
              <Flex gap={8}>
                <MapPin />
                <Text>
                  Block {room.block}, {room.floor}
                </Text>
              </Flex>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col>
              <Text strong>Address:</Text>
            </Col>
            <Col>
              <Flex gap={8}>
                <Map />
                <Text>{room.address}</Text>
              </Flex>
            </Col>
          </Row>
        </Flex>

        <img
          alt="avatar"
          src="/images/default-thumbnail.webp"
          style={{
            width: 560,
            height: 400,
            display: "block",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </Flex>
    </Card>
  );
};

export default DetailsCard;
