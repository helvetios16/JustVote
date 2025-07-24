import api from '@/shared/api/axios';
import { isAxiosError } from 'axios';
import { getToken } from '@/features/auth/services/authService';
import type { Option } from '@/shared/interfaces/option.interface';
import type { CreateOptionPayload } from '@/shared/interfaces/createOptionPayload.interface';
import type { UpdateOptionPayload } from '@/shared/interfaces/updateOptionPayload.interface';

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

/**
 * Updates an existing option.
 * Requires an authentication token.
 * @param optionId - The ID of the option to update.
 * @param payload - The data to update the option with.
 * @returns A Promise that resolves to the updated Option object.
 * @throws An Error if no authentication token is found, or if the API request fails.
 */
export async function updateOption(
  optionId: number,
  payload: UpdateOptionPayload,
): Promise<Option> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await api.patch<Option>(`/option/${optionId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || `Failed to update option ID ${optionId}`);
    } else {
      throw new Error('An unexpected error occurred while updating an option');
    }
  }
}

/**
 * Deletes an option.
 * Requires an authentication token.
 * @param optionId - The ID of the option to delete.
 * @returns A Promise that resolves when the option is successfully deleted.
 * @throws An Error if no authentication token is found, or if the API request fails.
 */
export async function deleteOption(optionId: number): Promise<void> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }

    await api.delete(`/option/${optionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || `Failed to delete option ID ${optionId}`);
    } else {
      throw new Error('An unexpected error occurred while deleting an option');
    }
  }
}
