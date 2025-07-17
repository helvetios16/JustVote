export interface VotingEvent {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  userId: string;
  userName: string;
  status: 'OPENED' | 'CLOSED';
}
