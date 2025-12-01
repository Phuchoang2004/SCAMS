import dayjs from "dayjs";

export const getDaysArray = (
  start: dayjs.ConfigType,
  end: dayjs.ConfigType
) => {
  const range = [];
  let current = dayjs(start);
  const stop = dayjs(end);

  while (current.isBefore(stop) || current.isSame(stop, "day")) {
    range.push(current);
    current = current.add(1, "day");
  }

  return range;
};
