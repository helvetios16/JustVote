export type ParticipantStatusValue = 'VOTED' | 'BANNED' | 'PENDING';
export type VotingEventStatusValue = 'OPENED' | 'CLOSED';

export interface Participant {
  id: number;
  status: ParticipantStatusValue;
  userId: string;
  name: string;
  votingId: string;
  votingTitle: string;
  votingEventStatus: VotingEventStatusValue;
  eventDescription: string;
}
