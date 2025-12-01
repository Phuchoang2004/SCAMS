import { weekdayOptions } from "@/constants";
import { Frequency, Weekday } from "@/types";
import { DatePicker, Form, FormInstance, Select } from "antd";

type CustomFrequencyFieldsProps = {
  frequency: Frequency;
  form: FormInstance<any>;
};

const CustomFrequencyFields = ({
  frequency,
  form,
}: CustomFrequencyFieldsProps) => {
  if (frequency === Frequency.DAILY)
    return (
      <>
        <Form.Item name={"appliedFor"} label="Applied for">
          <DatePicker.RangePicker />
        </Form.Item>
      </>
    );

  if (frequency === Frequency.WEEKLY)
    return (
      <>
        <Form.Item name={"weekday"} label="Weekday">
          <Select
            onChange={(value) => {
              form.setFieldValue("weekday", value);
            }}
            defaultValue={Weekday.MONDAY}
            options={weekdayOptions}
          />
        </Form.Item>
        <Form.Item name={"appliedFor"} label="Applied for">
          <DatePicker.RangePicker required allowClear={false} />
        </Form.Item>
      </>
    );

  if (frequency === Frequency.MONTHLY)
    return (
      <>
        <Form.Item name={"day"} label="Day">
          <Select
            defaultValue={"1"}
            onChange={(value) => {
              form.setFieldValue("day", value);
            }}
            options={Array.from({ length: 30 }, (_, i) => i + 1).map(
              (value) => ({
                label: `${String(value)}${
                  value === 1
                    ? "st"
                    : value === 2
                    ? "nd"
                    : value === 3
                    ? "rd"
                    : "th"
                }`,
                value: String(value),
              })
            )}
          />
        </Form.Item>
        <Form.Item name={"appliedFor"} label="Applied for">
          <DatePicker.RangePicker required allowClear={false} />
        </Form.Item>
      </>
    );

  return (
    <Form.Item name={"date"} label="Date">
      <DatePicker required />
    </Form.Item>
  );
};

export default CustomFrequencyFields;
