import { Frequency, Weekday } from "@/types";

export const bookingOptions: Array<{ label: string; value: Frequency }> = [
  {
    value: Frequency.ONCE,
    label: "Only once",
  },
  {
    value: Frequency.DAILY,
    label: "Daily",
  },
  {
    value: Frequency.WEEKLY,
    label: "Weekly",
  },
];

export const weekdayOptions: Array<{ label: string; value: Weekday }> = [
  {
    label: "Monday",
    value: Weekday.MONDAY,
  },
  {
    label: "Tuesday",
    value: Weekday.TUESDAY,
  },
  {
    label: "Wednesday",
    value: Weekday.WEDNESDAY,
  },
  {
    label: "Thursday",
    value: Weekday.THURSDAY,
  },
  {
    label: "Friday",
    value: Weekday.FRIDAY,
  },
  {
    label: "Saturday",
    value: Weekday.SATURDAY,
  },
  {
    label: "Sunday",
    value: Weekday.SUNDAY,
  },
];
