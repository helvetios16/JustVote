import { getToken } from '@/features/auth/services/authService';
import api from '@/shared/api/axios';
import type { ParticipantResult } from '@/shared/interfaces/participantResult.interface';
import { isAxiosError } from 'axios';

/**
 * Fetches participants for a specific voting event from the API.
 * Requires an authentication token.
 * @param votingEventId - The ID of the voting event.
 * @returns A Promise that resolves to an array of ParticipantResult objects.
 * @throws An Error if no authentication token is found, or if the API request fails.
 */
export async function getParticipantsByVotingEventId(
  votingEventId: string,
): Promise<ParticipantResult[]> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await api.get<ParticipantResult[]>(
      `/participant/voting-event/${votingEventId}`,
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
          `Failed to fetch participants for voting event ID ${votingEventId}`,
      );
    } else {
      throw new Error(
        'An unexpected error occurred while fetching participants by voting event ID',
      );
    }
  }
}
