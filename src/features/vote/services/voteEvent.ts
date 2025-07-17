import { getToken } from '@/features/auth/services/authService';
import api from '@/shared/api/axios';
import type { Option } from '@/shared/interfaces/option.interface';
import { isAxiosError } from 'axios';

import type { VotingEvent } from '@/shared/interfaces/votingEvent.interface';
import type { VoteResult } from '@/shared/interfaces/voteResult.interface';

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
 * Fetches a single voting event by its ID from the API.
 * Requires an authentication token.
 * @param id - The ID of the voting event to fetch.
 * @returns A Promise that resolves to a VotingEvent object.
 * @throws An Error if no authentication token is found, or if the API request fails.
 */
export async function getVotingEventById(id: string): Promise<VotingEvent> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await api.get<VotingEvent>(`/voting-event/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || `Failed to fetch voting event with ID ${id}`);
    } else {
      throw new Error('An unexpected error occurred while fetching voting event by ID');
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
 * Creates a new vote for a specific option.
 * Requires an authentication token.
 * @param optionId - The ID of the option to vote for.
 * @returns A Promise that resolves to the VoteResult object upon successful vote creation.
 * @throws An Error if no authentication token is found, or if the API request fails.
 */
export async function createVoteByOptionId(optionId: number): Promise<VoteResult> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await api.post<VoteResult>(`/vote/${optionId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || `Failed to create vote for option ID ${optionId}`,
      );
    } else {
      throw new Error('An unexpected error occurred while creating vote by option ID');
    }
  }
}
