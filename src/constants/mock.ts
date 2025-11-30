import { Device, Room, RoomSession, RoomStatus } from "@/types";

export const mockRoom: Room = {
  id: "mock",
  room: "B4.304",
  block: "B4",
  floor: "3rd Floor",
  status: RoomStatus.AVAILABLE,
  address:
    "Campus 1 - 268 Ly Thuong Kiet, District 10, Ward 14, Ho Chi Minh City",
  thumbnail: "/images/default-thumbnail.webp",
};

export const mockSessions: Array<RoomSession> = [
  {
    id: "session-001",
    name: "Calculus II",
    createdBy: "Dr. Smith",
    start: new Date("2025-12-22T07:00:00"),
    end: new Date("2025-12-22T09:00:00"),
  },
  {
    id: "session-002",
    name: "Web Development",
    createdBy: "Tutor C",
    start: new Date("2025-12-22T13:00:00"),
    end: new Date("2025-12-22T14:30:00"),
  },
  {
    id: "session-003",
    name: "Advanced Programming",
    createdBy: "Tutor A",
    start: new Date("2025-12-24T10:00:00"),
    end: new Date("2025-12-24T12:00:00"),
  },
  {
    id: "session-004",
    name: "Database Systems",
    createdBy: "Tutor B",
    start: new Date("2025-12-26T14:00:00"),
    end: new Date("2025-12-26T16:00:00"),
  },
  {
    id: "session-005",
    name: "Q&A Session",
    createdBy: "Prof. Johnson",
    start: new Date("2025-12-28T18:00:00"),
    end: new Date("2025-12-28T19:30:00"),
  },
];

export const mockDevices: Array<Device> = [
  {
    id: "device1",
    name: "Front Light 1",
    enabled: true,
  },
  {
    id: "device2",
    name: "Front Light 2",
    enabled: true,
  },
  {
    id: "device3",
    name: "Front Light 3",
    enabled: true,
  },
  {
    id: "device4",
    name: "Front Light 4",
    enabled: true,
  },
  {
    id: "device5",
    name: "Front Light 5",
    enabled: true,
  },
  {
    id: "device6",
    name: "Front Light 6",
    enabled: true,
  },
];
