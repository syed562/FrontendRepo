export interface Ticket {
  id?: number;
  name: string;
  email: string;
  origin: string;
  destination: string;
  pnr: string;
  departureTime: string;
  arrivalTime: string;
}
