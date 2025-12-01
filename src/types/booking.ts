import dayjs from "dayjs";

export enum Frequency {
  ONCE = "ONCE",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
}

export enum Weekday {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export type DateRange = { start: dayjs.Dayjs; end: dayjs.Dayjs };

export type OnceBookingData = {
  duration: Array<dayjs.Dayjs>;
  frequency: Frequency.ONCE;
  date: dayjs.Dayjs;
  purpose: string;
};

export type DailyBookingData = {
  duration: Array<dayjs.Dayjs>;
  frequency: Frequency.DAILY;
  appliedFor: Array<dayjs.Dayjs>;
  purpose: string;
};

export type WeeklyBookingData = {
  duration: Array<dayjs.Dayjs>;
  frequency: Frequency.WEEKLY;
  appliedFor: Array<dayjs.Dayjs>;
  purpose: string;
  weekday: Weekday;
};

export type BookingFormData =
  | OnceBookingData
  | DailyBookingData
  | WeeklyBookingData;
