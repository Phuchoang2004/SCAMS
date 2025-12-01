import Loading from "@/components/loading";
import Timetable from "@/components/timetable";
import WeekPicker from "@/components/week-picker";
import { mockSessions } from "@/constants";
import { RoomSession } from "@/types";
import { Button, Card, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;

const ScheduleCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sessions, setSessions] = useState<Array<RoomSession>>([]);

  useEffect(() => {
    setTimeout(() => {
      setSessions(mockSessions);
    }, 1000);
  }, []);

  return (
    <Card>
      <Flex vertical gap={16}>
        <Title level={2}>Schedule</Title>
        <Flex gap={24}>
          <WeekPicker />
          <Button
            color="primary"
            variant="filled"
            onClick={() => navigate(`/room/${id}/booking`)}
          >
            Book a room
          </Button>
        </Flex>
        <Timetable
          sessions={sessions}
          start={"2025-12-22"}
          end={"2025-12-28"}
        />
      </Flex>
    </Card>
  );
};

export default ScheduleCard;
