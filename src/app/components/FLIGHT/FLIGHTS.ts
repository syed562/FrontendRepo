import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

import { FlightService } from '../../services/flight-service';
import { Flight } from '../../ENTITIES/Flight';
import { searchReq } from '../../ENTITIES/searchReq';
import { AuthService } from '../../services/auth-service';
import { PassengerService } from '../../services/passenger-service';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './flights.html',
  styleUrl: './flights.css',
})
export class FlightList implements OnInit {

  flights$!: Observable<Flight[]>;
  searchData!: searchReq;

  constructor(
    private readonly flightService: FlightService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly passengerService: PassengerService
  ) {}

  ngOnInit(): void {
  const state = history.state as { searchData?: searchReq };

  if (!state?.searchData) {
    console.warn('No search data found, redirecting home');
    this.router.navigate(['/']);
    return;
  }

  this.searchData = state.searchData;

  this.flights$ = this.flightService.getFlightByOriginAndDestination(
    this.searchData
  );
}


  SendFlightId(flight: Flight): void {
    const flightId = flight.flightId;

    this.authService.currentUser
      .pipe(
        take(1),
        switchMap(user => {
          if (!user?.email) {
            this.router.navigate(['/signin']);
            throw new Error('User not logged in');
          }
          return this.passengerService.getPassengerByEmail(user.email);
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/book'], {
            state: { flightId }
          });
        },
        error: err => {
          if (err.status === 404) {
            this.router.navigate(['/register']);
          } else {
            console.error('Booking error:', err);
          }
        }
      });
  }
}
