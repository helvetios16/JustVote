import api from '@/shared/api/axios';
import { isAxiosError } from 'axios';
import { getToken } from '@/features/auth/services/authService';
import type { Option } from '@/shared/interfaces/option.interface';
import type { CreateOptionPayload } from '@/shared/interfaces/createOptionPayload.interface';

/**
 * Creates a new option.
 * Requires an authentication token.
 * @param payload - The data for the new option.
 * @returns A Promise that resolves to the created Option object.
 * @throws An Error if no authentication token is found, or if the API request fails.
 */
export async function createOption(payload: CreateOptionPayload): Promise<Option> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await api.post<Option>('/option', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to create option');
    } else {
      throw new Error('An unexpected error occurred while creating an option');
    }
  }
}

/**
 * Fetches options for a specific voting event from the API.
 * Requires an authentication token.
 * @param votingEventId - The ID of the voting event.
 * @returns A Promise that resolves to an array of Option objects.
 * @throws An Error if no authentication token is found, or if the API request fails.
 */
export async function getOptionsByVotingEventId(votingEventId: string): Promise<Option[]> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await api.get<Option[]>(`/option/voting-event/${votingEventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message ||
          `Failed to fetch options for voting event ID ${votingEventId}`,
      );
    } else {
      throw new Error('An unexpected error occurred while fetching options by voting event ID');
    }
  }
}
