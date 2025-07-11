// Placeholder for your election data
// In a real application, this data would come from an API call
export interface Election {
  id: string;
  title: string;
  question: string;
  options: string[];
  // You might add more properties like:
  // status: 'active' | 'closed';
  // endDate: Date;
  // creator: string;
}
