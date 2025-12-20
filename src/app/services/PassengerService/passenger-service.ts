import { Injectable } from '@angular/core';
import { Profile } from '../../models/Passenger';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PassengerService {

  private readonly BASE_URL =
    'http://localhost:8765/passenger-service/passenger';

  constructor(private readonly http: HttpClient) {}

  registerPassenger(profile: Profile) {
     console.log('Register payload:', profile);
    return this.http.post<number>(
      `${this.BASE_URL}/register`,
      profile,
      { withCredentials: true }
    );
  }

  getPassengerByUserId(passengerId: number) {
    console.log(passengerId);
    return this.http.get<Profile>(
      `${this.BASE_URL}/getByPassengerId/${passengerId}`,
      { withCredentials: true }
    );
  }

getPassengerIdByEmail(email: string) {
  return this.http.get<number>(
    `${this.BASE_URL}/getPassengerIdByEmail/${email}`,
    { withCredentials: true }
  );
}

}
