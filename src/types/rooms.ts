export enum RoomStatus {
  AVAILABLE = "AVAILABLE",
  OCCUPIED = "OCCUPIED",
}

export type Room = {
  id: string;
  room: string;
  block: string;
  floor: string;
  address: string;
  thumbnail?: string;
  status: RoomStatus;
};
