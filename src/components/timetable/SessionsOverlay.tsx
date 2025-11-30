import { RoomSession } from "@/types";
import dayjs from "dayjs";
import { RefObject, useRef } from "react";
import { theme } from "antd";

type SessionsOverlayProps = {
  sessions: Array<RoomSession>;
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
};

const SessionsOverlay = ({ sessions, start, end }: SessionsOverlayProps) => {
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
      {sessions.map((session) => (
        <SessionItem
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
  session: RoomSession;
  containerRef: RefObject<HTMLDivElement | null>;
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
};

const SessionItem = ({
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

  const width = (containerWidth - 64) / days;
  const height = duration * 40;
  const left = 64 + width * offsetDaysFromStart;
  const top = 40 + 40 * offsetHoursFromSeven;

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
        padding: 4,
        backgroundColor: token.colorPrimary,
        color: "white",
      }}
    >
      <div style={{ textAlign: "center", fontWeight: "bold" }}>
        {session.name}
      </div>
      <div color="#FFFFFF">{session.createdBy}</div>
    </div>
  );
};

export default SessionsOverlay;
