import { Room, RoomStatus } from "@/types";

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
