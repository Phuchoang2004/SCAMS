import { theme } from "antd";

const HEADER_HEIGHT = 44;
const ROW_HEIGHT = 40;

const TimeStamps = () => {
  const { token } = theme.useToken();

  const hours = Array.from({ length: 16 }, (_, i) => i + 7);

  return (
    <div
      style={{
        position: "relative",
        width: 50,
        minWidth: 50,
        height: HEADER_HEIGHT + 15 * ROW_HEIGHT,
      }}
    >
      {hours.map((hour, index) => (
        <div
          key={hour}
          style={{
            position: "absolute",
            top: HEADER_HEIGHT + index * ROW_HEIGHT,
            right: 8,
            transform: "translateY(-50%)",
            color:
              index % 2 === 0 ? token.colorPrimary : token.colorTextSecondary,
            fontSize: 13,
            fontWeight: index % 2 === 0 ? 600 : 400,
            lineHeight: 1,
          }}
        >
          {String(hour).padStart(2, "0")}:00
        </div>
      ))}
    </div>
  );
};

export default TimeStamps;
