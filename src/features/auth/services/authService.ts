import type { UserAuthResponse } from '@/shared/interfaces/userauthresponse.interface';

const USER_KEY = 'user';

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

export function clearUser(): void {
  sessionStorage.removeItem(USER_KEY);
}
