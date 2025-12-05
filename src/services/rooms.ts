import axios from 'axios';
import { env } from '@/config/env';
import { Room, RoomSession, RoomStatus } from '@/types';

interface BackendRoom {
  id: string;
  name: string;
  isOccupied: boolean;
  floor: {
    floorNumber: number;
    building: {
    block: string;
    address: string;
    };
  };
}

interface BackendBooking {
  id: string;
  purpose: string;
  startDateTime: string;
  endDateTime: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

interface BackendRoomDetails {
  room: BackendRoom;
  sessions: BackendBooking[];
}

export interface RoomDetails {
  room: Room;
  sessions: RoomSession[];
}

const formatFloor = (floorNumber: number): string => {
  const suffix = ['th', 'st', 'nd', 'rd'];
  const v = floorNumber % 100;
  return floorNumber + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]) + ' Floor';
};

const transformRoom = (backendRoom: BackendRoom): Room => ({
  id: backendRoom.id,
  room: backendRoom.name,
  block: backendRoom.floor.building.block,
  floor: formatFloor(backendRoom.floor.floorNumber),
  address: backendRoom.floor.building.address || '',
  status: backendRoom.isOccupied ? RoomStatus.OCCUPIED : RoomStatus.AVAILABLE,
});

const transformSession = (booking: BackendBooking): RoomSession => ({
  id: booking.id,
  name: booking.purpose,
  createdBy: `${booking.user.firstName} ${booking.user.lastName}`,
  start: new Date(booking.startDateTime),
  end: new Date(booking.endDateTime),
});

export const roomsService = {
  async getAll(): Promise<Room[]> {
    const response = await axios.get<BackendRoom[]>(
      `${env.API_BASE_URL}/rooms`,
      { withCredentials: true }
    );
    return response.data.map(transformRoom);
  },

  async getDetails(roomId: string): Promise<RoomDetails> {
    const response = await axios.get<BackendRoomDetails>(
      `${env.API_BASE_URL}/rooms/${roomId}/details`,
      { withCredentials: true }
    );
    return {
      room: transformRoom(response.data.room),
      sessions: response.data.sessions.map(transformSession),
    };
  },
};
