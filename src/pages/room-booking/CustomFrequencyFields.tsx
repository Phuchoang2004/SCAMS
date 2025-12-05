import { weekdayOptions } from "@/constants";
import { Frequency, Weekday } from "@/types";
import { DatePicker, Flex, Form, FormInstance, Select, Typography } from "antd";
import { Calendar, CalendarRange, CalendarDays } from "lucide-react";

const { Text } = Typography;

type CustomFrequencyFieldsProps = {
  frequency: Frequency;
  form: FormInstance<any>;
};

const THEME_BLUE = "#0077B5";

const CustomFrequencyFields = ({
  frequency,
  form,
}: CustomFrequencyFieldsProps) => {
  if (frequency === Frequency.DAILY)
    return (
      <>
        <Form.Item
          name={"appliedFor"}
          label={
            <Flex align="center" gap={8}>
              <CalendarRange size={16} color={THEME_BLUE} />
              <Text strong style={{ fontSize: 14 }}>Applied For</Text>
            </Flex>
          }
        >
          <DatePicker.RangePicker
            size="large"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>
      </>
    );

  if (frequency === Frequency.WEEKLY)
    return (
      <>
        <Form.Item
          name={"weekday"}
          label={
            <Flex align="center" gap={8}>
              <CalendarDays size={16} color={THEME_BLUE} />
              <Text strong style={{ fontSize: 14 }}>Weekday</Text>
            </Flex>
          }
          initialValue={Weekday.MONDAY}
        >
          <Select
            options={weekdayOptions}
            size="large"
            style={{ minWidth: 140, borderRadius: 8 }}
          />
        </Form.Item>
        <Form.Item
          name={"appliedFor"}
          label={
            <Flex align="center" gap={8}>
              <CalendarRange size={16} color={THEME_BLUE} />
              <Text strong style={{ fontSize: 14 }}>Applied For</Text>
            </Flex>
          }
        >
          <DatePicker.RangePicker
            required
            allowClear={false}
            size="large"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>
      </>
    );

  return (
    <Form.Item
      name={"date"}
      label={
        <Flex align="center" gap={8}>
          <Calendar size={16} color={THEME_BLUE} />
          <Text strong style={{ fontSize: 14 }}>Date</Text>
        </Flex>
      }
    >
      <DatePicker
        required
        size="large"
        style={{ borderRadius: 8 }}
      />
    </Form.Item>
  );
};

export default CustomFrequencyFields;
