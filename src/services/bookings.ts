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
  status: 'Confirmed' | 'In_progress' | 'Cancelled';
  room: BookingRoom;
}

export interface CreateBookingRequest {
  roomId: string;
  startDateTime: string;
  endDateTime: string;
  purpose: string;
}

export const bookingsService = {
  async getMyBookings(): Promise<Booking[]> {
    const response = await axios.get<Booking[]>(
      `${env.API_BASE_URL}/bookings/me`,
      { withCredentials: true }
    );
    return response.data;
  },

  async createBooking(data: CreateBookingRequest): Promise<Booking> {
    const response = await axios.post<Booking>(
      `${env.API_BASE_URL}/bookings`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },
};
