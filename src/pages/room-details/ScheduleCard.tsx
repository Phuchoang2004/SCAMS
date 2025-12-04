import Timetable from "@/components/timetable";
import WeekPicker from "@/components/week-picker";
import { DateRange, RoomSession } from "@/types";
import { Button, Card, Flex, Typography, Divider } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";

const { Title, Text } = Typography;

type ScheduleCardProps = {
  sessions: RoomSession[];
};

const ScheduleCard = ({ sessions }: ScheduleCardProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState<DateRange>({
    start: dayjs().startOf("week"),
    end: dayjs().endOf("week"),
  });

  return (
    <Card>
      <Flex vertical gap={16}>
        <Flex align="center" gap={12}>
          <div>
            <Title level={2} style={{ marginBottom: 0 }}>
              Schedule
            </Title>
            <Text type="secondary">View and manage room bookings</Text>
          </div>
        </Flex>

        <Divider style={{ margin: "8px 0 16px 0" }} />

        <Flex justify="space-between" align="center" gap={24}>
          <WeekPicker onChange={setDateRange} />
          <Button
            type="primary"
            size="large"
            style={{ height: 42, paddingInline: 24, backgroundColor: "#0077B5", fontWeight: 600 }}
            onClick={() => navigate(`/room/${id}/booking`)}
          >
            Book A Room
          </Button>
        </Flex>

        <Timetable
          sessions={sessions}
          newScheduledSessions={[]}
          start={dateRange.start}
          end={dateRange.end}
        />
      </Flex>
    </Card>
  );
};

export default ScheduleCard;
