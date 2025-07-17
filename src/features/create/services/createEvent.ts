import api from '@/shared/api/axios';
import { isAxiosError } from 'axios';
import { getToken } from '@/features/auth/services/authService';
import type { VotingEvent } from '@/shared/interfaces/votingEvent.interface';
import type { CreateVotingEventPayload } from '@/shared/interfaces/createVotingEventPayload.interface';
import type { UpdateVotingEventPayload } from '@/shared/interfaces/updateVotingEventPayload.interface';

/**
 * Fetches all voting events from the API.
 * Requires an authentication token.
 * @returns A Promise that resolves to an array of VotingEvent objects.
 * @throws An Error if no authentication token is found, or if the API request fails.
 */
export async function getVotingEvents(): Promise<VotingEvent[]> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await api.get<VotingEvent[]>('/voting-event', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch voting events');
    } else {
      throw new Error('An unexpected error occurred while fetching voting events');
    }
  }
}

/**
 * Creates a new voting event.
 * Requires an authentication token.
 * @param payload - The data for the new voting event.
 * @returns A Promise that resolves to the created VotingEvent object.
 * @throws An Error if no authentication token is found, or if the API request fails.
 */
export async function createVotingEvent(payload: CreateVotingEventPayload): Promise<VotingEvent> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await api.post<VotingEvent>('/voting-event', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An unexpected error occurred while creating a voting event');
    }
  }
}

/**
 * Deletes a voting event by its ID from the API.
 * Requires an authentication token.
 * @param id - The ID of the voting event to delete.
 * @returns A Promise that resolves when the deletion is successful.
 * @throws An Error if no authentication token is found, or if the API request fails.
 */
export async function deleteVotingEvent(id: string): Promise<void> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }

    await api.delete(`/voting-event/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || `Failed to delete voting event with ID ${id}`);
    } else {
      throw new Error('An unexpected error occurred while deleting the voting event');
    }
  }
}

/**
 * Updates a voting event.
 * Requires an authentication token.
 * @param id - The ID of the voting event to update.
 * @param payload - The data to update the voting event with.
 * @returns A Promise that resolves to the updated VotingEvent object.
 * @throws An Error if no authentication token is found, or if the API request fails.
 */
export async function updateVotingEvent(
  id: string,
  payload: UpdateVotingEventPayload,
): Promise<VotingEvent> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await api.patch<VotingEvent>(`/voting-event/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || `Failed to update voting event with ID ${id}`);
    } else {
      throw new Error('An unexpected error occurred while updating the voting event');
    }
  }
}

/**
 * Opens a voting event.
 * Requires an authentication token.
 * @param id - The ID of the voting event to open.
 * @returns A Promise that resolves to the opened VotingEvent object.
 * @throws An Error if no authentication token is found, or if the API request fails.
 */
export async function openVotingEvent(id: string): Promise<VotingEvent> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await api.patch<VotingEvent>(`/voting-event/open/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || `Failed to open voting event with ID ${id}`);
    } else {
      throw new Error('An unexpected error occurred while opening the voting event');
    }
  }
}

/**
 * Closes a voting event.
 * Requires an authentication token.
 * @param id - The ID of the voting event to close.
 * @returns A Promise that resolves to the closed VotingEvent object.
 * @throws An Error if no authentication token is found, or if the API request fails.
 */
export async function closeVotingEvent(id: string): Promise<VotingEvent> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await api.patch<VotingEvent>(`/voting-event/close/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || `Failed to close voting event with ID ${id}`);
    } else {
      throw new Error('An unexpected error occurred while closing the voting event');
    }
  }
}
