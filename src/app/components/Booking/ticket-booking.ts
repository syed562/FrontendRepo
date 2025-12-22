import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketList } from '../ticket-list/ticket-list';
import {
  Observable,
  Subject,
  switchMap,
  take,
  startWith
} from 'rxjs';

import { TicketService } from '../../services/TicketService/ticket-service';
import { Ticket } from '../../ENTITIES/Ticket';
import { AuthService } from '../../services/Authentication/auth-service';
import { PassengerService } from '../../services/PassengerService/passenger-service';
import { Router, ActivatedRoute } from '@angular/router';
import { searchingStateService } from '../../services/SavingStates/searchingStateService';
@Component({
  selector: 'app-ticket-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, TicketList],
  templateUrl: './ticket-booking.html',
  styleUrl: './ticket-booking.css',
})
export class TicketBooking implements OnInit {

  tickets$!: Observable<Ticket[]>;
  private refresh$ = new Subject<void>();

  ticketBookedMessage$ = new Subject<string>();

  flightId!: number;
  numberOfSeats!: number;

  constructor(
    private readonly ticketService: TicketService,
    private readonly authService: AuthService,
    private readonly passengerService: PassengerService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly searchingState: searchingStateService
  ) {}

  ngOnInit(): void {
    this.flightId = Number(this.route.snapshot.queryParamMap.get('flightId'));

    if (!this.flightId) {
      this.router.navigate(['/']);
      return;
    }

    this.tickets$ = this.refresh$.pipe(
      startWith(void 0),
      switchMap(() =>
        this.authService.currentUser.pipe(
          take(1),
          switchMap(user => {
            if (!user) {
              throw new Error('User not logged in');
            }
            return this.ticketService.getTicketsByEmail(user.email);
          })
        )
      )
    );
  }
  onTicketCancelled() {
  this.refresh$.next();
}

  bookTicket() {
    if (!this.numberOfSeats) return;

    this.authService.currentUser.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          throw new Error('User not logged in');
        }
        return this.passengerService.getPassengerIdByEmail(user.email);
      }),
      switchMap(passengerId =>
        this.ticketService.bookTicketByPassengerIdandFlightId(
          this.flightId,
          passengerId,
          this.numberOfSeats
        )
      )
    ).subscribe({
      next: () => {
        this.searchingState.clear();
        this.ticketBookedMessage$.next('Ticket booking successful');
        this.numberOfSeats = 0;
        this.refresh$.next();
      },
      error: err => {
        console.error('Booking failed', err);
        this.ticketBookedMessage$.next('Ticket booking failed');
      }
    });
  }
}