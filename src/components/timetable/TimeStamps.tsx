import { Typography, theme } from "antd";

const { Text } = Typography;

const TimeStamps = () => {
  const { token } = theme.useToken();

  const hours = Array.from({ length: 16 }, (_, i) => i + 7);

  return (
    <div
      style={{
        marginTop: 24,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        width: 40,
        minWidth: 40,
        height: "fit-content",
      }}
    >
      {hours.map((hour, index) => (
        <div
          key={hour}
          style={{
            color:
              index % 2 === 0 ? token.colorPrimary : token.colorTextTertiary,
            minWidth: 40,
            width: 40,
          }}
        >
          {String(hour).padStart(2, "0")}:00
        </div>
      ))}
    </div>
  );
};

export default TimeStamps;
