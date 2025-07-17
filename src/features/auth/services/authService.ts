import type { UserAuthResponse } from '@/shared/interfaces/userAuthResponse.interface';
import { isAxiosError } from 'axios';
import api from '@/shared/api/axios';

const USER_KEY = 'user';

export async function loginUser(credentials: {
  email: string;
  password: string;
}): Promise<UserAuthResponse> {
  try {
    const response = await api.post('/auth/google', credentials);
    const data: UserAuthResponse = response.data;
    saveUser(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to login');
    } else {
      throw new Error('An unexpected error occurred during login');
    }
  }
}

export function saveUser(user: UserAuthResponse): void {
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): UserAuthResponse | null {
  const userJson = sessionStorage.getItem(USER_KEY);
  if (!userJson) {
    return null;
  }
  try {
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Error parsing user data from sessionStorage', error);
    return null;
  }
}

export function getToken(): string | null {
  return getUser()?.token ?? null;
}

export function getUserId(): string | null {
  return getUser()?.userId ?? null;
}

export function clearUser(): void {
  sessionStorage.removeItem(USER_KEY);
}
