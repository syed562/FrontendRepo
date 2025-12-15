import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Observable,
  Subject,
  switchMap,
  take,
  startWith
} from 'rxjs';

import { TicketService } from '../../services/ticket-service';
import { Ticket } from '../../models/Ticket';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-ticket-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-booking.html',
  styleUrl: './ticket-booking.css',
})
export class TicketBooking implements OnInit {

  tickets$!: Observable<Ticket[]>;
  private refresh$ = new Subject<void>();

  flightId!: number;
  passengerId!: number;
  seatNo!: string;

  constructor(
    private readonly ticketService: TicketService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.flightId = history.state?.flightId;
    console.log('Flight ID:', this.flightId);

    this.tickets$ = this.refresh$.pipe(
      startWith(void 0), // 🔥 initial load
      switchMap(() =>
        this.authService.currentUser.pipe(
          take(1),
          switchMap(user => {
            if (!user) {
              throw new Error('User not logged in');
            }
            this.passengerId = user.id;
            return this.ticketService.getTicketsByEmail(user.email);
          })
        )
      )
    );
  }

  bookTicket() {
    this.ticketService
      .bookTicketByPassengerIdandFlightId(
        this.flightId,
        this.passengerId,
        this.seatNo
      )
      .subscribe({
        next: () => {
          console.log('Ticket booked');
          this.refresh$.next(); // 🔁 refresh tickets
          this.seatNo = '';     // optional UX improvement
        },
        error: err => console.error('Booking failed', err),
      });
  }
}
