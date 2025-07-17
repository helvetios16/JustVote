export interface ParticipantResult {
  id: number;
  status: "VOTED";
  userId: string;
  name: string;
  votingId: string;
  votingTitle: string;
}
