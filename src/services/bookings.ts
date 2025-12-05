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
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  room: BookingRoom;
}

export interface CreateBookingRequest {
  roomId: string;
  startDateTime: string;
  endDateTime: string;
  purpose: string;
}

export interface UpdateBookingRequest {
  startDateTime?: string;
  endDateTime?: string;
  purpose?: string;
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

  async updateBooking(bookingId: string, data: UpdateBookingRequest): Promise<Booking> {
    const response = await axios.patch<Booking>(
      `${env.API_BASE_URL}/bookings/${bookingId}`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  async cancelBooking(bookingId: string): Promise<Booking> {
    const response = await axios.patch<Booking>(
      `${env.API_BASE_URL}/bookings/${bookingId}`,
      { status: 'cancelled' },
      { withCredentials: true }
    );
    return response.data;
  },
};
