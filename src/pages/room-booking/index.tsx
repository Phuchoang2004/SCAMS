import RoomDetailsLayout from "@/components/details-layout";
import WeekPicker from "@/components/week-picker";
import { bookingOptions, mockSessions } from "@/constants";
import { DateRange, Frequency, RoomSession } from "@/types";
import {
  Card,
  Flex,
  Form,
  Typography,
  TimePicker,
  Input,
  Select,
  Button,
} from "antd";
import { useEffect, useState } from "react";
import CustomFrequencyFields from "./CustomFrequencyFields";
import Timetable from "@/components/timetable";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = TimePicker;

const RoomBooking = () => {
  const [form] = Form.useForm();
  const [frequency, setFrequency] = useState(Frequency.ONCE);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: dayjs().startOf("week"),
    end: dayjs().endOf("week"),
  });
  const [sessions, setSessions] = useState<Array<RoomSession>>([]);

  useEffect(() => {
    setTimeout(() => {
      setSessions(mockSessions);
    }, 1000);
  }, []);

  return (
    <RoomDetailsLayout currentTab="booking">
      <Card>
        <Flex vertical align="flex-start" gap={24}>
          <Title level={2}>Room booking</Title>
          <WeekPicker onChange={setDateRange} />
          <Form
            style={{ width: "100%" }}
            onFinish={(values) => console.log(values)}
          >
            <Flex justify="space-between">
              <Flex gap={24}>
                <Form.Item name={"duration"} label="Duration">
                  <RangePicker
                    required
                    allowClear={false}
                    format="HH:00"
                    minuteStep={30}
                    hourStep={1}
                    placeholder={["Start Time", "End Time"]}
                    disabledTime={() => ({
                      disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 23, 24],
                    })}
                  />
                </Form.Item>
                <Form.Item name={"frequency"} label="Frequency">
                  <Select
                    defaultValue={Frequency.ONCE}
                    onChange={(value) => {
                      form.setFieldValue("frequency", value);
                      setFrequency(value);
                    }}
                    options={bookingOptions}
                  />
                </Form.Item>
                <CustomFrequencyFields form={form} frequency={frequency} />
              </Flex>
              <Button type="primary" htmlType="submit">
                Book
              </Button>
            </Flex>
            <Form.Item name="purpose" label="Purpose">
              <Input.TextArea rows={4} placeholder="Enter the purpose..." />
            </Form.Item>
          </Form>
          <Timetable
            sessions={[]}
            start={dateRange.start}
            end={dateRange.end}
          />
        </Flex>
      </Card>
    </RoomDetailsLayout>
  );
};

export default RoomBooking;
