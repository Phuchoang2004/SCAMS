import { BookingFormData, Frequency, RoomSession, Weekday } from "@/types";
import dayjs from "dayjs";
import { getDaysArray } from "./getDaysArray";

const WEEKDAY_INDEX: Record<Weekday, number> = {
  [Weekday.SUNDAY]: 0,
  [Weekday.MONDAY]: 1,
  [Weekday.TUESDAY]: 2,
  [Weekday.WEDNESDAY]: 3,
  [Weekday.THURSDAY]: 4,
  [Weekday.FRIDAY]: 5,
  [Weekday.SATURDAY]: 6,
};

const generateRandomString = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const length = 8;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

const combineDateAndTime = (dateObj: dayjs.Dayjs, timeObj: dayjs.Dayjs) => {
  const hours = timeObj.hour();
  const minutes = timeObj.minute();
  const seconds = timeObj.second();

  return dateObj.hour(hours).minute(minutes).second(seconds);
};

export const buildSessions = (
  data: BookingFormData,
  start: dayjs.Dayjs,
  end: dayjs.Dayjs,
  creator: string
): Array<RoomSession> => {
  const { duration, frequency } = data;

  if (!duration) return [];
  if (!duration[0] || !duration[1]) return [];

  if (data.frequency === Frequency.ONCE) {
    if (!data.date) return [];

    const sessionStart = duration[0];
    const sessionEnd = duration[1];

    const session: RoomSession = {
      id: generateRandomString(),
      name: data.purpose || "New session",
      createdBy: creator,
      start: combineDateAndTime(data.date, sessionStart).toDate(),
      end: combineDateAndTime(data.date, sessionEnd).toDate(),
    };

    return [session];
  }

  if (data.frequency === Frequency.DAILY) {
    if (!data.appliedFor) return [];
    if (!data.appliedFor[0] || !data.appliedFor[1]) return [];

    const sessionStart = duration[0];
    const sessionEnd = duration[1];

    const days = getDaysArray(start, end).filter(
      (day) =>
        day.isAfter(data.appliedFor[0].subtract(1, "day")) &&
        day.isBefore(data.appliedFor[1].endOf("day"))
    );

    return days.map((day) => ({
      id: generateRandomString(),
      name: data.purpose || "New session",
      createdBy: creator,
      start: combineDateAndTime(day, sessionStart).toDate(),
      end: combineDateAndTime(day, sessionEnd).toDate(),
    }));
  }

  if (data.frequency === Frequency.WEEKLY) {
    if (!data.appliedFor) return [];
    if (!data.appliedFor[0] || !data.appliedFor[1]) return [];

    const sessionStart = duration[0];
    const sessionEnd = duration[1];
    const weekday = data.weekday;

    const days = getDaysArray(start, end)
      .filter(
        (day) =>
          day.isAfter(data.appliedFor[0].subtract(1, "day")) &&
          day.isBefore(data.appliedFor[1].endOf("day"))
      )
      .filter((day) => day.day() === WEEKDAY_INDEX[weekday]);

    return days.map((day) => ({
      id: generateRandomString(),
      name: data.purpose || "New session",
      createdBy: creator,
      start: combineDateAndTime(day, sessionStart).toDate(),
      end: combineDateAndTime(day, sessionEnd).toDate(),
    }));
  }

  return [];
};
