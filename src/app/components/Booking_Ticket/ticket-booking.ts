// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import {
//   Observable,
//   Subject,
//   switchMap,
//   take,
//   startWith
// } from 'rxjs';

// import { TicketService } from '../../services/ticket-service';
// import { Ticket } from '../../ENTITIES/Ticket';
// import { AuthService } from '../../services/auth-service';

// @Component({
//   selector: 'app-ticket-booking',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './ticket-booking.html',
//   styleUrl: './ticket-booking.css',
// })
// export class TicketBooking implements OnInit {

//   tickets$!: Observable<Ticket[]>;
//   private refresh$ = new Subject<void>();

//   flightId!: number;
//   passengerId!: number;
//   seatNo!: string;

//   constructor(
//     private readonly ticketService: TicketService,
//     private readonly authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.flightId = history.state?.flightId;
//     console.log('Flight ID:', this.flightId);

//     this.tickets$ = this.refresh$.pipe(
//       startWith(void 0), 
//       switchMap(() =>
//         this.authService.currentUser.pipe(
//           take(1),
//         switchMap(user => {
//             if (!user) {
//               throw new Error('User not logged in');
//             }
//             this.passengerId = user.id;
//             return this.ticketService.getTicketsByEmail(user.email);
//           })
//         )
//       )
//     );
//   }

//   bookTicket() {
//     this.ticketService
//       .bookTicketByPassengerIdandFlightId(
//         this.flightId,
//         this.passengerId,
//         this.seatNo
//       )
//       .subscribe({
//         next: () => {
//           console.log('Ticket booked');
//           this.refresh$.next(); 
//           this.seatNo = '';    
//         },
//         error: err => console.error('Booking failed', err),
//       });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Observable,
  Subject,
  switchMap,
  take,
  startWith,
  from,
  concatMap
} from 'rxjs';

import { TicketService } from '../../services/ticket-service';
import { Ticket } from '../../ENTITIES/Ticket';
import { AuthService } from '../../services/auth-service';

interface PassengerInput {
  seatNo: string;
}

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

  errorMessage: string | null = null;
successMessage: string | null = null;
isBooking = false;

  flightId!: number;
  passengerId!: number;

  
  passengers: PassengerInput[] = [
    { seatNo: '' }
  ];
seatNo: any;

  constructor(
    private readonly ticketService: TicketService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.flightId = history.state?.flightId;
    console.log('Flight ID:', this.flightId);

    this.tickets$ = this.refresh$.pipe(
      startWith(void 0),
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

 
  addPassenger() {
    this.passengers.push({ seatNo: '' });
  }

  
  removePassenger(index: number) {
    if (this.passengers.length > 1) {
      this.passengers.splice(index, 1);
    }
  }

  
  bookTickets() {

    if (!this.passengers || this.passengers.length === 0) {
       this.errorMessage = 'Please add at least one passenger';
      return;
    }
  this.errorMessage = null;
  this.successMessage = null;
  this.isBooking = true;

    from(this.passengers).pipe(

     
      concatMap(p =>
        this.ticketService.bookTicketByPassengerIdandFlightId(
          this.flightId,
          this.passengerId,
          p.seatNo
        )
      )

    ).subscribe({

      next: pnr => {
          this.successMessage = `Ticket booked successfully (PNR: ${pnr})`;
        console.log('Booked PNR:', pnr);
      },

      error: err => {
      this.isBooking = false;

     
      this.errorMessage =
        err?.error?.message ||
        err?.error ||
        'Seat already booked or booking failed';
    },

      complete: () => {
        console.log('All tickets booked');
        this.refresh$.next();

     
        this.passengers = [{ seatNo: '' }];
      }

    });
  }
}
