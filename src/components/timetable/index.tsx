import dayjs from "dayjs";
import { getDaysArray } from "@/utils/getDaysArray";
import SessionsOverlay from "./SessionsOverlay";
import { RoomSession } from "@/types";
import ScheduledSessionsOverlay from "./ScheduledSessionsOverlay";
import { theme } from "antd";

type TimetableProps = {
  start: dayjs.ConfigType;
  end: dayjs.ConfigType;
  sessions: Array<RoomSession>;
  newScheduledSessions: Array<RoomSession>;
};

const NAVY_BLUE = "#0077B5";
const ROW_HEIGHT = 40;

const Timetable = ({
  start,
  end,
  sessions,
  newScheduledSessions,
}: TimetableProps) => {
  const { token } = theme.useToken();
  const dates = getDaysArray(start, end);
  const hours = Array.from({ length: 15 }, (_, i) => i + 7);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        borderRadius: 8,
        overflow: "hidden",
        border: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                width: 70,
                backgroundColor: NAVY_BLUE,
                color: "white",
                padding: "12px 8px",
                fontSize: 13,
                fontWeight: 600,
                borderRight: `1px solid rgba(255,255,255,0.2)`,
              }}
            >
              Time
            </th>
            {dates.map((date) => (
              <th
                key={date.toISOString()}
                style={{
                  backgroundColor: NAVY_BLUE,
                  color: "white",
                  padding: "12px 8px",
                  fontSize: 15,
                  fontWeight: 600,
                  textAlign: "center",
                  borderRight: `1px solid rgba(255,255,255,0.2)`,
                }}
              >
                {date.format("dddd DD/MM")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, rowIndex) => (
            <tr key={hour}>
              <td
                style={{
                  padding: "0 8px",
                  height: ROW_HEIGHT,
                  fontSize: 14,
                  fontWeight: 600,
                  color: NAVY_BLUE,
                  textAlign: "center",
                  backgroundColor: "#fafafa",
                  borderRight: `1px solid ${token.colorBorderSecondary}`,
                  borderBottom: `1px solid ${token.colorBorderSecondary}`,
                }}
              >
                {String(hour).padStart(2, "0")}:00
              </td>
              {dates.map((date) => (
                <td
                  key={date.toISOString()}
                  style={{
                    height: ROW_HEIGHT,
                    backgroundColor: "#fff",
                    borderRight: `1px solid ${token.colorBorderSecondary}`,
                    borderBottom: `1px solid ${token.colorBorderSecondary}`,
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <SessionsOverlay
        sessions={sessions}
        start={dayjs(start)}
        end={dayjs(end)}
      />
      <ScheduledSessionsOverlay
        sessions={sessions}
        newSessions={newScheduledSessions}
        start={dayjs(start)}
        end={dayjs(end)}
      />
    </div>
  );
};

export default Timetable;
