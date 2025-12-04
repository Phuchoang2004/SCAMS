import { Room, RoomStatus } from "@/types";
import { Card, Flex, Badge, Typography, Divider } from "antd";
import { Building, Map, MapPin } from "lucide-react";

const { Title, Text } = Typography;

type DetailsCardProps = {
  room: Room;
};

const DetailRow = ({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Flex align="center" gap={12}>
    <Text strong style={{ width: 80, color: "#666" }}>
      {label}
    </Text>
    {icon && (
      <Flex
        align="center"
        justify="center"
        style={{ width: 24, color: "#1890ff" }}
      >
        {icon}
      </Flex>
    )}
    <Flex align="center" style={{ flex: 1 }}>
      {children}
    </Flex>
  </Flex>
);

const DetailsCard = ({ room }: DetailsCardProps) => {
  return (
    <Card>
      <Flex justify="space-between" gap={32}>
        <Flex vertical align="flex-start" gap={8} style={{ flex: 1 }}>
          <div>
            <Title level={2} style={{ marginBottom: 4 }}>
              Room {room.room}
            </Title>
            <Text type="secondary">
              Block {room.block} - {room.floor}
            </Text>
          </div>

          <Divider style={{ margin: "12px 0" }} />

          <Flex vertical gap={16} style={{ width: "100%" }}>
            <DetailRow label="Status">
              {room.status === RoomStatus.AVAILABLE ? (
                <Badge
                  status="success"
                  text={
                    <Text strong style={{ color: "#52c41a" }}>
                      Available
                    </Text>
                  }
                />
              ) : (
                <Badge
                  status="error"
                  text={
                    <Text strong style={{ color: "#ff4d4f" }}>
                      Occupied
                    </Text>
                  }
                />
              )}
            </DetailRow>

            <DetailRow label="Room" icon={<Building size={18} />}>
              <Text>{room.room}</Text>
            </DetailRow>

            <DetailRow label="Location" icon={<MapPin size={18} />}>
              <Text>
                Block {room.block}, {room.floor}
              </Text>
            </DetailRow>

            <DetailRow label="Address" icon={<Map size={18} />}>
              <Text>{room.address}</Text>
            </DetailRow>
          </Flex>
        </Flex>

        <img
          alt="Room thumbnail"
          src="/images/default-thumbnail.webp"
          style={{
            width: 480,
            height: 320,
            display: "block",
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Flex>
    </Card>
  );
};

export default DetailsCard;
