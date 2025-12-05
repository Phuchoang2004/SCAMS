import axios from 'axios';
import { env } from '@/config/env';

export interface BookingRoom {
  id: string;
  name: string;
  floor: {
    floorNumber: number;
    building: {
      name: string;
      block: string | null;
    };
  };
}

export interface Booking {
  id: string;
  startDateTime: string;
  endDateTime: string;
  status: 'confirmed' | 'in_progress' | 'cancelled';
  room: BookingRoom;
}

export const bookingsService = {
  async getMyBookings(): Promise<Booking[]> {
    const response = await axios.get<Booking[]>(
      `${env.API_BASE_URL}/bookings/me`,
      { withCredentials: true }
    );
    return response.data;
  },
};
