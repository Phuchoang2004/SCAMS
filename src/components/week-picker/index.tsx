import { DatePicker } from "antd";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { DateRange } from "@/types";
import { CalendarDays } from "lucide-react";

dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);

type WeekPickerProps = {
  onChange?: (dateRange: DateRange) => void;
};

const WeekPicker = ({ onChange }: WeekPickerProps) => {
  const SEMESTER_START = dayjs("2025-09-15");

  const formatWeek = (value: dayjs.Dayjs) => {
    const diffInDays = value.diff(SEMESTER_START, "day");
    const academicWeek = Math.floor(diffInDays / 7) + 1;
    const start = value.startOf("isoWeek").format("DD/MM");
    const end = value.endOf("isoWeek").subtract(2, "day").format("DD/MM/YYYY");
    return `Week ${academicWeek}   |   ${start} - ${end}`;
  };

  return (
    <DatePicker
      picker="week"
      format={formatWeek}
      allowClear={false}
      suffixIcon={<CalendarDays size={18} color="white" />}
      className="navy-week-picker"
      style={{
        height: 44,
        borderRadius: 8,
        backgroundColor: "#0077B5",
        border: "none",
        color: "white",
      }}
      onChange={(date) => {
        const start = date.startOf("week");
        const end = date.endOf("week");
        if (onChange) onChange({ start, end });
      }}
      defaultValue={dayjs()}
    />
  );
};

export default WeekPicker;
