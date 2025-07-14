import api from '@/shared/api/axios';
import { isAxiosError } from 'axios';
import { getToken } from '@/features/auth/services/authService';
import type { CreateVotePayload } from '@/shared/interfaces/createVotePayload.interface';
import type { VoteResult } from '@/shared/interfaces/voteResult.interface';

/**
 * Fetches all vote results from the API.
 * Requires an authentication token.
 * @returns A Promise that resolves to an array of VoteResult objects.
 * @throws An Error if no authentication token is found, or if the API request fails.
 */
export async function getVotes(): Promise<VoteResult[]> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await api.get<VoteResult[]>('/vote', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch votes');
    } else {
      throw new Error('An unexpected error occurred while fetching votes');
    }
  }
}

/**
 * Handles the creation of a new vote by sending a POST request to the API.
 * Requires an authentication token.
 * @param payload - The vote data containing optionId and userId.
 * @returns A Promise that resolves to the VoteResponse object upon successful vote creation.
 * @throws An Error if no authentication token is found, or if the API request fails.
 */
export async function createVote(payload: CreateVotePayload): Promise<VoteResult> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await api.post<VoteResult>('/vote', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to create vote');
    } else {
      throw new Error('An unexpected error occurred while creating vote');
    }
  }
}

/**
 * Fetches a single vote result by its ID from the API.
 * Requires an authentication token.
 * @param id - The ID of the vote result to fetch.
 * @returns A Promise that resolves to a VoteResult object.
 * @throws An Error if no authentication token is found, or if the API request fails.
 */
export async function getVoteById(id: number): Promise<VoteResult> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await api.get<VoteResult>(`/vote/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || `Failed to fetch vote with ID ${id}`);
    } else {
      throw new Error('An unexpected error occurred while fetching vote by ID');
    }
  }
}

/**
 * Fetches vote results for a specific voting event from the API.
 * Requires an authentication token.
 * @param votingEventId - The ID of the voting event.
 * @returns A Promise that resolves to an array of VoteResult objects.
 * @throws An Error if no authentication token is found, or if the API request fails.
 */
export async function getVotesByVotingEventId(votingEventId: number): Promise<VoteResult[]> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await api.get<VoteResult[]>(`/vote/voting-event/${votingEventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || `Failed to fetch votes for voting event ID ${votingEventId}`,
      );
    } else {
      throw new Error('An unexpected error occurred while fetching votes by voting event ID');
    }
  }
}
