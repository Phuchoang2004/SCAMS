import { RoomSession } from "@/types";
import dayjs from "dayjs";
import { RefObject, useRef } from "react";
import { theme } from "antd";

type SessionsOverlayProps = {
  sessions: Array<RoomSession>;
  newSessions: Array<RoomSession>;
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
};

const ScheduledSessionsOverlay = ({
  sessions,
  newSessions,
  start,
  end,
}: SessionsOverlayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {newSessions.map((session) => (
        <SessionItem
          sessions={sessions}
          key={session.id}
          session={session}
          containerRef={containerRef}
          start={start}
          end={end}
        />
      ))}
    </div>
  );
};

type SessionItemProps = {
  sessions: Array<RoomSession>;
  session: RoomSession;
  containerRef: RefObject<HTMLDivElement | null>;
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
};

const TIME_COL_WIDTH = 70;
const HEADER_HEIGHT = 45;
const ROW_HEIGHT = 40;
const NAVY_BLUE= "#9EDAC6"

const SessionItem = ({
  sessions,
  session,
  containerRef,
  start,
  end,
}: SessionItemProps) => {
  const { token } = theme.useToken();

  const days = end.diff(start, "day") + 1;
  const containerWidth = containerRef.current?.offsetWidth || 700;
  const duration = dayjs(session.end).diff(dayjs(session.start), "hour", true);
  const offsetDaysFromStart = dayjs(session.start).diff(start, "day");
  const sevenAmSameDay = dayjs(session.start)
    .hour(7)
    .minute(0)
    .second(0)
    .millisecond(0);
  const offsetHoursFromSeven = dayjs(session.start).diff(
    sevenAmSameDay,
    "hour"
  );

  const isOverlapped = sessions.some(
    (oldSession) =>
      dayjs(session.start).isBefore(dayjs(oldSession.end)) &&
      dayjs(session.end).isAfter(dayjs(oldSession.start))
  );

  const colWidth = (containerWidth - TIME_COL_WIDTH) / days;
  const width = colWidth - 4;
  const height = duration * ROW_HEIGHT - 4;
  const left = TIME_COL_WIDTH + colWidth * offsetDaysFromStart + 2;
  const top = HEADER_HEIGHT + ROW_HEIGHT * offsetHoursFromSeven + 2;

  if (!dayjs(session.start).isBetween(start, end)) return null;

  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
        left,
        top,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 4,
        padding: 8,
        backgroundColor: isOverlapped
          ? token.colorErrorBgHover
          : "rgba(0, 119, 181, 0.15)",
        color: isOverlapped ? token.colorErrorBorder : NAVY_BLUE,
        borderRadius: 6,
        border: `2px dashed ${isOverlapped ? token.colorError : NAVY_BLUE}`,
        fontSize: 12,
        overflow: "hidden",
      }}
    >
      <div style={{ textAlign: "center", fontWeight: 600 }}>
        {session.name}
      </div>
      <div style={{ fontSize: 11 }}>{session.createdBy}</div>
    </div>
  );
};

export default ScheduledSessionsOverlay;
