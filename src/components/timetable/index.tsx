import { Flex } from "antd";
import TimeStamps from "./TimeStamps";
import dayjs from "dayjs";
import TimetableColumn from "./TimeTableColumn";
import { getDaysArray } from "@/utils/getDaysArray";

type TimetableProps = {
  start: dayjs.ConfigType;
  end: dayjs.ConfigType;
};

const Timetable = ({ start, end }: TimetableProps) => {
  const dates = getDaysArray(start, end);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: 24,
        width: "100%",
        height: "fit",
      }}
    >
      <TimeStamps />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 0,
          width: "100%",
          height: "fit",
        }}
      >
        {dates.map((date) => (
          <TimetableColumn key={date.toISOString()} date={date} />
        ))}
      </div>
    </div>
  );
};

export default Timetable;
