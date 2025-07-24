import { getToken } from '@/features/auth/services/authService';
import api from '@/shared/api/axios';
import type { Participant } from '@/shared/interfaces/participant.interface';
import type { ParticipantResult } from '@/shared/interfaces/participantResult.interface';
import { isAxiosError } from 'axios';

/**
 * Creates a new participant for a specific voting event.
 * Requires an authentication token.
 * @param votingId - The ID of the voting event.
 * @returns A Promise that resolves to the ParticipantResult object upon successful creation.
 * @throws An Error if no authentication token is found, or if the API request fails.
 */
export async function createParticipantForVotingEvent(
  votingId: string,
): Promise<ParticipantResult> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await api.post<ParticipantResult>(
      `/participant/voting-event/${votingId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message ||
          `Failed to create participant for voting event ID ${votingId}`,
      );
    } else {
      throw new Error('An unexpected error occurred while creating participant');
    }
  }
}

/**
 * Fetches all participants for the currently authenticated user.
 * Requires an authentication token.
 * @returns A Promise that resolves to an array of Participant objects.
 * @throws An Error if no authentication token is found, or if the API request fails.
 */
export async function getParticipantsForUser(): Promise<Participant[]> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await api.get<Participant[]>('/participant', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch participants for the user');
    } else {
      throw new Error('An unexpected error occurred while fetching participants');
    }
  }
}
