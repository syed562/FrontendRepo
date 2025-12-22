// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { catchError, Observable, throwError } from 'rxjs';
// import { searchReq } from '../../models/searchRequest';
// import { Flight } from '../../models/Flight';

// @Injectable({
//   providedIn: 'root',
// })
// export class FlightService {

//   private readonly BASE_URL =
//     'http://localhost:8765/flight';

//   constructor(private readonly http: HttpClient) {}

//   getFlightByOriginAndDestination(req: searchReq): Observable<Flight[]> {
//     return this.http
//       .post<Flight[]>(
//         `${this.BASE_URL}/getByOriginDestinationDateTime`,
//         req,
//         { withCredentials: true }
//       )
//       .pipe(catchError(this.handleError));
//   }

//   private handleError(error: HttpErrorResponse) {
//     let message = 'Something went wrong';

//     if (error.error instanceof ErrorEvent) {
//       message = error.error.message;
//     } else {
//       message = error.error?.message || `Error ${error.status}`;
//     }

//     console.error('Auth error:', message);
//     return throwError(() => new Error(message));
//   }
// }
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { searchReq } from '../../ENTITIES/searchRequest';
import { Flight } from '../../ENTITIES/Flight';

@Injectable({
  providedIn: 'root',
})
export class FlightService {

  private readonly BASE_URL = 'http://localhost:9002/flight';
  private readonly LOCAL_DB_URL = 'assets/db.json';

  constructor(private readonly http: HttpClient) {}

  getFlightByOriginAndDestination(req: searchReq): Observable<Flight[]> {
    return this.http
      .post<Flight[]>(
        `${this.BASE_URL}/getByOriginDestinationDateTime`,
        req,
        { withCredentials: true }
      )
      .pipe(
        
        map((flights) => {
          if (!flights || flights.length === 0) {
            console.warn('No flights from backend, loading db.json');
            return [];
          }
          return flights;
        }),

        
        catchError((error) => {
          console.error('Backend error, loading db.json', error);
          return this.loadFlightsFromDbJson();
        })
      );
  }

 
  private loadFlightsFromDbJson(): Observable<Flight[]> {
    return this.http.get<any>(this.LOCAL_DB_URL).pipe(
      map((data) => data.flights || []),
      catchError(() => of([])) 
    );
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'Something went wrong';

    if (error.error instanceof ErrorEvent) {
      message = error.error.message;
    } else {
      message = error.error?.message || `Error ${error.status}`;
    }

    console.error('Flight error:', message);
    return throwError(() => new Error(message));
  }
}
