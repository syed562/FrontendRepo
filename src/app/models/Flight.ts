export interface Flight {
  flightId: string;
  airline: string;
  origin: string;
  destination: string;
  price: number;
  departureTime: string; // ISO datetime
  arrivalTime: string;   // ISO datetime
}
