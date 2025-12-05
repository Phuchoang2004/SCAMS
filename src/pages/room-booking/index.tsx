import RoomDetailsLayout from "@/components/details-layout";
import WeekPicker from "@/components/week-picker";
import { bookingOptions, mockSessions } from "@/constants";
import { BookingFormData, DateRange, Frequency, RoomSession } from "@/types";
import {
  Card,
  Flex,
  Form,
  Typography,
  TimePicker,
  Input,
  Select,
  Button,
  Divider,
} from "antd";
import { useEffect, useState } from "react";
import CustomFrequencyFields from "./CustomFrequencyFields";
import Timetable from "@/components/timetable";
import dayjs from "dayjs";
import { buildSessions } from "@/utils/buildSessions";
import { useAuth } from "@/hooks/useAuth";
import { Clock, Repeat, FileText, ArrowRight } from "lucide-react";

const { Title, Text } = Typography;
const { RangePicker } = TimePicker;

const THEME_BLUE = "#0077B5";

const RoomBooking = () => {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const frequency = Form.useWatch("frequency", form);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: dayjs().startOf("week"),
    end: dayjs().endOf("week"),
  });
  const [sessions, setSessions] = useState<Array<RoomSession>>([]);
  const [newSessions, setNewSessions] = useState<Array<RoomSession>>([]);

  useEffect(() => {
    setTimeout(() => {
      setSessions(mockSessions);
    }, 1000);
  }, []);

  return (
    <RoomDetailsLayout currentTab="booking">
      <Card>
        <Flex vertical align="flex-start" gap={24}>
          <Title level={2}>Room Booking</Title>
          <WeekPicker onChange={setDateRange} />

          <Divider style={{ margin: "8px 0" }} />

          <Form
            form={form}
            style={{ width: "100%" }}
            layout="vertical"
            onFinish={(values) => console.log(values)}
            onValuesChange={(_, values: BookingFormData) => {
              const sessions = buildSessions(
                values,
                dateRange.start,
                dateRange.end,
                user?.name || "Tutor"
              );
              console.log(sessions);
              setNewSessions(sessions);
            }}
          >
            <Flex justify="space-between" align="flex-end">
              <Flex gap={32}>
                <Form.Item
                  name={"duration"}
                  label={
                    <Flex align="center" gap={8}>
                      <Clock size={16} color={THEME_BLUE} />
                      <Text strong style={{ fontSize: 14 }}>Duration</Text>
                    </Flex>
                  }
                >
                  <RangePicker
                    required
                    allowClear={false}
                    format="HH:00"
                    minuteStep={30}
                    hourStep={1}
                    size="large"
                    style={{ borderRadius: 8 }}
                    placeholder={["Start Time", "End Time"]}
                    separator={<ArrowRight size={16} color="#999" />}
                    disabledTime={() => ({
                      disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 23, 24],
                    })}
                  />
                </Form.Item>
                <Form.Item
                  name={"frequency"}
                  label={
                    <Flex align="center" gap={8}>
                      <Repeat size={16} color={THEME_BLUE} />
                      <Text strong style={{ fontSize: 14 }}>Frequency</Text>
                    </Flex>
                  }
                  initialValue={Frequency.ONCE}
                  required
                >
                  <Select
                    options={bookingOptions}
                    size="large"
                    style={{ minWidth: 150, borderRadius: 8 }}
                  />
                </Form.Item>
                <CustomFrequencyFields form={form} frequency={frequency} />
              </Flex>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ backgroundColor: THEME_BLUE, fontWeight: 600, height: 42, paddingInline: 24 }}
              >
                Register
              </Button>
            </Flex>
            <Form.Item
              name="purpose"
              label={
                <Flex align="center" gap={8}>
                  <FileText size={16} color={THEME_BLUE} />
                  <Text strong style={{ fontSize: 14 }}>Purpose</Text>
                </Flex>
              }
              required
              style={{ marginTop: 16 }}
            >
              <Input.TextArea
                required
                rows={4}
                size="large"
                style={{ borderRadius: 8 }}
                placeholder="Enter the purpose of your booking..."
              />
            </Form.Item>
          </Form>
          <Timetable
            sessions={sessions}
            newScheduledSessions={newSessions}
            start={dateRange.start}
            end={dateRange.end}
          />
        </Flex>
      </Card>
    </RoomDetailsLayout>
  );
};

export default RoomBooking;
