import { LoginCredentials, AuthResponse, User } from '@/types/auth';
import { env } from '@/config/env';
import axios from 'axios';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post(
      `${env.API_BASE_URL}/auth/login`,
      credentials,
      { withCredentials: true }
    );

    const { access_token } = response.data;

    // Get full user info from verify endpoint
    const user = await this.getCurrentUser();

    return {
      user,
      token: access_token,
      refreshToken: '',
    };
  },

  async getCurrentUser(): Promise<User> {
    const response = await axios.post(
      `${env.API_BASE_URL}/auth/verify`,
      {},
      { withCredentials: true }
    );

    console.log('Auth verify response:', response.data);

    const { userId, email, role, firstName, lastName } = response.data;

    return {
      id: userId,
      email: email,
      name: `${firstName} ${lastName}`,
      role: role?.toLowerCase() as User['role'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  async refreshToken(): Promise<AuthResponse> {
    // Backend uses HTTP-only cookies, so just verify the token
    const user = await this.getCurrentUser();
    return {
      user,
      token: '',
      refreshToken: '',
    };
  },

  async logout(): Promise<void> {
    await axios.post(
      `${env.API_BASE_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
  },

  isAuthenticated(): boolean {
    // Since we use HTTP-only cookies, we can't check directly
    // The getCurrentUser will fail if not authenticated
    return true;
  },
};