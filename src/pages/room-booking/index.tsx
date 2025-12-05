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
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomFrequencyFields from "./CustomFrequencyFields";
import Timetable from "@/components/timetable";
import dayjs from "dayjs";
import { buildSessions } from "@/utils/buildSessions";
import { useAuth } from "@/hooks/useAuth";
import { Clock, Repeat, FileText, ArrowRight } from "lucide-react";
import { bookingsService, CreateBatchBookingRequest } from "@/services/bookings";

const { Title, Text } = Typography;
const { RangePicker } = TimePicker;

const THEME_BLUE = "#0077B5";

const RoomBooking = () => {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const { id: roomId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const frequency = Form.useWatch("frequency", form);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: dayjs().startOf("week"),
    end: dayjs().endOf("week"),
  });
  const [sessions, setSessions] = useState<Array<RoomSession>>([]);
  const [newSessions, setNewSessions] = useState<Array<RoomSession>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSessions(mockSessions);
    }, 1000);
  }, []);

  const handleSubmit = async (values: BookingFormData) => {
    if (!roomId) {
      message.error("Room ID not found");
      return;
    }

    setIsSubmitting(true);

    try {
      // Build sessions to get all booking dates/times
      const sessionsToBook = buildSessions(
        values,
        dayjs().startOf("year"),
        dayjs().endOf("year"),
        user?.name || "User"
      );

      if (sessionsToBook.length === 0) {
        message.error("Please select valid date and time");
        setIsSubmitting(false);
        return;
      }

      // Use batch API for all-or-nothing booking creation
      const batchRequest: CreateBatchBookingRequest = {
        roomId,
        purpose: values.purpose,
        bookings: sessionsToBook.map((session) => ({
          startDateTime: session.start.toISOString(),
          endDateTime: session.end.toISOString(),
        })),
      };

      await bookingsService.createBatchBooking(batchRequest);

      message.success(
        sessionsToBook.length === 1
          ? "Booking created successfully!"
          : `${sessionsToBook.length} bookings created successfully!`
      );

      form.resetFields();
      setNewSessions([]);
      navigate(`/room/${roomId}/details`);
    } catch (error: any) {
      console.error("Booking error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create booking. Please try again.";
      message.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            onFinish={handleSubmit}
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
                loading={isSubmitting}
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
