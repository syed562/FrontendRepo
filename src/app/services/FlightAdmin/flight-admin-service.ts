import { Injectable } from '@angular/core';
import { Flight } from '../../ENTITIES/Flight';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FlightAdminService {
  constructor(private readonly http:HttpClient){}
  private readonly baseUrl='http://localhost:8765/flight-service/flight';
  
  flightAdd(flight:Flight):Observable<Flight>{
    return this.http.post<Flight>(`${this.baseUrl}/register`,flight,{withCredentials:true});
  }
  getAllFlights():Observable<Flight[]>{
    console.log("fetching all the flights");
    return this.http.get<Flight[]>(`${this.baseUrl}/getAllFlights`,{withCredentials:true})

  }
deleteFlightById(id: number): Observable<string> {
  return this.http.delete(
    `${this.baseUrl}/delete/${id}`,
    {
      withCredentials: true,
      responseType: 'text'
    }
  );
}
  getFlightById(id:number):Observable<Flight>{
    return this.http.get<Flight>(`${this.baseUrl}/getFlightById/${id}`,{withCredentials:true});
  }

}