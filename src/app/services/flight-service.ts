import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { searchReq } from '../ENTITIES/searchReq';
import { Flight } from '../ENTITIES/Flight';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  //when searched by origin and destination we get list of flights lets mock that
  baseUrl="http://localhost:8765/flight-service/flight/getByOriginDestination";
  constructor(private readonly http:HttpClient){}
  getFlightByOriginAndDestination(req:searchReq):Observable<Flight[]>{
    //convert get to post passing searchRequest !!
    return this.http.post<Flight[]>(this.baseUrl,req,{ withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error:HttpErrorResponse){
    let message='Something went wrong';
    if(error.error instanceof ErrorEvent){
      //cient side error
      message=error.error.message;
    }else{
      //backend error
      message=error.error?.message || 'Error ${error.status}';
    }
    console.error('Auth error:',message);
    return throwError(()=>new Error(message));
  }
}
