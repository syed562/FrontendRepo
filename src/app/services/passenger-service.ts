import { Injectable } from '@angular/core';
import { Profile } from '../models/Passenger';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  // http://localhost:8765/passenger-service/passenger/register
  constructor(private readonly http:HttpClient){
    
  }

registerPassenger(profile: Profile) {
  return this.http.post<number>(
    'http://localhost:8765/passenger-service/passenger/register',
    profile,
    { withCredentials: true }
  );
}
getPassengerByUserId(authUserId: number) {
  return this.http.get<Profile>(
    `http://localhost:8765/passenger-service/passenger/getByPassengerId/${authUserId}`,
    { withCredentials: true }
  );
}

getPassengerByEmail(email: string) {
  return this.http
    .get<number>(
      `http://localhost:8765/passenger-service/passenger/getPassengerIdByEmail/${email}`,
      { withCredentials: true }
    )
    .pipe(
      switchMap(id => this.getPassengerByUserId(id))
    );
}

}
