import Loading from "@/components/loading";
import Timetable from "@/components/timetable";
import { mockSessions } from "@/constants";
import { RoomSession } from "@/types";
import { Card, Flex, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title } = Typography;

const ScheduleCard = () => {
  const [sessions, setSessions] = useState<Array<RoomSession>>([]);

  useEffect(() => {
    setTimeout(() => {
      setSessions(mockSessions);
    }, 1000);
  }, []);

  return (
    <Card>
      <Flex vertical gap={16}>
        <Title>Schedule</Title>

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
