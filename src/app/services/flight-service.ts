import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { searchReq } from '../models/searchRequest';
import { Flight } from '../models/Flight';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  
  baseUrl = "http://localhost:9002/flight/getByOriginDestinationDateTime";

  constructor(private readonly http:HttpClient){}
  getFlightByOriginAndDestination(req:searchReq):Observable<Flight[]>{
   
    return this.http.post<Flight[]>(this.baseUrl,req,{ withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error:HttpErrorResponse){
    let message='Something went wrong';
    if(error.error instanceof ErrorEvent){
    
      message=error.error.message;
    }else{
      
      message=error.error?.message || 'Error ${error.status}';
    }
    console.error('Auth error:',message);
    return throwError(()=>new Error(message));
  }
}
