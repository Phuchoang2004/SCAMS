import { DatePicker } from "antd";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);

const WeekPicker = () => {
  const SEMESTER_START = dayjs("2025-09-15");

  const formatWeek = (value: dayjs.Dayjs) => {
    const diffInDays = value.diff(SEMESTER_START, "day");
    const academicWeek = Math.floor(diffInDays / 7) + 1;

    const start = value.startOf("isoWeek").format("DD/MM/YYYY");
    const end = value.endOf("isoWeek").subtract(2, "day").format("DD/MM/YYYY");

    return `Week ${academicWeek}:   ${start} - ${end}`;
  };

  return (
    <DatePicker
      picker="week"
      format={formatWeek}
      style={{
        width: "100%",
        height: "40px",
        borderRadius: "6px",
      }}
      defaultValue={dayjs("2025-11-03")}
    />
  );
};

export default WeekPicker;
