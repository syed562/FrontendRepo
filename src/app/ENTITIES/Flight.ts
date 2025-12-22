export interface Flight {
  flightId?: number;
  airline: string;
  origin: string;
  destination: string;
  price: number;
  departureTime: string; // ISO datetime
  arrivalTime: string;   // ISO datetime
  totalSeats?:number;
  availableSeats?:number;
}
