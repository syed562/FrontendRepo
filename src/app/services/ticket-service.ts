import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../ENTITIES/Ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {


  constructor(private http: HttpClient) {}
//later add that ticket as path variable dont forget
  getTicketsByEmail(email: string): Observable<Ticket[]> {
    return this.http.get<any[]>(`http://localhost:8765/ticket-service/ticket/getTicketsByEmail/${email}`
      ,{withCredentials:true}
    );
  }
  bookTicketByPassengerIdandFlightId(
  flightId: number,
  passengerId: number,
  seatNo: string
) {
  const payload = {
    flightId: flightId,
    passengerId: passengerId,
    seatNo: seatNo
  };

return this.http.post(
  'http://localhost:8765/ticket-service/ticket/book',
  payload,
  {
    withCredentials: true,
    responseType: 'text'
  }
);
}
}
