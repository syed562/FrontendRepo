import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ticket } from '../../models/Ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {

  private baseUrl = 'http://localhost:8765/ticket-service/ticket';

  constructor(private http: HttpClient) {}

 
  getTicketsByEmail(email: string): Observable<Ticket[]> {
    return this.http
      .get<Ticket[]>(`${this.baseUrl}/getTicketsByEmail/${email}`, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }


  cancelTicket(id: number): Observable<string> {
    return this.http
      .delete(`${this.baseUrl}/cancel/${id}`, {
        withCredentials: true,
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }


  bookTicketByPassengerIdandFlightId(
    flightId: number,
    passengerId: number,
    numberOfSeats: number
  ): Observable<string> {

    const payload = {
      flightId,
      passengerId,
      numberOfSeats,
    };

    console.log('Book Ticket Payload:', payload);

    return this.http
      .post(`${this.baseUrl}/book`, payload, {
        withCredentials: true,
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'Something went wrong. Please try again later.';

    if (error.status === 0) {
    
      message = 'Unable to connect to server.';
    } else if (error.status === 401) {
      message = 'Unauthorized. Please login again.';
    } else if (error.status === 403) {
      message = 'Access denied.';
    } else if (error.status === 404) {
      message = 'Requested resource not found.';
    } else if (error.error) {
      message = error.error;
    }

    console.error('HTTP Error:', error);
    return throwError(() => message);
  }
}
