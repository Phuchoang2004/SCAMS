import TimeStamps from "./TimeStamps";
import dayjs from "dayjs";
import { getDaysArray } from "@/utils/getDaysArray";
import SessionsOverlay from "./SessionsOverlay";
import { RoomSession } from "@/types";
import TimetableColumn from "./TimetableColumn";

type TimetableProps = {
  start: dayjs.ConfigType;
  end: dayjs.ConfigType;
  sessions: Array<RoomSession>;
};

const Timetable = ({ start, end, sessions }: TimetableProps) => {
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
      <SessionsOverlay
        sessions={sessions}
        start={dayjs(start)}
        end={dayjs(end)}
      />
    </div>
  );
};

export default Timetable;
