import { theme } from "antd";
import dayjs from "dayjs";

type TimetableColumnProps = {
  date: dayjs.Dayjs;
};

const TimetableColumn = ({ date }: TimetableColumnProps) => {
  const { token } = theme.useToken();
  const hours = Array.from({ length: 15 }, (_, i) => i + 7);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        width: "100%",
        height: "fit",
      }}
    >
      <div
        style={{
          width: "100%",
          fontWeight: "bold",
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid",
          borderColor: token.colorTextTertiary,
          backgroundColor: token.colorTextTertiary,
          color: "white",
        }}
      >
        {date.format("dddd (DD/MM)")}
      </div>
      {hours.map((hour) => (
        <div
          key={hour}
          style={{
            width: "100%",
            height: 40,
            border: "1px solid",
            color: token.colorTextTertiary,
          }}
        ></div>
      ))}
    </div>
  );
};

export default TimetableColumn;
