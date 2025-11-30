import Timetable from "@/components/timetable";
import { Room, RoomStatus } from "@/types";
import { Card, Flex, Row, Badge, Typography, Col } from "antd";
import { Building, Map, MapPin } from "lucide-react";

const { Title, Text } = Typography;

type ScheduleCardProps = {
  room: Room;
};

const ScheduleCard = ({ room }: ScheduleCardProps) => {
  return (
    <Card>
      <Flex vertical gap={16}>
        <Title>Schedule</Title>
        <Timetable start={"2025-12-22"} end={"2025-12-28"} />
      </Flex>
    </Card>
  );
};

export default ScheduleCard;
